package cveBackend

import (
	"encoding/json"
	"enigma/server/src/common/cmds"
	"enigma/server/src/common/defs"
	"strings"
)

func GetCVERecordFromID(cveID string) (*defs.CVERecord, error) {
	return getCVERecordFromID(cveID)
}

func getCVERecordFromID(cveID string) (*defs.CVERecord, error) {
	url := strings.Replace(defs.GetCVERecordHTTPS, "cveId", cveID, -1)
	response := cmds.CurlHttpsRequest(url)

	cveRecord := &defs.CVERecord{}

	err := json.Unmarshal([]byte(response), &cveRecord)

	if err != nil {
		return nil, err
	}

	return cveRecord, nil
}
