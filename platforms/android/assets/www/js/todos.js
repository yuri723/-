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
      var time_unix = val.deadline ;
      var time_year = time_unix.substr(0,4);
      var time_month = time_unix.substr(5,2);
      var time_date = time_unix.substr(8,2);
      var time_ymd = time_year+"/"+time_month + "/"+time_date ;

      $("#must_todos").append("<div>")
      $("#must_todos").append("【締め切り】"+time_ymd+"<br>【内容】"+val.statement+"<br>【作成者】"+val.user_type)
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
      var time_unix = val.deadline ;
      var time_year = time_unix.substr(0,4);
      var time_month = time_unix.substr(5,2);
      var time_date = time_unix.substr(8,2);
      var time_ymd = time_year+"/"+time_month + "/"+time_date ;

      $("#want_todos").append("<div>")
      $("#want_todos").append("【締め切り】"+time_ymd+"<br>【内容】"+val.statement+"<br>【作成者】"+val.user_type)
      $("#want_todos").append("</div>")
      $("#want_todos").append("<hr>")
     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });
});
