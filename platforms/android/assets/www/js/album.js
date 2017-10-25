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
    $.ajax("http://54.65.55.210/v1/families/"+window.localStorage.getItem("family_id")+"/albums",{
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
    alert("エラー: " + message);
}

$(document).ready(function(){
  $.ajax("http://54.65.55.210//v1/families/"+window.localStorage.getItem("family_id")+"/albums",{
      type: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem("access_token_local"),
        'UserType': window.localStorage.getItem("seibetu_local"),
      },
      timeout: 10000,
  }).done(function(data) {
    data.forEach(function(val,index,ar){

      $("#content").append(`\
        <div class="col s12 m6 l3">\
          <div class="card">\
            <div class="card-image">\
            <img src="${val.image.url}">\
          </div>\
          <div class="card-content">\
            【追加日】${val.created_at}\
          <div>\
        </div>`);

    });
  }).fail(function(jqXHR, statusText, errorThrown) {
    alert("エラー");
  });
});

$(document).ready(function(){
  $(".button-collapse").sideNav();
});
