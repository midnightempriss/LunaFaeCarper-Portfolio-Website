// Main JavaScript for animations and interactions

// Page load animations
document.addEventListener('DOMContentLoaded', function() {
    // Fade in animation for page elements
    const animateElements = document.querySelectorAll('.profile-section, .resume-section, .about-content, .projects-grid, .social-links-container');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add sparkle effect on button hover
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', createSparkle);
    });
    
    function createSparkle(e) {
        const button = e.currentTarget;
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        
        const size = Math.random() * 8 + 4;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        const x = Math.random() * button.offsetWidth;
        const y = Math.random() * button.offsetHeight;
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        button.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    // Mobile menu toggle (if needed)
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    
    if (window.innerWidth <= 768) {
        document.querySelector('.nav-container').appendChild(mobileMenuToggle);
        
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .sparkle {
        position: absolute;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleAnim 1s ease-out forwards;
    }
    
    @keyframes sparkleAnim {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(180deg);
            opacity: 0;
        }
    }
    
    .mobile-menu-toggle {
        display: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--primary-gold);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(26, 32, 44, 0.98);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
    }
`;
document.head.appendChild(style);

// Add particles.js CDN script
if (!document.querySelector('script[src*="particles.js"]')) {
    const particlesScript = document.createElement('script');
    particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    particlesScript.onload = () => {
        // Initialize particles after library loads
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            // Particles will be initialized by particles.js file
        }
    };
    document.head.appendChild(particlesScript);
}
