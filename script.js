// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.createElement('button');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.style.display = 'none';
    
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    navContainer.appendChild(navToggle);
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('nav-menu-active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.profile-image-container, .action-buttons, .resume-section');
    animatedElements.forEach(el => observer.observe(el));

    // Profile image placeholder handling
    const profilePhoto = document.getElementById('profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'profile-placeholder';
            placeholder.innerHTML = '<i class="fas fa-user" style="font-size: 4rem; color: var(--white);"></i>';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: var(--gradient-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            `;
            this.parentNode.appendChild(placeholder);
        });
    }

    // Button click effects
    const buttons = document.querySelectorAll('.animated-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const effect = this.querySelector('.btn-effect');
            if (effect) {
                effect.style.animation = 'ripple 0.6s ease-out';
                setTimeout(() => {
                    effect.style.animation = '';
                }, 600);
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Resume iframe error handling
    const resumeIframe = document.getElementById('resume-iframe');
    if (resumeIframe) {
        resumeIframe.addEventListener('load', function() {
            console.log('Resume loaded successfully');
        });
        
        resumeIframe.addEventListener('error', function() {
            const placeholder = document.createElement('div');
            placeholder.className = 'resume-placeholder';
            placeholder.innerHTML = `
                <div style="text-align: center; padding: 4rem; background: var(--gray-800); border-radius: 10px;">
                    <i class="fas fa-file-pdf" style="font-size: 4rem; color: var(--gold); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--white); margin-bottom: 1rem;">Resume Not Found</h3>
                    <p style="color: var(--white); opacity: 0.8;">Please add your resume.pdf file to display it here.</p>
                    <button onclick="document.getElementById('resume-upload').click()" style="
                        margin-top: 1rem;
                        padding: 0.75rem 1.5rem;
                        background: var(--gradient-gold);
                        color: var(--black);
                        border: none;
                        border-radius: 25px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">Upload Resume</button>
                    <input type="file" id="resume-upload" accept=".pdf" style="display: none;">
                </div>
            `;
            this.parentNode.replaceChild(placeholder, this);
        });
    }

    // Add custom styles for mobile navigation
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-toggle {
                display: block !important;
                background: none;
                border: none;
                color: var(--white);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                transition: color 0.3s ease;
            }
            
            .nav-toggle:hover {
                color: var(--light-gold);
            }
            
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(17, 24, 39, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 2rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                border-top: 1px solid var(--primary-purple);
            }
            
            .nav-menu-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .navbar-scrolled {
                background: rgba(17, 24, 39, 0.98) !important;
            }
        }
        
        @keyframes ripple {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
        
        .animate-in {
            animation-play-state: running !important;
        }
    `;
    document.head.appendChild(style);

    // Initialize tooltips and enhanced interactions
    initializeEnhancedFeatures();
});

function initializeEnhancedFeatures() {
    // Add hover effects to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Enhanced button interactions
    const actionButtons = document.querySelectorAll('.action-buttons .btn');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'rotate 0.5s ease';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });

    // Add dynamic styles for animations
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .profile-image:hover #profile-photo {
            transform: scale(1.1);
        }
        
        .resume-container:hover #resume-iframe {
            transform: scale(1.02);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(dynamicStyles);
}
