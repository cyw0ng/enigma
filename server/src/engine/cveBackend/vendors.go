package cveBackend

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"enigma/server/src/common/cmds"
	"enigma/server/src/common/defs"
	"fmt"
	"html"
	"strconv"
	"strings"
	"time"
)

func GetVendorlist(G *defs.Global) (*defs.CVEBrowse, error) {
	vendorlist, err := getVendorlistFromDB(G.DBConn, 0, 0)
	if vendorlist == nil || len(vendorlist.Vendor) == 0 || err != nil {
		vendorlist, err = getVendorlistFromHTTPS()
		if err != nil {
			return nil, err
		}

		go func() {
			if insertVendorlistToDB(G.DBConn, vendorlist) != nil {
				G.Log.Error("insert vendorlist to db failed")
			} else {
				G.Log.Info("insert vendorlist to db success")
			}
		}()
	}
	return vendorlist, err
}

func GetVendorlistPartial(G *defs.Global, offset int, limit int) (*defs.CVEBrowse, error) {
	return getVendorlistFromDB(G.DBConn, offset, limit)
}

func IsVendorlistInDB(G *defs.Global) bool {
	vendorlist, err := getVendorlistFromDB(G.DBConn, 0, 0)
	notInDB := vendorlist == nil || len(vendorlist.Vendor) == 0 || err != nil

	return !notInDB
}

