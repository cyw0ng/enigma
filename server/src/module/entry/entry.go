package entry

import (
	"enigma/server/src/common/conns"
	"enigma/server/src/common/defs"
	"enigma/server/src/common/utils"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/zap"
	"log"
)

func InitServer(G *defs.Global) {
	initLog(G)
	initCfg(G)
	initDBConn(G)
	initEcho(G)
}

func initLog(G *defs.Global) {
	if logger, err := zap.NewProduction(); err != nil {
		log.Fatal("cannot init logger, abort")
	} else {
		sugar := logger.Sugar()
		G.Log = sugar
		G.Log.Info("init stage 1: G.Log ready")
	}
}

func initCfg(G *defs.Global) {
	GConfig, err := utils.InitConfigRegistry()
	if err != nil {
		G.Log.Fatal("error: wrong config")
	}

	G.Cfg = GConfig
	G.Log.Info("init stage 2: G.Config ready")
}

func initDBConn(G *defs.Global) {
	GMySQLConn, err := conns.InitMySQLConn(G.Cfg.GetString("conn.mysql_conn_str"))
	if err != nil {
		G.Log.Fatal("error: cannot connect to database")
	}

	G.DBConn = GMySQLConn
	G.Log.Info("init stage 2: G.DBConn ready")
}

func initEcho(G *defs.Global) {
	GEcho := echo.New()

	// Middleware
	GEcho.Use(middleware.Logger())
	GEcho.Use(middleware.Recover())
	GEcho.Use(middleware.CORS())

	G.Echo = GEcho
	G.Log.Info("init stage 2: G.Echo ready")
}