function getUrlVars()
{
    var vars = [], max = 0, hash = "", array = "";
    var url = window.location.search;

        //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
    hash  = url.slice(1).split('&');
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');    //keyと値に分割。
        vars.push(array[0]);    //末尾にクエリ文字列のkeyを挿入。
        vars[array[0]] = array[1];    //先ほど確保したkeyに、値を代入。
    }

    return vars;
}

// 個別情報取得
$(document).ready(function(){
  queryString = getUrlVars();
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
