package capec_analyze

import (
	"database/sql"
	"enigma/server/src/common/defs"
	"fmt"
	"github.com/minio/minio-go/v6"
	"os"
	"os/exec"
	"strings"
)

func GetCapecXML(G *defs.Global, capecXMLName string, category string) error {
	minioPath, err := getFileRecordFromDB(G.DBConn, capecXMLName, category)
	if err != nil || minioPath == "" {
		return getCapecXMLFromHTTPS(G, capecXMLName, category)
	} else {
		return getCapecXMLFromOBS(G, minioPath)
	}
}

func getCapecXMLFromHTTPS(G *defs.Global, capecXMLName string, category string) error {
	capecXMLURL := G.Cfg.GetString("resources.capecXMLList.url")
	tmpPath := G.Cfg.GetString("runtime.tmpPath")

	capecZipFile := tmpPath + "/capec.xml.zip"
	capecXMLFile := tmpPath + "/" + capecXMLName
	mainBucketName := G.Cfg.GetString("conn.minio_main_bucket")
	savedFilePath := category + "/" + capecXMLName

	getZipCmd := exec.Command("curl", capecXMLURL, "-o", capecZipFile)

	_, err := getZipCmd.Output()
	if err != nil {
		return err
	}

	unZipCmd := exec.Command("unzip", capecZipFile, "-d", tmpPath)

	_, err = unZipCmd.Output()
	if err != nil {
		return err
	}

	rmZipCmd := exec.Command("rm", "-rf", capecZipFile)

	_, err = rmZipCmd.Output()
	if err != nil {
		return err
	}

	xmlfile, err := os.Open(capecXMLFile)
	if err != nil {
		return err
	}
	xmlStat, err := xmlfile.Stat()
	if err != nil {
		return err
	}
	_, err = G.OBS.PutObject(mainBucketName, savedFilePath, xmlfile, xmlStat.Size(), minio.PutObjectOptions{})
	if err != nil {
		return err
	}

	go func() {
		fileInfoRecord := defs.FileInfoRecord{
			Filename:   capecXMLName,
			Fileurl:    capecXMLURL,
			Minio_path: savedFilePath,
			Category:   category,
		}
		err = insertFileRecordToDB(G.DBConn, fileInfoRecord)
	}()

	return nil
}

func getCapecXMLFromOBS(G *defs.Global, minioPath string) error {
	mainBucketName := G.Cfg.GetString("conn.minio_main_bucket")
	capecXMLName := G.Cfg.GetString("resources.capecXMLList.fileName")

	return G.OBS.FGetObject(mainBucketName, minioPath, "tmp/"+capecXMLName, minio.GetObjectOptions{})
}

func getFileRecordFromDB(DBConn *sql.DB, filename string, category string) (string, error) {
	selectQueryFmt := "SELECT minio_path FROM enigma.filelist WHERE filename = '%s' AND category = '%s';"
	selectQuery := fmt.Sprintf(selectQueryFmt, filename, category)

	selectResult, err := DBConn.Query(selectQuery)
	if err != nil {
		return "", err
	}

	var minioPath string
	for selectResult.Next() {
		if err = selectResult.Scan(&minioPath); err != nil {
			return "", err
		}
	}

	return minioPath, nil
}

func insertFileRecordToDB(DBConn *sql.DB, record defs.FileInfoRecord) error {
	insertQueryFmt := "INSERT IGNORE INTO enigma.filelist (filename, fileurl, minio_path, category) VALUES ('%s', '%s', '%s', '%s');"
	insertQuery := fmt.Sprintf(insertQueryFmt, record.Filename, record.Fileurl, record.Minio_path, record.Category)
	_, err := DBConn.Query(insertQuery)

	return err
}

func GetCapecAllRecords(DBConn *sql.DB) ([]defs.CapecRecord, error) {
	var capecRecords []defs.CapecRecord
	 queryStatement := "SELECT * FROM enigma.capeclist;"
	 selectResult, err := DBConn.Query(queryStatement)
	 if err != nil {
		return capecRecords, err
	 }

	var capecRecord defs.CapecRecord
	for selectResult.Next() {
		prerequistes := ""
		weaknesslist := ""
		if err = selectResult.Scan(&capecRecord.ID, &capecRecord.Name, &prerequistes, &weaknesslist, &capecRecord.Description, &capecRecord.LikelihoodOfAttack, &capecRecord.TypicalSeverity); err != nil {
			return capecRecords, err
		}

		capecRecord.Prerequisites = strings.Split(prerequistes, "\n")
		capecRecord.RelatedWeakness = strings.Split(weaknesslist, "\n")

		capecRecords = append(capecRecords, capecRecord)
	}

	return capecRecords, nil
}