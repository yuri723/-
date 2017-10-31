var token     = window.localStorage.getItem("access_token_local");
var family_id = window.localStorage.getItem("family_id")
if(token != null && family_id != null){
  window.location.href = 'home.html';
  exit;
}
if(token != null && family_id == null){
  window.location.href = 'partner.html';
  exit;
}
