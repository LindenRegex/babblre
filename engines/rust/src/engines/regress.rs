use crate::MatchRes;
pub const INFO: &str = crate::info!("regress", "regress", "ECMAScript", "ECMAScript", "0.11", "https://github.com/ridiculousfish/regress");
pub const INFO_U: &str = crate::info!("regress-u", "regress / u", "ECMAScript, unicode", "ECMAScript", "0.11", "https://github.com/ridiculousfish/regress");
pub const INFO_V: &str = crate::info!("regress-v", "regress / v", "ECMAScript, unicodeSets", "ECMAScript", "0.11", "https://github.com/ridiculousfish/regress");

fn run_flags(pat: &str, inp: &str, flags: &str) -> MatchRes {
    match regress::Regex::with_flags(pat, flags) {
        Err(e) => Err(e.to_string().into()),
        Ok(re) => match re.find(inp) {
            None => Ok(None),
            Some(m) => Ok(Some(m.groups().map(|g| g.map(|r| (r.start, r.end))).collect())),
        },
    }
}

pub fn run(pat: &str, inp: &str) -> MatchRes { run_flags(pat, inp, "") }
pub fn run_u(pat: &str, inp: &str) -> MatchRes { run_flags(pat, inp, "u") }
pub fn run_v(pat: &str, inp: &str) -> MatchRes { run_flags(pat, inp, "v") }