func insertVendorlistToDB(DBConn *sql.DB, vendorlist *defs.CVEBrowse) error {
	insertPrefix := "INSERT IGNORE INTO enigma.vendorlist (vendorName) VALUES "

	var buf bytes.Buffer

	// TBD: Fix this session, critical performance hits
	for i, vendor := range vendorlist.Vendor {
		vendor = html.EscapeString(vendor)

		buf.WriteString("('" + vendor + "'), ")
		if i != 0 && (i%2000 == 0 || i == len(vendorlist.Vendor)-1) {
			statement := insertPrefix + buf.String()
			statement = statement[0 : len(statement)-2]

			buf.Truncate(0)
			_, err := DBConn.Query(statement)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func getVendorlistFromDB(DBConn *sql.DB, offset int, limit int) (*defs.CVEBrowse, error) {
	var vendorlist *sql.Rows
	var err error
	if offset == 0 && limit == 0 {
		vendorlist, err = DBConn.Query("SELECT * FROM enigma.vendorlist;")
	} else {
		statement := fmt.Sprintf("SELECT * FROM enigma.vendorlist LIMIT %d OFFSET %d;", offset, limit)
		vendorlist, err = DBConn.Query(statement)
	}

	if err != nil {
		return nil, err
	}
	browse := &defs.CVEBrowse{
		Product: nil,
		Vendor:  nil,
	}
	for vendorlist.Next() {
		var id int
		var vendor string
		err = vendorlist.Scan(&id, &vendor)
		if err != nil {
			return nil, err
		}

		browse.Vendor = append(browse.Vendor, vendor)
	}

	return browse, nil
}

func getVendorlistFromHTTPS() (*defs.CVEBrowse, error) {
	response := cmds.CurlHTTPSRequest(defs.GetVendorlistHTTPS)

	vendorlist := &defs.CVEBrowse{}

	err := json.Unmarshal([]byte(response), &vendorlist)

	if err != nil {
		return nil, err
	}

	return vendorlist, nil
}

func GetCWElist(G *defs.Global) ([]defs.CWERecord, error) {
	G.Log.Info("--> " + time.Now().String())
	cwelist, err := getCWElistFromDB(G.DBConn)
	isGetFromDBErr := cwelist == nil || len(cwelist) == 0 || err != nil
	G.Log.Info("<--" + time.Now().String())

	if isGetFromDBErr {
		if cwelist, err = getCWElistFromHTTPS(); err != nil {
			return nil, err
		}

		go func() {
			if insertCWElistToDB(G.DBConn, cwelist) != nil {
				G.Log.Error("insert cwelist to db failed")
			} else {
				G.Log.Info("insert cwelist to db success")
			}
		}()
	}
	return cwelist, err
}

func getCWElistFromDB(DBConn *sql.DB) ([]defs.CWERecord, error) {
	var cwerecords []defs.CWERecord

	var err error
	cwelist, err := DBConn.Query("SELECT cweId, description, name, relationships, status, weaknessabs FROM enigma.cwelist;")

	if err != nil {
		return nil, err
	}
	for cwelist.Next() {
		var cwerecord defs.CWERecord

		// TBD: Complete relationships
		relationships := ""
		err = cwelist.Scan(&cwerecord.ID, &cwerecord.Description, &cwerecord.Name, &relationships, &cwerecord.Status, &cwerecord.Weaknessabs)

		if err != nil {
			return nil, err
		}

		cwerecords = append(cwerecords, cwerecord)
	}

	return cwerecords, nil
}

func getCWElistFromHTTPS() ([]defs.CWERecord, error) {
	response := cmds.CurlHTTPSRequest(defs.GetCWERecordHTTPS)

	var cwelist []defs.CWERecord

	err := json.Unmarshal([]byte(response), &cwelist)

	if err != nil {
		return nil, err
	}

	return cwelist, nil
}

func insertCWElistToDB(DBConn *sql.DB, cwelist []defs.CWERecord) error {
	insertPrefix := "INSERT IGNORE INTO enigma.cwelist (cweId, description, name, relationships, status, weaknessabs) VALUES "

	const updateModular = 200
	var buf bytes.Buffer

	// TBD: Fix this session, critical performance hits
	for i, cwe := range cwelist {
		relationships := "-"
		descriptions := html.EscapeString(cwe.Description)
		name := html.EscapeString(cwe.Name)

		updateFields := strings.Join([]string{cwe.ID, descriptions, name, relationships, cwe.Status, cwe.Weaknessabs}, ", '")
		buf.WriteString("(" + updateFields + "'), ")

		if i != 0 && (i%updateModular == 0 || i == len(cwelist)-1) {
			statement := insertPrefix + buf.String()
			statement = statement[0 : len(statement)-2]

			buf.Truncate(0)
			if _, err := DBConn.Query(statement); err != nil {
				return err
			}
		}
	}

	return nil
}

func GetCapecForId(G *defs.Global, cweId int) (*defs.CapecRecord, error) {
	capecRecord, err := getCapecFromHTTPS(cweId)
	if err != nil {
		return nil, err
	}

	return capecRecord, err
}

func GetCirclInfo(G *defs.Global) (*defs.CirclInfo, error) {
	circlInfo, err := getCirclInfoFromHTTPS()
	if err != nil {
		return nil, err
	}

	return circlInfo, err
}

func GetCapecCountInDB(G *defs.Global) (int, error) {
	queryResult, err := G.DBConn.Query("SELECT COUNT(*) FROM enigma.capeclist;")
	if err != nil {
		return 0, err
	}

	var recordCount int
	for queryResult.Next() {
		err = queryResult.Scan(&recordCount)
	}
	return recordCount, err
}

func getCapecFromHTTPS(cweId int) (*defs.CapecRecord, error) {
	capecQueryURI := strings.Replace(defs.GetCapecRecordHTTPS, "capecId", strconv.Itoa(cweId), -1)
	response := cmds.CurlHTTPSRequest(capecQueryURI)

	capecRecord := &defs.CapecRecord{}

	err := json.Unmarshal([]byte(response), &capecRecord)

	if err != nil {
		return nil, err
	}

	return capecRecord, nil
}

func getCirclInfoFromHTTPS() (*defs.CirclInfo, error) {
	response := cmds.CurlHTTPSRequest(defs.GetCirclCurrentHTTPS)

	circlInfo := &defs.CirclInfo{}

	err := json.Unmarshal([]byte(response), &circlInfo)

	if err != nil {
		return nil, err
	}

	return circlInfo, nil
}
