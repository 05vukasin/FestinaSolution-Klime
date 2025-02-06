document.addEventListener("DOMContentLoaded", function () {
    const clientCards = document.querySelectorAll(".client-card");
    const popup = document.createElement("div");
    popup.classList.add("image-popup");

    popup.innerHTML = `
        <button class="close-btn">&times;</button>
        <button class="prev-btn">&#10094;</button>
        <div class="popup-content"></div>
        <button class="next-btn">&#10095;</button>
    `;

    document.body.appendChild(popup);

    const popupContent = popup.querySelector(".popup-content");
    const closeBtn = popup.querySelector(".close-btn");
    const prevBtn = popup.querySelector(".prev-btn");
    const nextBtn = popup.querySelector(".next-btn");

    let images = [];
    let currentIndex = 0;

    // Funkcija za otvaranje popupa
    function openPopup(index) {
        popup.classList.add("active");
        currentIndex = index;
        showImage(currentIndex);
    }

    // Funkcija za prikazivanje slike u slideru
    function showImage(index) {
        popupContent.innerHTML = "";
        const img = document.createElement("img");
        img.src = images[index];
        img.classList.add("active");
        popupContent.appendChild(img);
    }

    // Funkcija za zatvaranje popupa
    function closePopup() {
        popup.classList.remove("active");
    }

    // Funkcija za sledeću sliku
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    // Funkcija za prethodnu sliku
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // Dodaj event listenere za dugmad
    closeBtn.addEventListener("click", closePopup);
    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);
    popup.addEventListener("click", (e) => {
        if (e.target === popup) closePopup();
    });

    // Postavljanje event listenera za svaku karticu
    clientCards.forEach((card) => {
        const mainImage = card.querySelector("img");
        const sliderImages = card.querySelectorAll(".image-slider-popup img");

        mainImage.addEventListener("click", () => {
            images = Array.from(sliderImages).map(img => img.src);
            if (images.length > 0) {
                openPopup(0);
            }
        });
    });

    // Omogućavanje skrolovanjem strelicama na tastaturi
    document.addEventListener("keydown", (e) => {
        if (popup.classList.contains("active")) {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") closePopup();
        }
    });
});
