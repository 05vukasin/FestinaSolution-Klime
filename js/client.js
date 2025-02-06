document.addEventListener("DOMContentLoaded", function () {
    const clientContainer = document.querySelector(".client-container");
    let scrollDirection = 1; // 1 za desno, -1 za levo
    let scrolling = false;
    let scrollSpeed = 1; // Brzina skrolovanja

    // Funkcija za proveru da li je uređaj veći od 1024px
    function isLargeScreen() {
        return window.innerWidth > 1024;
    }

    function autoScroll() {
        if (!scrolling || !isLargeScreen()) return;

        // Proveravamo da li smo na kraju skrola
        if (clientContainer.scrollLeft + clientContainer.clientWidth >= clientContainer.scrollWidth) {
            scrollDirection = -1; // Idemo levo ako smo na desnom kraju
        } else if (clientContainer.scrollLeft <= 0) {
            scrollDirection = 1; // Idemo desno ako smo na levom kraju
        }

        // Pomeri skrol u zavisnosti od smera
        clientContainer.scrollLeft += scrollSpeed * scrollDirection;
        requestAnimationFrame(autoScroll);
    }

    // Kada korisnik pređe mišem preko sekcije, počinje automatsko skrolovanje (samo na većim ekranima)
    clientContainer.addEventListener("mouseenter", function () {
        if (isLargeScreen()) {
            scrolling = true;
            autoScroll();
        }
    });

    // Kada korisnik pomeri miša van sekcije, skrolovanje se zaustavlja
    clientContainer.addEventListener("mouseleave", function () {
        scrolling = false;
    });

    // Ponovno proveravanje veličine ekrana kada se prozor menja
    window.addEventListener("resize", function () {
        if (!isLargeScreen()) {
            scrolling = false;
            clientContainer.scrollLeft = 0; // Resetujemo skrol ako je ekran mali
        }
    });
});
