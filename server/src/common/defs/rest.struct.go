package defs

type HttpResponse struct {
	Code    int32       `json:"code"`
	Msg     string      `json:"msg"`
	Payload interface{} `json:"payload"`
}