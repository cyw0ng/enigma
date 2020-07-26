package attack_gprof

import (
	"enigma/server/src/common/defs"
	"enigma/server/src/common/utils"
	"enigma/server/src/engine/dbCommon"
	"enigma/server/src/engine/gprofBackend"
	"errors"
	"github.com/minio/minio-go/v6"
	"io/ioutil"
	"regexp"
	"strings"
)

func getMissedGProfTableList(G *defs.Global) ([]string, error) {
	var gprofSchemas []string
	for _, key := range G.Cfg.AllKeys() {
		if matched, err := regexp.MatchString(GPROF_SCEMAS_CFG_PREFIX, key); err == nil && matched {
			cfgParts := strings.Split(key, ".")
			gprofSchemas = utils.AppendUniqueString(gprofSchemas, cfgParts[len(cfgParts)-2])
		}
	}
	missList, err := dbCommon.GetTablesNotInEnumList(G.DBConn, gprofSchemas)
	if err != nil {
		return []string{}, err
	}

	return missList, nil
}

func createPathForGProf(G *defs.Global) error {
	mainBucketName := G.Cfg.GetString("conn.minio_main_bucket")
	gprofMinioPath := G.Cfg.GetString("profiles.gprof.minioPath")
	gprofLock := gprofMinioPath + "/.lock"

	if _, err := G.OBS.StatObject(mainBucketName, gprofLock, minio.StatObjectOptions{}); err != nil {
		if _, err := G.OBS.PutObject(
			mainBucketName, gprofLock,
			nil, 0,
			minio.PutObjectOptions{}); err != nil {
			return err
		}
	}
	return nil
}

func insertDemoIfNotExist(G *defs.Global) error {
	isDemoExists, err := isDemoProjectExist(G)

	if err != nil {
		return err
	}

	if !isDemoExists {
		err := gprofBackend.InsertProjectToDB(G.DBConn, demoGProfProject)
		if err != nil {
			return err
		}
	}

	return nil
}

func isDemoProjectExist(G *defs.Global) (bool, error) {
	demoProject, err := gprofBackend.GetProjectByProjectID(G.DBConn, PROJECT_DEMO_UUID)
	if err != nil {
		return false, err
	}

	return len(demoProject.ProjectId) != 0, nil
}

func createGProfTables(G *defs.Global, targetLists []string) (bool, error) {
	for _, table := range targetLists {
		createResult, err := createGProfTable(G, table)
		if err != nil || !createResult {
			return false, err
		}
	}
	return true, nil
}

func createGProfTable(G *defs.Global, table string) (bool, error) {
	key := G.Cfg.GetString(joinGProfCfgPath(table))

	if len(key) == 0 {
		return false, errors.New("Cannot get sql path for table: " + table)
	}
	if utils.IsDevEnv() {
		key = "../" + key
	}

	sqlStmts, err := ioutil.ReadFile(key)
	_, err = G.DBConn.Query(string(sqlStmts))
	if err != nil {
		return false, err
	}

	return true, nil
}

func joinGProfCfgPath(table string) string {
	return strings.Join([]string{GPROF_SCEMAS_CFG_PREFIX, table, "path"}, ".")
}
