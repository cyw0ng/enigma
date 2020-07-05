package cveBackend

import (
	"encoding/json"
	"enigma/server/src/common/cmds"
	"enigma/server/src/common/defs"
	"strings"
)

func GetCVERecordFromID(G *defs.Global, cveId string) (*defs.CVERecord, error) {
	return getCVERecordFromID(G, cveId)
}

func getCVERecordFromID(G *defs.Global, cveId string) (*defs.CVERecord, error) {
	url := strings.Replace(defs.GetCVERecordHTTPS, "cveId", cveId, -1)
	response := cmds.CurlHttpsRequest(url)

	cveRecord := &defs.CVERecord{}

	err := json.Unmarshal([]byte(response), &cveRecord)

	if err != nil {
		return nil, err
	}

	return cveRecord, nil
}
