$(document).ready(function(){
  $('#login_button').click(function(){
    var email = $("#email").val();
    var pass = $("#password").val();
    var sex   = $('input[name=sex]:checked').val();
    $.ajax({
      type: 'POST',
      url: 'http://54.65.55.210/v1/login',
      timeout: 10000,
      async: false,
      data: {
        'email': email,
        'password': pass,
        'type': sex
      },
    }).done(function(response, textStatus, jqXHR) {
      if(response["access_token"] == null){
        Materialize.toast(response["error"], 4000);
        return;
      }
      window.localStorage.setItem("access_token_local",response["access_token"]);
      window.localStorage.setItem("id_local",response["id"]);
      window.localStorage.setItem("email_local",response["mail"]);
      window.localStorage.setItem("seibetu_local",sex);
          $.ajax("http://54.65.55.210/v1/families/search ",{
              type: 'GET',
              headers: {
                'Authorization': window.localStorage.getItem("access_token_local"),
                'UserType': window.localStorage.getItem("seibetu_local"),
              },
              async: false,
              timeout: 10000,
          }).done(function(data) {
            if(data == null){
              window.location.href = "partner.html";
              exit;
            }
            window.localStorage.setItem("family_id",data.id);
          }).fail(function(jqXHR, statusText, errorThrown) {
            Materialize.toast(エラー, 4000);
            return;
          });
      window.location.href = 'home.html'; //画面遷移
    }).fail(function(jqXHR, textStatus, errorThrown ) {
      Materialize.toast("エラー", 4000);
    });
  });
});
