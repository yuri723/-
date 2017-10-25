$(document).on('click','#decide',function(){
  var account   = $('#account').val();
  var email     = $('#email').val();
  var password  = $('#password').val();
  var password2 = $('#password2').val();
  var date      = $('#date').val()

  var flagman = document.getElementById("man").checked;
  var flagwoman = document.getElementById("woman").checked;

  if(flagman==true){
    var seibetu = "男性";
    var url = "http://54.65.55.210/v1/hasbands"
    var role = "hasband"
  }else if(flagwoman==true){
      var seibetu = "女性";
      var url = "http://54.65.55.210/v1/wives"
      var role = "wife"
  }

  if(role == "hasband"){
    var data = {"hasband": {"email": email, "password": password, "name": account, "birthday": date}};
  }else{
    var data = {"wife": {"email": email, "password": password, "name": account, "birthday": date}};
  }
  $.ajax(url,{
    type: 'POST',
    data: data,
    dataType: 'json',
    async: false,
    timeout:10000
  }).done(function(data,status, jqxhr){
    access_token = data.access_token;
    id = data.id;
    email = data.email;

    window.localStorage.setItem("access_token_local",access_token);
    window.localStorage.setItem("id_local",id);
    window.localStorage.setItem("email_local",email);
    window.localStorage.setItem("seibetu_local",role);

    window.localStorage.setItem("name_local",account);
    window.localStorage.setItem("password_local",password);
    window.localStorage.setItem("date_local",date);

    window.location.href = 'partner.html';
  });
});

$(document).ready(function(){
  $('#send').on('click',function(){
    var account   = $('#account').val();
    var email     = $('#email').val();
    var password  = $('#password').val();
    var password2 = $('#password2').val();
    var date      = $('#date').val()

    if(password != password2){
      alert("確認用パスワードが違います");
      return;
    }

    var flagman = document.getElementById("man").checked;
    var flagwoman = document.getElementById("woman").checked;

    if(flagman==true){
      var seibetu = "男性";
    }else if(flagwoman==true){
      var seibetu = "女性";
    }

    $("#confirm").empty();
    $("#confirm").append("アカウント名:"+account);
    $("#confirm").append("<br />メールアドレス:"+email);
    $("#confirm").append("<br />生年月日:"+date);
    $("#confirm").append("<br />性別:"+seibetu);

    $('#confirm-modal').modal('open');

  });
});

$(document).ready(function(){
  $('.modal').modal();
});
