package cmds

import (
	"os/exec"
)

func CurlHTTPSRequest(url string) string {
	cmd := exec.Command("curl", url)
	stdout, err := cmd.Output()

	if err != nil {
		return ""
	}

	return string(stdout)
}
