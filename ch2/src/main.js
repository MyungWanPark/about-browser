"use strict";

import Game from "./game.js";
import PopUp from "./popup.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const game = new Game(CARROT_COUNT, BUG_COUNT, GAME_DURATION_SEC);
const gameFinishBanner = new PopUp();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      message = "Replay ❓";
      break;
    case "win":
      message = "You Win ✔";
      break;
    case "lose":
      message = "You Lost🌵";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});
gameFinishBanner.setClickListener(() => {
  game.start();
});
