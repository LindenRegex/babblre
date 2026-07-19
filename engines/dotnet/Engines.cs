using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Runtime.InteropServices.JavaScript;

public partial class Engines
{
    static string Esc(string s) => JsonEncodedText.Encode(s).ToString();

    [JSExport] internal static string Match(string id, string pat, string input)
    {
        try
        {
            RegexOptions opts;
            switch (id)
            {
                case "dotnet-bt":   opts = RegexOptions.None; break;
                case "dotnet-ecma": opts = RegexOptions.ECMAScript; break;
                case "dotnet-nb":   opts = RegexOptions.NonBacktracking; break;
                case "dotnet-rtl":  opts = RegexOptions.RightToLeft; break;
                default:            return MatchResharp(pat, input);
            }
            var re = new Regex(pat, opts);
            var m = re.Match(input);
            if (!m.Success) return "{\"matched\":false,\"groups\":[]}";
            var sb = new StringBuilder("{\"matched\":true,\"groups\":[");
            foreach (int g in re.GetGroupNumbers())
            {
                var grp = m.Groups[g];
                if (sb[sb.Length - 1] != '[') sb.Append(',');
                if (grp.Success) sb.Append('[').Append(grp.Index).Append(',').Append(grp.Index + grp.Length).Append(']');
                else sb.Append("null");
            }
            return sb.Append("]}").ToString();
        }
        catch (System.Exception ex)
        {
            return $"{{\"error\":\"{Esc(ex.Message)}\"}}";
        }
    }

    static string MatchResharp(string pat, string input)
    {
        var re = new Resharp.Regex(pat);
        foreach (var m in re.Matches(input))
            return "{\"matched\":true,\"groups\":[[" + m.Index + "," + (m.Index + m.Length) + "]]}";
        return "{\"matched\":false,\"groups\":[]}";
    }

    public static void Main() { }
}
