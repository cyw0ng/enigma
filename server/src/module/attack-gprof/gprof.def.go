package attack_gprof

import (
	"enigma/server/src/common/defs"
	"strconv"
	"time"
)

const GPROF_SCEMAS_CFG_PREFIX = "schemas.gprof"

const (
	PROJECT_DEMO_UUID = "0000-0000-0001"
)

var demoGProfProject = defs.GProfProject{
	ProjectId:        PROJECT_DEMO_UUID,
	Name:             "demo",
	CreatedTime:      strconv.FormatInt(time.Now().Unix(), 10) + "000",
	LastModifiedTime: "0",
	IsReadOnly:       false,
	Namespace:        "main",
}
