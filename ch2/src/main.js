"use strict";

import GameBuilder from "./game.js";
import PopUp from "./popup.js";

const game = new GameBuilder()
  .carrotCount(5) //
  .bugCount(5)
  .gameDuration(5)
  .build();
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
