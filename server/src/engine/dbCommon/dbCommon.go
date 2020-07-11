package dbCommon

import "database/sql"

/**
 * GetTablesNotInEnumList - Get table names not in DB
 */
func GetTablesNotInEnumList(DBConn *sql.DB, testList []string) ([]string, error) {
	fullList, err := GetTablesEnumList(DBConn)

	if err != nil {
		return []string{}, err
	}

	var fullListMap = make(map[string]bool)
	for _, table := range fullList {
		fullListMap[table] = true
	}

	var targetList []string
	for _, testString := range testList {
		if !fullListMap[testString] {
			targetList = append(targetList, testString)
		}
	}

	return targetList, nil
}

/**
 * GetTablesEnumList - Get table names enum
 */
func GetTablesEnumList(DBConn *sql.DB) ([]string, error) {
	var tables []string
	showResult, err := DBConn.Query("SHOW TABLES")
	if err != nil {
		return tables, err
	}

	var table string
	for (showResult.Next()) {
		err = showResult.Scan(&table)
		if err != nil {
			return []string{}, err
		}

		tables = append(tables, table)
	}

	return tables, nil
}