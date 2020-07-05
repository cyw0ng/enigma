package cveBackend

import (
	"encoding/json"
	"enigma/server/src/common/cmds"
	"enigma/server/src/common/defs"
	"strings"
)

func GetProductlist(G *defs.Global, vendor string) (*defs.CVEBrowse, error) {
	return getProductlistFromHTTPS(vendor)
}

func getProductlistFromHTTPS(vendor string) (*defs.CVEBrowse, error) {
	url := strings.Replace(defs.GetProductlistHTTPS, "vendor", vendor, -1)
	response := cmds.CurlHttpsRequest(url)

	productlist := &defs.CVEBrowse{}

	err := json.Unmarshal([]byte(response), &productlist)

	if err == nil {
		return nil, err
	}

	return productlist, nil
}
