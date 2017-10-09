$(function(){
  // TODO すでに相手に登録されていた時に飛ばす

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
