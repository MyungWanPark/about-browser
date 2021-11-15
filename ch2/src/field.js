"use strict";

import * as sound from "./sound.js";
export const itemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

const CARROT_SIZE = 80;

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.onClick = this.onClick.bind(this);
    this.field.addEventListener("click", this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
  }

  _addItem(className, num, srcPath) {
    const x1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y1 = 0;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < num; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", srcPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(itemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(itemType.bug);
    } else {
      return;
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
