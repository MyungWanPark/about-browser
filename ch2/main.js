const carrots = document.querySelectorAll(".carrot");
const bugs = document.querySelectorAll(".bug");
const units = document.querySelectorAll(".unit");
const Btn = document.querySelector(".Btn");
const time = document.querySelector(".time");
const leftCarrot = document.querySelector(".carrot-left");
let numOfCarrot = 10;
let totalSec = 10;
let renewalTime = 1;
let intervalID;
let isStopped;
const bg = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const playAgainBtns = document.querySelectorAll(".play-again");
const winBox = document.querySelector(".winBox");
const loseBox = document.querySelector(".loseBox");
const resumeBox = document.querySelector(".resumeBox");

Btn.addEventListener("click", () => {
  start();
});

playAgainBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    renewalTime = 1;

    start();
    winBox.style.display = "none";
    loseBox.style.display = "none";
    console.log("lose");
  });
});

function arrangeUnits() {
  units.forEach((unit) => {
    unit.style.display = "block";
    const x = Math.round(Math.random() * 10 * 100);
    const y = Math.round((Math.random() * 3 + 3) * 100);

    unit.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function start() {
  isStopped = Btn.childNodes[0].classList.contains("fa-stop-circle");

  if (renewalTime === 1) {
    numOfCarrot = 10;
    totalSec = 10;
    isStopped = false;
    arrangeUnits();

    renewalTime--;
  }

  if (isStopped) {
    bg.pause();
    Btn.innerHTML = `<i class="fas fa-play"></i>`;
    clearInterval(intervalID);
  } else {
    bg.play();
    intervalID = setInterval(() => {
      time.innerText = `00:${totalSec}`;
      totalSec--;
      if (totalSec === -1) {
        clearInterval(intervalID);
        lose();
      }
    }, 1000);

    Btn.innerHTML = `<i class="fas fa-stop-circle"></i>`;
    time.innerText = `00:${totalSec}`;
  }
}

function carrotClick(id) {
  const selectedCarrot = document.querySelector(`.carrot[data-id="${id}"]`);
  selectedCarrot.remove();
  carrotSound.play();
  numOfCarrot--;
  leftCarrot.innerText = numOfCarrot;
  if (numOfCarrot === 9) {
    win();
  }
}

function win() {
  winBox.style.display = "flex";
}

function lose() {
  loseBox.style.display = "flex";
}

carrots.forEach((carrot) => {
  carrot.addEventListener("click", (event) => {
    const carrotID = event.target.dataset.id;
    carrotClick(carrotID);
  });
});

bugs.forEach((bug) => {
  bug.addEventListener("click", (event) => {
    lose();
  });
});
