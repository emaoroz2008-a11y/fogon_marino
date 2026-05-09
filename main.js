document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Navigation
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        // Accesibilidad: actualiza aria-expanded para lectores de pantalla
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        const icon = mobileMenuBtn.querySelector('i');
        if (isOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileMenuBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menú de navegación');
        }
    });

    // Close mobile menu on click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Menu Filtering
    const filterBtns = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Optional: add a tiny animation here
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Rastreo automático de clics en botones de WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Rastrear en Google Analytics (si está instalado)
            if (typeof gtag === 'function') {
                gtag('event', 'clic_whatsapp', {
                    'event_category': 'Contacto',
                    'event_label': this.innerText.trim() || 'Boton_WhatsApp'
                });
            }
            
            // Rastrear en Meta/Facebook Pixel (si está instalado)
            if (typeof fbq === 'function') {
                fbq('trackCustom', 'ClicWhatsApp');
            }
            
            // Mensaje en consola para verificar que funciona
            console.log('Clic de WhatsApp detectado y rastreado hacia:', this.href);
        });
    });
});
