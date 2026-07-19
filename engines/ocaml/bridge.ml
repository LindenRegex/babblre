let esc s =
  let b = Buffer.create (String.length s) in
  String.iter (fun c -> match c with
    | '"' -> Buffer.add_string b "\\\""
    | '\\' -> Buffer.add_string b "\\\\"
    | '\n' -> Buffer.add_string b "\\n"
    | '\r' -> Buffer.add_string b "\\r"
    | '\t' -> Buffer.add_string b "\\t"
    | c when Char.code c < 32 -> Buffer.add_string b (Printf.sprintf "\\u%04x" (Char.code c))
    | c -> Buffer.add_char b c) s;
  Buffer.contents b

let nomatch = "{\"matched\":false,\"groups\":[]}"
let err m = Printf.sprintf "{\"error\":\"%s\"}" (esc m)

let re_match_with mk pat inp =
  try
    let re = Re.compile (mk pat) in
    (match Re.exec_opt re inp with
     | None -> nomatch
     | Some g ->
       let offs = Re.Group.all_offset g in
       let parts = Array.to_list offs |> List.map
         (fun (s,e) -> if s < 0 then "null" else Printf.sprintf "[%d,%d]" s e) in
       Printf.sprintf "{\"matched\":true,\"groups\":[%s]}" (String.concat "," parts))
  with e -> err (Printexc.to_string e)

let str_match pat inp =
  try
    let re = Str.regexp pat in
    (try let _ = Str.search_forward re inp 0 in
       Printf.sprintf "{\"matched\":true,\"groups\":[[%d,%d]]}" (Str.match_beginning ()) (Str.match_end ())
     with Not_found -> nomatch)
  with e -> err (Printexc.to_string e)

(* full_match returns a capture register array, -1 is an unmatched group *)
let regelk_match pat inp =
  try
    let raw = Regex_parser.main Regex_lexer.token (Lexing.from_string pat) in
    if not (Regex.regex_wf raw) then err "invalid pattern" else
    let module I = Interpreter.Interpreter(Regs.List_Regs) in
    match I.full_match raw inp with
    | None -> nomatch
    | Some a ->
      (* RegElk matches lookbehinds right-to-left, so their capture registers arrive reversed *)
      let g i = let s = a.(2*i) and e = a.(2*i+1) in
        if s < 0 || e < 0 then "null" else Printf.sprintf "[%d,%d]" (min s e) (max s e) in
      Printf.sprintf "{\"matched\":true,\"groups\":[%s]}"
        (String.concat "," (List.init (Array.length a / 2) g))
  with e -> err (Printexc.to_string e)

let dispatch id pat inp = match id with
  | "ocaml-re"       -> re_match_with Re.Pcre.re pat inp
  | "ocaml-str"      -> str_match pat inp
  | "ocaml-re-posix" -> re_match_with (fun p -> Re.longest (Re.Posix.re p)) pat inp
  | "ocaml-re-longest"  -> re_match_with (fun p -> Re.longest (Re.Pcre.re p)) pat inp
  | "ocaml-re-shortest" -> re_match_with (fun p -> Re.shortest (Re.Pcre.re p)) pat inp
  | "ocaml-re-emacs" -> re_match_with Re.Emacs.re pat inp
  | "regelk"         -> regelk_match pat inp
  | _ -> err "unknown engine"

open Js_of_ocaml
let () =
  Js.Unsafe.set Js.Unsafe.global "ocamlMatch"
    (Js.wrap_callback (fun id pat inp ->
       Js.string (dispatch (Js.to_string id) (Js.to_string pat) (Js.to_string inp))))
