$(document).ready(function(){
  $('#send').on('click',function(){
    var type      = $('input[name=type]:checked').val();
    console.log(type)
    var deadline  = $("#deadline").val()+"T00:00";
    var statement = $("#statement").val();
    var assign    = $('input[name=assign]:checked').val();
    if(window.localStorage.getItem("seibetu_local") == "hasband" && assign == "opposite"){
      assign = "wife"
    }else if(window.localStorage.getItem("seibetu_local") == "hasband" && assign == "myself"){
      assign = "hasband"
    }
    if(window.localStorage.getItem("seibetu_local") == "wife" && assign == "opposite"){
      assign = "hasband"
    }else if(window.localStorage.getItem("seibetu_local") == "wife" && assign == "myself"){
      assign = "wife"
    }

    $.ajax("https://support-spouses-communication.herokuapp.com/v1/families/"+window.localStorage.getItem("family_id")+"/"+type,{
        type: 'POST',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        data: {"deadline": deadline,
               "statement": statement,
               "personnel": assign},
        dataType: 'json',
        timeout: 10000,
    }).done(function(data) {
      console.log(data);
      window.location.href = 'home2.html';
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });
  });
});
