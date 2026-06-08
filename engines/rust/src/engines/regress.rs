use crate::MatchRes;
pub const INFO: &str = crate::info!("regress", "regress", "ECMAScript", "ECMAScript", "0.11", "https://github.com/ridiculousfish/regress");
pub fn run(pat: &str, inp: &str) -> MatchRes {
    match regress::Regex::new(pat) {
        Err(e) => Err(e.to_string().into()),
        Ok(re) => match re.find(inp) {
            None => Ok(None),
            Some(m) => Ok(Some(m.groups().map(|g| g.map(|r| (r.start, r.end))).collect())),
        },
    }
}
