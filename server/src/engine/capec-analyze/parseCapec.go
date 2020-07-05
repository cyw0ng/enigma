package capec_analyze

import (
	"bytes"
	"database/sql"
	"encoding/xml"
	"enigma/server/src/common/defs"
	"enigma/server/src/common/utils"
	"io/ioutil"
	"os"
	"strings"
)

func ParseCapecXML(G *defs.Global, capecXMLName string, category string) error {
	tmpPath := G.Cfg.GetString("runtime.tmpPath")
	xmlFile, err := openCapecXML(tmpPath, capecXMLName)
	if err != nil {
		return err
	}
	xmlBytes, err := readInCapecXML(xmlFile)
	if err != nil {
		return err
	}

	var capecFullXML defs.CapecXML

	err = xml.Unmarshal(xmlBytes, &capecFullXML)
	if err != nil {
		return err
	}

	capecRecords, err := convertIntoCapecRecords(capecFullXML)
	return insertCapecRecordsIntoDB(G.DBConn, capecRecords)
}

func insertCapecRecordsIntoDB(DBConn *sql.DB, capecRecords []defs.CapecRecord) error {
	insertPrefix := "INSERT IGNORE INTO enigma.capeclist (id, name, prerequisites, related_weakness, description, likelihood_of_attack, typical_severity) VALUES "

	var buf bytes.Buffer

	for i, record := range capecRecords {
		prerequisitesStr := strings.Join(record.Prerequisites, "\n")
		relatedWeaknessStr := strings.Join(record.RelatedWeakness, "\n")
		buf.WriteString("('" + record.ID + "', '" + record.Name + "', '" + prerequisitesStr + "', '" + relatedWeaknessStr + "', '" + record.Description + "', '" + record.LikelihoodOfAttack + "', '" + record.TypicalSeverity + "'), ")
		if i != 0 && (i%40 == 0 || i == len(capecRecords)-1) {
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

func convertIntoCapecRecords(capecFullXML defs.CapecXML) ([]defs.CapecRecord, error) {
	var capecRecords []defs.CapecRecord
	for _, attack := range capecFullXML.AttackPatterns.AttackPattern {
		var capecRecord defs.CapecRecord
		capecRecord.ID = attack.ID
		capecRecord.Name = utils.CommonEscape(attack.Name)
		capecRecord.Description = utils.CommonEscape(attack.Description)
		for _, prereruisite := range attack.Prerequisites.Prerequisite {
			capecRecord.Prerequisites = append(capecRecord.Prerequisites, utils.CommonEscape(prereruisite))
		}

		for _, weakness := range attack.RelatedWeaknesses.RelatedWeakness {
			capecRecord.RelatedWeakness = append(capecRecord.RelatedWeakness, weakness.CWEID)
		}
		capecRecord.LikelihoodOfAttack = attack.LikelihoodOfAttack
		capecRecord.TypicalSeverity = attack.TypicalSeverity

		capecRecords = append(capecRecords, capecRecord)
	}

	return capecRecords, nil
}

func openCapecXML(tmpPath string, capecXMLName string) (*os.File, error) {
	capecXMLFile := tmpPath + "/" + capecXMLName
	return os.Open(capecXMLFile)
}

func readInCapecXML(xmlFile *os.File) ([]byte, error) {
	return ioutil.ReadAll(xmlFile)
}
