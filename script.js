// Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    document.body.classList.add('loading');

    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 2000);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        const parallaxSpeed = 0.5;
        heroSection.style.backgroundPositionY = scrolled * parallaxSpeed + 'px';
    }

    // Parallax for orbs
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced Scroll Reveal with Stagger
const revealElements = () => {
    const reveals = document.querySelectorAll('.hidden, .fade-in');

    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            setTimeout(() => {
                element.classList.add('show', 'visible');
            }, index * 50); // Stagger effect
        }
    });
};

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate Hamburger
        // (Simple toggle for now, can be enhanced with CSS transforms in style.css if needed)
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.classList.add('visible'); // For fade-in elements
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const hiddenElements = document.querySelectorAll('.hidden');
    const fadeInElements = document.querySelectorAll('.fade-in');

    hiddenElements.forEach((el) => observer.observe(el));
    fadeInElements.forEach((el) => observer.observe(el));

    // Smooth Scroll specifically for Safari/older browsers fallback 
    // (CSS scroll-behavior covers most, but this ensures it works on anchor tags)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Particle System for Background Effects
    createParticles();
});

function createParticles() {
    const particleContainer = document.querySelector('.background-glow');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random animation duration
        const duration = Math.random() * 20 + 15;
        particle.style.animationDuration = duration + 's';

        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';

        particleContainer.appendChild(particle);
    }
}
