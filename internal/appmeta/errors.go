package appmeta

import (
	"errors"

	"github.com/tarkiman/taros/internal/quicklinks"
)

// invalidError marks validation failures owned by this package (bad
// project name, cap reached) — same role as quicklinks' invalidInputError;
// quicklinks' own validation errors pass through untouched and are
// recognised via quicklinks.IsInvalid.
type invalidError struct {
	code, msg string
	params    map[string]any
}

func (e *invalidError) Error() string { return e.msg }

func invalid(code, msg string, params map[string]any) error {
	return &invalidError{code: code, msg: msg, params: params}
}

// CodeAndParams extracts a translatable (code, params) pair from any
// validation error this package can return — its own or quicklinks'.
func CodeAndParams(err error) (code string, params map[string]any, ok bool) {
	var e *invalidError
	if errors.As(err, &e) {
		return e.code, e.params, true
	}
	return quicklinks.CodeAndParams(err)
}
