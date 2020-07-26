package utils

import "os"

func IsDevEnv() bool {
	envValue, exists := os.LookupEnv("ENIGMA_DEV")

	return exists && len(envValue) != 0
}
