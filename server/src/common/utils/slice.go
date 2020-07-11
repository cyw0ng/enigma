package utils

func AppendUniqueString(slice []string, key string) []string {
	for _, ele := range slice {
		if ele == key {
			return slice
		}
	}
	return append(slice, key)
}