$(function(){
  access_token=window.localStorage.getItem("access_token_local");
  $(document).on('click','#partner_button',function(){
    var email = $("#pare-email").val();

    if (window.localStorage.getItem("seibetu_local") == "hasband"){
      search_url = "https://support-spouses-communication.herokuapp.com/v1/wives/search_partner?partner_email=";
      type = "hasband";
    }else{
      search_url = "https://support-spouses-communication.herokuapp.com/v1/wives/search_partner?partner_email=";
      type = "wife";
    }

    $.ajax(search_url+email,{
        type: 'GET',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': type
        },
        dataType: 'json',
        timeout: 10000,
    }).done(function(data) {
      if(data.length == 1){
        $.ajax("https://support-spouses-communication.herokuapp.com/v1/families",{
            type: 'POST',
            headers: {
              'Authorization': window.localStorage.getItem("access_token_local"),
              'UserType': type
            },
            data: {"partner_id": data[0].id},
            dataType: 'json',
            timeout: 10000,
        }).done(function(data) {
          console.log(data);
          window.location.href = 'policy.html'; //画面遷移
        }).fail(function(jqXHR, statusText, errorThrown) {
        });
      }else{
        alert("検索結果が多すぎか0です");
      };
    }).fail(function(jqXHR, statusText, errorThrown) {
    });

   });
 });

$(document).ready(function(){
  var checkPartner = function(){
    console.log(window.localStorage.getItem("access_token_local"));
    console.log(window.localStorage.getItem("seibetu_local"));
    $.ajax("https://support-spouses-communication.herokuapp.com/v1/families/search ",{
        type: 'GET',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        timeout: 10000,
    }).done(function(data) {
      if(data != null){
        alert("相手によって登録されています。ホーム画面に移動します。");
        window.localStorage.setItem("family_id",data.id);
        window.location.href = 'home.html';
      }
    }).fail(function(jqXHR, statusText, errorThrown) {
      return;
    });
  }
  setInterval(checkPartner, 3000);
});
