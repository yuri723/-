$(function(){
  access_token=window.localStorage.getItem("access_token_local");
  $(document).on('click','#partner_button',function(){
    var email = $("#pare-email").val();
    if (window.localStorage.getItem("seibetu_local") == "hasband"){
      search_url = "http://54.65.55.210/v1/hasbands/search_partner?partner_email=";
      type = "hasband";
    }else{
      search_url = "http://54.65.55.210/v1/wives/search_partner?partner_email=";
      type = "wife";
    }

    // ユーザ検索
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
        // ユーザ登録
        $.ajax("http://54.65.55.210/v1/families",{
            type: 'POST',
            headers: {
              'Authorization': window.localStorage.getItem("access_token_local"),
              'UserType': type
            },
            data: {"partner_id": data[0].id},
            dataType: 'json',
            timeout: 10000,
        }).done(function(data) {
          // 家族情報取得
          $.ajax("http://54.65.55.210/v1/families/search ",{
              type: 'GET',
              headers: {
                'Authorization': window.localStorage.getItem("access_token_local"),
                'UserType': window.localStorage.getItem("seibetu_local"),
              },
              timeout: 10000,
          }).done(function(data) {
              window.localStorage.setItem("family_id",data.id);
              window.location.href = 'child.html';
          }).fail(function(jqXHR, statusText, errorThrown) {
            Materialize.toast("登録に失敗しました", 4000);
          });
        }).fail(function(jqXHR, statusText, errorThrown) {
        });
      }else if(data.length==0){
        Materialize.toast("入力されたメールアドレスは登録されていません", 4000);
      }else if(data.length > 1){
        Materialize.toast("正しくメールアドレスを入力してください", 4000);
      };
    }).fail(function(jqXHR, statusText, errorThrown) {
    });

   });
 });

// 相手によって登録されないか定期的にチェック
$(document).ready(function(){
  var checkPartner = function(){
    $.ajax("http://54.65.55.210/v1/families/search ",{
        type: 'GET',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        timeout: 10000,
    }).done(function(data) {
      if(data != null){
        alert("相手によって登録されています。次の画面へ移動します。");
        window.localStorage.setItem("family_id",data.id);
        window.location.href = 'child.html';
      }
    }).fail(function(jqXHR, statusText, errorThrown) {
      return;
    });
  }
  setInterval(checkPartner, 3000);
});

$(function(){
jQuery("#partner_id_form").validationEngine();
});
