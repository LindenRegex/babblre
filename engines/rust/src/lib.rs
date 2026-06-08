use std::alloc::{alloc as ralloc, dealloc as rdealloc, Layout};
mod engines;

pub enum EngineError { Message(String), Limit(String) }
impl From<String> for EngineError { fn from(s: String) -> Self { EngineError::Message(s) } }

pub type MatchRes = Result<Option<Vec<Option<(usize, usize)>>>, EngineError>;
pub struct Engine { pub id: &'static str, pub info: &'static str, pub run: fn(&str, &str) -> MatchRes }

#[macro_export]
macro_rules! info {
    ($id:expr, $name:expr, $flavor:expr, $family:expr, $version:expr, $url:expr) => {
        concat!("{\"id\":\"", $id, "\",\"name\":\"", $name, "\",\"flavor\":\"", $flavor,
                "\",\"family\":\"", $family, "\",\"version\":\"", $version, "\",\"url\":\"", $url, "\"}")
    };
}
#[macro_export]
macro_rules! captures_spans {
    ($c:expr) => { (0..$c.len()).map(|i| $c.get(i).map(|m| (m.start(), m.end()))).collect() };
}
#[macro_export]
macro_rules! regex_api_engine {
    ($krate:ident) => {
        pub fn run(pat: &str, inp: &str) -> $crate::MatchRes {
            match $krate::Regex::new(pat) {
                Err(e) => Err(e.to_string().into()),
                Ok(re) => match re.captures(inp) {
                    None => Ok(None),
                    Some(c) => Ok(Some($crate::captures_spans!(c))),
                },
            }
        }
    };
}

static ENGINES: &[Engine] = &[
    Engine { id: "rust-regex",  info: engines::regex::INFO,      run: engines::regex::run },
    Engine { id: "regex-lite",  info: engines::regex_lite::INFO, run: engines::regex_lite::run },
    Engine { id: "regress",     info: engines::regress::INFO,    run: engines::regress::run },
    Engine { id: "fancy-regex", info: engines::fancy::INFO,      run: engines::fancy::run },
    Engine { id: "resharp-rs",  info: engines::resharp::INFO,    run: engines::resharp::run },
];

#[no_mangle] pub extern "C" fn alloc(len: usize) -> *mut u8 {
    let n = if len == 0 { 1 } else { len };
    unsafe { ralloc(Layout::from_size_align(n, 1).unwrap()) }
}
#[no_mangle] pub unsafe extern "C" fn dealloc(ptr: *mut u8, len: usize) {
    let n = if len == 0 { 1 } else { len };
    if !ptr.is_null() { rdealloc(ptr, Layout::from_size_align(n, 1).unwrap()); }
}

fn esc(s: &str) -> String {
    let mut o = String::new();
    for c in s.chars() {
        match c {
            '"' => o.push_str("\\\""), '\\' => o.push_str("\\\\"),
            '\n' => o.push_str("\\n"), '\r' => o.push_str("\\r"), '\t' => o.push_str("\\t"),
            c if (c as u32) < 0x20 => o.push_str(&format!("\\u{:04x}", c as u32)),
            c => o.push(c),
        }
    }
    o
}
fn build(res: MatchRes) -> String {   // No id/ok fields, protocol.js normalize adds them.
    match res {
        Err(EngineError::Message(e)) => format!("{{\"error\":\"{}\"}}", esc(&e)),
        Err(EngineError::Limit(e)) => format!("{{\"error\":\"{}\",\"kind\":\"limit\"}}", esc(&e)),
        Ok(None) => "{\"matched\":false,\"groups\":[]}".to_string(),
        Ok(Some(gs)) => {
            let g: Vec<String> = gs.iter()
                .map(|o| match o { Some((s, e)) => format!("[{},{}]", s, e), None => "null".to_string() })
                .collect();
            format!("{{\"matched\":true,\"groups\":[{}]}}", g.join(","))
        }
    }
}

static mut RESULT: Vec<u8> = Vec::new();
unsafe fn pack(json: String) -> *const u8 {
    let bytes = json.into_bytes();
    let mut out = Vec::with_capacity(4 + bytes.len());
    out.extend_from_slice(&(bytes.len() as u32).to_le_bytes());
    out.extend_from_slice(&bytes);
    RESULT = out;
    RESULT.as_ptr()
}
unsafe fn read<'a>(pp: *const u8, pl: usize, ip: *const u8, il: usize) -> (&'a str, &'a str) {
    (std::str::from_utf8(std::slice::from_raw_parts(pp, pl)).unwrap_or(""),
     std::str::from_utf8(std::slice::from_raw_parts(ip, il)).unwrap_or(""))
}

#[no_mangle] pub extern "C" fn engine_count() -> usize { ENGINES.len() }
#[no_mangle] pub unsafe extern "C" fn engine_info(i: usize) -> *const u8 { pack(ENGINES[i].info.to_string()) }
#[no_mangle] pub unsafe extern "C" fn engine_match(i: usize, pp: *const u8, pl: usize, ip: *const u8, il: usize) -> *const u8 {
    let (p, s) = read(pp, pl, ip, il);
    pack(build((ENGINES[i].run)(p, s)))
}
