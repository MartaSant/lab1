/**
 * micro-interactions.js - JavaScript for the Micro Interactions page
 * 
 * Handles all interactive elements and easter eggs on this page
 */

(function() {
    'use strict';
    
    // ============================================
    // Button State Machine
    // ============================================
    
    /**
     * Initialize the interactive button that changes state on interaction
     */
    function initStateButton() {
        const stateButton = document.getElementById('state-button');
        if (!stateButton) return;
        
        let clickCount = 0;
        const states = [
            { text: 'Hover me', color: 'var(--primary-color)', shape: 'normal' },
            { text: 'Click me', color: 'var(--secondary-color)', shape: 'rounded' },
            { text: 'Nice!', color: 'var(--success-color)', shape: 'circle' }
        ];
        let currentState = 0;
        
        // Handle hover
        stateButton.addEventListener('mouseenter', function() {
            if (currentState === 0) {
                currentState = 1;
                updateButtonState(stateButton, states[1]);
            }
        });
        
        // Handle click
        stateButton.addEventListener('click', function() {
            clickCount++;
            
            if (currentState === 1) {
                currentState = 2;
                updateButtonState(stateButton, states[2]);
                
                // Show message after first interaction
                showInteractionMessage('You\'ve tried at least one micro interaction!');
            }
            
            // Easter egg: Click 5 times
            if (clickCount === 5) {
                setTimeout(() => {
                    showEasterEgg('You\'re curious! We can also design secret interactions like this. 🎉');
                }, 300);
            }
        });
        
        // Reset on mouse leave (optional, can be removed for persistent state)
        stateButton.addEventListener('mouseleave', function() {
            // Only reset if not clicked yet
            if (currentState === 1) {
                currentState = 0;
                updateButtonState(stateButton, states[0]);
            }
        });
    }
    
    /**
     * Update button appearance based on state
     */
    function updateButtonState(button, state) {
        button.textContent = state.text;
        button.style.backgroundColor = state.color;
        
        if (state.shape === 'rounded') {
            button.style.borderRadius = 'var(--radius-lg)';
        } else if (state.shape === 'circle') {
            button.style.borderRadius = '50%';
            button.style.width = button.style.height = '100px';
        } else {
            button.style.borderRadius = 'var(--radius-md)';
            button.style.width = 'auto';
            button.style.height = 'auto';
        }
    }
    
    // ============================================
    // Flip Card
    // ============================================
    
    /**
     * Initialize the flip card interaction
     */
    function initFlipCard() {
        const flipCard = document.querySelector('.flip-card');
        if (!flipCard) return;
        
        flipCard.addEventListener('mouseenter', function() {
            this.classList.add('flipped');
            showInteractionMessage('You\'ve tried at least one micro interaction!');
        });
        
        flipCard.addEventListener('mouseleave', function() {
            this.classList.remove('flipped');
        });
    }
    
    // ============================================
    // Theme Toggle
    // ============================================
    
    /**
     * Initialize the theme toggle switch
     */
    function initThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        const previewPanel = document.querySelector('.theme-preview');
        if (!toggle || !previewPanel) return;
        
        toggle.addEventListener('change', function() {
            if (this.checked) {
                previewPanel.classList.add('dark-theme');
                previewPanel.querySelector('.theme-text').textContent = 'Dark theme selected';
            } else {
                previewPanel.classList.remove('dark-theme');
                previewPanel.querySelector('.theme-text').textContent = 'Light theme selected';
            }
            showInteractionMessage('You\'ve tried at least one micro interaction!');
        });
    }
    
    // ============================================
    // Tooltip
    // ============================================
    
    /**
     * Initialize tooltips that appear on hover
     */
    function initTooltips() {
        const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
        
        tooltipTriggers.forEach(trigger => {
            let tooltip = null;
            
            trigger.addEventListener('mouseenter', function(e) {
                const tooltipText = this.getAttribute('data-tooltip');
                
                // Create tooltip element
                tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = tooltipText;
                document.body.appendChild(tooltip);
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
                tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
                
                showInteractionMessage('You\'ve tried at least one micro interaction!');
            });
            
            trigger.addEventListener('mouseleave', function() {
                if (tooltip) {
                    tooltip.remove();
                    tooltip = null;
                }
            });
        });
    }
    
    // ============================================
    // Helper Functions
    // ============================================
    
    /**
     * Show a temporary message to the user
     */
    function showInteractionMessage(message) {
        // Check if message already shown in this session
        if (sessionStorage.getItem('interaction-message-shown')) {
            return;
        }
        
        const messageEl = document.createElement('div');
        messageEl.className = 'interaction-message';
        messageEl.textContent = message;
        document.body.appendChild(messageEl);
        
        // Show with animation
        setTimeout(() => {
            messageEl.classList.add('visible');
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            messageEl.classList.remove('visible');
            setTimeout(() => {
                messageEl.remove();
            }, 300);
        }, 3000);
        
        // Mark as shown
        sessionStorage.setItem('interaction-message-shown', 'true');
    }
    
    /**
     * Show an easter egg message
     */
    function showEasterEgg(message) {
        const easterEgg = document.createElement('div');
        easterEgg.className = 'easter-egg';
        easterEgg.innerHTML = `
            <div class="easter-egg-content">
                <h3>🎊 Easter Egg!</h3>
                <p>${message}</p>
                <button class="btn" onclick="this.closest('.easter-egg').remove()">Cool!</button>
            </div>
        `;
        document.body.appendChild(easterEgg);
        
        setTimeout(() => {
            easterEgg.classList.add('visible');
        }, 10);
    }
    
    // ============================================
    // Initialization
    // ============================================
    
    /**
     * Initialize all interactions when DOM is ready
     */
    function init() {
        initStateButton();
        initFlipCard();
        initThemeToggle();
        initTooltips();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

