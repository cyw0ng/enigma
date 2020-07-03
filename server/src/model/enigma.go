package model

import (
	"database/sql"
	"fmt"
)
import _ "github.com/go-sql-driver/mysql"

func GetAllTables(db *sql.DB, schema string) ([]string, error) {
	query := fmt.Sprintf("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='%s'", schema)
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}

	var tablelist []string
	for rows.Next() {
		var table string
		err := rows.Scan(&table)
		if err != nil {
			return nil, err
		}

		tablelist = append(tablelist, table)
	}

	return tablelist, nil
}
