package defs

import (
	"database/sql"
	"github.com/labstack/echo/v4"
	"github.com/minio/minio-go/v6"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"time"
)

type Global struct {
	Cfg    *viper.Viper
	DBConn *sql.DB
	Echo   *echo.Echo
	Log    *zap.SugaredLogger
	OBS *minio.Client
	Tmp TmpPath
}

type TmpFile struct {
	fileName     string
	fileMaskName string
	createDate   time.Time
}

type TmpPath struct {
	Path string
	filelist []TmpFile
}