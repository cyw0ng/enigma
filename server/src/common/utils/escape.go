package utils

import (
	"html"
)

// TBD: Critical performance hits
func CommonEscape(str string) string {
	escaped := html.EscapeString(str)
	escapedBytesSlice := []byte(escaped)
	resultBytesSlice := []byte("")
	for _, ch := range escapedBytesSlice {
		switch ch {
		case '(':
			fallthrough
		case ')':
			resultBytesSlice = append(resultBytesSlice, '\\')
		}
		resultBytesSlice = append(resultBytesSlice, ch)
	}

	return string(resultBytesSlice)
}
