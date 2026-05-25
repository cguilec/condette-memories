let allImages = [];
let images = [];
let currentIndex = 0;

let startX = 0;
let endX = 0;
let isMouseDown = false;

async function loadImages() {
  const response = await fetch("images.json");
  allImages = await response.json();
  allImages.sort();

  createYearButtons();
}

function createYearButtons() {
  const selector = document.getElementById("yearSelector");

  const years = [...new Set(
    allImages.map(img => img.substring(7, 11))
  )];

  years.forEach(year => {
    const btn = document.createElement("button");
    btn.textContent = year;
    btn.onclick = () => selectYear(year);
    selector.appendChild(btn);
  });
}

function selectYear(year) {
  images = allImages.filter(img => img.includes(year));
  currentIndex = 0;

  document.getElementById("yearSelector").style.display = "none";
  document.querySelector(".container").style.display = "flex";

  showImage();
}

function showImage() {
  document.getElementById("memoryImage").src = images[currentIndex];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}

function handleSwipe() {
  const delta = endX - startX;

  if (Math.abs(delta) < 50) return;

  if (delta < 0) nextImage();
  else prevImage();
}

const container = document.querySelector(".container");

container.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

container.addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

container.addEventListener("mousedown", e => {
  isMouseDown = true;
  startX = e.clientX;
});

container.addEventListener("mouseup", e => {
  if (!isMouseDown) return;

  endX = e.clientX;
  isMouseDown = false;
  handleSwipe();
});

window.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

loadImages();