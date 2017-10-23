$(document).ready(function(){
  $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/must_todos",{
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

      $("#must_todos").append("<div class='list_must_div'>")
      $("#must_todos").append("【締め切り】"+time_ymd+"<br>【内容】"+val.statement+"<br>【作成者】"+val.user_type)
      $("#must_todos").append("</div>")
      $("#must_todos").append("<hr>")


     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });
});


$(document).ready(function(){
  $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/want_todos",{
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

      $("#want_todos").append("<li class='list_want_div' name='todo"+index+"'>")
      $("#want_todos").append("【締め切り】"+time_ymd+"<br>【内容】"+val.statement+"<br>【作成者】"+val.user_type)
      $("#want_todos").append("</li>")
      $("#want_todos").append("<hr>")

     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });

});


$(document).ready(function(){

  //一緒にやりたいことリストがクリックされたときの処理
   $(".list_want").on("click", "li.list_want_div", function() {
        console.log("クリックされたよ");
        console.log(this);
        var id =  $(this).attr("name");//クリックされたidを変数idに入れる
        console.log(id);//クリックされたidをコンソールに出力

   });
  //やらなければならないことことリストがクリックされたときの処理
  $("#must_todos").on("click", { class: "list_must_div" }, function() {
        console.log("クリックされたよ");
  });
});
