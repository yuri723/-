$(document).ready(function(){
  $.ajax("https://support-spouses-communication.herokuapp.com//v1/question_answers/",{
      type: 'GET',
      async: false,
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      timeout: 10000,
  }).done(function(data) {
    data.forEach(function(val,index,ar){
      var selector = index+1;
      $("#q"+selector).text(val.answer);
    });
  }).fail(function(jqXHR, statusText, errorThrown) {
  });
});
