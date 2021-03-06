package entry

import (
	"enigma/server/src/common/conns"
	"enigma/server/src/common/defs"
	"enigma/server/src/common/utils"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/minio/minio-go/v6"
	"go.uber.org/zap"
	"log"
)

func InitServer(G *defs.Global) {
	initLog(G)
	initCfg(G)
	initDBConn(G)
	initEcho(G)
	initOBS(G)
	initTmpPath(G)
}

func initLog(G *defs.Global) {
	logger, err := zap.NewProduction()
	if err != nil {
		log.Fatal("cannot init logger, abort")
	}

	sugar := logger.Sugar()
	G.Log = sugar
	G.Log.Info("init stage 1: G.Log ready")
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

func initOBS(G *defs.Global) {
	getStringFunc := G.Cfg.GetString
	GOBS, err := minio.New(getStringFunc("conn.minio_endpoint"), getStringFunc("conn.minio_access_key"), getStringFunc("conn.minio_secret_key"), false)
	if err != nil {
		G.Log.Fatal("error: cannot init Minio OBS client")
	}

	buckets, err := GOBS.ListBuckets()
	if err != nil {
		G.Log.Fatal("error: cannot init target Minio bucket")
	}
	isBucketExists := false
	mainBucketName := getStringFunc("conn.minio_main_bucket")
	for _, bucket := range buckets {
		isBucketExists = bucket.Name == mainBucketName
	}

	if !isBucketExists {
		if GOBS.MakeBucket(mainBucketName, "") != nil {
			G.Log.Fatal("error: cannot init main bucket")
		}
	}

	if isBucketExists, err = GOBS.BucketExists(mainBucketName); !isBucketExists || err != nil {
		G.Log.Fatal("error: make bucket error")
	}

	G.OBS = GOBS
	G.Log.Info("init stage 2: G.GOBS and main bucket ready")
}

func initTmpPath(G *defs.Global) {
	var GTmp defs.TmpPath
	GTmp.Path = G.Cfg.GetString("runtime.tmpPath")
	if GTmp.Init() != nil {
		G.Log.Fatal("error: fail to make tmpPath")
	} else {
		G.Log.Info("init stage 2: G.Tmp ready with tmp file paths")
	}

	G.Tmp = GTmp
}
