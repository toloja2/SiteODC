// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Animation d'apparition au défilement
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
    
    // Navigation fixe avec effet de défilement
    const navbar = document.querySelector('.navbar');
    const pageNav = document.querySelector('.page-nav');
    
    window.addEventListener('scroll', function() {
        // Effet sur la navbar principale
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mise à jour des liens de navigation de page
        updatePageNav();
        
        // Mise à jour des liens actifs dans la navbar
        updateNavLinks();
    });
    
    // Mise à jour des liens de navigation de page
    function updatePageNav() {
        const sections = document.querySelectorAll('.page-section');
        const pageNavLinks = document.querySelectorAll('.page-nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        pageNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Mise à jour des liens actifs dans la navbar
    function updateNavLinks() {
        const sections = document.querySelectorAll('.page-section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}` || 
                (currentSection === 'home' && link.getAttribute('href') === '#home')) {
                link.classList.add('active');
            }
        });
    }
    
    // Simulation de recherche
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (searchInput.value.trim() !== '') {
            searchInput.value = '';
        }
    });
    
    // Navigation fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fermer le menu hamburger sur mobile
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
                
                // Défilement vers l'élément cible
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation pour les cartes d'outils au survol
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialiser les animations au chargement
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    }, 300);
    
    // Ajouter un effet de parallaxe léger sur l'en-tête
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.main-header');
        
        if (header) {
            header.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
    
    // Notification de téléchargement d'eBook
    const downloadButtons = document.querySelectorAll('a[href="#take-action"]');
    
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Télécharger') || button.textContent.includes('Obtenir')) {
            button.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#take-action') {
                    // Déclencher l'effet visuel
                    this.classList.add('clicked');
                    
                    setTimeout(() => {
                        this.classList.remove('clicked');
                    }, 300);
                    
                    // Simulation de téléchargement
                    setTimeout(() => {
                        alert('Téléchargement de l\'eBook "Graphique Design pour Débutants" démarré!\n\nDans une application réelle, cela déclencherait le processus de paiement et de téléchargement.');
                    }, 800);
                }
            });
        }
    });
    
    // Initialiser la navigation active au chargement
    updateNavLinks();
    updatePageNav();
});