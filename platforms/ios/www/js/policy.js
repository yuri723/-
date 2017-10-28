
$(document).ready(function(){
  $('#send').on('click',function(){
    var answer      = $('input[name=answer]:checked').val();
    var question_id = Number($("#question_id").text().slice(2));
    if(answer == undefined){
      alert("答えを選択してください。");
      return;
    }
    $.ajax("http://54.65.55.210/v1/question_answers",{
        type: 'POST',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        data: {"question_id": question_id, "answer": answer},
        dataType: 'json',
        timeout: 10000,
    }).done(function(data) {
      if (question_id == 4) {
        window.location.href = 'sharing.html';
      }else{
        window.location.href = 'policy'+(question_id+1)+'.html';
      }
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });
  });
});
