import Field from "./field.js";
import * as sound from "./sound.js";

//Builder Pattern
export default class GameBuilder {
  carrotCount(numOfCarrot) {
    this.carrotCount = numOfCarrot;
    return this;
  }

  bugCount(numOfBug) {
    this.bugCount = numOfBug;
    return this;
  }

  gameDuration(duration) {
    this.GameDurationSec = duration;
    return this;
  }

  build() {
    return new Game(
      this.carrotCount, //
      this.bugCount,
      this.gameDuration
    );
  }
}

class Game {
  constructor(carrotCount, bugCount, GameDurationSec) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.GameDurationSec = GameDurationSec;

    this.timer = document.querySelector(".game__timer");
    this.scoreBoard = document.querySelector(".game__score");
    this.gameBtn = document.querySelector(".game__button");
    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onFieldClick);

    this.intervalTimer;
    this.started = false;
    this.score = 0;
  }

  onFieldClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.showScore(this.score);

      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    } else {
      return;
    }
  };

  finish(win) {
    this.started = false;
    this.stopTimer();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
    sound.stopBackground();
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
  }

  stop() {
    this.stopTimer();
    this.hideGameBtn();
    this.onGameStop && this.onGameStop("cancel");
    sound.stopBackground();
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBackGround();
  }

  startTimer() {
    let time_left = this.GameDurationSec;
    this.showRemainingTime(time_left);

    this.intervalTimer = setInterval(() => {
      if (time_left <= 0) {
        clearInterval(this.intervalTimer);
        this.finish(false);
        return;
      }
      this.showRemainingTime(--time_left);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalTimer);
  }

  showRemainingTime(sec) {
    const minute = Math.floor(sec / 60);
    const second = sec % 60;
    this.timer.innerText = `${minute}:${second}`;
  }

  showTimerAndScore() {
    this.timer.style.visibility = "visible";
    this.scoreBoard.style.visibility = "visible";
  }

  showScore(game_score) {
    this.scoreBoard.innerText = this.carrotCount - game_score;
  }

  hideGameBtn() {
    this.gameBtn.style.visibility = "hidden";
  }

  showStopBtn() {
    const icon = document.querySelector(".fas");
    icon.classList.add("fa-stop");
    this.gameBtn.style.visibility = "visible";
    icon.classList.remove("fa-play");
  }

  initGame() {
    this.scoreBoard.innerText = this.carrotCount;
    this.score = 0;
    this.gameField.init();
  }
}
