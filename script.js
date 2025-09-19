// Smoke effect functionality for Sacramento Gay Smoke Shop

// Initialize ambient smoke on page load
document.addEventListener('DOMContentLoaded', function() {
    createAmbientSmoke();
    
    // Add some initial atmosphere
    setTimeout(() => {
        createSmokeBurst();
    }, 1000);
});

// Create a burst of smoke particles
function createSmokeBurst() {
    const container = document.getElementById('smokeContainer');
    const numberOfParticles = 15;
    
    for (let i = 0; i < numberOfParticles; i++) {
        setTimeout(() => {
            createSmokeParticle(
                Math.random() * window.innerWidth,
                window.innerHeight - 50,
                Math.random() * 0.5 + 0.5
            );
        }, i * 100);
    }
    
    // Add some sound effect (visual feedback)
    flashScreen();
}

// Create individual smoke particle
function createSmokeParticle(x, y, scale = 1) {
    const container = document.getElementById('smokeContainer');
    const particle = document.createElement('div');
    particle.className = 'smoke-particle';
    
    // Randomize particle properties
    const size = (Math.random() * 30 + 10) * scale;
    const duration = Math.random() * 2 + 3; // 3-5 seconds
    const drift = (Math.random() - 0.5) * 200; // Horizontal drift
    
    particle.style.left = x + 'px';
    particle.style.bottom = '0px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = duration + 's';
    
    // Add some random horizontal movement
    particle.style.setProperty('--drift', drift + 'px');
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Add smoke effect when clicking in interactive area
function addSmokeEffect(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX;
    const y = rect.bottom;
    
    // Create multiple particles at click location
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createSmokeParticle(
                x + (Math.random() - 0.5) * 50,
                window.innerHeight - y,
                Math.random() * 0.8 + 0.4
            );
        }, i * 50);
    }
    
    // Add ripple effect
    createRipple(event.clientX, event.clientY);
}

// Create ripple effect at click location
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '100';
    ripple.style.animation = 'ripple-expand 0.8s ease-out forwards';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 800);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-expand {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    .smoke-particle {
        animation: float-up var(--duration, 4s) ease-out forwards;
    }
    
    @keyframes float-up {
        0% {
            transform: translateY(0) translateX(0) scale(0.5) rotate(0deg);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-200px) translateX(var(--drift, 0px)) scale(1.2) rotate(180deg);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-400px) translateX(var(--drift, 0px)) scale(2) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create ambient background smoke
function createAmbientSmoke() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createSmokeParticle(
                Math.random() * window.innerWidth,
                -20,
                Math.random() * 0.3 + 0.2
            );
        }
    }, 2000);
}

// Screen flash effect for dramatic impact
function flashScreen() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'rgba(255,255,255,0.1)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '1000';
    flash.style.animation = 'flash 0.3s ease-out';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 300);
}

// Add flash animation
const flashStyle = document.createElement('style');
flashStyle.textContent = `
    @keyframes flash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(flashStyle);

// Add some interactivity to the header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header h1');
    if (header) {
        header.addEventListener('click', function() {
            createSmokeBurst();
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }
});

// Add pulse animation for header interaction
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Add mouse tracking for subtle smoke trails
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    // Keep only recent trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
    
    // Occasionally add smoke on mouse movement
    if (Math.random() < 0.02) { // 2% chance
        createSmokeParticle(e.clientX, window.innerHeight - e.clientY, 0.3);
    }
});

console.log('🌫️ Sacramento Gay Smoke Shop - Interactive smoke effects loaded! 🌫️');
console.log('Click around to create smoke clouds and enjoy the atmosphere!');