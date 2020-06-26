package main

import (
	"database/sql"
	"enigma/server/src/common/conns"
	"enigma/server/src/common/utils"
	"enigma/server/src/model"
	"fmt"
	"github.com/spf13/viper"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var GConfig *viper.Viper
var GMySQLConn *sql.DB

func main() {
	GConfig, err := utils.InitConfigRegistry()
	if err != nil {
		log.Fatal("error: wrong config")
	}

	GMySQLConn, err := conns.InitMySQLConn(GConfig.GetString("conn.mysql_conn_str"))
	if err != nil {
		log.Fatal("error: cannot connect to database")
	}

	fmt.Print(model.GetAllTables(GMySQLConn, GConfig.GetString("conn.mysql_main_schema")))

	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.GET("/", hello)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}

// Handler
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
