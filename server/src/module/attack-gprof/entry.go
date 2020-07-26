package attack_gprof

import "enigma/server/src/common/defs"

var G *defs.Global

func RegAttackGProf(GStub *defs.Global) error {
	G = GStub

	missList, err := getMissedGProfTableList(G)
	if len(missList) != 0 || err != nil {
		isTablesCreated, err := createGProfTables(G, missList)
		if !isTablesCreated || err != nil {
			return err
		}
	}

	if err = insertDemoIfNotExist(G); err != nil {
		return err
	}

	if err = createPathForGProf(G); err != nil {
		return err
	}

	G.Echo.GET(REST_GET_PROJECT_LIST, getProjectListHandler)

	return nil
}
