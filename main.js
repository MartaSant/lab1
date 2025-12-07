/**
 * main.js - Shared JavaScript for Interactive Website Playground
 * 
 * This file handles:
 * - Progress tracking across pages using localStorage
 * - Updating progress indicators on index.html
 * - Marking pages as visited
 */

// ============================================
// Constants
// ============================================

// List of all feature pages that should be tracked
const FEATURE_PAGES = [
    { id: 'micro-interactions', name: 'Micro Interactions', url: 'micro-interactions.html' },
    { id: 'scroll-lab', name: 'Scroll Storytelling', url: 'scroll-lab.html' },
    { id: 'react-lab', name: 'React Lab', url: 'react-lab.html' },
    { id: 'vue-lab', name: 'Vue Lab', url: 'vue-lab.html' }
];

const STORAGE_KEY = 'playground_visited_pages';

// ============================================
// LocalStorage Helpers
// ============================================

/**
 * Get the list of visited pages from localStorage
 * @returns {Array<string>} Array of page IDs that have been visited
 */
function getVisitedPages() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

/**
 * Save the list of visited pages to localStorage
 * @param {Array<string>} pages - Array of page IDs
 */
function saveVisitedPages(pages) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Mark a page as visited
 * @param {string} pageId - The ID of the page to mark as visited
 */
function markPageAsVisited(pageId) {
    const visited = getVisitedPages();
    if (!visited.includes(pageId)) {
        visited.push(pageId);
        saveVisitedPages(visited);
    }
}

/**
 * Check if a page has been visited
 * @param {string} pageId - The ID of the page to check
 * @returns {boolean} True if the page has been visited
 */
function isPageVisited(pageId) {
    const visited = getVisitedPages();
    return visited.includes(pageId);
}

/**
 * Get the current page ID based on the current HTML file
 * @returns {string|null} The page ID or null if not a tracked page
 */
function getCurrentPageId() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    
    // Map file names to page IDs
    const fileToIdMap = {
        'micro-interactions.html': 'micro-interactions',
        'scroll-lab.html': 'scroll-lab',
        'react-lab.html': 'react-lab',
        'vue-lab.html': 'vue-lab'
    };
    
    return fileToIdMap[currentFile] || null;
}

/**
 * Mark the current page as visited (if it's a tracked page)
 */
function markCurrentPageAsVisited() {
    const currentPageId = getCurrentPageId();
    if (currentPageId) {
        markPageAsVisited(currentPageId);
    }
}

// ============================================
// Progress Calculation
// ============================================

/**
 * Calculate progress statistics
 * @returns {Object} Object with visited count, total count, and percentage
 */
function getProgressStats() {
    const visited = getVisitedPages();
    const total = FEATURE_PAGES.length;
    const visitedCount = visited.length;
    const percentage = total > 0 ? Math.round((visitedCount / total) * 100) : 0;
    
    return {
        visitedCount,
        total,
        percentage,
        allVisited: visitedCount === total
    };
}

// ============================================
// Progress Indicator Updates (for index.html)
// ============================================

/**
 * Update the progress indicator on the index page
 */
function updateProgressIndicator() {
    // Only run on index.html
    if (!window.location.pathname.includes('index.html') && 
        window.location.pathname !== '/' &&
        !window.location.pathname.endsWith('/')) {
        return;
    }
    
    const stats = getProgressStats();
    
    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${stats.percentage}%`;
    }
    
    // Update progress text
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.textContent = `Experiences tried: ${stats.visitedCount}/${stats.total}`;
    }
    
    // Update card statuses
    FEATURE_PAGES.forEach(page => {
        const card = document.querySelector(`[data-page-id="${page.id}"]`);
        if (card) {
            const statusEl = card.querySelector('.card-status');
            if (statusEl) {
                if (isPageVisited(page.id)) {
                    statusEl.textContent = '✓ Visited';
                    statusEl.className = 'card-status visited';
                    card.classList.add('visited');
                } else {
                    statusEl.textContent = 'Not visited yet';
                    statusEl.className = 'card-status not-visited';
                    card.classList.remove('visited');
                }
            }
        }
    });
    
    // Show/hide congratulations box
    const congratsBox = document.querySelector('.success-box');
    if (congratsBox) {
        if (stats.allVisited) {
            congratsBox.classList.remove('hidden');
        } else {
            congratsBox.classList.add('hidden');
        }
    }
    
    // Update tips box text based on progress
    updateTipsBox(stats);
}

/**
 * Update the tips box with contextual advice
 * @param {Object} stats - Progress statistics
 */
function updateTipsBox(stats) {
    const tipsContent = document.querySelector('.tips-content');
    if (!tipsContent) return;
    
    let tipText = '';
    
    if (stats.visitedCount === 0) {
        tipText = 'Start with Micro Interactions if you like playful UI details. Then explore the other sections to see different approaches to interactivity.';
    } else if (stats.visitedCount === 1) {
        tipText = 'Great start! Try Scroll Storytelling next to see how we can guide users through a narrative as they explore.';
    } else if (stats.visitedCount === 2) {
        tipText = 'You\'re making progress! Check out React Lab or Vue Lab to see how frameworks can manage complex interactions.';
    } else if (stats.visitedCount === 3) {
        tipText = 'Almost there! Visit the last remaining section to complete your exploration.';
    } else {
        tipText = 'You\'ve explored everything! Feel free to revisit any section to discover more details and interactions.';
    }
    
    tipsContent.textContent = tipText;
}

// ============================================
// Navigation Helpers
// ============================================

/**
 * Set active state on navigation links based on current page
 */
function updateActiveNavLink() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href');
        link.classList.remove('active');
        
        // Check if this link matches the current page
        if (linkPath === currentFile || 
            (currentFile === 'index.html' && linkPath === 'index.html') ||
            (currentFile === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize shared functionality when the page loads
 */
function initializeShared() {
    // Mark current page as visited if it's a tracked page
    markCurrentPageAsVisited();
    
    // Update progress indicator (only runs on index.html)
    updateProgressIndicator();
    
    // Update active navigation link
    updateActiveNavLink();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeShared);
} else {
    // DOM is already ready
    initializeShared();
}

// ============================================
// Export functions for use in other scripts
// ============================================

// Make functions available globally if needed
window.PlaygroundProgress = {
    getVisitedPages,
    markPageAsVisited,
    isPageVisited,
    getProgressStats,
    updateProgressIndicator,
    FEATURE_PAGES
};

