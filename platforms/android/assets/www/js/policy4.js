

$(document).ready(function(){
  $('#send').on('click',function(){
    var answer = $('input[name=answer]:checked').val();
    console.log(answer);
    $.ajax("http://54.65.55.210/v1/question_answers",{
        type: 'POST',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        data: {"question_id": 4, "answer": answer},
        dataType: 'json',
        timeout: 10000,
    }).done(function(data) {
      console.log(data);
      window.location.href = 'sharing.html';
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });
  });
});
