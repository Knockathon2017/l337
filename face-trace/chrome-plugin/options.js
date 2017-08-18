window.onload = () => {
  let videoDevice;

  navigator.mediaDevices.getUserMedia({ video: true }).then(gotMedia).catch();

  function gotMedia(mediaStream) {
    const _videoStreamTrack = mediaStream.getVideoTracks()[0];
    const video = document.createElement('video');
    video.src = URL.createObjectURL(new MediaStream([_videoStreamTrack]));
    video.muted = true;
    video.play();

    const canvas = document.createElement('canvas');
    canvas2dContext = canvas.getContext('2d');

    window.setInterval(() => {
      if (_videoStreamTrack.readyState === 'live') {
        if (video.videoWidth) {
          try {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas2dContext.drawImage(video, 0, 0);
            canvas.toBlob(blob => {
              processPhoto(blob);
            });
          } catch (error) {
            console.log('Err', error);
            throw new DOMException('UnknownError');
          }
        } else {
          console.log('This?');
          throw new DOMException('UnknownError');
        }
      } else {
        throw new DOMException('InvalidStateError');
      }
    }, 1000);

  }

  function processPhoto(blob) {
    console.log('Blob', blob);
    var reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      base64data = reader.result;
      console.log(base64data);
    }
  }

  function stopCamera(error) {
    console.error(error);
    if (videoDevice) videoDevice.stop();  // turn off the camera
  }


};