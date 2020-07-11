package attack_gprof

import "enigma/server/src/common/defs"

var G *defs.Global

func RegAttackGProf(GStub *defs.Global) error {
	G = GStub

	missList, err := getMissedGProfTableList(G)
	if len(missList) != 0 || err != nil {
		isTablesCreated ,err := createGProfTables(G, missList)
		if !isTablesCreated || err != nil {
			return err
		}
	}

	isDemoExists, err := isDemoProjExists(G)
	if !isDemoExists || err != nil {
		isDemoAdded, err := addDemoProj(G)
		if !isDemoAdded || err != nil {
			return err
		}
	}

	return nil
}