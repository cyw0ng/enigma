package attack_gprof

import (
	"enigma/server/src/common/defs"
	"enigma/server/src/engine/gprofBackend"
	"github.com/labstack/echo/v4"
	"net/http"
)

func getProjectListHandler(c echo.Context) error {
	projectlist, err := gprofBackend.GetProjectList(G)
	if err == nil {
		return c.JSON(http.StatusOK, defs.SuccessResponse(projectlist))
	}

	return c.JSON(http.StatusOK, defs.HTTPResponse{
		Code:    defs.REST_CODE_GENERIC_FAILED,
		Msg:     "cannot get project list",
		Payload: nil,
	})
}
