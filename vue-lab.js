/**
 * vue-lab.js - Vue 3 application for the Interaction Dashboard
 * 
 * Uses Vue 3 from CDN to demonstrate reactive data binding
 */

(function() {
    'use strict';
    
    /**
     * Initialize Vue app when DOM and Vue are ready
     */
    function initVueApp() {
        const rootElement = document.getElementById('vue-app');
        
        if (!rootElement) {
            console.error('vue-app element not found');
            return false;
        }
        
        // Check if Vue is loaded
        if (typeof Vue === 'undefined') {
            console.error('Vue 3 not loaded from CDN');
            showVueError(rootElement);
            return false;
        }
        
        // Check if createApp is available
        if (!Vue.createApp) {
            console.error('Vue.createApp not available. Make sure you are using Vue 3.');
            showVueError(rootElement);
            return false;
        }
        
        try {
            // Create Vue application
            // Vue 3 uses createApp instead of new Vue()
            const { createApp } = Vue;
            
            createApp({
            // The data function returns reactive data
            // All properties here become reactive - when they change, the UI updates automatically
            data() {
                return {
                    // List of available interactive elements
                    interactiveElements: [
                        { id: 1, name: 'Animated buttons', category: 'visual', selected: false },
                        { id: 2, name: 'Scroll effects', category: 'visual', selected: false },
                        { id: 3, name: 'Dynamic forms', category: 'forms', selected: false },
                        { id: 4, name: 'Live previews', category: 'visual', selected: false },
                        { id: 5, name: 'Interactive maps', category: 'navigation', selected: false },
                        { id: 6, name: 'Contact forms', category: 'forms', selected: false },
                        { id: 7, name: 'Search functionality', category: 'navigation', selected: false },
                        { id: 8, name: 'Image galleries', category: 'visual', selected: false }
                    ],
                    
                    // Current filter selection
                    filterCategory: 'all' // 'all', 'visual', 'forms', 'navigation'
                };
            },
            
            // Computed properties are automatically cached and re-evaluate when dependencies change
            // They're perfect for derived data
            computed: {
                /**
                 * Filter elements based on selected category
                 * This automatically updates when filterCategory or interactiveElements change
                 */
                filteredElements() {
                    if (this.filterCategory === 'all') {
                        return this.interactiveElements;
                    }
                    return this.interactiveElements.filter(
                        element => element.category === this.filterCategory
                    );
                },
                
                /**
                 * Get count of selected elements
                 * Automatically recalculates when any element's selected state changes
                 */
                selectedCount() {
                    return this.interactiveElements.filter(el => el.selected).length;
                },
                
                /**
                 * Get list of selected element names
                 * Creates a comma-separated string of selected items
                 */
                selectedElementsList() {
                    const selected = this.interactiveElements
                        .filter(el => el.selected)
                        .map(el => el.name);
                    
                    if (selected.length === 0) {
                        return 'None';
                    } else if (selected.length === 1) {
                        return selected[0];
                    } else if (selected.length === 2) {
                        return selected.join(' and ');
                    } else {
                        const last = selected.pop();
                        return selected.join(', ') + ', and ' + last;
                    }
                },
                
                /**
                 * Calculate progress percentage
                 * Shows how many elements are selected out of total
                 */
                progressPercentage() {
                    const total = this.interactiveElements.length;
                    return total > 0 ? Math.round((this.selectedCount / total) * 100) : 0;
                }
            },
            
            // Methods are functions that can be called from templates
            methods: {
                /**
                 * Toggle the selected state of an element
                 * @param {Object} element - The element to toggle
                 */
                toggleElement(element) {
                    // Vue's reactivity system automatically detects this change
                    // and updates any computed properties or template bindings that depend on it
                    element.selected = !element.selected;
                },
                
                /**
                 * Update the filter category
                 * @param {String} category - The category to filter by
                 */
                setFilter(category) {
                    this.filterCategory = category;
                },
                
                /**
                 * Select or deselect all visible (filtered) elements
                 */
                toggleAll() {
                    const allSelected = this.filteredElements.every(el => el.selected);
                    this.filteredElements.forEach(el => {
                        el.selected = !allSelected;
                    });
                }
            }
        }).mount(rootElement);
            
            console.log('Vue app initialized successfully');
            return true;
        } catch (error) {
            console.error('Error initializing Vue app:', error);
            showVueError(rootElement, error.message);
            return false;
        }
    }
    
    /**
     * Show error message if Vue fails to load
     */
    function showVueError(rootElement, errorMessage) {
        const isLocalFile = window.location.protocol === 'file:';
        const errorHtml = `
            <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                <h3 style="color: var(--accent-color); margin-bottom: 1rem;">⚠️ Vue non è stato caricato</h3>
                <p style="margin-bottom: 1rem;">
                    ${isLocalFile 
                        ? 'Stai aprendo il file localmente (file://). Alcuni CDN potrebbero non funzionare in questo modo.' 
                        : 'Vue 3 non si è caricato correttamente dal CDN.'}
                </p>
                ${isLocalFile ? `
                <div style="background: rgba(99, 102, 241, 0.1); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; text-align: left;">
                    <strong>Suggerimenti:</strong>
                    <ul style="margin: 0.5rem 0 0 1.5rem;">
                        <li>Usa un server locale (es. Python: <code>python -m http.server</code>)</li>
                        <li>Oppure usa un'estensione del browser come "Live Server" in VS Code</li>
                        <li>Oppure apri la console del browser (F12) per vedere gli errori</li>
                    </ul>
                </div>
                ` : ''}
                ${errorMessage ? `<p style="font-size: 0.875rem; color: var(--text-secondary);">Errore: ${errorMessage}</p>` : ''}
                <p style="margin-top: 1rem; font-size: 0.875rem;">
                    Ricarica la pagina o controlla la connessione internet.
                </p>
            </div>
        `;
        rootElement.innerHTML = errorHtml;
    }
    
    // Wait for Vue to load from CDN, then initialize
    let initAttempts = 0;
    const maxAttempts = 10;
    
    function tryInitVue() {
        initAttempts++;
        
        if (initVueApp()) {
            // Success!
            return;
        }
        
        // If Vue not loaded yet and we haven't exceeded max attempts, try again
        if (initAttempts < maxAttempts && typeof Vue === 'undefined') {
            setTimeout(tryInitVue, 300);
        } else if (initAttempts >= maxAttempts) {
            // Give up after max attempts
            const rootElement = document.getElementById('vue-app');
            if (rootElement && typeof Vue === 'undefined') {
                showVueError(rootElement);
            }
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(tryInitVue, 100);
        });
    } else {
        setTimeout(tryInitVue, 100);
    }
    
    // Also try initializing after window load in case CDN loads slowly
    window.addEventListener('load', function() {
        if (initAttempts < maxAttempts) {
            setTimeout(tryInitVue, 200);
        }
    });
})();

