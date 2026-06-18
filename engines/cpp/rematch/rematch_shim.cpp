// C-ABI shim over REmatch's C++ API, kept in its own TU because REmatch's <REmatch/span.hpp>
// defines a global `Span` that clashes with registry.h's Span. engine.cpp talks only to this.
#include <REmatch/REmatch.hpp>
#include <cstring>
#include <string>

static void copyErr(char* err, int cap, const char* what) {
  if (err && cap > 0) { std::strncpy(err, what, cap - 1); err[cap - 1] = '\0'; }
}

extern "C" int rematch_match(const char* pat, const char* input, int* span, char* err, int errcap) {
  try {
    REmatch::Query q = REmatch::reql(std::string("!m{") + pat + "}");
    REmatch::Match m = q.findone(input);          // leftmost match; throws if none
    auto sp = m.span("m");                         // [start,end) byte offsets
    span[0] = (int)sp.first;
    span[1] = (int)sp.second;
    return 1;
  } catch (const REmatch::QuerySyntaxException& e) { copyErr(err, errcap, e.what()); return -1; }
  catch (const REmatch::ComplexQueryException& e)         { copyErr(err, errcap, e.what()); return -3; }
  catch (const REmatch::MemoryLimitExceededException& e)  { copyErr(err, errcap, e.what()); return -3; }
  catch (const REmatch::EvaluationException& e)    { copyErr(err, errcap, e.what()); return -2; }
  catch (const REmatch::REmatchException&)         { return 0; }   // base type == "No match found"
  catch (const std::exception& e)                  { copyErr(err, errcap, e.what()); return -2; }
}
