use crate::EngineError;
use resharp::Error;
pub const INFO: &str = crate::info!("resharp-rs", "RE# / Rust", "symbolic derivatives", "linear", "0.6", "https://github.com/ieviev/resharp");

fn tag(e: Error) -> EngineError {
    match e {
        Error::PatternTooLarge | Error::CapacityExceeded => EngineError::Limit(e.to_string()),
        _ => EngineError::Message(e.to_string()),
    }
}

pub fn run(pat: &str, inp: &str) -> crate::MatchRes {
    match resharp::Regex::new(pat) {
        Err(e) => Err(tag(e)),
        Ok(re) => match re.find_all(inp.as_bytes()) {
            Err(e) => Err(tag(e)),
            Ok(ms) => match ms.into_iter().next() {
                None => Ok(None),
                Some(r) => Ok(Some(vec![Some((r.start, r.end))])),
            },
        },
    }
}
