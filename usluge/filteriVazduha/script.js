document.addEventListener("DOMContentLoaded", function () {
    const clientCards = document.querySelectorAll(".client-card");
    const popup = document.querySelector("#popup-modal");
    const popupTitle = document.querySelector("#popup-title");
    const popupImage = document.querySelector("#popup-image");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let images = [];
    let titles = [];
    let currentIndex = 0;

    // Funkcija za otvaranje popupa
    function openPopup(index) {
        popup.classList.add("active");
        currentIndex = index;
        showImage(currentIndex);
    }

    // Funkcija za prikazivanje slike u slideru
    function showImage(index) {
        popupTitle.textContent = titles[index];
        popupImage.src = images[index];
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
        const productTitle = card.querySelector(".product-title").textContent;
        const sliderImages = card.querySelectorAll(".popup-products img");

        mainImage.addEventListener("click", () => {
            images = Array.from(sliderImages).map(img => img.src);
            titles = Array.from(sliderImages).map(img => img.previousElementSibling.textContent);

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
