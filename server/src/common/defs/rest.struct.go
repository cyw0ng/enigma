package defs

type HttpResponse struct {
	Code    int32       `json:"code"`
	Msg     string      `json:"msg"`
	Payload interface{} `json:"payload"`
}

func SuccessResponse(payload interface{}) HttpResponse {
	return HttpResponse{
		Code:    0,
		Msg:     "success",
		Payload: payload,
	}
}