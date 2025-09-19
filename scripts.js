document.addEventListener('DOMContentLoaded', () => {

    // --- Mouse Follow Spotlight Effect ---
    const body = document.body;
    body.addEventListener('mousemove', (e) => {
        const x = e.clientX + 'px';
        const y = e.clientY + 'px';
        body.style.setProperty('--mouse-x', x);
        body.style.setProperty('--mouse-y', y);
    });

    // --- Preloader ---
    const status = document.getElementById('loader-status');
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const checks = ["INITIATING...", "LOADING PROTOCOLS...", "ESTABLISHING CONNECTION...", "SYSTEM READY."];
        let i = 0;
        const interval = setInterval(() => {
            if (status) status.textContent = checks[i];
            i++;
            if (i === checks.length) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('loaded');
                }, 250);
            }
        }, 500);
    }

    // --- Nav Active Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
    }
    if (closeMenu) {
        closeMenu.addEventListener('click', () => mobileMenu.classList.remove('active'));
    }
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });

    // --- Hero Section Typing Effect ---
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const phrases = [
            'I am in the <span class="highlight">Wired</span>.',
            'Deconstructing <span class="highlight">digital reality</span>.',
            'No matter where you go, everyone\'s <span class="highlight">connected</span>.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }
            typingTextElement.innerHTML = currentPhrase.substring(0, charIndex);

            let typeSpeed = isDeleting ? 40 : 100;
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 3000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- Initialize data-text for Glitch Hovers ---
    document.querySelectorAll('.glitch-hover').forEach(el => {
        el.dataset.text = el.textContent;
    });

});