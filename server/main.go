package main

import (
	"enigma/server/src/common/defs"
	"enigma/server/src/model"
	"enigma/server/src/module/entry"
)

var G defs.Global

func main() {
	entry.InitServer(&G)

	G.Log.Info(model.GetAllTables(G.DBConn, G.Cfg.GetString("conn.mysql_main_schema")))
}