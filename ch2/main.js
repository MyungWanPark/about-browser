"use strict";

const field = document.querySelector(".game__field");
const gameBtn = document.querySelector(".game__button");
const timer = document.querySelector(".game__timer");
const score = document.querySelector(".game__score");
const fieldRect = field.getBoundingClientRect();
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

let started = false;

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function stopGame() {}

function startGame() {
  initGame();
  showStopBtn();
  showTimerAndScore();
  startTimer();
}

function startTimer() {
  let time_left = GAME_DURATION_SEC;
  showRemainingTime(time_left);

  const timer = setInterval(() => {
    if (time_left <= 0) {
      clearInterval(timer);
      return;
    }
    showRemainingTime(--time_left);
  }, 1000);
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

function showStopBtn() {
  const icon = document.querySelector(".fa-play");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
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
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}
