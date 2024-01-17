let video = document.querySelector("video");
const recordBtn = document.getElementById("record-btn");
const captureBtn = document.getElementById("capture-btn");
let mediaRecorder;
let chunks = [];

let constraints = {
  video: true,
  audio: false,
};

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video.srcObject = stream;
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  recordBtn.onclick = recordBtnClickHandler;
  mediaRecorder.onstop = stopHandler;
});

const stopHandler = () => {
  const blob = new Blob(chunks, {
    type: "video/webm",
  });
  chunks = [];
  const url = URL.createObjectURL(blob);
  // Create a temporary link and trigger the download
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "recorded-video.webm";
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const recordBtnClickHandler = (ß) => {
  if (mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    recordBtn.classList.remove("scale-record");
  } else {
    mediaRecorder.start();
    recordBtn.classList.add("scale-record");
  }
};
