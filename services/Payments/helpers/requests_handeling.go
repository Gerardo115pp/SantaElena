package helpers

import (
	"context"
	"fmt"
	"strings"
)

func AddQueryParamToURL(url string, param_name string, param_value string) (new_url string) {
	new_url = url

	if url == "" || param_name == "" || param_value == "" {
		return
	}

	var base_url string
	var existing_query_params string

	url_fragments := strings.Split(url, "?")

	base_url = url_fragments[0]
	if len(url_fragments) > 1 {
		existing_query_params = url_fragments[1]
	}

	return fmt.Sprintf("%s?%s=%s&%s", base_url, param_name, param_value, existing_query_params)
}

func GetStringFromContext(ctx context.Context, key string) (value string, err error) {
	value_interface := ctx.Value(key)

	if value_interface == nil {
		return "", fmt.Errorf("Value not found in context")
	}

	value, ok := value_interface.(string)
	if !ok {
		return "", fmt.Errorf("Value is not a string")
	}

	return value, nil
}
