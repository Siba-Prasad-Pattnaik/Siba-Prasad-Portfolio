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