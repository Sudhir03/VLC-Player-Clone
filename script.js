"use strict";

// video file input

const videoInput = document.getElementById("videoInput");
const videoInputFile = document.getElementById("videoInputFile");

// Controls

const speedUp = document.getElementById("speedUP");
const speedDown = document.getElementById("speedDown");
const volumeUp = document.getElementById("volumeUp");
const volumeDown = document.getElementById("volumeDown");

const currentDuration = document.getElementById("currentDuration");

const backwardBtn = document.getElementById("backward");
const forwardBtn = document.getElementById("forward");
const playBtn = document.getElementById("playVideo");
const pauseBtn = document.getElementById("pauseVideo");
const fullScreenBtn = document.getElementById("fullScreen");

// video section

const videoPlayer = document.getElementById("main");
let video;
let totalVideoDuration;

// generic functions

const showToast = (msg) => {
  const toast = document.querySelector(".toast");
  toast.textContent = msg;
  toast.style.display = "block";

  setTimeout(function () {
    toast.style.display = "none";
  }, 1000);
};

const updateValues = (obj) => {
  video = document.getElementById("video");
  const currentRange = document.getElementById("currentRange");
  currentRange.setAttribute("max", Math.floor(video.duration).toString());

  updateTotalDurration(video.duration);
  totalVideoDuration = video.duration;

  video.addEventListener("timeupdate", function () {
    setInterval(function () {
      updateCurrentDuration(video.currentTime);
      updateRange(video.currentTime);
    }, 1000);
  });
};

const updateCurrentDuration = (seconds) => {
  const currentDuration = document.getElementById("currentDuration");
  let minutes = Math.floor(seconds / 60);
  minutes = minutes < 10 ? minutes.toString().padStart(2, "0") : minutes;
  let remaingSeconds = Math.floor(seconds % 60);
  remaingSeconds =
    remaingSeconds < 10
      ? remaingSeconds.toString().padStart(2, "0")
      : remaingSeconds;

  currentDuration.textContent = `${minutes}:${remaingSeconds}`;
};

const updateRange = (val) => {
  const currentRange = document.getElementById("currentRange");
  currentRange.value = val;
};

const updateTotalDurration = (seconds) => {
  const totalDuration = document.getElementById("totalDuration");
  let minutes = Math.floor(seconds / 60);
  minutes = minutes < 10 ? minutes.toString().padStart(2, "0") : minutes;
  let remaingSeconds = Math.floor(seconds % 60);
  remaingSeconds =
    remaingSeconds < 10
      ? remaingSeconds.toString().padStart(2, "0")
      : remaingSeconds;

  totalDuration.textContent = `${minutes}:${remaingSeconds}`;
};

const videoInputHandler = () => {
  // console.log("open btn clicked");
  const el = document.getElementById("video");
  if (el) {
    el.remove();
  }
  videoInputFile.click();
};

const inputFileHandler = (obj) => {
  const videoFile = obj.target.files[0];
  const videoLink = URL.createObjectURL(videoFile);
  const videoEl = document.createElement("video");
  videoEl.src = videoLink;
  videoEl.setAttribute("class", "video");
  videoEl.setAttribute("id", "video");
  videoEl.setAttribute("controls", "");
  videoEl.setAttribute("controls", "");
  videoEl.setAttribute("controlsList", "nodownload");

  videoPlayer.appendChild(videoEl);
  videoEl.addEventListener("loadedmetadata", updateValues);
};

const speedUpHandler = function () {
  // console.log("speed up clicked");
  const videoEl = document.getElementById("video");
  if (videoEl) {
    let message;
    if (videoEl.playbackRate >= 2) {
      message = `Speed ${videoEl.playbackRate}x`;
      showToast(message);
      return;
    }
    videoEl.playbackRate += 0.5;
    message = `Speed ${videoEl.playbackRate}x`;
    showToast(message);
  }
};
const speedDownHandler = function () {
  // console.log("speed down clicked");
  const videoEl = document.getElementById("video");
  if (videoEl) {
    let message;
    if (videoEl.playbackRate <= 0) {
      message = `Speed ${videoEl.playbackRate}x`;
      showToast(message);
      return;
    }
    videoEl.playbackRate -= 0.5;
    message = `Speed ${videoEl.playbackRate}x`;
    showToast(message);
  }
};
const volumeUpHandler = function () {
  // console.log("volume up clicked");
  const videoEl = document.getElementById("video");
  if (videoEl) {
    let message;
    if (videoEl.volume >= 1) {
      message = `Volume ${100}%`;
      showToast(message);
      return;
    }
    const curruntVolume = videoEl.volume;
    videoEl.volume = curruntVolume + 0.2;
    const volPercentage = Math.floor(videoEl.volume * 100);
    message = `Volume ${volPercentage}%`;
    showToast(message);
  }
};
const volumeDownHandler = function () {
  // console.log("volume down clicked");
  const videoEl = document.getElementById("video");

  if (videoEl) {
    let message;
    if (videoEl.volume <= 0.2) {
      message = `Volume ${0}%`;
      showToast(message);
      return;
    }
    const curruntVolume = videoEl.volume;
    videoEl.volume = curruntVolume - 0.2;
    const volPercentage = Math.floor(videoEl.volume * 100);
    message = `Volume ${volPercentage}%`;
    showToast(message);
  }
};

const backwardVideoHandler = () => {
  const video = document.getElementById("video");
  if (video) {
    const currentDuration = video.currentTime;
    video.currentTime = currentDuration - 10 < 0 ? 0 : currentDuration - 10;
    console.log(video.currentTime);
  }
};

const forwardVideoHandler = () => {
  const video = document.getElementById("video");
  if (video) {
    const currentDuration = video.currentTime;
    video.currentTime =
      currentDuration + 10 > totalVideoDuration
        ? totalVideoDuration
        : currentDuration + 10;
    console.log(video.currentTime);
  }
};

const playVideoHandler = () => {
  const video = document.getElementById("video");
  if (video) {
    video.play();

    pauseBtn.classList.remove("hidden");
    playBtn.classList.add("hidden");
  }
};

const pauseVideoHandler = () => {
  const video = document.getElementById("video");
  if (video) {
    video.pause();

    pauseBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");
  }
};

const fullScreenHandler = () => {
  const videoPlayer = document.getElementById("main");
  videoPlayer.requestFullscreen();
};

// event listeners

videoInput.addEventListener("click", videoInputHandler);
videoInputFile.addEventListener("change", inputFileHandler);

speedUp.addEventListener("click", speedUpHandler);
speedDown.addEventListener("click", speedDownHandler);
volumeUp.addEventListener("click", volumeUpHandler);
volumeDown.addEventListener("click", volumeDownHandler);

backwardBtn.addEventListener("click", backwardVideoHandler);
forwardBtn.addEventListener("click", forwardVideoHandler);
playBtn.addEventListener("click", playVideoHandler);
pauseBtn.addEventListener("click", pauseVideoHandler);
fullScreenBtn.addEventListener("click", fullScreenHandler);
