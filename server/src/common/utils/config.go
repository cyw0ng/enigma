package utils

import (
	"github.com/spf13/viper"
	"os"
	"regexp"
	"strings"
)

func InitConfigRegistry() (*viper.Viper, error) {
	v := viper.New()

	v.SetConfigFile("./config.json")
	if err := v.ReadInConfig(); err != nil {
		return nil, err
	}

	for _, key := range v.AllKeys() {
		value := v.GetString(key)
		matched, err := regexp.MatchString(`ENV:.*`, value)
		if err != nil || !matched {
			continue
		}
		envKey := strings.Split(value, ":")[1]
		v.Set(key, os.Getenv(envKey))
	}

	return v, nil
}
