package main

import (
	"enigma/server/src/common/defs"
	"enigma/server/src/model"
	"enigma/server/src/module"
	"enigma/server/src/module/entry"
)

/**
 * G - Global object
 *
 * G serves as a common module to pass infra objects to modules
 */
var G defs.Global

func main() {
	entry.InitServer(&G)
	module.RegModules(&G)

	G.Log.Info(model.GetAllTables(G.DBConn, G.Cfg.GetString("conn.F")))
	G.Echo.Start(":1323")
}
