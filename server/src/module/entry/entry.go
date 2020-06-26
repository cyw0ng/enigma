package entry

import (
	"enigma/server/src/common/conns"
	"enigma/server/src/common/defs"
	"enigma/server/src/common/utils"
	"log"
)

func InitServer(G *defs.Global) {
	GConfig, err := utils.InitConfigRegistry()
	if err != nil {
		log.Fatal("error: wrong config")
	}

	GMySQLConn, err := conns.InitMySQLConn(GConfig.GetString("conn.mysql_conn_str"))
	if err != nil {
		log.Fatal("error: cannot connect to database")
	}

	G.Cfg = GConfig
	G.DBConn = GMySQLConn
}