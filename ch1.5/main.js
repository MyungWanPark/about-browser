const span = document.querySelector(".coordinate");
const horizontal = document.querySelector(".horizontal");
const vertical = document.querySelector(".vertical");
const image = document.querySelector("img");

document.addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  span.innerHTML = `${x}px, ${y}px`;
  span.style.top = `${y}px`;
  span.style.left = `${x}px`;
  horizontal.style.top = `${y}px`;
  vertical.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.left = `${x}px`;
});
