package gprofBackend

import (
	"database/sql"
	"enigma/server/src/common/defs"
	"fmt"
)

func GetProjectList(G *defs.Global) ([]defs.GProfProject, error) {
	var projectlist []defs.GProfProject
	selectQuery := "SELECT * FROM enigma.gprofprojects;"

	selectResult, err := G.DBConn.Query(selectQuery)
	if err != nil {
		return projectlist, err
	}

	var project defs.GProfProject
	var id string
	for selectResult.Next() {
		if err = selectResult.Scan(&id, &project.ProjectId, &project.Name, &project.CreatedTime, &project.LastModifiedTime, &project.IsReadOnly, &project.Namespace); err != nil {
			return projectlist, err
		}

		projectlist = append(projectlist, project)
	}

	return projectlist, nil
}

func GetProjectByProjectID(DBConn *sql.DB, ID string) (defs.GProfProject, error) {
	selectQueryFmt := "SELECT * FROM enigma.gprofprojects WHERE projectId = '%s';"
	selectQuery := fmt.Sprintf(selectQueryFmt, ID)
	var project defs.GProfProject

	selectResult, err := DBConn.Query(selectQuery)
	if err != nil {
		return project, err
	}
	var id string
	for selectResult.Next() {
		if err = selectResult.Scan(&id, &project.ProjectId, &project.Name, &project.CreatedTime, &project.LastModifiedTime, &project.IsReadOnly, &project.Namespace); err != nil {
			return project, err
		}
	}

	return project, nil
}

func InsertProjectToDB(DBConn *sql.DB, project defs.GProfProject) error {
	insertQueryFmt := "INSERT IGNORE INTO enigma.gprofprojects (projectId, name, created_time, last_modified_time, is_readonly, namespace) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')"
	insertQuery := fmt.Sprintf(insertQueryFmt, project.ProjectId, project.Name, project.CreatedTime, project.LastModifiedTime, project.IsReadOnly, project.Namespace)

	_, err := DBConn.Query(insertQuery)

	return err
}
