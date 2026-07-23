import functools
import json


def _full(rx, s):
    m = rx.search(s)
    if not m:
        return {"matched": False, "groups": []}
    groups = [(None if m.span(g) == (-1, -1) else list(m.span(g))) for g in range(m.re.groups + 1)]
    return {"matched": True, "groups": groups}

def _bool(matched):
    return {"matched": bool(matched), "bool": True, "groups": []}

@functools.lru_cache(maxsize=64)
def _aut(eid, pat, build):
    return build(pat)

def _m_re(eid, pat, s):           import re;    return _full(re.compile(pat), s)
def _m_regex(eid, pat, s):        import regex; return _full(regex.compile(pat), s)
def _m_regex_posix(eid, pat, s):  import regex; return _full(regex.compile(pat, regex.POSIX), s)
def _m_regex_v1(eid, pat, s):     import regex; return _full(regex.compile(pat, regex.VERSION1), s)

def _b_greenery(p):    from greenery import parse;                            return parse(p).to_fsm()
def _b_interegular(p): import interegular;                                    return interegular.parse_pattern(p).to_fsm()
def _b_automata(p):    from automata.fa.nfa import NFA;                       return NFA.from_regex(p)
def _b_pyformlang(p):  from pyformlang.regular_expression import PythonRegex; return PythonRegex(p).to_epsilon_nfa().to_deterministic()
def _b_fado(p):        # FAdo dialect, + is union
    from FAdo.reex import str2regexp
    try: return str2regexp(p)
    except Exception as e: raise ValueError(str(e).split("\n")[0].strip())  # lark's expected-token list is unordered

_MEMBERSHIP = {
    "greenery":     (_b_greenery,    lambda a, s: a.accepts(s)),
    "interegular":  (_b_interegular, lambda a, s: a.accepts(s)),
    "automata-lib": (_b_automata,    lambda a, s: a.accepts_input(s)),
    "pyformlang":   (_b_pyformlang,  lambda a, s: a.accepts(list(s))),
    "fado":         (_b_fado,        lambda a, s: a.evalWordP(s)),
}
def _membership(build, accept):                        # build/accept are params to avoid late-binding
    return lambda eid, pat, s: _bool(accept(_aut(eid, pat, build), s))

ENGINES = {
    "python-re":          _m_re,
    "python-regex":       _m_regex,
    "python-regex-posix": _m_regex_posix,
    "python-regex-v1":    _m_regex_v1,
    **{eid: _membership(b, a) for eid, (b, a) in _MEMBERSHIP.items()},
}

def engine_match(eid, pat, s):
    fn = ENGINES.get(eid)
    if fn is None:
        return json.dumps({"error": "unknown engine"})
    try:
        return json.dumps(fn(eid, pat, s))
    except (OverflowError, RecursionError) as ex:
        return json.dumps({"error": str(ex), "kind": "limit"})
    except Exception as ex:
        return json.dumps({"error": str(ex)})
