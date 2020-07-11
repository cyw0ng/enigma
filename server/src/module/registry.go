package module

import (
	"enigma/server/src/common/defs"
	attack_gprof "enigma/server/src/module/attack-gprof"
	cve_query "enigma/server/src/module/cve-query"
)

func RegModules(G *defs.Global) {
	G.Log.Info("modules: start init...")

	G.Log.Info("modules: init cve_query")
	if cve_query.RegCVEQuery(G) != nil {
		G.Log.Error("modules: init cve_query failed")
	}

	G.Log.Info("modules: init attack_gprof")
	if attack_gprof.RegAttackGProf(G) != nil {
		G.Log.Error("modules: init attack_gprof failed")
	}

	G.Log.Info("modules: all modules init done...")
}
