// length-prefixed C ABI: engine_count/info/match + alloc/dealloc, result = [u32 len LE][utf8 bytes].
// Built as a wasm32-wasi reactor (no main runs). Offsets are UTF-8 byte offsets.
#if canImport(WASILibc)
import WASILibc
#elseif canImport(Glibc)
import Glibc
#endif

private func hex4(_ v: UInt32) -> String {
  let h = String(v, radix: 16)
  return String(repeating: "0", count: 4 - h.count) + h
}

private func jsonStr(_ s: String) -> String {
  var out = "\""
  for u in s.unicodeScalars {
    switch u {
    case "\"": out += "\\\""
    case "\\": out += "\\\\"
    case "\n": out += "\\n"
    case "\r": out += "\\r"
    case "\t": out += "\\t"
    default:
      if u.value < 0x20 { out += "\\u" + hex4(u.value) } else { out.unicodeScalars.append(u) }
    }
  }
  return out + "\""
}

private func matchJSON(_ pattern: String, _ input: String) -> String {
  let re: Regex<AnyRegexOutput>
  do { re = try Regex(pattern) } catch { return "{\"error\":\"invalid pattern\"}" }
  do {
    guard let m = try re.firstMatch(in: input) else { return "{\"matched\":false,\"groups\":[]}" }
    let u8 = input.utf8
    var parts: [String] = []
    let out = m.output
    for i in 0..<out.count {
      if let r = out[i].range {
        let s = u8.distance(from: u8.startIndex, to: r.lowerBound)
        let e = u8.distance(from: u8.startIndex, to: r.upperBound)
        parts.append("[\(s),\(e)]")
      } else {
        parts.append("null")
      }
    }
    return "{\"matched\":true,\"groups\":[" + parts.joined(separator: ",") + "]}"
  } catch {
    return "{\"error\":" + jsonStr("\(error)") + "}"
  }
}

nonisolated(unsafe) private var result: UnsafeMutableRawPointer? = nil

private func pack(_ s: String) -> UnsafeMutableRawPointer {
  let bytes = Array(s.utf8); let n = bytes.count
  result = realloc(result, 4 + n)
  let p = result!
  p.storeBytes(of: UInt32(n).littleEndian, as: UInt32.self)
  bytes.withUnsafeBytes { (p + 4).copyMemory(from: $0.baseAddress!, byteCount: n) }
  return p
}

@_cdecl("engine_count")
func engineCount() -> Int32 { return 1 }

@_cdecl("engine_info")
func engineInfo(_ i: Int32) -> UnsafeMutableRawPointer {
  return pack("{\"id\":\"swift-regex\",\"name\":\"Swift Regex\",\"flavor\":\"Perl-like (full submatch)\",\"family\":\"Perl/PCRE\",\"version\":\"\",\"url\":\"https://developer.apple.com/documentation/swift/regex\"}")
}

@_cdecl("engine_match")
func engineMatch(_ i: Int32, _ pp: UnsafePointer<UInt8>, _ pl: Int32, _ ip: UnsafePointer<UInt8>, _ il: Int32) -> UnsafeMutableRawPointer {
  let pat = String(decoding: UnsafeBufferPointer(start: pp, count: Int(pl)), as: UTF8.self)
  let inp = String(decoding: UnsafeBufferPointer(start: ip, count: Int(il)), as: UTF8.self)
  return pack(matchJSON(pat, inp))
}

@_cdecl("alloc")
func allocBuf(_ n: Int32) -> UnsafeMutableRawPointer? { return malloc(Int(n)) }

@_cdecl("dealloc")
func deallocBuf(_ p: UnsafeMutableRawPointer?, _ n: Int32) { free(p) }
