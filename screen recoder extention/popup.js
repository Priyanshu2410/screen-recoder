let mediaRecorder;
let recordedChunks = [];

function startRecording() {
  const constraints = {
    video: {
      mandatory: {
        chromeMediaSource: 'desktop'
      }
    }
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
    })
    .catch(function (error) {
      console.error("Error accessing media devices.", error);
    });
}

function handleDataAvailable(event) {
  recordedChunks.push(event.data);
}

function stopRecording() {
  mediaRecorder.stop();

  const blob = new Blob(recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "screen_recording.webm";
  a.click();

  recordedChunks = [];
}

document.getElementById("startBtn").addEventListener("click", startRecording);
document.getElementById("stopBtn").addEventListener("click", stopRecording);
