/**
 * Template Switcher
 * Dynamically styled button and modal for switching between design templates
 */

(function() {
    'use strict';

    // Template definitions
    const templates = [
        { name: 'Minimal', file: 'index.html', color: '#000000', darkColor: '#1a1a1a' },
        { name: 'Neubrutalism', file: 'neubrutalism.html', color: '#FFE800', darkColor: '#121212' },
        { name: 'Maximalist', file: 'maximalist.html', color: '#CCFF00', darkColor: '#B026FF' },
        { name: 'Skeuomorphic', file: 'skeuomorphic.html', color: '#3a7bd5', darkColor: '#2c3e50' },
        { name: 'Aero', file: 'aero.html', color: '#00d2ff', darkColor: '#3a7bd5' },
        { name: 'Swiss', file: 'swiss.html', color: '#FF3000', darkColor: '#000000' }
    ];

    // Detect current template from URL
    function getCurrentTemplate() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);

        for (let template of templates) {
            if (filename === template.file || (filename === '' && template.file === 'index.html')) {
                return template.name.toLowerCase();
            }
        }
        return 'minimal'; // default
    }

    const currentTemplate = getCurrentTemplate();

    // Generate styles based on current template
    function getStyles() {
        const styles = {
            minimal: {
                button: `
                    position: fixed;
                    bottom: 32px;
                    right: 32px;
                    width: 48px;
                    height: 48px;
                    background: #ffffff;
                    border: 1px solid #e0e0e0;
                    cursor: pointer;
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    transition: all 0.2s;
                    border-radius: 2px;
                `,
                buttonHover: `
                    border-color: #000000;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                `,
                modal: `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #ffffff;
                    border: 1px solid #e0e0e0;
                    padding: 48px;
                    z-index: 9999;
                    max-width: 480px;
                    width: 90%;
                `,
                overlay: `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 9998;
                `,
                title: `
                    font-family: 'Inter', -apple-system, sans-serif;
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 32px;
                    color: #1a1a1a;
                    letter-spacing: -0.02em;
                `,
                templateButton: `
                    display: block;
                    width: 100%;
                    padding: 16px;
                    margin-bottom: 1px;
                    background: #ffffff;
                    border: none;
                    border-bottom: 1px solid #e0e0e0;
                    font-weight: 500;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                    color: #1a1a1a;
                `,
                closeButton: `
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    width: 32px;
                    height: 32px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    font-size: 24px;
                    font-weight: 300;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                `
            },
            neubrutalism: {
                button: `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 60px;
                    height: 60px;
                    background: #FFE800;
                    border: 4px solid #121212;
                    box-shadow: 6px 6px 0px 0px #121212;
                    cursor: pointer;
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    transition: transform 0.2s, box-shadow 0.2s;
                `,
                buttonHover: `
                    transform: translate(3px, 3px);
                    box-shadow: 3px 3px 0px 0px #121212;
                `,
                modal: `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #ffffff;
                    border: 5px solid #121212;
                    box-shadow: 12px 12px 0px 0px #121212;
                    padding: 40px;
                    z-index: 9999;
                    max-width: 500px;
                    width: 90%;
                `,
                overlay: `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(18, 18, 18, 0.7);
                    z-index: 9998;
                `,
                title: `
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 32px;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin-bottom: 24px;
                    color: #121212;
                `,
                templateButton: `
                    display: block;
                    width: 100%;
                    padding: 16px;
                    margin-bottom: 12px;
                    background: #ffffff;
                    border: 3px solid #121212;
                    font-weight: bold;
                    font-size: 16px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                `,
                closeButton: `
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    width: 36px;
                    height: 36px;
                    background: #FF6B6B;
                    border: 3px solid #121212;
                    cursor: pointer;
                    font-size: 20px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `
            },
            maximalist: {
                button: `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, #CCFF00, #B026FF);
                    border: 4px solid #000000;
                    box-shadow: 8px 8px 0px 0px #000;
                    cursor: pointer;
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    transition: transform 0.3s;
                    animation: jitter 2s infinite;
                `,
                buttonHover: `
                    transform: scale(1.1) rotate(5deg);
                `,
                modal: `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-1deg);
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                    border: 6px solid #CCFF00;
                    box-shadow: 15px 15px 0px 0px #B026FF, -5px -5px 0px 0px #00F0FF;
                    padding: 50px;
                    z-index: 9999;
                    max-width: 550px;
                    width: 90%;
                `,
                overlay: `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(10, 10, 10, 0.9);
                    backdrop-filter: blur(5px);
                    z-index: 9998;
                `,
                title: `
                    font-family: 'Anton', sans-serif;
                    font-size: 48px;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin-bottom: 30px;
                    color: #CCFF00;
                    text-shadow: 3px 3px 0px #B026FF;
                `,
                templateButton: `
                    display: block;
                    width: 100%;
                    padding: 20px;
                    margin-bottom: 15px;
                    background: linear-gradient(to right, #CCFF00, #00F0FF);
                    border: 4px solid #000;
                    font-weight: 900;
                    font-size: 18px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                    color: #000;
                    box-shadow: 4px 4px 0px #fff;
                `,
                closeButton: `
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 40px;
                    height: 40px;
                    background: #FF0099;
                    border: 3px solid #000;
                    cursor: pointer;
                    font-size: 24px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    transform: rotate(45deg);
                `
            },
            skeuomorphic: {
                button: `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 65px;
                    height: 65px;
                    background: linear-gradient(to bottom, #5bc0de 0%, #2f96b4 50%, #1f85a3 50%, #2f96b4 100%);
                    border: 1px solid #186f8a;
                    border-radius: 50%;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.3);
                    cursor: pointer;
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: white;
                    text-shadow: 0 -1px 0 rgba(0,0,0,0.3);
                    transition: all 0.2s;
                `,
                buttonHover: `
                    filter: brightness(1.1);
                    transform: translateY(-2px);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 6px 12px rgba(0,0,0,0.4);
                `,
                modal: `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(145deg, #f0f0f0, #dcdcdc);
                    border: 1px solid rgba(255,255,255,0.4);
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3), inset 1px 1px 0px rgba(255, 255, 255, 0.8);
                    padding: 50px;
                    z-index: 9999;
                    max-width: 500px;
                    width: 90%;
                `,
                overlay: `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(3px);
                    z-index: 9998;
                `,
                title: `
                    font-family: 'Rajdhani', sans-serif;
                    font-size: 36px;
                    font-weight: 700;
                    margin-bottom: 30px;
                    color: #2c3e50;
                    text-shadow: 1px 1px 0 rgba(255,255,255,0.8);
                `,
                templateButton: `
                    display: block;
                    width: 100%;
                    padding: 14px 18px;
                    margin-bottom: 10px;
                    background: linear-gradient(to bottom, #f5f5f5, #e0e0e0);
                    border: 1px solid #aaa;
                    border-radius: 6px;
                    box-shadow: inset 0 1px 0 #fff, 0 3px 5px rgba(0,0,0,0.2);
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                    color: #333;
                `,
                closeButton: `
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(to bottom, #ff8a8a, #d32f2f);
                    border: 1px solid rgba(0,0,0,0.2);
                    border-radius: 50%;
                    box-shadow: inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.2);
                    cursor: pointer;
                    font-size: 18px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                `
            },
            aero: {
                button: `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 65px;
                    height: 65px;
                    background: rgba(240, 248, 255, 0.8);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8);
                    cursor: pointer;
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: #3a7bd5;
                    transition: all 0.3s;
                `,
                buttonHover: `
                    transform: translateY(-3px);
                    box-shadow: 0 12px 25px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9);
                    background: rgba(240, 248, 255, 0.95);
                `,
                modal: `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(240, 248, 255, 0.75);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    border-radius: 12px;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.2);
                    padding: 50px;
                    z-index: 9999;
                    max-width: 500px;
                    width: 90%;
                `,
                overlay: `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(0, 168, 255, 0.3), rgba(132, 204, 22, 0.2));
                    backdrop-filter: blur(10px);
                    z-index: 9998;
                `,
                title: `
                    font-family: 'Varela Round', sans-serif;
                    font-size: 36px;
                    font-weight: 700;
                    margin-bottom: 30px;
                    color: #2c3e50;
                    text-shadow: 0 1px 2px rgba(255,255,255,0.8);
                `,
                templateButton: `
                    display: block;
                    width: 100%;
                    padding: 16px 20px;
                    margin-bottom: 12px;
                    background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8);
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s;
                    text-align: left;
                    color: #2c3e50;
                `,
                closeButton: `
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 32px;
                    height: 32px;
                    background: rgba(255, 138, 138, 0.8);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.6);
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    cursor: pointer;
                    font-size: 18px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                `
            },
            swiss: {
                button: `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 60px;
                    height: 60px;
                    background: #FF3000;
                    border: none;
                    cursor: pointer;
                    z-index: 9998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: white;
                    transition: all 0.3s;
                `,
                buttonHover: `
                    background: #000000;
                `,
                modal: `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #FFFFFF;
                    border: 1px solid #000000;
                    padding: 60px;
                    z-index: 9999;
                    max-width: 500px;
                    width: 90%;
                `,
                overlay: `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 9998;
                `,
                title: `
                    font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
                    font-size: 32px;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin-bottom: 40px;
                    color: #000000;
                    letter-spacing: -0.04em;
                    line-height: 0.9;
                `,
                templateButton: `
                    display: block;
                    width: 100%;
                    padding: 18px 0;
                    margin-bottom: 2px;
                    background: #FFFFFF;
                    border: 1px solid #000000;
                    border-bottom: 1px solid #000000;
                    font-weight: 600;
                    font-size: 16px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                    color: #000000;
                    letter-spacing: -0.02em;
                    padding-left: 20px;
                `,
                closeButton: `
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 32px;
                    height: 32px;
                    background: #FF3000;
                    border: none;
                    cursor: pointer;
                    font-size: 20px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                `
            }
        };

        return styles[currentTemplate];
    }

    // Create switcher button
    function createButton() {
        const button = document.createElement('div');
        button.id = 'template-switcher-btn';
        button.innerHTML = '🎨';
        button.title = 'Change Template';

        const styles = getStyles();
        button.style.cssText = styles.button;

        button.addEventListener('mouseenter', function() {
            const hoverStyle = styles.buttonHover.split(';');
            hoverStyle.forEach(style => {
                const [prop, value] = style.split(':');
                if (prop && value) {
                    button.style[prop.trim()] = value.trim();
                }
            });
        });

        button.addEventListener('mouseleave', function() {
            button.style.cssText = styles.button;
        });

        button.addEventListener('click', openModal);

        document.body.appendChild(button);
    }

    // Create modal
    function createModal() {
        const styles = getStyles();

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'template-switcher-overlay';
        overlay.style.cssText = styles.overlay;
        overlay.addEventListener('click', closeModal);

        // Modal
        const modal = document.createElement('div');
        modal.id = 'template-switcher-modal';
        modal.style.cssText = styles.modal;

        // Title
        const title = document.createElement('h2');
        title.textContent = 'Switch Template';
        title.style.cssText = styles.title;

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = styles.closeButton;
        closeBtn.addEventListener('click', closeModal);

        // Template buttons
        const buttonsContainer = document.createElement('div');
        templates.forEach(template => {
            const btn = document.createElement('button');
            btn.textContent = template.name;
            btn.style.cssText = styles.templateButton;

            // Highlight current template
            if (template.name.toLowerCase() === currentTemplate) {
                if (currentTemplate === 'minimal') {
                    btn.style.background = '#f5f5f5';
                    btn.style.borderBottom = '2px solid #000000';
                } else if (currentTemplate === 'neubrutalism') {
                    btn.style.background = '#FFE800';
                } else if (currentTemplate === 'maximalist') {
                    btn.style.background = '#CCFF00';
                } else if (currentTemplate === 'skeuomorphic') {
                    btn.style.background = '#5bc0de';
                } else if (currentTemplate === 'aero') {
                    btn.style.background = '#00d2ff';
                } else if (currentTemplate === 'swiss') {
                    btn.style.background = '#FF3000';
                    btn.style.color = '#ffffff';
                }
            }

            // Hover effects
            btn.addEventListener('mouseenter', function() {
                if (currentTemplate === 'minimal') {
                    btn.style.background = '#f5f5f5';
                } else if (currentTemplate === 'neubrutalism') {
                    btn.style.transform = 'translateX(4px)';
                    btn.style.background = template.color;
                } else if (currentTemplate === 'maximalist') {
                    btn.style.transform = 'scale(1.05) rotate(-1deg)';
                } else if (currentTemplate === 'skeuomorphic') {
                    btn.style.filter = 'brightness(1.1)';
                    btn.style.transform = 'translateY(-1px)';
                } else if (currentTemplate === 'aero') {
                    btn.style.background = 'rgba(255,255,255,0.95)';
                    btn.style.transform = 'translateY(-2px)';
                } else if (currentTemplate === 'swiss') {
                    btn.style.background = '#000000';
                    btn.style.color = '#ffffff';
                }
            });

            btn.addEventListener('mouseleave', function() {
                btn.style.cssText = styles.templateButton;
                // Re-highlight current template
                if (template.name.toLowerCase() === currentTemplate) {
                    if (currentTemplate === 'minimal') {
                        btn.style.background = '#f5f5f5';
                        btn.style.borderBottom = '2px solid #000000';
                    } else if (currentTemplate === 'neubrutalism') {
                        btn.style.background = '#FFE800';
                    } else if (currentTemplate === 'maximalist') {
                        btn.style.background = '#CCFF00';
                    } else if (currentTemplate === 'skeuomorphic') {
                        btn.style.background = '#5bc0de';
                    } else if (currentTemplate === 'aero') {
                        btn.style.background = '#00d2ff';
                    } else if (currentTemplate === 'swiss') {
                        btn.style.background = '#FF3000';
                        btn.style.color = '#ffffff';
                    }
                }
            });

            btn.addEventListener('click', function() {
                navigateToTemplate(template.file);
            });

            buttonsContainer.appendChild(btn);
        });

        modal.appendChild(closeBtn);
        modal.appendChild(title);
        modal.appendChild(buttonsContainer);

        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        // Add animation styles for maximalist
        if (currentTemplate === 'maximalist') {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes jitter {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(1px, 1px); }
                    50% { transform: translate(-1px, -1px); }
                    75% { transform: translate(1px, -1px); }
                    100% { transform: translate(0, 0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Open modal
    function openModal() {
        createModal();
    }

    // Close modal
    function closeModal() {
        const modal = document.getElementById('template-switcher-modal');
        const overlay = document.getElementById('template-switcher-overlay');

        if (modal) modal.remove();
        if (overlay) overlay.remove();
    }

    // Navigate to template
    function navigateToTemplate(filename) {
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        window.location.href = basePath + filename;
    }

    // Initialize on page load
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createButton);
        } else {
            createButton();
        }
    }

    init();

})();
