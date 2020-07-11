package attack_gprof

import (
	"enigma/server/src/common/defs"
	"enigma/server/src/common/utils"
	"enigma/server/src/engine/dbCommon"
	"errors"
	"io/ioutil"
	"regexp"
	"strings"
)

func getMissedGProfTableList(G *defs.Global) ([]string, error) {
	var gprofSchemas []string
	for _, key := range G.Cfg.AllKeys() {
		if matched, err := regexp.MatchString(GPROF_SCEMAS_CFG_PREFIX, key); err == nil && matched {
			cfgParts := strings.Split(key, ".")
			gprofSchemas = utils.AppendUniqueString(gprofSchemas, cfgParts[len(cfgParts) - 2])
		}
	}
	missList, err := dbCommon.GetTablesNotInEnumList(G.DBConn, gprofSchemas)
	if err != nil {
		return []string{}, err
	}

	return missList, nil
}

func createGProfTables(G *defs.Global, targetLists []string) (bool, error) {
	for _, table := range targetLists {
		createResult, err := createGProfTable(G, table)
		if err != nil || !createResult {
			return false, err
		}
	}
	return true, nil
}

func createGProfTable(G *defs.Global, table string) (bool, error) {
	key := G.Cfg.GetString(joinGProfCfgPath(table))

	if len(key) == 0 {
		return false, errors.New("Cannot get sql path for table: " + table)
	}
	if utils.IsDevEnv() {
		key = "../" + key
	}

	sqlStmts, err := ioutil.ReadFile(key)
	_, err = G.DBConn.Query(string(sqlStmts))
	if err != nil {
		return false, err
	}

	return true, nil
}

func isDemoProjExists(G *defs.Global) (bool, error) {
	return true, nil
}

func addDemoProj(G *defs.Global) (bool, error) {
	return true, nil
}

func joinGProfCfgPath(table string) string {
	return strings.Join([]string{GPROF_SCEMAS_CFG_PREFIX, table, "path"}, ".")
}