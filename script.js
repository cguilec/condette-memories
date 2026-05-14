let images = [];
let currentIndex = 0;

let touchStartX = 0;
let touchEndX = 0;

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

  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  showImage();
}

function prevImage() {
  if (!images.length) return;

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  showImage();
}

const container = document.querySelector(".container");

container.addEventListener("touchstart", function(e) {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

container.addEventListener("touchend", function(e) {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const delta = touchEndX - touchStartX;

  if (Math.abs(delta) < 40) return;

  if (delta < 0) {
    nextImage();
  } else {
    prevImage();
  }
}

loadImages();