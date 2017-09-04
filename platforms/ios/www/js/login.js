
$(function(){
  $(document).on('click','#login_button',function(){


    /*
     * 送信(ログイン者=夫)
     */
    if(window.localStorage.getItem("seibetu_local")=="man"){
     console.log('夫と認識しました' );//確認用
     $.ajax('https://support-spouses-communication.herokuapp.com/v1/login',
     {
     type: 'POST',
     data: {"hasband": {"email": "uaaarrrr80@emple.com", "password": "mypasssss80"}},
     //dataType: 'json',
     timeout:10000
     }
     )
     .done(function(data){
     console.log('seikou' );//確認用
     console.log(data);//確認用
     });

     /*
      * 送信(ログイン者=妻)
      */
    }else if(window.localStorage.getItem("seibetu_local")=="woman"){
       console.log('妻と認識しました' );//確認用
       $.ajax('https://support-spouses-communication.herokuapp.com/v1/login',
       {
       type: 'POST',
       data: {"wife": {"email": "uaaarr29@emple.com", "password": "mypasss29"}},
       dataType: 'json',
       timeout:10000
       }
       )
       .done(function(data){
       console.log('seikou' );//確認用
       console.log(data);//確認用
      });
       }

    });
 });
