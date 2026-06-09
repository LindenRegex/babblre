import regex, std/[json, strutils]

proc span(a, b: int): string =
  if a < 0: "null" else: "[" & $a & "," & $(b + 1) & "]"   # match end is inclusive so add 1

proc doMatch(pat, inp: string): string =
  try:
    let re = re2(pat)
    var m: RegexMatch2
    if find(inp, re, m):
      var parts = @[span(m.boundaries.a, m.boundaries.b)]
      for i in 0 ..< m.groupsCount:
        let g = m.group(i)
        parts.add span(g.a, g.b)
      "{\"matched\":true,\"groups\":[" & parts.join(",") & "]}"
    else:
      "{\"matched\":false,\"groups\":[]}"
  except CatchableError as e:
    "{\"error\":" & escapeJson(e.msg) & "}"

proc jsSetGlobal(name: cstring, fn: proc(id, b, c: cstring): cstring) {.importjs: "globalThis[#] = #".}
jsSetGlobal(cstring"nimMatch", proc(id, pat, inp: cstring): cstring =
  cstring(doMatch($pat, $inp)))
