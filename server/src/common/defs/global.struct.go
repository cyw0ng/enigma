package defs

import (
	"database/sql"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

type Global struct {
	Cfg *viper.Viper
	DBConn *sql.DB
	Echo *echo.Echo
	Log *zap.SugaredLogger
}
