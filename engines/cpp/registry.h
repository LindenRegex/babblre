#pragma once
#include <string>
#include <vector>

struct Span { int start; int end; bool matched; };          // matched=false => null group
struct EngineResult { bool ok; bool matched; std::string error; std::vector<Span> groups; bool yesno; bool limit; };
struct EngineInfo { const char* id; const char* name; const char* flavor; const char* family; const char* version; const char* url; };
typedef EngineResult (*RunFn)(const std::string&, const std::string&);
struct Engine { EngineInfo info; RunFn run; };

inline EngineResult ok(std::vector<Span> groups)     { return { true, true, "", std::move(groups), false }; }
inline EngineResult noMatch()                        { return { true, false, "", {}, false }; }
inline EngineResult group0(int s, int e)             { return ok({ { s, e, true } }); }
inline EngineResult yesNo(bool m)                    { return { true, m, "", {}, true }; }
inline EngineResult badPattern(const std::string& m) { return { false, false, "invalid pattern: " + m, {}, false }; }
inline EngineResult matchError(const std::string& m) { return { false, false, m, {}, false }; }
inline EngineResult limitError(const std::string& m) { return { false, false, m, {}, false, true }; }

inline Span unmatched() { return { -1, -1, false }; }
template <class P> Span spanPtr(P s, P e, P base)     // null start/end => unmatched
  { return (s && e) ? Span{ (int)(s - base), (int)(e - base), true } : unmatched(); }
inline Span spanOff(long s, long e)                   // negative start => unmatched
  { return s < 0 ? unmatched() : Span{ (int)s, (int)e, true }; }
template <class F> EngineResult okN(int n, F f) {
  std::vector<Span> gs; gs.reserve(n);
  for (int i = 0; i < n; ++i) gs.push_back(f(i));
  return ok(std::move(gs));
}
template <class M> EngineResult okSmatch(const M& m) {
  return okN((int)m.size(), [&](int i) {
    return m[i].matched ? Span{ (int)m.position(i), (int)(m.position(i) + m[i].length()), true } : unmatched();
  });
}
template <class M> EngineResult okRegmatch(const M& m) {
  return okN((int)m.size(), [&](int i) { return spanOff(m[i].rm_so, m[i].rm_eo); });
}
template <class F> EngineResult guard(F f) {
  try { return f(); }
  catch (const std::exception& e) { return matchError(e.what()); }
  catch (...) { return matchError("error"); }
}
template <class Regex, class Match, class Flag>
EngineResult reSearch(const std::string& p, const std::string& s, Flag fl) {
  return guard([&] { Regex re(p, fl); Match m;
    return regex_search(s, m, re) ? okSmatch(m) : noMatch(); });
}
template <class F> struct Finally { F f; ~Finally() { f(); } };
template <class F> Finally<F> finally(F f) { return Finally<F>{ f }; }

std::vector<Engine>& registry();
struct Reg { Reg(EngineInfo info, RunFn run); };
#define RX_CAT2(a, b) a##b
#define RX_CAT(a, b) RX_CAT2(a, b)
#define REGISTER(id, name, flavor, family, version, url, fn) \
  static const Reg RX_CAT(rx_reg_, __LINE__){ EngineInfo{ id, name, flavor, family, version, url }, fn };
