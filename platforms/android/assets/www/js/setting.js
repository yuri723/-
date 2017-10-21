

$(document).ready(function(){
  /*
   * アカウント情報を変数に入れる
   */
   var dd_account;
   var dd_email;
   var dd_date;
   var dd_seibetu;

   if(window.localStorage.getItem("seibetu_local") == "hasband"){
     var url = "https://support-spouses-communication.herokuapp.com/v1/hasbands/"+window.localStorage.getItem("id_local")
     dd_seibetu = "男性"
   }else{
     var url = "https://support-spouses-communication.herokuapp.com/v1/wives/"+window.localStorage.getItem("id_local")
     dd_seibetu = "女性"
   }
   $.ajax(url,{
       type: 'GET',
       async: false,
       timeout: 10000,
   }).done(function(data) {
     dd_account = data.name;
     dd_email = data.email;
     dd_date = data.birthday;
     //console.log(data);
   }).fail(function(jqXHR, statusText, errorThrown) {
     alert("情報取得できませんでした。");
     console.log("エラー");
   });

  /*
   * 確認用テキストにアカウント情報変数の値を入れる
   */
   $(":text[name='account-name']").val(dd_account); //アカウント名
   $("input[type=email][name=email]").val(dd_email);//Eメール
   $("#dd_password").text("********");//パスワード
   $("input[type=date][name=birthday]").val(dd_date);//生年月日
   $("#dd_seibetu").text(dd_seibetu);//性別
});

function update(){
  let name      = $(":text[name='account-name']").val();
  let email     = $("input[type=email][name=email]").val();
  let birthday  = $("input[type=date][name=birthday]").val();

  if(window.localStorage.getItem("seibetu_local") == "hasband"){
    var url   = "https://support-spouses-communication.herokuapp.com/v1/hasbands/"+window.localStorage.getItem("id_local");
    var data  = {"hasband": {"name": name, "email": email, "birthday": birthday}};
  }else{
    var url   = "https://support-spouses-communication.herokuapp.com/v1/wives/"+window.localStorage.getItem("id_local");
    var data  = {"wife": {"name": name, "email": email, "birthday": birthday}};
  }
  $.ajax(url,{
      type: 'POST',
      async: false,
      timeout: 10000,
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      data: data,
  }).done(function(data) {
    alert("更新しました。");
    window.location.href = 'setting.html';
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("情報更新できませんでした。");
  });

}
