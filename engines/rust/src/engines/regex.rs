use crate::EngineError;
pub const INFO: &str = crate::info!("rust-regex", "rust regex", "leftmost", "linear", "1.13", "https://github.com/rust-lang/regex");

fn tag(e: regex::Error) -> EngineError {
    match e {
        regex::Error::CompiledTooBig(_) => EngineError::Limit(e.to_string()),
        _ => EngineError::Message(e.to_string()),
    }
}

pub fn run(pat: &str, inp: &str) -> crate::MatchRes {
    run_built(&mut regex::RegexBuilder::new(pat), inp)
}

pub const INFO_ASCII: &str = crate::info!("rust-regex-ascii", "rust regex / ASCII", "leftmost, unicode(false)", "linear", "1.13", "https://github.com/rust-lang/regex");
pub const INFO_SWAP: &str = crate::info!("rust-regex-swap", "rust regex / swap-greed", "leftmost, greediness swapped", "linear", "1.13", "https://github.com/rust-lang/regex");

fn run_built(b: &mut regex::RegexBuilder, inp: &str) -> crate::MatchRes {
    match b.build() {
        Err(e) => Err(tag(e)),
        Ok(re) => match re.captures(inp) {
            None => Ok(None),
            Some(c) => Ok(Some(crate::captures_spans!(c))),
        },
    }
}

pub fn run_ascii(pat: &str, inp: &str) -> crate::MatchRes {
    run_built(regex::RegexBuilder::new(pat).unicode(false), inp)
}

pub fn run_swap(pat: &str, inp: &str) -> crate::MatchRes {
    run_built(regex::RegexBuilder::new(pat).swap_greed(true), inp)
}
