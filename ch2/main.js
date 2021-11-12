"use strict";

const field = document.querySelector(".game__field");
const gameBtn = document.querySelector(".game__button");
const timer = document.querySelector(".game__timer");
const score = document.querySelector(".game__score");
const popUp = document.querySelector(".pop-up");
const popUpMessage = document.querySelector(".pop-up__message");
const popUpRedo = document.querySelector(".fa-redo");

const fieldRect = field.getBoundingClientRect();
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

let intervalTimer;
let started = false;
let gameScore = 0;

field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRedo.addEventListener("click", () => {
  hidePopUp();
  startGame();
});

function finishGame(win) {
  started = false;
  stopTimer();
  showPopUpWithText(win ? "You Win!" : "You lost!");
  stopSound(bgSound);
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
}

function stopGame() {
  stopTimer();
  hideGameBtn();
  showPopUpWithText("Replay❓");
  stopSound(bgSound);
}

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startTimer();
  playSound(bgSound);
}

function startTimer() {
  let time_left = GAME_DURATION_SEC;
  showRemainingTime(time_left);

  intervalTimer = setInterval(() => {
    if (time_left <= 0) {
      clearInterval(intervalTimer);
      finishGame(false);
      return;
    }
    showRemainingTime(--time_left);
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalTimer);
}

function showRemainingTime(sec) {
  const minute = Math.floor(sec / 60);
  const second = sec % 60;
  timer.innerText = `${minute}:${second}`;
}

function showTimerAndScore() {
  timer.style.visibility = "visible";
  score.style.visibility = "visible";
}

function onFieldClick(event) {
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    gameScore++;
    showScore(gameScore);
    playSound(carrotSound);

    if (gameScore === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  } else {
    return;
  }
}

function stopSound(sound) {
  sound.pause();
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function showScore(game_score) {
  score.innerText = CARROT_COUNT - game_score;
}

function hideGameBtn() {
  gameBtn.style.visibility = "hidden";
}

function showStopBtn() {
  const icon = document.querySelector(".fas");
  icon.classList.add("fa-stop");
  gameBtn.style.visibility = "visible";
  icon.classList.remove("fa-play");
}

function showPopUpWithText(text) {
  popUp.classList.remove("pop-up__hide");
  popUpMessage.innerText = text;
}

function hidePopUp() {
  popUp.classList.add("pop-up__hide");
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function addItem(className, num, srcPath) {
  const x1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y1 = 0;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < num; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", srcPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function initGame() {
  field.innerHTML = "";
  score.innerText = CARROT_COUNT;
  gameScore = 0;
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}
