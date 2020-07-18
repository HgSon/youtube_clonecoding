const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsFullScrnBtn");
const totalTime = document.getElementById("jsTotalTime");
const currentTime = document.getElementById("jsCurrentTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "post",
  });
};
function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}
function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
}
function exitFullScreen() {
  document.exitFullscreen();
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"><i>';
  fullScrnBtn.removeEventListener("click", exitFullScreen);
  fullScrnBtn.addEventListener("click", goFullScreen);
}
function goFullScreen() {
  videoContainer.requestFullscreen();
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"><i>';
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}
const formatDate = (rawSeconds) => {
  const totalSeconds = parseInt(rawSeconds, 10);
  let hours = parseInt(totalSeconds / 3600);
  //Math.floor
  let minites = parseInt((totalSeconds - hours * 3600) / 60);
  let seconds = parseInt(totalSeconds - hours * 3600 - minites * 60);
  if (hours < 10) hours = `0${hours}`;
  if (minites < 10) minites = `0${minites}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${hours}:${minites}:${seconds}`;
};
function setTotalTime() {
  totalTime.innerHTML = formatDate(Math.floor(videoPlayer.duration));
  setInterval(getCurrentTime, 1000);
}
//htmlMediaElement mdn에서 검색
function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}
function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  registerView();
}
function handleDrag() {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value > 0.7) volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  else if (value > 0.2)
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  else volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
}
function init() {
  videoPlayer.currentTime = 400;
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}
if (videoContainer) {
  init();
}
