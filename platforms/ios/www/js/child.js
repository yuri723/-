
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
    var childname = document.forms.child_form.childname.value; //お子さんの名前
    var childdate = document.forms.child_form.childdate.value;//お子さんの生年月日

   /*
    * 確認用テキストに入力欄の値を入れる
    */
    $("#id_name_check").text(childname); //お子さんの名前
    $("#id_date_check").text(childdate);//お子さんの生年月日

    var flagman = document.getElementById("man").checked; //チェックボックスが男に入っていることを確認する(true=男)
    var flagwoman = document.getElementById("woman").checked;//チェックボックスが女に入っていることを確認する(true=女)

    if(flagman==true){  //チェックボックスが男に入っていたら
      var seibetu = "男性";
    }else if(flagwoman==true){  //チェックボックスが女に入っていたら
      var seibetu = "女性";
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
      $("#id_name_check").text("お子さんの名前を入力してください。");
      $("#id_date_check").text("お子さんの生年月日を入力してください。");
      $("#id_seibetu_check").text("お子さんの性別を選択してください。");

      change();

    });

  /*
   * 送信ボタンが押されたら
   */
    $(document).on('click','#send',function(){
      $.ajax("http://54.65.55.210/v1/children",
        {
        type: 'POST',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local")
        },
        data:  {"name": childname, "birthday": childdate,"family_id": window.localStorage.getItem("family_id")},
        dataType: 'json',
        async: false,
        timeout:10000
        }
        )
        .done(function(data,status, jqxhr){
          console.log(data);

          window.location.href = 'policy.html'; //画面遷移
      });
    });

    $("#form").html('送信しました');
      reset();
    });

    /*
     * スキップボタンが押されたら
     */
    $(document).on('click','#skip',function(){
          window.location.href = 'policy.html'; //画面遷移
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
