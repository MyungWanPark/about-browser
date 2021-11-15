"use strict";

import Popup from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const gameBtn = document.querySelector(".game__button");
const timer = document.querySelector(".game__timer");
const score = document.querySelector(".game__score");

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

let intervalTimer;
let started = false;
let gameScore = 0;

const gameFinishBanner = new Popup();
const gameField = new Field(CARROT_COUNT, BUG_COUNT);

gameField.setClickListener(onFieldClick);

function onFieldClick(item) {
  console.log("Im at on FieldClick");
  if (item === "carrot") {
    gameScore++;
    console.log("im here");
    showScore(gameScore);

    if (gameScore === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    finishGame(false);
  } else {
    return;
  }
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

gameFinishBanner.setClickListener(() => {
  startGame();
});

function finishGame(win) {
  started = false;
  stopTimer();
  gameFinishBanner.showWithText(win ? "You Win!" : "You lost!");
  sound.stopBackground();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
}

function stopGame() {
  stopTimer();
  hideGameBtn();
  gameFinishBanner.showWithText("Replay❓");
  sound.stopBackground();
}

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startTimer();
  sound.playBackGround();
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

function initGame() {
  score.innerText = CARROT_COUNT;
  gameScore = 0;
  gameField.init();
}
