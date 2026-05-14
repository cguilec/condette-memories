let images = [];
let currentIndex = 0;

async function loadImages() {
  try {
    const response = await fetch("images.json");
    images = await response.json();

    images.sort();

    if (images.length > 0) {
      showImage();
    }
  } catch (error) {
    console.error("Erreur chargement images:", error);
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

loadImages();
