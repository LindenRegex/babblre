#include "../registry.h"
#include <vector>
extern "C" {
#include <sregex/sregex.h>
}
namespace {
EngineResult pike(const std::string& pat, const std::string& in) {
  sre_pool_t* pp = sre_create_pool(1024);
  sre_uint_t ncaps = 0; sre_int_t err = -1;
  sre_regex_t* re = sre_regex_parse(pp, (sre_char*)pat.c_str(), &ncaps, 0, &err);
  if (!re) { sre_destroy_pool(pp); return matchError("parse error"); }
  sre_pool_t* cp = sre_create_pool(1024);
  sre_program_t* prog = sre_regex_compile(cp, re);
  if (!prog) { sre_destroy_pool(cp); sre_destroy_pool(pp); return matchError("compile error"); }
  std::vector<sre_int_t> ov(2 * (ncaps + 1), -1);
  sre_pool_t* xp = sre_create_pool(1024);
  sre_vm_pike_ctx_t* ctx = sre_vm_pike_create_ctx(xp, prog, ov.data(), ov.size() * sizeof(sre_int_t));
  sre_int_t* pend = nullptr;
  EngineResult r;
  if (sre_vm_pike_exec(ctx, (sre_char*)in.c_str(), in.size(), 1, &pend) == SRE_OK)
    r = okN((int)ncaps + 1, [&](int g){ return spanOff(ov[2*g], ov[2*g+1]); });
  else r = noMatch();
  sre_destroy_pool(xp); sre_destroy_pool(cp); sre_destroy_pool(pp);
  return r;
}
EngineResult thompson(const std::string& pat, const std::string& in) {
  sre_pool_t* pp = sre_create_pool(1024);
  sre_uint_t ncaps = 0; sre_int_t err = -1;
  sre_regex_t* re = sre_regex_parse(pp, (sre_char*)pat.c_str(), &ncaps, 0, &err);
  if (!re) { sre_destroy_pool(pp); return matchError("parse error"); }
  sre_pool_t* cp = sre_create_pool(1024);
  sre_program_t* prog = sre_regex_compile(cp, re);
  if (!prog) { sre_destroy_pool(cp); sre_destroy_pool(pp); return matchError("compile error"); }
  sre_pool_t* xp = sre_create_pool(1024);
  sre_vm_thompson_ctx_t* ctx = sre_vm_thompson_create_ctx(xp, prog);
  bool m = (sre_vm_thompson_exec(ctx, (sre_char*)in.c_str(), in.size(), 1) == SRE_OK);
  sre_destroy_pool(xp); sre_destroy_pool(cp); sre_destroy_pool(pp);
  return yesNo(m);
}
}
REGISTER("sregex-pike", "sregex / Pike VM", "linear", "linear", "", "https://github.com/openresty/sregex", pike);
REGISTER("sregex-thompson", "sregex / Thompson", "linear", "linear", "", "https://github.com/openresty/sregex", thompson);
