// Inicializa o carrossel
window.addEventListener("load", () => {
    const track = document.getElementById("productGrid");
    const prevButton = document.getElementById("prevBtn");
    const nextButton = document.getElementById("nextBtn");

    const PRODUCTS_TO_DISPLAY = 5; // Exibir sempre 5 produtos
    const gap = 10; // Espaço entre os produtos
    let currentIndex = 0;

    // Duplica os produtos para criar a fita infinita
    function setupInfiniteLoop() {
        const products = Array.from(track.children);
        products.forEach(product => {
            const clone = product.cloneNode(true);
            track.appendChild(clone); // Clones para o final da track
        });
        products.forEach(product => {
            const clone = product.cloneNode(true);
            track.insertBefore(clone, track.firstChild); // Clones para o início da track
        });
    }

    // Ajusta a posição inicial para o loop infinito
    function initializeTrack() {
        const productWidth = track.children[0].offsetWidth + gap;
        const initialOffset = PRODUCTS_TO_DISPLAY * productWidth;
        track.style.transform = `translateX(-${initialOffset}px)`;
        return productWidth;
    }

    // Move o carrossel
    function moveCarousel(offset) {
        const productWidth = initializeTrack();
        currentIndex += offset;

        // Suaviza o movimento
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${currentIndex * productWidth}px)`;

        // Reseta a posição ao término da transição
        track.addEventListener("transitionend", () => {
            if (currentIndex <= 0) {
                currentIndex = PRODUCTS_TO_DISPLAY;
                track.style.transition = "none";
                track.style.transform = `translateX(-${currentIndex * productWidth}px)`;
            } else if (currentIndex >= track.children.length - PRODUCTS_TO_DISPLAY) {
                currentIndex = track.children.length - 2 * PRODUCTS_TO_DISPLAY;
                track.style.transition = "none";
                track.style.transform = `translateX(-${currentIndex * productWidth}px)`;
            }
        });
    }

    // Configura os botões de navegação
    nextButton.addEventListener("click", () => moveCarousel(1));
    prevButton.addEventListener("click", () => moveCarousel(-1));

    // Inicializa o carrossel
    setupInfiniteLoop();
    initializeTrack();
});
