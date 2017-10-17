

$(document).ready(function(){
  /*
   * アカウント情報を変数に入れる
   */
   var dd_account = window.localStorage.getItem("name_local"); //アカウント名
   var dd_email = window.localStorage.getItem("email_local");//Eメール
   var dd_password = window.localStorage.getItem("password_local"); //パスワード
   var dd_date = window.localStorage.getItem("date_local");//生年月日

   var dd_seibetu = window.localStorage.getItem("seibetu_local");//性別
   if(dd_seibetu == "hasband"){
     dd_seibetu = "男性"
   }else if(dd_seibetu == "wife"){
     dd_seibetu = "女性"
   }

  /*
   * 確認用テキストにアカウント情報変数の値を入れる
   */
   $("#dd_account").text(dd_account); //アカウント名
   $("#dd_email").text(dd_email);//Eメール
   $("#dd_password").text(dd_password);//パスワード
   $("#dd_date").text(dd_date);//生年月日
   $("#dd_seibetu").text(dd_seibetu);//性別
});
