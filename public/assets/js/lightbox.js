let DOMLightbox = document.querySelector(".lightbox");
let DOMLightboxImage = DOMLightbox.querySelector("img");
let DOMLightboxElements = document.querySelectorAll("*[lightbox]");

DOMLightboxElements.forEach((DOMLightboxElement) => {
    DOMLightboxElement.addEventListener('click', (event) => {
        openLightbox(event.target.getAttribute('lightbox'));
    });
});

DOMLightbox.addEventListener('click', () => {
    closeLightbox();
});

function openLightbox( imageSource ) {
    DOMLightboxImage.src = imageSource;
    DOMLightbox.classList.add("active");
}

function closeLightbox() {
    DOMLightbox.classList.remove("active");
    DOMLightboxImage.src = "";
}