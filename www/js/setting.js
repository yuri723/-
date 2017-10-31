

$(document).ready(function(){

   if(window.localStorage.getItem("seibetu_local") == "hasband"){
     var url = "http://54.65.55.210/v1/hasbands/"+window.localStorage.getItem("id_local")
     var sex = "男性"
   }else{
     var url = "http://54.65.55.210/v1/wives/"+window.localStorage.getItem("id_local")
     var sex = "女性"
   }
   $.ajax(url,{
       type: 'GET',
       async: false,
       timeout: 10000,
   }).done(function(data) {
     $(":text[id='account_name']").val(data.name);
     $("input[type=email][id=email]").val(data.email);
     $("input[type=date][id=birthday]").val(data.birthday);
     $("#sex").text(sex);

     //console.log(data);
   }).fail(function(jqXHR, statusText, errorThrown) {
     alert("情報取得できませんでした。");
   });

});

$(document).ready(function(){
  $('#send').on('click',function(){
    let name      = $(":text[id='account_name']").val();
    let email     = $("input[type=email][id=email]").val();
    let birthday  = $("input[type=date][id=birthday]").val();

    if(window.localStorage.getItem("seibetu_local") == "hasband"){
      var url   = "http://54.65.55.210/v1/hasbands/"+window.localStorage.getItem("id_local");
      var data  = {"hasband": {"name": name, "email": email, "birthday": birthday}};
    }else{
      var url   = "http://54.65.55.210/v1/wives/"+window.localStorage.getItem("id_local");
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
      window.location.href = 'setting.html';
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("情報更新できませんでした。");
    });
  });
  $('#logout').on('click',function(){
    conf = confirm("ログアウトしてよろしいですか");
    if ( conf == true ){
      window.localStorage.clear();
      window.location.href = 'index.html';
    }
  });
});

$(document).ready(function(){
  $(".button-collapse").sideNav();
});
