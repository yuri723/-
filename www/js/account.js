
$(document).ready(function(){

  $(".hid").hide();　//class="hid"を非表示にする。

     /*
      * 確認ボタンが押されたら
      */
      $(document).on('click','#check',function(){
        //event.preventDefault();   // HTMLでの送信をキャンセル(formで送信しないようにする)

      $(".fm").each( function() {
        var id = $(this).attr("id");
        var fm = $("#"+id);

      /*
       * formのtypeによって処理を行う
       */
        switch( fm.prop("type") ){

        //typeがtext・pawwwordのフォームの処理
           case 'text':
           case 'password':
             $(fm).after('<span class="hide del">'+fm.val()+'</span>');
               break;

        //typeがradioのフォームの処理
      　　  case 'radio':
              var val = $("#"+id+":checked");
              if( $(val).prop('checked') ) {
              $(fm).after('<span class="hide del">'+val.val()+'</span>');
              }
            break;
          }
    });
   change(true);

   /*
    * 入力欄の値を取得する
    */
    var account = document.forms.id_form.account.value; //アカウント名
    var email = document.forms.id_form.email.value;//Eメール
    var password = document.forms.id_form.password.value; //パスワード
    var date = document.forms.id_form.date.value;//生年月日

   /*
    * 確認用テキストに入力欄の値を入れる
    */
    $("#id_account_check").text(account); //アカウント名
    $("#id_email_check").text(email);//Eメール
    $("#id_password_check").text(password);//パスワード
    $("#id_date_check").text(date);//生年月日

    var flagman = document.getElementById("man").checked; //チェックボックスが男に入っていることを確認する(true=男)
    var flagwoman = document.getElementById("woman").checked;//チェックボックスが女に入っていることを確認する(true=女)

    if(flagman==true){  //チェックボックスが男に入っていたら
      var seibetu = "男性";
      var url = "https://support-spouses-communication.herokuapp.com/v1/hasbands"
      var role = "hasband"
    }else if(flagwoman==true){  //チェックボックスが女に入っていたら
      var seibetu = "女性";
      var url = "https://support-spouses-communication.herokuapp.com/v1/wives"
      var role = "wife"
    }

    $("#id_seibetu_check").text(seibetu);//確認用テキストに入力欄(性別)の値を入れる

    /*
     * リセットボタンが押されたら
     */
    $(document).on('click','#reset',function(){
      reset();
    });

   /*
    * 訂正ボタンが押されたら
    */
    $(document).on('click','#back',function(){

      /*
       * チェックボックスを初期化
       */
      flagman=false;
      flagwoman=false;

      /*
       * 確認用テキストを初期化する
       */
      $("#id_account_check").text("アプリ内で表示する名前を入力してください。");
      $("#id_email_check").text("メールアドレスを入力してください。");
      $("#id_password_check").text("8文字以上の英数字で入力してください。");
      $("#id_password2_check").text("確認のためにパスワードを再度入力してください。");
      $("#id_date_check").text("生年月日を入力してください。");
      $("#id_seibetu_check").text("性別を選択してください。");

      change();

    });

  /*
   * 送信ボタンが押されたら
   */
    $(document).on('click','#send',function(){
      if(role == "hasband"){
        var data = {"hasband": {"email": email, "password": password, "name": account, "birthday": date}};
      }else{
        var data = {"wife": {"email": email, "password": password, "name": account, "birthday": date}};
      }
      console.log(data);
      $.ajax(url,
        {
        type: 'POST',
        data: data,
        dataType: 'json',
        async: false,
        timeout:10000
        }
        )
        .done(function(data,status, jqxhr){
          console.log(data);
          console.log(data);

          access_token = data.access_token;　//アクセストークン
          id = data.id; //ID
          email = data.email;//Ｅメール

          window.localStorage.setItem("access_token_local",access_token);
          window.localStorage.setItem("id_local",id);
          window.localStorage.setItem("email_local",email);
          window.localStorage.setItem("seibetu_local",role);

          window.localStorage.setItem("name_local",account);
          window.localStorage.setItem("password_local",password);
          window.localStorage.setItem("date_local",date);

          window.location.href = 'partner.html'; //画面遷移
      });
    });

    $("#form").html('送信しました');
      reset();
    });

  /*
   * フォームを初期化する
   */
    var reset = function(type){
        $('input,textarea').not('input[type=\"radio\"],input[type=\"checkbox\"],:hidden, :button, :submit,:reset').val('');
        $('input[type=\"radio\"], input[type=\"checkbox\"],select').removeAttr('checked').removeAttr('selected');
        $("option").attr('selected',false);
    };

  /*
   * 表示・非表示を制御する
   */
    var change = function(type){
      if(type === true){
        $(".def").hide();
        $(".hid").show();
      }else{
        $(".def").show();
        $(".hid").hide();
        $(".del").remove();
      }
    };
  });
