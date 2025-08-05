// ===== ANIMATIONS.JS =====
// Advanced animation effects for the portfolio

class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.initParallaxEffect();
        this.initFloatingElements();
        this.initHoverAnimations();
        this.initTextRevealAnimations();
        this.initSkillProgressAnimations();
        this.initTimelineAnimations();
        this.initCursorFollower();
        this.initMagneticButtons();
    }

    // Enhanced Intersection Observer for scroll-triggered animations
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0.1, 0.25, 0.5, 0.75, 1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });

        // Auto-add animation attributes to common elements
        this.autoAddAnimationAttributes();
    }

    autoAddAnimationAttributes() {
        // Auto-animate cards
        document.querySelectorAll('.about-card, .project-card, .skill-category').forEach((el, index) => {
            el.setAttribute('data-animate', 'fadeInUp');
            el.setAttribute('data-delay', index * 100);
        });

        // Auto-animate timeline items
        document.querySelectorAll('.timeline-item').forEach((el, index) => {
            el.setAttribute('data-animate', 'slideInLeft');
            el.setAttribute('data-delay', index * 150);
        });
    }

    triggerAnimation(element, ratio) {
        const animationType = element.getAttribute('data-animate');
        const delay = parseInt(element.getAttribute('data-delay')) || 0;

        setTimeout(() => {
            this.applyAnimation(element, animationType, ratio);
        }, delay);
    }

    applyAnimation(element, type, ratio) {
        element.classList.add('animated');
        
        switch (type) {
            case 'fadeInUp':
                this.fadeInUp(element, ratio);
                break;
            case 'fadeInLeft':
                this.fadeInLeft(element, ratio);
                break;
            case 'fadeInRight':
                this.fadeInRight(element, ratio);
                break;
            case 'slideInLeft':
                this.slideInLeft(element, ratio);
                break;
            case 'scaleIn':
                this.scaleIn(element, ratio);
                break;
            case 'rotateIn':
                this.rotateIn(element, ratio);
                break;
        }
    }

    // Animation functions
    fadeInUp(element, ratio) {
        const translateY = (1 - ratio) * 50;
        const opacity = Math.min(ratio * 2, 1);
        
        element.style.transform = `translateY(${translateY}px)`;
        element.style.opacity = opacity;
        element.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out';
    }

    fadeInLeft(element, ratio) {
        const translateX = (1 - ratio) * -50;
        const opacity = Math.min(ratio * 2, 1);
        
        element.style.transform = `translateX(${translateX}px)`;
        element.style.opacity = opacity;
        element.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out';
    }

    fadeInRight(element, ratio) {
        const translateX = (1 - ratio) * 50;
        const opacity = Math.min(ratio * 2, 1);
        
        element.style.transform = `translateX(${translateX}px)`;
        element.style.opacity = opacity;
        element.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out';
    }

    slideInLeft(element, ratio) {
        const translateX = (1 - ratio) * -100;
        element.style.transform = `translateX(${translateX}px)`;
        element.style.transition = 'transform 1s cubic-bezier(0.23, 1, 0.320, 1)';
    }

    scaleIn(element, ratio) {
        const scale = 0.5 + (ratio * 0.5);
        const opacity = Math.min(ratio * 2, 1);
        
        element.style.transform = `scale(${scale})`;
        element.style.opacity = opacity;
        element.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease-out';
    }

    rotateIn(element, ratio) {
        const rotate = (1 - ratio) * 180;
        const scale = 0.5 + (ratio * 0.5);
        
        element.style.transform = `rotate(${rotate}deg) scale(${scale})`;
        element.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    // Parallax scrolling effect
    initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });
    }

    // Enhanced floating elements animation
    initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            this.createFloatingAnimation(element, index);
        });
    }

    createFloatingAnimation(element, index) {
        let startTime = Date.now() + (index * 1000); // Staggered start
        const amplitude = 15 + (index * 5); // Different amplitudes
        const frequency = 0.001 + (index * 0.0005); // Different frequencies
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const y = Math.sin(elapsed * frequency) * amplitude;
            const x = Math.cos(elapsed * frequency * 0.5) * (amplitude * 0.3);
            const rotation = Math.sin(elapsed * frequency * 0.3) * 10;
            
            element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }

    // Advanced hover animations
    initHoverAnimations() {
        // Magnetic effect for buttons
        document.querySelectorAll('.btn, .social-link').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => this.magneticHover(e, true));
            btn.addEventListener('mouseleave', (e) => this.magneticHover(e, false));
            btn.addEventListener('mousemove', (e) => this.magneticMove(e));
        });

        // Card tilt effect
        document.querySelectorAll('.about-card, .project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => this.cardTilt(e));
            card.addEventListener('mouseleave', (e) => this.cardReset(e));
        });
    }

    magneticHover(e, entering) {
        const element = e.currentTarget;
        
        if (entering) {
            element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            element.style.transform = 'translate(0, 0) scale(1)';
            element.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    }

    magneticMove(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.15;
        const moveY = y * 0.15;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }

    cardTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
    }

    cardReset(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease-out';
    }

    // Text reveal animations
    initTextRevealAnimations() {
        const textElements = document.querySelectorAll('.hero-name, .section-title');
        
        textElements.forEach(element => {
            this.wrapLetters(element);
        });
    }

    wrapLetters(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            span.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
            
            element.appendChild(span);
            
            // Trigger animation
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 500 + (index * 50));
        });
    }

    // Skill progress animations
    initSkillProgressAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillProgress(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillItems.forEach(skill => observer.observe(skill));
    }

    animateSkillProgress(skillElement) {
        skillElement.style.transform = 'translateX(-20px)';
        skillElement.style.opacity = '0';
        skillElement.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        
        setTimeout(() => {
            skillElement.style.transform = 'translateX(0)';
            skillElement.style.opacity = '1';
        }, Math.random() * 200);
    }

    // Timeline animations
    initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => observer.observe(item));
    }

    // Custom cursor follower
    initCursorFollower() {
        if (window.innerWidth < 768) return; // Skip on mobile
        
        const cursor = document.createElement('div');
        cursor.className = 'cursor-follower';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(cursor);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '0.5';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
    }

    // Magnetic buttons effect
    initMagneticButtons() {
        const magneticElements = document.querySelectorAll('.btn-primary, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.2;
                const moveY = y * 0.2;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});

// Add CSS for timeline animations
const timelineAnimationsCSS = `
    .timeline-item {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .timeline-item.timeline-animate {
        opacity: 1;
        transform: translateX(0);
    }
    
    .timeline-item:nth-child(even) {
        transform: translateX(50px);
    }
    
    .cursor-follower {
        mix-blend-mode: difference;
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = timelineAnimationsCSS;
document.head.appendChild(style);

// Performance optimization - Reduce animations on slower devices
if (navigator.hardwareConcurrency <= 4) {
    document.documentElement.style.setProperty('--transition-normal', '0.2s ease-in-out');
    document.documentElement.style.setProperty('--transition-slow', '0.3s ease-in-out');
}
