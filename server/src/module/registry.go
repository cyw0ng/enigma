package module

import (
	"enigma/server/src/common/defs"
	cve_query "enigma/server/src/module/cve-query"
)

func RegModules(G *defs.Global) {
	G.Log.Info("modules: start init...")

	G.Log.Info("modules: init cve_query")
	cve_query.RegCVEQuery(G)

	G.Log.Info("modules: all modules init done...")
}
