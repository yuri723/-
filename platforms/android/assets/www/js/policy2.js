

$(document).ready(function(){
  $('#send').on('click',function(){
    var answer = $('input[name=answer]:checked').val();
    console.log(answer);
    $.ajax("https://support-spouses-communication.herokuapp.com/v1/question_answers",{
        type: 'POST',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        data: {"question_id": 2, "answer": answer},
        dataType: 'json',
        timeout: 10000,
    }).done(function(data) {
      console.log(data);
      window.location.href = 'policy3.html';
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });
  });
});
