package main

import (
	"errors"
	"regexp"
	"regexp/syntax"
	"syscall/js"

	"github.com/dlclark/regexp2/v2"
)

var engines = map[string]func(pat, in string) any{"go-regexp": runRE2, "regexp2": runRegexp2, "regexp2-rtl": runRegexp2RTL}

func runRE2(pat, in string) any {
	re, err := regexp.Compile(pat)
	if err != nil {
		var serr *syntax.Error
		if errors.As(err, &serr) && serr.Code == syntax.ErrLarge {
			return map[string]any{"error": err.Error(), "kind": "limit"}
		}
		return map[string]any{"error": err.Error()}
	}
	m := re.FindStringSubmatchIndex(in)
	if m == nil {
		return map[string]any{"matched": false, "groups": []any{}}
	}
	groups := []any{}
	for i := 0; i*2 < len(m); i++ {
		if m[2*i] < 0 {
			groups = append(groups, nil)
		} else {
			groups = append(groups, []any{m[2*i], m[2*i+1]})
		}
	}
	return map[string]any{"matched": true, "groups": groups}
}

func runRegexp2(pat, in string) any    { return runRegexp2Opts(pat, in) }
func runRegexp2RTL(pat, in string) any { return runRegexp2Opts(pat, in, regexp2.RightToLeft) }

func runRegexp2Opts(pat, in string, opts ...regexp2.CompileOption) any {
	re, err := regexp2.Compile(pat, opts...)
	if err != nil {
		return map[string]any{"error": err.Error()}
	}
	m, err := re.FindStringMatch(in)
	if err != nil {
		if errors.Is(err, regexp2.ErrBacktrackingStackLimit) {
			return map[string]any{"error": err.Error(), "kind": "limit"}
		}
		return map[string]any{"error": err.Error()}
	}
	if m == nil {
		return map[string]any{"matched": false, "groups": []any{}}
	}
	groups := []any{}
	for _, g := range m.Groups() {
		if len(g.Captures) == 0 {
			groups = append(groups, nil)
		} else {
			groups = append(groups, []any{g.RuneIndex, g.RuneIndex + g.RuneLength})
		}
	}
	return map[string]any{"matched": true, "groups": groups}
}

func main() {
	js.Global().Set("goEngineMatch", js.FuncOf(func(_ js.Value, a []js.Value) any {
		fn := engines[a[0].String()]
		if fn == nil {
			return map[string]any{"error": "unknown engine"}
		}
		return fn(a[1].String(), a[2].String())
	}))
	select {}
}
