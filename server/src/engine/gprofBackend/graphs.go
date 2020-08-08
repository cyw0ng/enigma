package gprofBackend

import (
	"encoding/json"
	"enigma/server/src/common/defs"
	"github.com/minio/minio-go/v6"
	"strings"
)

func UpdateGraphModelToMinio(G *defs.Global, graphModelV1 *defs.GraphObjectModelV1) error {
	mainBucketName := G.Cfg.GetString("conn.minio_main_bucket")
	gprofMinioPath := G.Cfg.GetString("profiles.gprof.minioPath")
	gprofObjJSONFile := gprofMinioPath + "/" + graphModelV1.ProjectID + ".json"

	json, err := json.Marshal(graphModelV1)
	if err != nil {
		return err
	}

	jsonReader := strings.NewReader(string(json))

	if _, err := G.OBS.StatObject(mainBucketName, gprofObjJSONFile, minio.StatObjectOptions{}); err != nil {
		if _, err := G.OBS.PutObject(
			mainBucketName, gprofObjJSONFile,
			jsonReader, jsonReader.Size(),
			minio.PutObjectOptions{}); err != nil {
			return err
		}
	}
	return nil
}