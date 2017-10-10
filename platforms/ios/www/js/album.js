var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        var button = document.getElementById("photo");
        button.addEventListener("click", takePictures);
    }
};

app.initialize();

// 写真撮影ボタンを押した時に呼ばれる
function takePictures(){
    navigator.camera.getPicture(cameraSuccess, cameraError, { quality: 80, destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
}
// 写真撮影が成功した時
function cameraSuccess(image){
    $.ajax("https://support-spouses-communication.herokuapp.com/v1/families/"+window.localStorage.getItem("family_id")+"/albums",{
        type: 'POST',
        headers: {
          'Authorization': window.localStorage.getItem("access_token_local"),
          'UserType': window.localStorage.getItem("seibetu_local"),
        },
        data: {"image": "data:image/jpeg;base64," + image},
        dataType: 'json',
        timeout: 10000,
    }).done(function(data) {
      window.location.href = 'home3.html';
    }).fail(function(jqXHR, statusText, errorThrown) {
      alert("エラー");
    });
}
// 失敗した時
function cameraError(message){
    alert("Failed!!: " + message);
}

$(document).ready(function(){
  $.ajax("https://support-spouses-communication.herokuapp.com//v1/families/"+window.localStorage.getItem("family_id")+"/albums",{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      timeout: 10000,
  }).done(function(data) {
    data.forEach(function(val,index,ar){
      console.log(val);
      $("#content").append("<div>追加者:"+val.wife+"<br>追加日:"+val.created_at+"<br><img src='https://support-spouses-communication.herokuapp.com"+val.image.url+"'>");
      $("#content").append("</div>");
      $("#content").append("<hr>");
    });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });
});
