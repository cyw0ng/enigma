package conns

import "database/sql"
import _ "github.com/go-sql-driver/mysql"

func InitMySQLConn(conn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", conn)
	if err != nil {
		return nil, err
	}

	return db, nil
}
