package regexbridge;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;
import dk.brics.automaton.RegExp;
import dk.brics.automaton.RunAutomaton;
import dk.brics.automaton.AutomatonMatcher;
import org.teavm.jso.JSExport;
import org.teavm.jso.core.JSString;
import org.teavm.jso.json.JSON;

public class Main {
  public static void main(String[] args) { }

  @JSExport
  public static String engineCount() { return "2"; }

  @JSExport
  public static String engineInfo(int i) {
    // TeaVM substitutes its Harmony-derived java.util.regex for the JDK's; name what actually runs
    if (i == 0)
      return "{\"id\":\"java-util\",\"name\":\"java.util.regex (TeaVM)\",\"flavor\":\"Perl-like; Harmony-derived reimplementation\","
           + "\"family\":\"Perl/PCRE\",\"version\":\"\","
           + "\"url\":\"https://github.com/konsoletyper/teavm\"}";
    return "{\"id\":\"dk-brics\",\"name\":\"dk.brics.automaton\",\"flavor\":\"minimized DFA (group-0)\","
         + "\"family\":\"linear\",\"version\":\"1.12\",\"url\":\"https://www.brics.dk/automaton/\"}";
  }

  @JSExport
  public static String engineMatch(int i, String pattern, String input) {
    return i == 0 ? matchJava(pattern, input) : matchBrics(pattern, input);
  }

  private static String matchBrics(String pattern, String input) {
    try {
      RunAutomaton ra = new RunAutomaton(new RegExp(pattern).toAutomaton());
      AutomatonMatcher m = ra.newMatcher(input);
      if (!m.find()) return "{\"matched\":false,\"groups\":[]}";
      return "{\"matched\":true,\"groups\":[[" + m.start() + "," + m.end() + "]]}";
    } catch (Throwable t) {
      return "{\"error\":\"invalid pattern\"}";
    }
  }

  private static String matchJava(String pattern, String input) {
    try {
      Matcher m = Pattern.compile(pattern).matcher(input);
      if (!m.find()) return "{\"matched\":false,\"groups\":[]}";
      StringBuilder sb = new StringBuilder("{\"matched\":true,\"groups\":[");
      for (int i = 0; i <= m.groupCount(); i++) {
        if (i > 0) sb.append(',');
        int s = m.start(i);
        if (s < 0) sb.append("null"); else sb.append('[').append(s).append(',').append(m.end(i)).append(']');
      }
      return sb.append("]}").toString();
    } catch (PatternSyntaxException e) {
      return "{\"error\":\"invalid pattern\"}";
    } catch (Throwable t) {
      return "{\"error\":" + jsonStr(String.valueOf(t.getMessage() != null ? t.getMessage() : t)) + "}";
    }
  }

  private static String jsonStr(String s) {
    return JSON.stringify(JSString.valueOf(s));
  }
}
