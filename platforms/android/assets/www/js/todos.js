$(document).ready(function(){
  $.ajax("https://support-spouses-communication.herokuapp.com/v1/families/"+window.localStorage.getItem("family_id")+"/must_todos",{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      timeout: 10000,
  }).done(function(data) {
    data.forEach(function(val,index,ar){
      $("#must_todos").append("<div>")
      $("#must_todos").append("締め切り:"+val.deadline+"<br>内容:"+val.statement+"<br>作成者:"+val.user_type+"<br>担当:"+val.personnel)
      $("#must_todos").append("</div>")
      $("#must_todos").append("<hr>")
     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });
});

$(document).ready(function(){
  $.ajax("https://support-spouses-communication.herokuapp.com/v1/families/"+window.localStorage.getItem("family_id")+"/want_todos",{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      timeout: 10000,
  }).done(function(data) {
    data.forEach(function(val,index,ar){
      $("#want_todos").append("<div>")
      $("#want_todos").append("締め切り:"+val.deadline+"<br>内容:"+val.statement+"<br>作成者:"+val.user_type+"<br>担当:"+val.personnel)
      $("#want_todos").append("</div>")
      $("#want_todos").append("<hr>")
     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });
});
