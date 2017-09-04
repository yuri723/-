var access_token="";

$(function(){
  console.log(window.localStorage.getItem("access_token_local"));//確認用
  console.log(window.localStorage.getItem("id_local"));//確認用
  console.log(window.localStorage.getItem("email_local"));//確認用
  console.log(window.localStorage.getItem("seibetu_local"));//確認用
  console.log("start");//確認用

  access_token=window.localStorage.getItem("access_token_local");
  $(document).on('click','#partner_button',function(){


    var flagman2 = document.getElementById("man2").checked; //チェックボックスが男に入っていることを確認する(true=男)
    var flagwoman2 = document.getElementById("woman2").checked;//チェックボックスが女に入っていることを確認する(true=女)

    /*
     * 送信(夫が妻を検索)
     */
    if (flagwoman2 == true){
    $.ajax('https://support-spouses-communication.herokuapp.com/v1/hasbands/search_partner?partner_email=user@example',
    {
       type: 'GET',
       headers: {"Authorization": access_token,"UserType": "hasband"},

       dataType: 'json',
       timeout:10000
     }
     )
     .done(function(data){
     console.log('seikou' );//確認用
     console.log(data);//確認用
     });

    /*
    * 送信(妻が夫を検索)
    */
    }else if(flagman2 == true){
      $.ajax('https://support-spouses-communication.herokuapp.com/v1/wives/search_partner?partner_email=user@example',
      {
         type: 'GET',
         headers: {"Authorization": access_token,"UserType": "wife"},
         data: '{"email": "uaaarr@emple.com", "password": "mypasss"}',
         dataType: 'json',
         timeout:10000
       }
       )
       .done(function(data){
       console.log('seikou' );//確認用
       console.log(data);//確認用
       });
    }else{

    }
   });
 });
