"use strict";

import { GameBuilder, Reason } from "./game.js";
import PopUp from "./popup.js";
import * as sound from "./sound.js";

const game = new GameBuilder()
  .carrotCount(5) //
  .bugCount(5)
  .gameDuration(5)
  .build();
const gameFinishBanner = new PopUp();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay ❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = "You Win ✔";
      sound.playWin();
      break;
    case Reason.lose:
      message = "You Lost🌵";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});
gameFinishBanner.setClickListener(() => {
  game.start();
});
