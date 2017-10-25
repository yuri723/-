function getUrlVars()
{
    var vars = [], max = 0, hash = "", array = "";
    var url = window.location.search;

    hash  = url.slice(1).split('&');
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');
        vars.push(array[0]);
        vars[array[0]] = array[1];
    }

    return vars;
}

// 個別情報取得
$(document).ready(function(){
  queryString = getUrlVars();
  $("#type").empty().append(queryString.type == "want_todos" ? "一緒にやりたいこと" : "やらないといけないこと")
  $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/"+queryString.type+"/"+queryString.id,{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      timeout: 10000,
  }).done(function(data) {
    $("#deadline").val(data.deadline.slice(0, 10));
    $("#statement").val(data.statement)
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });
});

//編集処理
$(document).ready(function(){
  $('#edit').on('click',function(){
    var queryString = getUrlVars();
    var deadline  = $("#deadline").val()+"T00:00:00";
    var statement = $("#statement").val();

    $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/"+queryString.type+"/"+queryString.id,{
        type: 'POST',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        data: {
          "deadline": deadline,
          "statement": statement,
        },
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

$(document).ready(function(){
  $('#back').on('click',function(){
      window.location.href = 'home2.html';
  });
});
