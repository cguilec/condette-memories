let images = [];
let currentIndex = 0;

let startX = 0;
let endX = 0;
let isMouseDown = false;

async function loadImages() {
  try {
    const response = await fetch("images.json");
    images = await response.json();
    images.sort();

    if (images.length > 0) {
      showImage();
    }
  } catch (err) {
    console.error(err);
  }
}

function showImage() {
  document.getElementById("memoryImage").src = images[currentIndex];
}

function nextImage() {
  if (!images.length) return;
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

function prevImage() {
  if (!images.length) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}

function handleSwipe() {
  const delta = endX - startX;

  if (Math.abs(delta) < 50) return;

  if (delta < 0) {
    nextImage();
  } else {
    prevImage();
  }
}

const container = document.querySelector(".container");

//
// MOBILE
//
container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

container.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

//
// PC SOURIS
//
container.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  startX = e.clientX;
});

container.addEventListener("mouseup", (e) => {
  if (!isMouseDown) return;

  endX = e.clientX;
  isMouseDown = false;
  handleSwipe();
});

container.addEventListener("mouseleave", () => {
  isMouseDown = false;
});

loadImages();
