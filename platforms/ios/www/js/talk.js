function add_statement(statement, user_type,created_at){



  if(user_type == capitalizeFirstLetter(window.localStorage.getItem("seibetu_local"))){
    if(statement == "mark_face_angry"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_angry.png' width='40' height='40' />"+"</div><br>"+created_at);
    }else if(statement == "mark_face_ase"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_ase.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_cry"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_cry.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_hehe"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_hehe.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_jito"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_jito.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_laugh"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_laugh.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_odoroki"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_odoroki.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_smile"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_smile.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_tere"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_tere.png' width='40' height='40' />"+"</div><br>");
    }else {
      $("#talk").append("<div>You:"+statement+"</div><br>"+created_at);
    }

  }else{
    if(statement == "mark_face_angry"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_angry.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_ase"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_ase.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_cry"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_cry.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_hehe"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_hehe.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_jito"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_jito.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_laugh"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_laugh.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_odoroki"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_odoroki.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_smile"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_smile.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_tere"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_tere.png' width='40' height='40' />"+"</div><br>");
    }else{
      $("#talk").append("<div style='text-align: right;'>Partner:"+statement+"</div><br>");
    }

  }
}

// family_idが無いならエラー
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
       add_statement(val.statement, val.user_type,val.created_at);
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
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });
	}
}

$(document).on("click", "#stamp1", function () {

    var statement = "mark_face_angry";
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

    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });

});

$(document).on("click", "#stamp2", function () {

    var statement = "mark_face_ase";
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

    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });

});

$(document).on("click", "#stamp3", function () {

    var statement = "mark_face_cry";
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

    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });

});

$(document).on("click", "#stamp4", function () {

    var statement = "mark_face_hehe";
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

    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });

});

$(document).on("click", "#stamp5", function () {

    var statement = "mark_face_jito";
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

    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });

});

$(document).on("click", "#stamp6", function () {

    var statement = "mark_face_laugh";
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

    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });

});

$(document).on("click", "#stamp7", function () {

    var statement = "mark_face_odoroki";
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

    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });

});

$(document).on("click", "#stamp8", function () {

    var statement = "mark_face_tere";
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

    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });

});

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
      console.log(data);
      // 日時データを要素分解
    var created_at = result[i]['created_at'].split(" ");

    // 投稿日時変換 "Mon Dec 01 14:24:26 +0000 2008" -> "Dec 01, 2008 14:24:26"
    var post_date  = created_at[1] + " "
                  + created_at[2] + ", "
                  + created_at[5] + " "
                  + created_at[3];

    // 日時データ処理
    var date = new Date(post_date);     // 日付文字列 -> オブジェクト変換
    date.setHours(date.getHours() + 9); // UTC -> JST (+9時間)
    var mon  = date.getMonth() + 1;     // 月取得
    var day  = date.getDate();          // 日取得

    console.log("ここから");
    console.log(created_at);
    console.log(date);
    console.log(mon);
    console.log(day);
       add_statement(val.statement, val.user_type,val.created_at);
     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    console.log("エラー");
    console.log(window.localStorage.getItem("access_token_local"));
    console.log(window.localStorage.getItem("family_id"));
  });
  setTimeout("updateTalk()", 10000);
}


$(document).ready(function(){
  setTimeout("updateTalk()", 10000);
  $(window).scrollTop($("#under").offset().top);
});
