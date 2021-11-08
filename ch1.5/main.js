const span = document.querySelector(".coordinate");
const horizontal = document.querySelector(".horizontal");
const vertical = document.querySelector(".vertical");
const image = document.querySelector("img");

addEventListener("load", () => {
  const imageRect = image.getBoundingClientRect();
  const imageHalfWidth = imageRect.width / 2;
  const imageHalfHeight = imageRect.height / 2;

  document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    span.innerHTML = `${x}px, ${y}px`;
    span.style.transform = `translate(${x}px, ${y}px)`;
    horizontal.style.transform = `translateY(${y}px)`;
    vertical.style.transform = `translateX(${x}px)`;
    image.style.transform = `translate(${x - imageHalfWidth}px, ${
      y - imageHalfHeight
    }px)`;
  });
});
