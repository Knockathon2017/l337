let videoStream;
let intervalId;
let currentUrl;
let videoDevice;
let video;
let canvas;
let userEmail;

function processPhoto(blob) {
  var reader = new window.FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    base64Data = reader.result.replace('data:image/png;base64,', '');
    let data = {
      base64Data,
      url: currentUrl,
      userId: userEmail
    }
    postData(data);
  };
}

function stopCamera(error) {
  if (error) console.error(error);
  if (intervalId) clearInterval(intervalId);
  if (videoDevice) {
    videoDevice.stop();
    storeTrackingStatus(false);
  }
}

function postData(data) {
  $.ajax({
    method: 'POST',
    url: 'http://172.16.1.128:8989/v1/traceData/',
    cache: false,
    contentType: 'application/json',
    data: JSON.stringify(data)
  }).done((response) => {
    console.log('Response', response)
  }).fail((error) => {
    console.error(error);
  });
}

function startCamera() {
  getUserDetails();
  navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
    storeTrackingStatus(true);
    videoStream = mediaStream;
    videoDevice = mediaStream.getVideoTracks()[0];
    video = document.createElement('video');
    video.src = URL.createObjectURL(new MediaStream([videoDevice]));
    video.muted = true;
    video.play();

    canvas = document.createElement('canvas');
    canvas2dContext = canvas.getContext('2d');
    console.log('This', this);

    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
      currentUrl = tabs[0].url;
    });

    intervalId = window.setInterval(getImageBlob, 10000);
  }).catch();
}

function getImageBlob() {
  if (videoDevice.readyState === 'live') {
    if (video.videoWidth) {
      try {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas2dContext.drawImage(video, 0, 0);
        canvas.toBlob(blob => {
          processPhoto(blob);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Unknown error');
    }
  } else {
    console.error('Invalid state error');
  }
}

function getUserDetails() {
  chrome.identity.getProfileUserInfo(function (userInfo) {
    userEmail = userInfo.email ? userInfo.email : 'testuser@test.com';
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'urlFetch':
      currentUrl = request.url;
      break;

    case 'startCamera':
      startCamera();
      break;

    case 'stopCamera':
      stopCamera();
      break;

    default:
      break;
  }

  sendResponse();
});

function storeTrackingStatus(status) {
    chrome.storage.local.set({ 'shouldTrack': status }, () => {});
}