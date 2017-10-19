function add_statement(statement, user_type,created_at){

  //時間表示の処理
   var time_unix = created_at;
   var time_month = time_unix.substr(5,2);
   var time_date = time_unix.substr(8,2);
   var time_hour = time_unix.substr(11,2);
   var time_min = time_unix.substr(14,2);
   var time_mdhm = time_month + "/"+time_date + "　"+ time_hour +":"+time_min ;

  if(user_type == capitalizeFirstLetter(window.localStorage.getItem("seibetu_local"))){
    if(statement == "mark_face_angry"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_angry.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_ase"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_ase.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_cry"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_cry.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_hehe"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_hehe.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_jito"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_jito.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_laugh"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_laugh.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_odoroki"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_odoroki.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_smile"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_smile.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_tere"){
      $("#talk").append("<div>You:"+"<img src='img/mark_face_tere.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else {
      $("#talk").append("<div>You:"+statement+ "　"+time_mdhm + "</div><br>");
    }

  }else{
    if(statement == "mark_face_angry"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_angry.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_ase"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_ase.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_cry"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_cry.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_hehe"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_hehe.png' width='40' height='40' />"+"</div><br>");
    }else if(statement == "mark_face_jito"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_jito.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_laugh"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_laugh.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_odoroki"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_odoroki.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_smile"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_smile.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else if(statement == "mark_face_tere"){
      $("#talk").append("<div style='text-align: right;'>Partner:"+"<img src='img/mark_face_tere.png' width='40' height='40' />"+ "　"+time_mdhm + "</div><br>");
    }else{
      $("#talk").append("<div style='text-align: right;'>Partner:"+statement+ "　"+time_mdhm + "</div><br>");
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
  $(".hid").hide();//スタンプフォームを隠す
  stamptype = true;
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
  $(".hid").hide();//スタンプフォームを隠す
  stamptype = true;
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
  $(".hid").hide();//スタンプフォームを隠す
  stamptype = true;
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
  $(".hid").hide();//スタンプフォームを隠す
  stamptype = true;
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
  $(".hid").hide();//スタンプフォームを隠す
  stamptype = true;
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
  $(".hid").hide();//スタンプフォームを隠す
  stamptype = true;
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
  $(".hid").hide();//スタンプフォームを隠す
  stamptype = true;
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
  $(".hid").hide();//スタンプフォームを隠す
  stamptype = true;
    var statement = "mark_face_smile";
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

$(document).on("click", "#stamp9", function () {
  $(".hid").hide();//スタンプフォームを隠す
  stamptype = true;
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

$(document).on("click", "#message1", function () {
  $(".message").hide();//メッセージフォームを隠す
  messagetype = true;
    var statement = "ありがとう";
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

$(document).on("click", "#message2", function () {
  $(".message").hide();//メッセージフォームを隠す
  messagetype = true;
    var statement = "いいね";
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

$(document).on("click", "#message3", function () {
  $(".message").hide();//メッセージフォームを隠す
  messagetype = true;
    var statement = "了解";
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

$(document).on("click", "#message4", function () {
  $(".message").hide();//メッセージフォームを隠す
  messagetype = true;
    var statement = "帰ったら話そう";
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

$(document).on("click", "#message5", function () {
  $(".message").hide();//メッセージフォームを隠す
  messagetype = true;
    var statement = "お疲れ様";
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

$(document).on("click", "#message6", function () {
  $(".message").hide();//メッセージフォームを隠す
  messagetype = true;
    var statement = "どういたしまして";
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

$(document).on("click", "#message7", function () {
  $(".message").hide();//メッセージフォームを隠す
  messagetype = true;
    var statement = "楽しそう";
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
    setTimeout("updateTalk()", 7000);
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

       add_statement(val.statement, val.user_type,val.created_at);
     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    console.log("エラー");
    console.log(window.localStorage.getItem("access_token_local"));
    console.log(window.localStorage.getItem("family_id"));
  });
  setTimeout("updateTalk()", 7000);
}

var stamptype = true ;//スタンプフォームが表示されているとき→false
var messagetype = true ;//メッセージフォームが表示されているとき→false

$(document).ready(function(){
  setTimeout("updateTalk()", 7000);
  $(window).scrollTop($("#under").offset().top);
  $(".hid").hide();//スタンプフォームを隠す
  $(".message").hide();//メッセージフォームを隠す

});


  $(document).on('click','#stamp',function(){
    $(".message").hide();//メッセージフォームを隠す
    messagetype = true;
  if(stamptype == true){
    $(".hid").show();//スタンプフォームを表示する
    stamptype = false;
  }else {
    $(".hid").hide();//スタンプフォームを隠す
    stamptype = true;
  }

  messagetype = true;

});

$(document).on('click','#message',function(){
$(".hid").hide();//スタンプフォームを隠す
stamptype = true;
if(messagetype == true){
  $(".message").show();//メッセージフォームを表示する
  messagetype = false;
}else {
  $(".message").hide();//メッセージフォームを隠す
  messagetype = true;
}

});
