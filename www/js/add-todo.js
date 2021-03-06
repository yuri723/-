$(document).ready(function(){

  var date  = new Date();
  $("#deadline").val(date.getFullYear()+"-"+Number(date.getMonth()+1)+"-"+date.getDate());

  $('#send').on('click',function(){
    var type      = $('input[name=type]:checked').val();
    var deadline  = $("#deadline").val()+"T00:00:00";
    var statement = $("#statement").val();
    var user_id = window.localStorage.getItem("id_local")
    var user_type = window.localStorage.getItem("seibetu_local")


    $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/"+type,{
        type: 'POST',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        data: {
          "deadline": deadline,
          "statement": statement,
          "user_id":user_id,
          "user_type":user_type
        },
        dataType: 'json',
        timeout: 10000,
    }).done(function(data) {
      window.location.href = 'home2.html';
    }).fail(function(jqXHR, statusText, errorThrown) {
      var obj = JSON.parse(jqXHR.responseText);
      Object.keys(obj).forEach(function(key) {
        Materialize.toast(key+":"+obj[key][0], 4000);
      });
    });
  });
});
