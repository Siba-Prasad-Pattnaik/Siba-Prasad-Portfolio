const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const transitionCircle = document.querySelector('.theme-transition-circle');

// Calculate proper scale based on screen size
const calculateScale = () => {
    const screenSize = Math.max(window.innerWidth, window.innerHeight);
    document.documentElement.style.setProperty('--circle-scale', (screenSize / 50));
};

// Calculate initial scale and update on resize
calculateScale();
window.addEventListener('resize', calculateScale);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    // Add ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    themeToggle.appendChild(ripple);
    
    // Position ripple from click position
    const diameter = Math.max(themeToggle.clientWidth, themeToggle.clientHeight);
    ripple.style.width = ripple.style.height = `${diameter}px`;
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);

    // Theme transition animation
    body.classList.add('animating');
    
    // Update background color immediately for smoother transition
    const isDarkMode = !body.classList.contains('dark-mode');
    
    setTimeout(() => {
        body.classList.toggle('dark-mode');
    }, 50);

    setTimeout(() => {
        body.classList.remove('animating');
    }, 700);
    
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark-mode' : '');
});

document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    navbarToggle.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarLinks.contains(e.target) && !navbarToggle.contains(e.target)) {
            navbarLinks.classList.remove('active');
        }
    });

    // Add smooth scroll and active section handling
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    // Update active section on scroll
    const updateActiveSection = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    };

    // Add scroll event listener with throttling
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveSection();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Initial check for active section
    updateActiveSection();

    // Smooth scroll to section when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.navbar-links');
            navLinks.classList.remove('active');
        });
    });

    // Add interactive particle effects
    navLinks.forEach(link => {
        enhanceActiveLink(link);
    });
});

// Enhanced active section indicator
function enhanceActiveLink(link) {
    const text = link.textContent;
    const container = document.createElement('div');
    container.className = 'nav-text-container';
    
    container.innerHTML = `
        <div class="edge edge-top"></div>
        <div class="edge edge-right"></div>
        <div class="edge edge-bottom"></div>
        <div class="edge edge-left"></div>
        <div class="orb orb-tl"></div>
        <div class="orb orb-tr"></div>
        <div class="orb orb-bl"></div>
        <div class="orb orb-br"></div>
        <span class="nav-text">${text}</span>
    `;
    
    link.innerHTML = '';
    link.appendChild(container);

    // Add interactive hover effect
    link.addEventListener('mouseenter', () => {
        if (!link.classList.contains('active')) {
            const orbs = link.querySelectorAll('.orb');
            orbs.forEach(orb => {
                orb.style.animation = 'none';
                orb.offsetHeight; // Force reflow
                orb.style.animation = 'orbPulse 1s ease forwards';
            });
        }
    });
}

function createEnhancedParticles(element) {
    const particleSystem = element.querySelector('.particle-system');
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particleSystem.appendChild(particle);

        const size = Math.random() * 2 + 1;
        const startX = Math.random() * 100;
        const delay = Math.random() * 2;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}%;
            animation: floatParticle 1.5s ease-in-out ${delay}s infinite;
        `;
    }
} 