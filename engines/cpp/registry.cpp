#include "registry.h"
#include <emscripten.h>
#include <cstdio>
#include <string>
#include <vector>

std::vector<Engine>& registry() { static std::vector<Engine> r; return r; }
Reg::Reg(EngineInfo info, RunFn run) { registry().push_back(Engine{ info, run }); }

static std::string esc(const std::string& s) {
  std::string o;
  for (char c : s) switch (c) {
    case '"': o += "\\\""; break; case '\\': o += "\\\\"; break;
    case '\n': o += "\\n"; break; case '\r': o += "\\r"; break; case '\t': o += "\\t"; break;
    default: if ((unsigned char)c < 0x20) { char b[8]; std::snprintf(b, sizeof b, "\\u%04x", c); o += b; } else o += c;
  }
  return o;
}
struct Json {
  std::string s = "{"; bool first = true;
  void sep() { if (!first) s += ','; first = false; }
  Json& str(const char* k, const std::string& v) { sep(); s += '"'; s += k; s += "\":\""; s += esc(v); s += '"'; return *this; }
  Json& raw(const char* k, const std::string& v) { sep(); s += '"'; s += k; s += "\":"; s += v; return *this; }
  std::string done() { return s + "}"; }
};
static std::string emit_info(const EngineInfo& i) {
  return Json().str("id", i.id).str("name", i.name).str("flavor", i.flavor)
              .str("family", i.family).str("version", i.version).str("url", i.url).done();
}
static std::string emit_match(const EngineResult& r) {   // id-less, ok-less wire; protocol.js normalize() adds them
  Json j; j.raw("matched", (r.ok && r.matched) ? "true" : "false");
  if (!r.ok) j.str("error", r.error);
  if (r.limit) j.str("kind", "limit");
  if (r.yesno) j.raw("bool", "true");
  std::string g = "[";
  if (r.ok && r.matched)
    for (std::size_t k = 0; k < r.groups.size(); ++k) {
      if (k) g += ",";
      g += r.groups[k].matched ? "[" + std::to_string(r.groups[k].start) + "," + std::to_string(r.groups[k].end) + "]" : "null";
    }
  return j.raw("groups", g + "]").done();
}

static std::string g_out;
extern "C" EMSCRIPTEN_KEEPALIVE int engine_count() { return (int)registry().size(); }
extern "C" EMSCRIPTEN_KEEPALIVE const char* engine_info(int i) { g_out = emit_info(registry()[i].info); return g_out.c_str(); }
extern "C" EMSCRIPTEN_KEEPALIVE const char* engine_match(int i, const char* p, const char* s) {
  g_out = emit_match(registry()[i].run(p, s)); return g_out.c_str();
}
