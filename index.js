// mousemove  animation
const allShapes = document.querySelectorAll('#deco .bubble, #deco .fairy, #deco .bubble-0, #bubbleLittle2');

const maxOffset = 20;
let targetX = 0;
let targetY = 0;

const shapeStates = Array.from(allShapes).map((el, index) => ({
  currentX: 0,
  currentY: 0,
  damping: 0.03 + Math.random() * 0.04,
  factor: 0.8 + Math.random() * 0.4,
  floatPhase: Math.random() * Math.PI * 2,
  // Mouvement un peu plus fort aux highlights
  floatIntensity: el.classList.contains('fairy, bubble-0') ? 9 : 4
}));

document.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = (e.clientX - centerX) / centerX;
  const deltaY = (e.clientY - centerY) / centerY;

  targetX = deltaX * maxOffset;
  targetY = deltaY * maxOffset;
});

function animate(time) {
  allShapes.forEach((shape, i) => {
    const s = shapeStates[i];

    const floatOffset = Math.sin(time / 600 + s.floatPhase) * s.floatIntensity;
    s.currentX += ((targetX * s.factor) - s.currentX) * s.damping;
    s.currentY += ((targetY * s.factor) - s.currentY) * s.damping;

    shape.style.transform = `translate(${s.currentX}px, ${s.currentY + floatOffset}px)`;
  });

  requestAnimationFrame(animate);
}
animate(0);

// carousel animation
document.addEventListener("DOMContentLoaded", () => {
    // Sélectionner l'élément carousel
    const carousel = document.querySelector('#carousel');
    if (!carousel) {
        console.error("L'élément #carousel n'a pas été trouvé dans le DOM.");
        return; // Arrêter l'exécution si #carousel n'est pas trouvé
    }

    // Tableau d'URLs des images pour chaque slide
    const imageURLs = [
        ['img/projets/Fruity1.png', 'img/projets/Fruity2.png', 'img/projets/Fruity3.png', 'img/projets/Fruity4.png', 'img/projets/Fruity5.png'], // Images pour le 1er slide
        ['img/projets/Halloween2.png', 'img/projets/Halloween4.png', 'img/projets/Halloween5.png', 'img/projets/Halloween6.png', 'img/projets/Halloween7.png', 'img/projets/Halloween8.png', 'img/projets/Halloween9.png'], // Images pour le 2nd slide
        ['img/projets/Health1.png', 'img/projets/Health2.png', 'img/projets/Health3.png', 'img/projets/Health4.png', 'img/projets/Health5.png'], // Images pour le 3e slide
        ['img/projets/PortfolioMini.png','img/projets/Yoga1.png', 'img/projets/Yoga2.png', 'img/projets/Tool.png'], // Images pour le 4e slide
        ['img/projets/NewsPage.png', 'img/projets/PagePrincipale.png', 'img/projets/DesignEffect1.png', 'img/projets/DesignEffect2.png'], // Images pour le 5e slide
        ['img/projets/BlogDesign1.png', 'img/projets/BlogDesign2.png', 'img/projets/BlogDesign3.png'], // Images pour le 6e slide
    ];

    // Récupérer toutes les images
    const slides = document.querySelectorAll('.carousel .slides');
    const images = Array.from(slides).map(slide => slide.querySelector('img'));

    let paused = false; // Détermine si l'animation est en pause

    // Fonction pour changer l'image d'un slide spécifique
    function changeImage(slideIndex, imageIndex) {
        const slide = slides[slideIndex];
        const img = slide.querySelector('img');
        img.src = imageURLs[slideIndex][imageIndex];
    }

    // Fonction pour faire défiler les images
    function cycleImages() {
        // Boucle à travers chaque slide
        for (let slideIndex = 0; slideIndex < imageURLs.length; slideIndex++) {
            // Récupérer l'indice de l'image à afficher
            let currentIndex = (imageIndex[slideIndex] + 1) % imageURLs[slideIndex].length;

            // Changer l'image du slide
            changeImage(slideIndex, currentIndex);

            // Mettre à jour l'indice pour le prochain changement
            imageIndex[slideIndex] = currentIndex;
        }
    }

    // Définir un tableau pour suivre l'indice de l'image actuelle pour chaque slide
    let imageIndex = new Array(imageURLs.length).fill(0); // Initialise les indices à 0 pour chaque slide

    // Fonction pour démarrer le changement d'images à intervalle
    function startCyclingImages() {
        const interval = 3000; // Intervalle de 3 secondes pour changer d'image

        setInterval(() => {
            if (!paused) {
                cycleImages(); // Changer les images de chaque slide
            }
        }, interval);
    }

    // Gérer la pause sur le survol
    carousel.addEventListener('mouseenter', () => {
        paused = true; // Mettre en pause
    });

    carousel.addEventListener('mouseleave', () => {
        paused = false; // Reprendre l'animation
    });

    // Démarrer l'animation
    startCyclingImages();
});

