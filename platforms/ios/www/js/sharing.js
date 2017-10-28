var your_answer = [];

$.ajax("http://54.65.55.210//v1/question_answers/my_answers",{
    type: 'GET',
    async: false,
    headers: {
      'Authorization': window.localStorage.getItem("access_token_local"),
      'UserType': window.localStorage.getItem("seibetu_local"),
    },
    timeout: 10000,
}).done(function(data) {
  data.forEach(function(val,index,ar){
    your_answer.push(val.answer);
  });
}).fail(function(jqXHR, statusText, errorThrown) {
});


$(document).ready(function(){

  var updateGap = function(){
    var partner_answer = [];

    $.ajax("http://54.65.55.210//v1/question_answers/",{
        type: 'GET',
        async: false,
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        timeout: 10000,
    }).done(function(data) {
      data.forEach(function(val,index,ar){
        partner_answer.push(val.answer);
        $("#partner_answer").append("質問"+(index+1)+":"+val.answer+"<br />")
      });
    }).fail(function(jqXHR, statusText, errorThrown) {
    });

    if(partner_answer.length != 0 && your_answer.length != 0){
      var question_num = 4;
      var matched = 0;
      for(var i = 0; i < question_num; i++){
        if (partner_answer[i] === your_answer[i]){
          matched++;
        }
      }
      percent = 100 - (matched / question_num * 100)
      $("#share").text("相手との違いは"+percent+"%です。");
      $("#show_answer").show();
    }else{
      setInterval(updateGap, 3000);
    }
  }
  updateGap();
});

$(document).ready(function(){
  $('#btn_show').on('click',function(){
    $("#partner_answer").show()
  });
});
