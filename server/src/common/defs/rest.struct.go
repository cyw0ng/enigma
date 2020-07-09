package defs

/**
 * TBD: Fixing later to populate failed types
 */
const (
	REST_CODE_SUCCESS = 0
	REST_CODE_GENERIC_FAILED = 1
)

type HttpResponse struct {
	Code    int32       `json:"code"`
	Msg     string      `json:"msg"`
	Payload interface{} `json:"payload"`
}

func SuccessResponse(payload interface{}) HttpResponse {
	return HttpResponse{
		Code:    REST_CODE_SUCCESS,
		Msg:     "success",
		Payload: payload,
	}
}
