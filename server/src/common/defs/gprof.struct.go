package defs

/**
 * GProf project def
 */
type GProfProject struct {
	ProjectId        string `json:"projectId"`
	Name             string `json:"name"`
	CreatedTime      string `json:"createdTime"`
	LastModifiedTime string `json:"lastModifiedTime"`
	IsReadOnly       bool   `json:"isReadOnly"`
	Namespace        string `json:"namespace"`
}
