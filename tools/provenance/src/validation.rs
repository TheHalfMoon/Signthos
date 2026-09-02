use serde_json::{Map, Value};
use std::collections::{BTreeSet, HashSet};
use std::fs;

pub const MAX_RECORD_BYTES: u64 = 1_048_576;
pub const MAX_TOTAL_BYTES: u64 = 4_194_304;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Diagnostic {
    pub path: String,
    pub code: &'static str,
    pub field: String,
    pub message: String,
}

impl Diagnostic {
    fn new(path: &str, code: &'static str, field: impl Into<String>, message: impl Into<String>) -> Self {
        Self { path: path.into(), code, field: field.into(), message: message.into() }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ValidationReport { pub diagnostics: Vec<Diagnostic> }

impl ValidationReport {
    pub fn is_valid(&self) -> bool { self.diagnostics.is_empty() }

    pub fn render_text(&self) -> String {
        self.diagnostics.iter().map(|d| {
            format!("{}: {} [{}]: {}\n", d.path, d.code, d.field, d.message)
        }).collect()
    }

    pub fn render_json(&self) -> String {
        let diagnostics: Vec<Value> = self.diagnostics.iter().map(|d| serde_json::json!({
            "path": d.path, "code": d.code, "field": d.field, "message": d.message
        })).collect();
        serde_json::to_string(&serde_json::json!({
            "valid": self.is_valid(), "diagnostics": diagnostics
        })).expect("diagnostics serialize") + "\n"
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SourceImportRecord { pub id: String, pub destination: String }
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ComponentRegistryRecord { pub ids: Vec<String> }
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PolicyRecord { pub id: String, pub policy_type: String, pub policy_version: u64 }
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum CanonicalRecord {
    SourceImport(SourceImportRecord),
    ComponentRegistry(ComponentRegistryRecord),
    Policy(PolicyRecord),
}

pub fn validate_paths(paths: &[String]) -> Result<ValidationReport, String> {
    let mut total = 0_u64;
    let mut diagnostics = Vec::new();
    let mut records = Vec::new();
    for path in paths {
        let metadata = fs::metadata(path).map_err(|e| format!("IO_METADATA: {path}: {e}"))?;
        if !metadata.is_file() { return Err(format!("IO_NOT_FILE: {path}")); }
        let size = metadata.len();
        if size > MAX_RECORD_BYTES {
            diagnostics.push(Diagnostic::new(path, "SIZE_RECORD", "$",
                format!("{size} bytes exceeds {MAX_RECORD_BYTES}")));
            continue;
        }
        total = total.saturating_add(size);
        if total > MAX_TOTAL_BYTES {
            diagnostics.push(Diagnostic::new(path, "SIZE_TOTAL", "$",
                format!("run exceeds {MAX_TOTAL_BYTES} bytes")));
            break;
        }
        let bytes = fs::read(path).map_err(|e| format!("IO_READ: {path}: {e}"))?;
        match parse_record(path, &bytes) {
            Ok(record) => records.push((path.clone(), record)),
            Err(mut found) => diagnostics.append(&mut found),
        }
    }
    if diagnostics.is_empty() { check_duplicates(&records, &mut diagnostics); }
    sort(&mut diagnostics);
    Ok(ValidationReport { diagnostics })
}

pub fn validate_bytes(path: &str, bytes: &[u8]) -> ValidationReport {
    let mut diagnostics = if bytes.len() as u64 > MAX_RECORD_BYTES {
        vec![Diagnostic::new(path, "SIZE_RECORD", "$", "record exceeds byte limit")]
    } else {
        match parse_record(path, bytes) { Ok(_) => Vec::new(), Err(found) => found }
    };
    sort(&mut diagnostics);
    ValidationReport { diagnostics }
}

fn parse_record(path: &str, bytes: &[u8]) -> Result<CanonicalRecord, Vec<Diagnostic>> {
    let value: Value = serde_json::from_slice(bytes).map_err(|e| vec![
        Diagnostic::new(path, "JSON_SYNTAX", "$", e.to_string())
    ])?;
    let object = value.as_object().ok_or_else(|| vec![
        Diagnostic::new(path, "SCHEMA_TYPE", "$", "record must be an object")
    ])?;
    match object.get("kind").and_then(Value::as_str) {
        Some("source_import") => source_import(path, object).map(CanonicalRecord::SourceImport),
        Some("component_registry") => component_registry(path, object).map(CanonicalRecord::ComponentRegistry),
        Some("policy") => policy(path, object).map(CanonicalRecord::Policy),
        Some(kind) => Err(vec![Diagnostic::new(path, "SCHEMA_KIND", "$.kind",
            format!("unsupported kind `{kind}`"))]),
        None => Err(vec![Diagnostic::new(path, "SCHEMA_REQUIRED", "$.kind", "kind is required")]),
    }
}

fn source_import(path: &str, o: &Map<String, Value>) -> Result<SourceImportRecord, Vec<Diagnostic>> {
    let mut d = Vec::new();
    keys(path, o, &["schema_version","kind","id","classification","upstream","license",
        "permission","import","transformation","review"], &["schema_version","kind","id",
        "classification","upstream","license","permission","import","transformation","review"], "$", &mut d);
    version(path, o, "$", &mut d);
    constant(path, o, "kind", "source_import", "$.kind", &mut d);

    let id = text(path, o, "id", "$.id", &mut d).unwrap_or_default();
    if !id.is_empty() && !record_id(&id, false) {
        d.push(Diagnostic::new(path, "SCHEMA_ID", "$.id", "invalid canonical id"));
    }
    enum_text(path, o, "classification",
        &["oss_permitted","separate_permission_required","restricted","unknown"],
        "$.classification", &mut d);

    if let Some(u) = object(path, o, "upstream", "$.upstream", &mut d) {
        keys(path, u, &["repository","commit","path","sha256","copyright_holder"],
            &["repository","commit","path","sha256","copyright_holder"], "$.upstream", &mut d);
        if let Some(v) = text(path,u,"repository","$.upstream.repository",&mut d) {
            if !repo_id(&v) { d.push(Diagnostic::new(path,"SOURCE_REPOSITORY","$.upstream.repository","expected owner/repository")); }
        }
        if let Some(v) = text(path,u,"commit","$.upstream.commit",&mut d) {
            if !hex(&v,40) { d.push(Diagnostic::new(path,"SOURCE_COMMIT","$.upstream.commit","expected 40 lowercase hex")); }
        }
        if let Some(v) = text(path,u,"path","$.upstream.path",&mut d) {
            if !rel_path(&v) { d.push(Diagnostic::new(path,"PATH_INVALID","$.upstream.path","expected normalized relative POSIX path")); }
        }
        digest(path,u,"sha256","$.upstream.sha256",&mut d);
        nonempty(path,u,"copyright_holder","$.upstream.copyright_holder",&mut d);
    }

    if let Some(l) = object(path,o,"license","$.license",&mut d) {
        keys(path,l,&["spdx","evidence"],&["spdx","evidence"],"$.license",&mut d);
        nonempty(path,l,"spdx","$.license.spdx",&mut d);
        nonempty_strings(path,l,"evidence","$.license.evidence",&mut d);
    }

    match o.get("permission") {
        Some(Value::Null) => {}
        Some(Value::Object(p)) => {
            keys(path,p,&["artifact","scope"],&["artifact","scope"],"$.permission",&mut d);
            nonempty(path,p,"artifact","$.permission.artifact",&mut d);
            enum_strings(path,p,"scope",&["copy","modify","create_derivative","redistribute",
                "publish_source","sublicense","relicense","commercial_use"],
                "$.permission.scope", true, &mut d);
        }
        Some(_) => d.push(Diagnostic::new(path,"SCHEMA_TYPE","$.permission","permission must be null or object")),
        None => d.push(Diagnostic::new(path,"SCHEMA_REQUIRED","$.permission","permission is required")),
    }

    let mut destination = String::new();
    if let Some(i) = object(path,o,"import","$.import",&mut d) {
        keys(path,i,&["destination","sha256","date"],&["destination","sha256","date"],"$.import",&mut d);
        if let Some(v) = text(path,i,"destination","$.import.destination",&mut d) {
            destination = v;
            if !rel_path(&destination) { d.push(Diagnostic::new(path,"PATH_INVALID","$.import.destination","expected normalized relative POSIX path")); }
        }
        digest(path,i,"sha256","$.import.sha256",&mut d);
        if let Some(v) = text(path,i,"date","$.import.date",&mut d) {
            if !date(&v) { d.push(Diagnostic::new(path,"DATE_INVALID","$.import.date","expected real ASCII Gregorian YYYY-MM-DD")); }
        }
    }

    if let Some(t) = object(path,o,"transformation","$.transformation",&mut d) {
        keys(path,t,&["kind","notes","derives_from"],&["kind","notes","derives_from"],"$.transformation",&mut d);
        enum_text(path,t,"kind",&["copied","adapted","rewritten_with_source_reference",
            "generated_from_upstream"],"$.transformation.kind",&mut d);
        let _ = text(path,t,"notes","$.transformation.notes",&mut d);
        strings(path,t,"derives_from","$.transformation.derives_from",&mut d);
    }

    if let Some(r) = object(path,o,"review","$.review",&mut d) {
        keys(path,r,&["status","pull_request","evidence"],&["status","pull_request","evidence"],"$.review",&mut d);
        match r.get("status").and_then(Value::as_str) {
            Some("qualified_exact_head") => {}
            Some("pending") => d.push(Diagnostic::new(path,"REVIEW_STATUS","$.review.status","pending is not import-ready")),
            Some("rejected") => d.push(Diagnostic::new(path,"REVIEW_STATUS","$.review.status","rejected is not import-ready")),
            Some(v) => d.push(Diagnostic::new(path,"REVIEW_STATUS","$.review.status",format!("unknown status `{v}`"))),
            None => d.push(Diagnostic::new(path,"REVIEW_STATUS","$.review.status","status is required")),
        }
        match r.get("pull_request") {
            Some(Value::Number(n)) if n.as_u64().is_some_and(|v| v > 0) => {}
            _ => d.push(Diagnostic::new(path,"REVIEW_PR","$.review.pull_request","expected positive integer PR id")),
        }
        match string_values(r.get("evidence")) {
            Some(values) if !values.is_empty() => for (index, value) in values.iter().enumerate() {
                if !review_ref(value) { d.push(Diagnostic::new(path,"REVIEW_EVIDENCE",
                    format!("$.review.evidence[{index}]"),"invalid immutable review evidence reference")); }
            },
            _ => d.push(Diagnostic::new(path,"REVIEW_EVIDENCE","$.review.evidence","canonical review evidence is required")),
        }
    }

    if d.is_empty() { Ok(SourceImportRecord { id, destination }) } else { Err(d) }
}

fn component_registry(path: &str, o: &Map<String, Value>) -> Result<ComponentRegistryRecord, Vec<Diagnostic>> {
    let mut d = Vec::new();
    keys(path,o,&["schema_version","kind","components"],&["schema_version","kind","components"],"$",&mut d);
    version(path,o,"$",&mut d);
    constant(path,o,"kind","component_registry","$.kind",&mut d);
    let mut ids = Vec::new();
    match o.get("components") {
        Some(Value::Array(items)) if !items.is_empty() => for (index,item) in items.iter().enumerate() {
            let f = format!("$.components[{index}]");
            let Some(c) = item.as_object() else { d.push(Diagnostic::new(path,"SCHEMA_TYPE",f,"component must be object")); continue; };
            keys(path,c,&["schema_version","kind","id","ecosystem","component_type","name","version",
                "source","package_checksum","license","artifact_form","distribution_surfaces",
                "notice_requirement","derives_from","distribution_review"],
                &["schema_version","kind","id","ecosystem","component_type","name","version","source",
                "package_checksum","license","artifact_form","distribution_surfaces","notice_requirement",
                "derives_from","distribution_review"],&f,&mut d);
            version(path,c,&f,&mut d);
            constant(path,c,"kind","component",&format!("{f}.kind"),&mut d);
            if let Some(id)=text(path,c,"id",&format!("{f}.id"),&mut d) {
                if !record_id(&id,true) { d.push(Diagnostic::new(path,"COMPONENT_ID",format!("{f}.id"),"invalid component id")); }
                ids.push(id);
            }
            enum_text(path,c,"ecosystem",&["cargo"],&format!("{f}.ecosystem"),&mut d);
            enum_text(path,c,"component_type",&["library","binary","tool"],&format!("{f}.component_type"),&mut d);
            nonempty(path,c,"name",&format!("{f}.name"),&mut d);
            nonempty(path,c,"version",&format!("{f}.version"),&mut d);
            if let Some(s)=object(path,c,"source",&format!("{f}.source"),&mut d) {
                keys(path,s,&["repository","revision"],&["repository","revision"],&format!("{f}.source"),&mut d);
                if let Some(v)=text(path,s,"repository",&format!("{f}.source.repository"),&mut d) {
                    if !github_repo(&v) { d.push(Diagnostic::new(path,"COMPONENT_SOURCE",format!("{f}.source.repository"),"expected canonical GitHub URL")); }
                }
                if let Some(v)=text(path,s,"revision",&format!("{f}.source.revision"),&mut d) {
                    if !hex(&v,40) { d.push(Diagnostic::new(path,"COMPONENT_SOURCE",format!("{f}.source.revision"),"expected 40 lowercase hex")); }
                }
            }
            digest(path,c,"package_checksum",&format!("{f}.package_checksum"),&mut d);
            if let Some(l)=object(path,c,"license",&format!("{f}.license"),&mut d) {
                keys(path,l,&["classification","spdx","evidence"],&["classification","evidence"],&format!("{f}.license"),&mut d);
                let class=text(path,l,"classification",&format!("{f}.license.classification"),&mut d);
                match class.as_deref() {
                    Some("spdx") => nonempty(path,l,"spdx",&format!("{f}.license.spdx"),&mut d),
                    Some("restricted"|"custom"|"unknown") => if l.contains_key("spdx") {
                        d.push(Diagnostic::new(path,"COMPONENT_LICENSE",format!("{f}.license.spdx"),"spdx forbidden for non-SPDX classification"));
                    },
                    Some(_) => d.push(Diagnostic::new(path,"COMPONENT_LICENSE",format!("{f}.license.classification"),"unknown classification")),
                    None => {}
                }
                nonempty_strings(path,l,"evidence",&format!("{f}.license.evidence"),&mut d);
            }
            enum_text(path,c,"artifact_form",&["source","static_library","dynamic_library","binary","wasm","other"],&format!("{f}.artifact_form"),&mut d);
            enum_strings(path,c,"distribution_surfaces",&["server","web","desktop_direct","desktop_store","ios_app_store","android_play","sdk","embed","cli","worker"],&format!("{f}.distribution_surfaces"),true,&mut d);
            enum_text(path,c,"notice_requirement",&["required","not_required","pending"],&format!("{f}.notice_requirement"),&mut d);
            strings(path,c,"derives_from",&format!("{f}.derives_from"),&mut d);
            if let Some(r)=object(path,c,"distribution_review",&format!("{f}.distribution_review"),&mut d) {
                keys(path,r,&["state","evidence"],&["state","evidence"],&format!("{f}.distribution_review"),&mut d);
                enum_text(path,r,"state",&["not_applicable","pending","approved_with_evidence","blocked"],&format!("{f}.distribution_review.state"),&mut d);
                strings(path,r,"evidence",&format!("{f}.distribution_review.evidence"),&mut d);
            }
        },
        _ => d.push(Diagnostic::new(path,"COMPONENT_LIST","$.components","components must be non-empty array")),
    }
    let mut seen=HashSet::new();
    for id in &ids { if !seen.insert(id) { d.push(Diagnostic::new(path,"COMPONENT_DUPLICATE","$.components",format!("duplicate `{id}`"))); } }
    if d.is_empty() { Ok(ComponentRegistryRecord { ids }) } else { Err(d) }
}

fn policy(path: &str, o: &Map<String, Value>) -> Result<PolicyRecord, Vec<Diagnostic>> {
    let mut d=Vec::new();
    keys(path,o,&["schema_version","kind","id","policy_type","policy_version","rules"],
        &["schema_version","kind","id","policy_type","policy_version","rules"],"$",&mut d);
    version(path,o,"$",&mut d); constant(path,o,"kind","policy","$.kind",&mut d);
    let id=text(path,o,"id","$.id",&mut d).unwrap_or_default();
    if !id.is_empty() && !record_id(&id,true) { d.push(Diagnostic::new(path,"SCHEMA_ID","$.id","invalid policy id")); }
    let policy_type=text(path,o,"policy_type","$.policy_type",&mut d).unwrap_or_default();
    if !matches!(policy_type.as_str(),"license"|"restricted_paths") { d.push(Diagnostic::new(path,"SCHEMA_POLICY","$.policy_type","expected license or restricted_paths")); }
    let policy_version=match o.get("policy_version") {
        Some(Value::Number(n)) if n.as_u64().is_some_and(|v|v>0)=>n.as_u64().unwrap_or_default(),
        _=>{d.push(Diagnostic::new(path,"SCHEMA_POLICY","$.policy_version","expected positive integer"));0}
    };
    match o.get("rules") {
        Some(Value::Array(rules)) => for (index,rule) in rules.iter().enumerate() {
            let f=format!("$.rules[{index}]");
            let Some(r)=rule.as_object() else {d.push(Diagnostic::new(path,"SCHEMA_TYPE",f,"rule must be object"));continue;};
            keys(path,r,&["id","effect","repository","path_prefix","expression","permission_scopes"],&["id","effect"],&f,&mut d);
            nonempty(path,r,"id",&format!("{f}.id"),&mut d);
            enum_text(path,r,"effect",&["allow","deny","require_permission","reject_expression"],&format!("{f}.effect"),&mut d);
            if let Some(Value::String(v))=r.get("repository") { if !repo_id(v) { d.push(Diagnostic::new(path,"SOURCE_REPOSITORY",format!("{f}.repository"),"invalid repository")); } }
            if let Some(Value::String(v))=r.get("path_prefix") { if !rel_path(v) { d.push(Diagnostic::new(path,"PATH_INVALID",format!("{f}.path_prefix"),"invalid path prefix")); } }
            if let Some(v)=r.get("expression") { if !matches!(v,Value::String(s) if !s.is_empty()) { d.push(Diagnostic::new(path,"SCHEMA_POLICY",format!("{f}.expression"),"expression must be non-empty string")); } }
            if r.contains_key("permission_scopes") { enum_strings(path,r,"permission_scopes",&["copy","modify","create_derivative","redistribute","publish_source","sublicense","relicense","commercial_use"],&format!("{f}.permission_scopes"),true,&mut d); }
        },
        _=>d.push(Diagnostic::new(path,"SCHEMA_POLICY","$.rules","rules must be array")),
    }
    if d.is_empty(){Ok(PolicyRecord{id,policy_type,policy_version})}else{Err(d)}
}

fn check_duplicates(records:&[(String,CanonicalRecord)],d:&mut Vec<Diagnostic>){
    let mut ids=BTreeSet::new(); let mut dest=BTreeSet::new();
    for(path,r) in records { match r {
        CanonicalRecord::SourceImport(r)=>{
            if !ids.insert(r.id.clone()){d.push(Diagnostic::new(path,"SCHEMA_DUPLICATE_ID","$.id",format!("duplicate `{}`",r.id)));}
            if !dest.insert(r.destination.clone()){d.push(Diagnostic::new(path,"PATH_DUPLICATE_DESTINATION","$.import.destination",format!("duplicate `{}`",r.destination)));}
        }
        CanonicalRecord::ComponentRegistry(r)=>for id in &r.ids{if !ids.insert(id.clone()){d.push(Diagnostic::new(path,"SCHEMA_DUPLICATE_ID","$.components",format!("duplicate `{id}`)));}},
        CanonicalRecord::Policy(r)=>if !ids.insert(r.id.clone()){d.push(Diagnostic::new(path,"SCHEMA_DUPLICATE_ID","$.id",format!("duplicate `{}`",r.id)));},
    }}
}

fn keys(path:&str,o:&Map<String,Value>,allowed:&[&str],required:&[&str],field:&str,d:&mut Vec<Diagnostic>){
    for key in o.keys(){if !allowed.contains(&key.as_str()){d.push(Diagnostic::new(path,"SCHEMA_UNKNOWN_FIELD",format!("{field}.{key}"),"unknown field"));}}
    for key in required{if !o.contains_key(*key){d.push(Diagnostic::new(path,"SCHEMA_REQUIRED",format!("{field}.{key}"),"required field missing"));}}
}
fn version(path:&str,o:&Map<String,Value>,field:&str,d:&mut Vec<Diagnostic>){
    if !matches!(o.get("schema_version"),Some(Value::Number(n)) if n.as_u64()==Some(1)){d.push(Diagnostic::new(path,"SCHEMA_VERSION",format!("{field}.schema_version"),"expected integer 1"));}
}
fn constant(path:&str,o:&Map<String,Value>,key:&str,want:&str,field:&str,d:&mut Vec<Diagnostic>){
    if !matches!(o.get(key),Some(Value::String(v)) if v==want){d.push(Diagnostic::new(path,"SCHEMA_VALUE",field,format!("expected `{want}`")));}
}
fn object<'a>(path:&str,o:&'a Map<String,Value>,key:&str,field:&str,d:&mut Vec<Diagnostic>)->Option<&'a Map<String,Value>>{
    match o.get(key){Some(Value::Object(v))=>Some(v),Some(_)=>{d.push(Diagnostic::new(path,"SCHEMA_TYPE",field,"expected object"));None},None=>None}
}
fn text(path:&str,o:&Map<String,Value>,key:&str,field:&str,d:&mut Vec<Diagnostic>)->Option<String>{
    match o.get(key){Some(Value::String(v))=>Some(v.clone()),Some(_)=>{d.push(Diagnostic::new(path,"SCHEMA_TYPE",field,"expected string"));None},None=>None}
}
fn nonempty(path:&str,o:&Map<String,Value>,key:&str,field:&str,d:&mut Vec<Diagnostic>){
    if let Some(v)=text(path,o,key,field,d){if v.is_empty(){d.push(Diagnostic::new(path,"SCHEMA_EMPTY",field,"must not be empty"));}}
}
fn string_values(value:Option<&Value>)->Option<Vec<String>>{
    let Value::Array(items)=value? else{return None}; let mut out=Vec::new();
    for item in items{let Value::String(v)=item else{return None};out.push(v.clone());} Some(out)
}
fn strings(path:&str,o:&Map<String,Value>,key:&str,field:&str,d:&mut Vec<Diagnostic>){
    if string_values(o.get(key)).is_none(){d.push(Diagnostic::new(path,"SCHEMA_TYPE",field,"expected string array"));}
}
fn nonempty_strings(path:&str,o:&Map<String,Value>,key:&str,field:&str,d:&mut Vec<Diagnostic>){
    match string_values(o.get(key)){Some(v) if !v.is_empty()&&v.iter().all(|s|!s.is_empty())=>{},_=>d.push(Diagnostic::new(path,"SCHEMA_TYPE",field,"expected non-empty string array"))}
}
fn enum_text(path:&str,o:&Map<String,Value>,key:&str,allowed:&[&str],field:&str,d:&mut Vec<Diagnostic>){
    if let Some(v)=text(path,o,key,field,d){if !allowed.contains(&v.as_str()){d.push(Diagnostic::new(path,"SCHEMA_VALUE",field,format!("unsupported `{v}`")));}}
}
fn enum_strings(path:&str,o:&Map<String,Value>,key:&str,allowed:&[&str],field:&str,nonempty:bool,d:&mut Vec<Diagnostic>){
    match string_values(o.get(key)){Some(v) if (!nonempty||!v.is_empty())&&v.iter().all(|s|allowed.contains(&s.as_str()))=>{},_=>d.push(Diagnostic::new(path,"SCHEMA_VALUE",field,"invalid string array"))}
}
fn digest(path:&str,o:&Map<String,Value>,key:&str,field:&str,d:&mut Vec<Diagnostic>){
    if let Some(v)=text(path,o,key,field,d){if !hex(&v,64){d.push(Diagnostic::new(path,"DIGEST_INVALID",field,"expected 64 lowercase hex"));}}
}
fn record_id(v:&str,lower:bool)->bool{
    (3..=128).contains(&v.len())&&v.is_ascii()&&v.bytes().next().is_some_and(|b|b.is_ascii_alphanumeric())
        &&v.bytes().all(|b|b.is_ascii_alphanumeric()||matches!(b,b'.'|b'_'|b'-'))
        &&(!lower||v.bytes().all(|b|!b.is_ascii_uppercase()))
}
fn repo_id(v:&str)->bool{
    if !v.is_ascii()||v.contains('\\'){return false} let mut p=v.split('/');
    matches!((p.next(),p.next(),p.next()),(Some(a),Some(b),None) if segment(a)&&segment(b))
}
fn segment(v:&str)->bool{!v.is_empty()&&v.bytes().all(|b|b.is_ascii_alphanumeric()||matches!(b,b'.'|b'_'|b'-'))}
fn github_repo(v:&str)->bool{v.strip_prefix("https://github.com/").is_some_and(repo_id)}
fn hex(v:&str,n:usize)->bool{v.len()==n&&v.bytes().all(|b|b.is_ascii_digit()||(b'a'..=b'f').contains(&b))}
fn rel_path(v:&str)->bool{!v.is_empty()&&v.is_ascii()&&!v.starts_with('/')&&!v.ends_with('/')&&!v.contains('\\')&&v.split('/').all(|s|!s.is_empty()&&s!="."&&s!="..")}
fn review_ref(v:&str)->bool{
    if !v.is_ascii(){return false} let id=["github:issue-comment:","github:pull-request-review:","github:pull-request-review-comment:"]
        .iter().find_map(|prefix|v.strip_prefix(prefix)); matches!(id,Some(id) if !id.is_empty()&&!id.starts_with('0')&&id.bytes().all(|b|b.is_ascii_digit()))
}
fn date(v:&str)->bool{
    let b=v.as_bytes(); if b.len()!=10||b[4]!=b'-'||b[7]!=b'-'||!b.iter().enumerate().all(|(i,c)|matches!(i,4|7)||c.is_ascii_digit()){return false}
    let num=|s:&[u8]|s.iter().fold(0_u32,|n,c|n*10+u32::from(*c-b'0'));
    let y=num(&b[..4]);let m=num(&b[5..7]);let day=num(&b[8..]); if !(1..=9999).contains(&y)||!(1..=12).contains(&m){return false}
    let leap=y%4==0&&(y%100!=0||y%400==0); let max=match m{1|3|5|7|8|10|12=>31,4|6|9|11=>30,2 if leap=>29,2=>28,_=>return false};(1..=max).contains(&day)
}
fn sort(d:&mut[Diagnostic]){d.sort_by(|a,b|(&a.path,a.code,&a.field,&a.message).cmp(&(&b.path,b.code,&b.field,&b.message)));}

#[cfg(test)]
mod tests {
    use super::*;
    #[test] fn date_is_semantic(){assert!(date("2024-02-29"));for v in ["2025-02-29","2026-2-01","0000-01-01","2026-13-01"]{assert!(!date(v),"{v}");}}
    #[test] fn review_reference_is_canonical(){for v in ["github:issue-comment:1","github:pull-request-review:2","github:pull-request-review-comment:3"]{assert!(review_ref(v));}for v in ["approved","https://github.com/x","github:issue-comment:0","github:issue-comment:01","github:issue-comment:-1","github:issue-comment:+1","github:issue-comment:１２"]{assert!(!review_ref(v),"{v}");}}
    #[test] fn paths_are_normalized(){assert!(rel_path("a/b"));for v in ["/a","../a","a/../b","a\\b","a//b","a/./b","a/"]{assert!(!rel_path(v),"{v}");}}
}
