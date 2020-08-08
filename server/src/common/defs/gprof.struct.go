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

/**
 * GraphObjectModelV1 - Graph object
 */
type GraphObjectModelV1 struct {
	Graph        string `json:"graph"`
	Gprof        string `json:"gprof"`
	GprofDigest  string `json:"gprofDigest"`
	ProjectID    string `json:"projectId"`
	ModifiedTime string `json:"modifiedTime"`
	GraphDigest  string `json:"graphDigest"`
}