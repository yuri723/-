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
      addTodo(val, "must_todos");
    });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });

  $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/want_todos",{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      timeout: 10000,
  }).done(function(data) {
    data.forEach(function(val,index,ar){
      addTodo(val, "want_todos");
     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });

});

function addTodo(val, type) {
  var time_unix = val.deadline ;
  var time_year = time_unix.substr(0,4);
  var time_month = time_unix.substr(5,2);
  var time_date = time_unix.substr(8,2);
  var time_ymd = time_year+"/"+time_month + "/"+time_date ;

  $("#"+type+"_columns").append(`\
    <div class="card col s12 m6 l3">\
      <div class="card-content">\
        <span class="card-title">${val.statement}</span>\
        <p>\
          【締め切り】${time_ymd}<br />\
          【作成者】${val.name}<br />\
        </p>\
      </div>\
      <div class="card-action">\
        <a href="edit-todo.html?id=${val.id}&type=${type}">編集</a>\
        <a href="#" onClick="deleteTodo(${val.id}, '${type}')">削除</a>\
      <div>\
    </div>`);
}

function deleteTodo(id, type) {
  var res = confirm("削除してもよろしいですか？");
  if( res == true ) {
    $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/"+type+"/"+id,{
        type: 'DELETE',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        timeout: 10000,
    }).done(function(data) {
      location.href = "home2.html"
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });
  };
}

$(document).ready(function(){
  $(".button-collapse").sideNav();
});
