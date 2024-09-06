const speed = 0.01;
const textItems = [
  { id: "mysql", angle: 0 },
  { id: "css", angle: (Math.PI * 2) / 6 },
  { id: "bootstrap", angle: ((Math.PI * 2) / 6) * 2 },
  { id: "c-plus-plus", angle: ((Math.PI * 2) / 6) * 3 },
  { id: "html", angle: ((Math.PI * 2) / 6) * 4 },
  { id: "javascript", angle: ((Math.PI * 2) / 6) * 5 },
];

const circleContainer = document.getElementById("circle-container");
let circleRadius, centerX, centerY;

function updateDimensions() {
  const containerRect = circleContainer.getBoundingClientRect();
  const img = circleContainer.querySelector("img");
  const imgAspectRatio = img.width / img.height;
  const containerAspectRatio = containerRect.width / containerRect.height;

  if (imgAspectRatio > containerAspectRatio) {
    circleRadius = containerRect.width * 0.58;
    centerX = containerRect.width;
    centerY = img.height + (containerRect.height - img.height) - 50;
  } else {
    circleRadius = containerRect.height * 0.5;
    centerX = containerRect.width;
    centerY = containerRect.height - circleRadius + 80;
  }
}

function updateTextPositions() {
  textItems.forEach((item) => {
    const element = document.getElementById(item.id);
    const x = centerX + circleRadius * Math.cos(item.angle);
    const y = centerY + circleRadius * Math.sin(item.angle);
    const opacity = -Math.sin(item.angle) * 3;

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.opacity = `${(opacity + 1) / 3}`;

    item.angle += speed;
  });

  requestAnimationFrame(updateTextPositions);
}

function handleResize() {
  const img = circleContainer.querySelector("img");
  if (img.complete) {
    updateDimensions();
  } else {
    img.addEventListener("load", updateDimensions);
  }
}

window.addEventListener("resize", handleResize);
handleResize();
updateTextPositions();
