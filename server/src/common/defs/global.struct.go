package defs

import (
	"database/sql"
	"github.com/spf13/viper"
)

type Global struct {
	Cfg *viper.Viper
	DBConn *sql.DB
}
