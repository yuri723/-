
$(document).ready(function(){

  var updateGap = function(){
    var partner_answer = [];
    var your_answer = [];

    $.ajax("https://support-spouses-communication.herokuapp.com//v1/question_answers/",{
        type: 'GET',
        async: false,
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        timeout: 10000,
    }).done(function(data) {
      console.log(data);
      data.forEach(function(val,index,ar){
        partner_answer.push(val.answer);
      });
    }).fail(function(jqXHR, statusText, errorThrown) {
    });

    $.ajax("https://support-spouses-communication.herokuapp.com//v1/question_answers/my_answers",{
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

    if(partner_answer.length != 0 && your_answer.length != 0){
      arr = diffArray(your_answer, partner_answer);
      percent = arr.length / partner_answer.length * 100
      $("#share").text("相手との違いは"+percent+"%です。");
    }
  }
  setInterval(updateGap, 3000);

});

function diffArray(arr1, arr2) {
  var newArr = [];
  for(var a = 0 ; a < arr1.length; a++){
    if(arr2.indexOf(arr1[a]) === -1 ){
      newArr.push(arr1[a]);
    }
  }
  for(var b = 0; b < arr2.length; b++){
    if(arr1.indexOf(arr2[b]) === -1 ){
       newArr.push(arr2[b]);
       }
  }
  return newArr;
}
