"use strict";

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const CARROT_SIZE = 80;

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
  addItem("carrot", 5, "img/carrot.png");
  addItem("bug", 5, "img/bug.png");
}

initGame();
