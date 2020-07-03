package rest

type HttpResponse struct {
	errorCode int32       `json:"code"`
	errorMsg  string      `json:"msg"`
	payload   interface{} `json:"payload"`
}
