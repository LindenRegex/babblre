use crate::{EngineError, MatchRes};
use fancy_regex::{Error, RuntimeError};
pub const INFO: &str = crate::info!("fancy-regex", "fancy-regex", "backtracking", "Perl/PCRE", "0.18", "https://github.com/fancy-regex/fancy-regex");

fn tag(e: Error) -> EngineError {
    match e {
        Error::RuntimeError(RuntimeError::StackOverflow | RuntimeError::BacktrackLimitExceeded) =>
            EngineError::Limit(e.to_string()),
        _ => EngineError::Message(e.to_string()),
    }
}

pub fn run(pat: &str, inp: &str) -> MatchRes {
    match fancy_regex::Regex::new(pat) {
        Err(e) => Err(tag(e)),
        Ok(re) => match re.captures(inp) {
            Err(e) => Err(tag(e)),
            Ok(None) => Ok(None),
            Ok(Some(c)) => Ok(Some(crate::captures_spans!(c))),
        },
    }
}
