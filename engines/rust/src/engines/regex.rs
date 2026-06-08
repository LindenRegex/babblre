use crate::EngineError;
pub const INFO: &str = crate::info!("rust-regex", "rust regex", "leftmost", "linear", "1.13", "https://github.com/rust-lang/regex");

fn tag(e: regex::Error) -> EngineError {
    match e {
        regex::Error::CompiledTooBig(_) => EngineError::Limit(e.to_string()),
        _ => EngineError::Message(e.to_string()),
    }
}

pub fn run(pat: &str, inp: &str) -> crate::MatchRes {
    match regex::Regex::new(pat) {
        Err(e) => Err(tag(e)),
        Ok(re) => match re.captures(inp) {
            None => Ok(None),
            Some(c) => Ok(Some(crate::captures_spans!(c))),
        },
    }
}
