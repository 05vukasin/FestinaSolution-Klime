document.addEventListener("DOMContentLoaded", function () {
    const clientContainer = document.querySelector(".client-container");
    let scrollDirection = 1; // 1 za desno, -1 za levo
    let scrolling = false;
    let scrollSpeed = 1; // Brzina skrolovanja

    function autoScroll() {
        if (!scrolling) return;

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

    // Kada korisnik pređe mišem preko sekcije, počinje automatsko skrolovanje
    clientContainer.addEventListener("mouseenter", function () {
        scrolling = true;
        autoScroll();
    });

    // Kada korisnik pomeri miša van sekcije, skrolovanje se zaustavlja
    clientContainer.addEventListener("mouseleave", function () {
        scrolling = false;
    });
});
