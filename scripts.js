// ========================================
// INTERSECTION OBSERVER - ANIMATIONS À CHAQUE DÉFILEMENT (DESCENDRE ET MONTER)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Sélectionne tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.project, .experience, .formation, ' +
        '#bio p, #contact p, ' +
        'section h2, ' +
        '.hero .intro, .hero-content h1, .hero-content h2, ' +
        '.hero-description, .hero-buttons, .hero-image'
    );
    
    // Crée un observateur d'intersection avec des options pour détecter l'entrée ET la sortie
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Réinitialise l'animation si on a l'option de réanimation
            if (entry.isIntersecting) {
                // L'élément entre dans le viewport → on l'anime
                entry.target.classList.add('visible');
            } else {
                // L'élément sort du viewport → on retire la classe pour qu'elle se réactive en rentrant
                // Désactivez cette ligne si vous voulez que l'animation ne se fasse qu'une fois
                entry.target.classList.remove('visible');
                
                // Pour une animation plus fluide, on force la réinitialisation
                entry.target.style.animation = 'none';
                // Forcer un reflow pour réinitialiser l'animation
                void entry.target.offsetHeight;
                entry.target.style.animation = '';
            }
        });
    }, {
        threshold: 0.20, // Déclenche quand 20% de l'élément est visible
        rootMargin: '0px 0px -30px 0px' // Déclenche un peu avant que l'élément n'arrive
    });
    
    // Observe chaque élément
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Pour l'accueil, on garde les animations au chargement
    // On ne veut pas qu'elles disparaissent quand on scroll
    const heroElements = document.querySelectorAll(
        '.hero .intro, .hero-content h1, .hero-content h2, ' +
        '.hero-description, .hero-buttons, .hero-image'
    );
    
    // On les marque comme visible immédiatement
    heroElements.forEach(el => {
        el.classList.add('visible');
    });
    
    // Pour les autres éléments, on les anime au scroll
    console.log('✨ Animations activées au défilement !');
});



// =========================
// DÉFILEMENT CONTINU DES ICÔNES TECH
// =========================

document.addEventListener('DOMContentLoaded', function() {
    const techIconsContainer = document.querySelector('.tech-icons');
    
    if (techIconsContainer) {
        // Sauvegarder le contenu original
        const originalContent = techIconsContainer.innerHTML;
        
        // Compter les icônes originales
        const iconCount = document.querySelectorAll('.tech-icon').length;
        
        // Dupliquer le contenu pour l'effet infini
        techIconsContainer.innerHTML = originalContent + originalContent + originalContent;
        
        // Calculer la largeur d'une icône (54px + gap 12px)
        const iconWidth = 66; // 54 + 12
        const totalWidth = iconCount * iconWidth;
        
        // Ajouter les styles pour le défilement
        techIconsContainer.style.cssText = `
            display: flex !important;
            flex-wrap: nowrap !important;
            gap: 12px !important;
            width: max-content !important;
            animation: scrollTechIcons 4s linear infinite !important;
            margin-bottom: 32px !important;
            overflow: visible !important;
        `;
        
        // Ajouter l'animation
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            @keyframes scrollTechIcons {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-${totalWidth}px);
                }
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Pause au survol
        techIconsContainer.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        techIconsContainer.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
});


// ========================================
// SCROLL HORIZONTAL - SECTION RÉALISATIONS
// Le scroll vertical dans la section pilote un défilement
// horizontal de TOUT le bloc (titre + sous-titre + projets),
// pas seulement des cartes projet.
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const section = document.getElementById('realisations');
    const sticky = document.querySelector('.realisations-sticky');
    const content = document.querySelector('.realisations-content');

    if (!section || !sticky || !content) return;

    const stickyTopOffset = 90; // doit correspondre au "top" de .realisations-sticky en CSS

    function updateHorizontalScroll() {
        // Sur tablette/mobile, l'effet "pin" est désactivé en CSS
        // (scroll horizontal classique à la place) : on ne translate pas en JS.
        if (window.innerWidth <= 900) {
            content.style.transform = '';
            return;
        }

        const rect = section.getBoundingClientRect();
        const scrollableHeight = section.offsetHeight - sticky.offsetHeight;

        if (scrollableHeight <= 0) return;

        let progress = (stickyTopOffset - rect.top) / scrollableHeight;
        progress = Math.max(0, Math.min(1, progress));

        // sticky.clientWidth = largeur visible du viewport de la section
        // content.scrollWidth = largeur totale du groupe intro + projets
        const maxTranslate = content.scrollWidth - sticky.clientWidth;

        if (maxTranslate > 0) {
            content.style.transform = `translateX(-${progress * maxTranslate}px)`;
        } else {
            content.style.transform = '';
        }
    }

    window.addEventListener('scroll', updateHorizontalScroll, { passive: true });
    window.addEventListener('resize', updateHorizontalScroll);
    updateHorizontalScroll();
});

