/**
 * react-lab.js - React application for the Site Configurator
 * 
 * Uses React via CDN (UMD build) with React.createElement (no JSX)
 * Demonstrates state management and reactive UI updates
 */

(function() {
    'use strict';
    
    // ============================================
    // React Components
    // ============================================
    
    /**
     * Main Site Configurator Component
     * Manages all state and renders the configuration interface
     */
    function SiteConfigurator() {
        // React.useState hook to manage component state
        // State is an object containing all configuration options
        const [config, setConfig] = React.useState({
            style: 'Minimal',
            layout: 'Single page',
            features: {
                animations: false,
                contactForm: false,
                blogSection: false
            }
        });
        
        /**
         * Update the site style option
         * When called, React automatically re-renders components that use this state
         */
        function handleStyleChange(event) {
            setConfig({
                ...config, // Spread operator: keep existing config
                style: event.target.value // Update only the style property
            });
        }
        
        /**
         * Update the layout option
         */
        function handleLayoutChange(event) {
            setConfig({
                ...config,
                layout: event.target.value
            });
        }
        
        /**
         * Toggle a feature on/off
         */
        function handleFeatureToggle(featureName) {
            setConfig({
                ...config,
                features: {
                    ...config.features, // Keep other features unchanged
                    [featureName]: !config.features[featureName] // Toggle this feature
                }
            });
        }
        
        /**
         * Calculate a recommended price range based on selections
         * This is just a demo - not real pricing logic
         */
        function calculatePriceRange() {
            let basePrice = 1000;
            
            // Add price based on style
            if (config.style === 'Colorful') basePrice += 200;
            if (config.style === 'Elegant') basePrice += 300;
            
            // Add price based on layout
            if (config.layout === 'Multi-page') basePrice += 500;
            
            // Add price for each feature
            Object.values(config.features).forEach(hasFeature => {
                if (hasFeature) basePrice += 150;
            });
            
            return basePrice;
        }
        
        /**
         * Get list of selected features as text
         */
        function getSelectedFeatures() {
            const selected = [];
            if (config.features.animations) selected.push('Animations');
            if (config.features.contactForm) selected.push('Contact form');
            if (config.features.blogSection) selected.push('Blog section');
            return selected.length > 0 ? selected.join(', ') : 'None';
        }
        
        // React.createElement is used instead of JSX
        // Syntax: React.createElement(type, props, ...children)
        return React.createElement('div', { className: 'configurator-container' },
            // Header
            React.createElement('h2', null, 'Site Configurator'),
            React.createElement('p', { className: 'config-description' },
                'Change the options below and watch the preview update in real-time. ' +
                'This demonstrates how React manages state and automatically updates the UI.'
            ),
            
            // Configuration Options
            React.createElement('div', { className: 'config-options' },
                // Style Selection
                React.createElement('div', { className: 'config-group' },
                    React.createElement('label', { htmlFor: 'style-select' }, 'Site Style:'),
                    React.createElement('select', {
                        id: 'style-select',
                        value: config.style,
                        onChange: handleStyleChange,
                        className: 'config-select'
                    },
                        React.createElement('option', { value: 'Minimal' }, 'Minimal'),
                        React.createElement('option', { value: 'Colorful' }, 'Colorful'),
                        React.createElement('option', { value: 'Elegant' }, 'Elegant')
                    )
                ),
                
                // Layout Selection
                React.createElement('div', { className: 'config-group' },
                    React.createElement('label', { htmlFor: 'layout-select' }, 'Layout:'),
                    React.createElement('select', {
                        id: 'layout-select',
                        value: config.layout,
                        onChange: handleLayoutChange,
                        className: 'config-select'
                    },
                        React.createElement('option', { value: 'Single page' }, 'Single page'),
                        React.createElement('option', { value: 'Multi-page' }, 'Multi-page')
                    )
                ),
                
                // Features Checkboxes
                React.createElement('div', { className: 'config-group' },
                    React.createElement('label', null, 'Extra Features:'),
                    React.createElement('div', { className: 'checkbox-group' },
                        React.createElement('label', { className: 'checkbox-label' },
                            React.createElement('input', {
                                type: 'checkbox',
                                checked: config.features.animations,
                                onChange: () => handleFeatureToggle('animations')
                            }),
                            ' Animations'
                        ),
                        React.createElement('label', { className: 'checkbox-label' },
                            React.createElement('input', {
                                type: 'checkbox',
                                checked: config.features.contactForm,
                                onChange: () => handleFeatureToggle('contactForm')
                            }),
                            ' Contact form'
                        ),
                        React.createElement('label', { className: 'checkbox-label' },
                            React.createElement('input', {
                                type: 'checkbox',
                                checked: config.features.blogSection,
                                onChange: () => handleFeatureToggle('blogSection')
                            }),
                            ' Blog section'
                        )
                    )
                )
            ),
            
            // Live Preview
            React.createElement('div', { className: 'preview-section' },
                React.createElement('h3', null, 'Live Preview'),
                React.createElement('div', {
                    className: 'preview-card',
                    'data-style': config.style.toLowerCase(),
                    'data-layout': config.layout.toLowerCase().replace(' ', '-')
                },
                    React.createElement('div', { className: 'preview-header' },
                        React.createElement('h4', null, config.style + ' ' + config.layout + ' Website')
                    ),
                    React.createElement('div', { className: 'preview-body' },
                        React.createElement('p', null,
                            'Style: ', React.createElement('strong', null, config.style)
                        ),
                        React.createElement('p', null,
                            'Layout: ', React.createElement('strong', null, config.layout)
                        ),
                        React.createElement('p', null,
                            'Features: ', React.createElement('strong', null, getSelectedFeatures())
                        )
                    )
                )
            ),
            
            // State Summary
            React.createElement('div', { className: 'state-summary' },
                React.createElement('h3', null, 'Current Configuration'),
                React.createElement('p', null,
                    'Your current choices: ',
                    React.createElement('strong', null,
                        config.style + ', ' + config.layout +
                        (getSelectedFeatures() !== 'None' ? ', with ' + getSelectedFeatures() + '.' : '.')
                    )
                )
            ),
            
            // Price Estimate
            React.createElement('div', { className: 'price-estimate' },
                React.createElement('h3', null, 'Estimated Starting Price'),
                React.createElement('p', { className: 'price-text' },
                    'Recommended starting price range: ',
                    React.createElement('strong', { style: { color: 'var(--success-color)', fontSize: '1.25rem' } },
                        '$' + calculatePriceRange().toLocaleString() + ' - $' + (calculatePriceRange() + 500).toLocaleString()
                    )
                ),
                React.createElement('p', { style: { fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' } },
                    '* This is a demo estimate. Actual pricing would be determined based on specific requirements.'
                )
            )
        );
    }
    
    // ============================================
    // Render the React App
    // ============================================
    
    /**
     * Initialize React app when DOM is ready
     * ReactDOM.render is used to mount the component into the DOM
     */
    function initReactApp() {
        const rootElement = document.getElementById('react-root');
        
        if (rootElement && typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
            // Create root using React 18's createRoot (if available) or legacy render
            if (ReactDOM.createRoot) {
                // React 18+
                const root = ReactDOM.createRoot(rootElement);
                root.render(React.createElement(SiteConfigurator));
            } else {
                // React 17 and earlier
                ReactDOM.render(React.createElement(SiteConfigurator), rootElement);
            }
        } else {
            console.error('React or ReactDOM not loaded, or react-root element not found');
        }
    }
    
    // Wait for React to load from CDN, then initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Wait a bit for CDN scripts to load
            setTimeout(initReactApp, 100);
        });
    } else {
        setTimeout(initReactApp, 100);
    }
    
    // Also try initializing after a delay in case CDN loads slowly
    window.addEventListener('load', function() {
        setTimeout(initReactApp, 200);
    });
})();

