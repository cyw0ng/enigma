package main

import (
	"enigma/server/src/common/defs"
	"enigma/server/src/model"
	"enigma/server/src/module/entry"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var G defs.Global

func main() {
	entry.InitServer(&G)

	fmt.Print(model.GetAllTables(G.DBConn, G.Cfg.GetString("conn.mysql_main_schema")))

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
