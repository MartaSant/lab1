/**
 * scroll-lab.js - JavaScript for the Scroll Storytelling page
 * 
 * Uses IntersectionObserver to create scroll-triggered animations
 */

(function() {
    'use strict';
    
    let hasReachedBottom = false;
    let hasReturnedToTop = false;
    
    // ============================================
    // IntersectionObserver for Scroll Animations
    // ============================================
    
    /**
     * Initialize scroll-triggered animations using IntersectionObserver
     */
    function initScrollAnimations() {
        // Get all scroll sections
        const sections = document.querySelectorAll('.scroll-section');
        
        if (sections.length === 0) return;
        
        // Create IntersectionObserver with options
        const observerOptions = {
            root: null, // Use viewport as root
            rootMargin: '-10% 0px -10% 0px', // Trigger when 10% of section is visible
            threshold: 0.1 // Trigger when at least 10% is visible
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class when section enters viewport
                    entry.target.classList.add('visible');
                    
                    // Remove observer after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // ============================================
    // Scroll Tracking for Easter Egg
    // ============================================
    
    /**
     * Track scroll position for easter egg interaction
     */
    function initScrollTracking() {
        let scrollTimeout;
        
        window.addEventListener('scroll', function() {
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Check if user reached bottom
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const clientHeight = window.innerHeight;
            const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
            
            // Mark as reached bottom if within 50px
            if (distanceFromBottom < 50 && !hasReachedBottom) {
                hasReachedBottom = true;
            }
            
            // Check if user returned to top after reaching bottom
            if (hasReachedBottom && scrollTop < 100 && !hasReturnedToTop) {
                hasReturnedToTop = true;
                
                // Show easter egg message after a short delay
                scrollTimeout = setTimeout(() => {
                    showEasterEgg();
                }, 500);
            }
            
            // Update sticky label visibility
            updateStickyLabel();
        }, { passive: true });
    }
    
    /**
     * Update sticky label based on scroll position
     */
    function updateStickyLabel() {
        const stickyLabel = document.querySelector('.scroll-hint');
        if (!stickyLabel) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide label when user has scrolled significantly
        if (scrollTop > 300) {
            stickyLabel.classList.add('fade-out');
        } else {
            stickyLabel.classList.remove('fade-out');
        }
    }
    
    /**
     * Show easter egg message when user scrolls to bottom and back
     */
    function showEasterEgg() {
        const easterEgg = document.createElement('div');
        easterEgg.className = 'easter-egg-message';
        easterEgg.innerHTML = `
            <div class="easter-egg-content">
                <h3>🎯 Discovery!</h3>
                <p>You reached the end and came back — we can also design journeys that react to how people explore the page.</p>
                <button class="btn" onclick="this.closest('.easter-egg-message').remove()">Cool!</button>
            </div>
        `;
        document.body.appendChild(easterEgg);
        
        // Animate in
        setTimeout(() => {
            easterEgg.classList.add('visible');
        }, 10);
    }
    
    // ============================================
    // Timeline Step Highlighting
    // ============================================
    
    /**
     * Highlight timeline steps as user scrolls past them
     */
    function initTimelineHighlighting() {
        const timelineSteps = document.querySelectorAll('.timeline-step');
        
        if (timelineSteps.length === 0) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);
        
        timelineSteps.forEach(step => {
            observer.observe(step);
        });
    }
    
    // ============================================
    // Initialization
    // ============================================
    
    /**
     * Initialize all scroll-related functionality
     */
    function init() {
        initScrollAnimations();
        initScrollTracking();
        initTimelineHighlighting();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

