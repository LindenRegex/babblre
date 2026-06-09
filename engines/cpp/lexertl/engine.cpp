#include "../registry.h"
#include <lexertl/generator.hpp>
#include <lexertl/lookup.hpp>
namespace {
EngineResult run(const std::string& pat, const std::string& in) {
  return guard([&] {
    lexertl::rules rules;
    rules.push(pat, 1);
    lexertl::state_machine sm;
    lexertl::generator::build(rules, sm);
    lexertl::smatch results(in.cbegin(), in.cend());
    lexertl::lookup(sm, results);
    return results.id == 1
      ? group0((int)(results.first - in.cbegin()), (int)(results.second - in.cbegin()))
      : noMatch();
  });
}
}
REGISTER("lexertl", "lexertl17", "DFA lexer (anchored, group-0)", "linear", "", "https://github.com/BenHanson/lexertl17", run);
