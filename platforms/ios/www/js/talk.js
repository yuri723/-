function add_statement(statement, user_type, name, created_at,user_id){
  //時間表示の処理
   var time_unix = created_at;
   var time_month = time_unix.substr(5,2);
   var time_date = time_unix.substr(8,2);
   var time_hour = time_unix.substr(11,2);
   var time_min = time_unix.substr(14,2);
   var time_mdhm = time_month + "/"+time_date + " "+ time_hour +":"+time_min ;

  if(user_id==100&&user_type=="Hasband"){
      $("#talk").append("<div style='text-align: right;'>"+"bot"+":"+statement+ "<br /><font size='1'>"+time_mdhm + "</font></div><br>");
  }else if(user_type == capitalizeFirstLetter(window.localStorage.getItem("seibetu_local"))){
    if(statement == "mark_face_angry"){
      $("#talk").append("<div>"+name+":<img src='img/mark_face_angry.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_ase"){
      $("#talk").append("<div>"+name+":<img src='img/mark_face_ase.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_cry"){
      $("#talk").append("<div>"+name+":<img src='img/mark_face_cry.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_hehe"){
      $("#talk").append("<div>"+name+":<img src='img/mark_face_hehe.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_jito"){
      $("#talk").append("<div>"+name+":<img src='img/mark_face_jito.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_laugh"){
      $("#talk").append("<div>"+name+":<img src='img/mark_face_laugh.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_odoroki"){
      $("#talk").append("<div>"+name+":<img src='img/mark_face_odoroki.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_smile"){
      $("#talk").append("<div>"+name+":<img src='img/mark_face_smile.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_tere"){
      $("#talk").append("<div>"+name+":<img src='img/mark_face_tere.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else {
      $("#talk").append("<div>"+name+":"+statement+ "<br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }

  }else{
    if(statement == "mark_face_angry"){
      $("#talk").append("<div style='text-align: right;'>"+name+":<img src='img/mark_face_angry.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_ase"){
      $("#talk").append("<div style='text-align: right;'>"+name+":<img src='img/mark_face_ase.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_cry"){
      $("#talk").append("<div style='text-align: right;'>"+name+":<img src='img/mark_face_cry.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_hehe"){
      $("#talk").append("<div style='text-align: right;'>"+name+":<img src='img/mark_face_hehe.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_jito"){
      $("#talk").append("<div style='text-align: right;'>"+name+":<img src='img/mark_face_jito.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_laugh"){
      $("#talk").append("<div style='text-align: right;'>"+name+":<img src='img/mark_face_laugh.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_odoroki"){
      $("#talk").append("<div style='text-align: right;'>"+name+":<img src='img/mark_face_odoroki.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_smile"){
      $("#talk").append("<div style='text-align: right;'>"+name+":<img src='img/mark_face_smile.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else if(statement == "mark_face_tere"){
      $("#talk").append("<div style='text-align: right;'>"+name+":<img src='img/mark_face_tere.png' width='40' height='40' /><br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }else{
      $("#talk").append("<div style='text-align: right;'>"+name+":"+statement+ "<br /><font size='1'>"+time_mdhm + "</font></div><br>");
    }

  }
}

// family_idが無いならエラー
(function () {
  if(window.localStorage.getItem("family_id") == null){
    $.ajax("http://54.65.55.210/v1/families/search ",{
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
  $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/talks",{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      async: false,
      timeout: 10000,
  }).done(function(data) {
    data.sort(function(a,b){
        if(a.id < b.id) return -1;
        if(a.id > b.id) return 1;
        return 0;
    });
    console.log(data)
    data.forEach(function(val,index,ar){
       add_statement(val.statement, val.user_type, val.name, val.created_at,val.user_id);
     });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("取得エラー");
    window.localStorage.clear();
    window.location.href = 'login.html';
  });
});

function send(statement) {
  $.ajax("http://54.65.55.210//v1/families/"+window.localStorage.getItem("family_id")+"/talks",{
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
};

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

  setTimeout("updateTalk()", 2000);

  var now = new Date();
  var month = toDoubleDigits(now.getMonth()+1);
  var day   = toDoubleDigits(now.getDate());
  var hours = toDoubleDigits(now.getHours());
  var minutes = toDoubleDigits(now.getMinutes());
  var old_seconds = toDoubleDigits(now.getSeconds() - 2);
  var now_seconds = toDoubleDigits(now.getSeconds());

  // TODO 秒が-になる雑な計算どうにか
  if(old_seconds < 0){
    var old_seconds = "00";
  }

  var time_old = now.getFullYear()+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+old_seconds;
  var time_now = now.getFullYear()+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+now_seconds;
  console.log("old:"+time_old);
  console.log("now:"+time_now);
  $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/talks/search_from_range?start_time="+time_old+"&end_time="+time_now,{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      timeout: 10000,
  }).done(function(data) {
    console.log(data);
    data.forEach(function(val,index,ar){
       add_statement(val.statement, val.user_type, val.name, val.created_at,val.user_id);
     });
  }).fail(function(jqXHR, statusText, errorThrown) {

  });
}

$(document).ready(function(){
  setTimeout("updateTalk()", 2000);
  $(window).scrollTop($("#under").offset().top);
});

$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('.modal').modal();
});
