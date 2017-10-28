
$(document).ready(function(){

  $(document).on('click','#partner_button',function(){
    // modal起動
    var name   = $("#childname").val();
    var date   = $('#childdate').val();


    $("#confirm").empty();
    $("#confirm").append("名前:"+ name);
    $("#confirm").append("<br />生年月日:"+ date);

    $('#confirm-modal').modal('open');
  });

  $('#decide').on('click',function(){
    var name   = $("#childname").val();
    var date   = $('#childdate').val();
    if(name == "" || date == ""){
      alert("データを正しく入力してください");
      return;
    }
    $.ajax("http://54.65.55.210/v1/children",{
      type: 'POST',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local")
      },
      data:  {
        "name": name,
        "birthday": date,
        "family_id": window.localStorage.getItem("family_id")
      },
      dataType: 'json',
      async: false,
      timeout:10000
    }).done(function(data,status, jqxhr){
      window.location.href = 'policy.html';
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });
  });

  $(document).on('click','#skip',function(){
    window.location.href = 'policy.html';
  });

});

$(document).ready(function(){
  $('.modal').modal();
});
