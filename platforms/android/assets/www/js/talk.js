function add_statement(statement, user_type){
  if(user_type == capitalizeFirstLetter(window.localStorage.getItem("seibetu_local"))){
    $("#talk").append("<div>You:"+statement+"</div><br>");
  }else{
    $("#talk").append("<div style='text-align: right;'>Partner:"+statement+"</div><br>");
  }
}


(function () {
  if(window.localStorage.getItem("family_id") == null){
    $.ajax("https://support-spouses-communication.herokuapp.com/v1/families/search ",{
        type: 'GET',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        async: false,
        timeout: 10000,
    }).done(function(data) {
      window.localStorage.setItem("family_id",data.id);
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("ログインエラー");
      window.location.href = 'login.html';
    });
  }
}());

// 全件取得
$(document).ready(function(){
  console.log("https://support-spouses-communication.herokuapp.com/v1/families/"+window.localStorage.getItem("family_id")+"/talks");
  console.log(window.localStorage.getItem("access_token_local"));
  console.log(window.localStorage.getItem("seibetu_local"));
  $.ajax("https://support-spouses-communication.herokuapp.com/v1/families/"+window.localStorage.getItem("family_id")+"/talks",{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      async: false,
      timeout: 10000,
  }).done(function(data) {
    data.forEach(function(val,index,ar){
       add_statement(val.statement, val.user_type);
     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("取得エラー");
  });
});

function send(code){
	if(13 === code){
    var statement = $("#send").val();
    $.ajax("https://support-spouses-communication.herokuapp.com//v1/families/"+window.localStorage.getItem("family_id")+"/talks",{
        type: 'POST',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        data: {"statement": statement},
        dataType: 'json',
        timeout: 10000,
    }).done(function(data) {
      $("#send").val('');
      add_statement(statement, capitalizeFirstLetter(window.localStorage.getItem("seibetu_local")));
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;
};

function updateTalk(){
  var now = new Date();
  var month = toDoubleDigits(now.getMonth()+1);
  var day   = toDoubleDigits(now.getDate());
  var hours = toDoubleDigits(now.getHours());
  var minutes = toDoubleDigits(now.getMinutes());
  var old_seconds = toDoubleDigits(now.getSeconds() - 10);
  var now_seconds = toDoubleDigits(now.getSeconds());

  // TODO 秒が-になる雑な計算どうにか
  if(old_seconds < 0){
    setTimeout("updateTalk()", 10000);
    return;
  }

  var time_old = now.getFullYear()+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+old_seconds;
  var time_now = now.getFullYear()+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+now_seconds;
  console.log(time_old);
  console.log(time_now);
  $.ajax("https://support-spouses-communication.herokuapp.com/v1/families/"+window.localStorage.getItem("family_id")+"/talks/search_from_range?start_time="+time_old+"&end_time="+time_now,{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      timeout: 10000,
  }).done(function(data) {
    data.forEach(function(val,index,ar){
      console.log(val);
       add_statement(val.statement, val.user_type);
     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    console.log("エラー");
  });
  setTimeout("updateTalk()", 10000);
}


$(document).ready(function(){
  setTimeout("updateTalk()", 10000);
});
