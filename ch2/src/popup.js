"use strict";

export default class Popup {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpMessage = document.querySelector(".pop-up__message");
    this.popUpRedo = document.querySelector(".fa-redo");
    this.popUpRedo.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popUp.classList.add("pop-up__hide");
  }

  showWithText(text) {
    this.popUp.classList.remove("pop-up__hide");
    this.popUpMessage.innerText = text;
  }
}
