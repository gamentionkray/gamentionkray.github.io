/**
 * Advanced Theme Switcher - V2 Ultimate
 * Features:
 * 1. Draggable HUD Button with Edge Snapping
 * 2. Live Iframe Previews
 * 3. Keyboard Shortcuts (Ctrl+K, Esc)
 * 4. Dynamic Meta/Titles
 * 5. Hidden Konami Code Unlockable
 */

(function () {
    'use strict';

    // --- 1. Configuration & State ---

    // Device Detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    let templates;

    if (isMobile) {
        // Mobile-only view
        templates = [
            { name: 'Mobile App', file: 'mobile.html', desc: 'Optimized app-like interface for touch devices.', palette: ['#ffffff', '#000000', '#3b82f6'] }
        ];
    } else {
        // Desktop views (Exclude Mobile)
        templates = [
            { name: 'Minimal', file: 'index.html', desc: 'Less is more. Clean lines and whitespace.', palette: ['#000000', '#FFFFFF', '#E0E0E0'] },
            { name: 'Neubrutalism', file: 'neubrutalism.html', desc: 'Bold typography, high contrast, hard shadows.', palette: ['#FFE800', '#121212', '#FFFFFF'] },
            { name: 'Maximalist', file: 'maximalist.html', desc: 'Chaos, energy, and sensory overload.', palette: ['#CCFF00', '#B026FF', '#00F0FF'] },
            { name: 'Skeuomorphic', file: 'skeuomorphic.html', desc: 'Real-world textures, depth, and tactility.', palette: ['#3a7bd5', '#2c3e50', '#ecf0f1'] },
            { name: 'Aero', file: 'aero.html', desc: 'Glassmorphism, blur, and glossy surfaces.', palette: ['#00d2ff', 'rgba(255,255,255,0.5)', '#3a7bd5'] },
            { name: 'Swiss', file: 'swiss.html', desc: 'Grid systems, asymmetry, and Helvetica.', palette: ['#FF3000', '#000000', '#FFFFFF'] },
            { name: 'Cyberpunk', file: 'cyberpunk.html', desc: 'High tech, low life. Neon and glitches.', palette: ['#00ffff', '#ff00ff', '#14141f'] },
            { name: 'Retro', file: 'retro.html', desc: 'Nostalgic warmth, beige tones, and serifs.', palette: ['#D2691E', '#F5F5DC', '#654321'] },
            { name: 'Terminal', file: 'terminal.html', desc: 'Command line interface. Pure data.', palette: ['#00ff00', '#000000', '#003300'] },
            { name: 'Vaporwave', file: 'vaporwave.html', desc: 'Retro-futuristic aesthetics with neon colors.', palette: ['#ff2a6d', '#05d9e8', '#7700a6'] },
            { name: 'Art Deco', file: 'artdeco.html', desc: 'Elegant 1920s luxury and geometric patterns.', palette: ['#D4AF37', '#050505', '#F9F1D0'] },
            { name: 'Holographic', file: 'holographic.html', desc: 'Futuristic glass morphism and iridescence.', palette: ['#ff0080', '#40e0d0', '#ffffff'] },
            { name: 'Pixel Art', file: 'pixelart.html', desc: '8-bit retro gaming nostalgia.', palette: ['#4aff4d', '#ff4a4a', '#ffee00'] },
            { name: 'Chalkboard', file: 'chalkboard.html', desc: 'Hand-drawn chalk on blackboard aesthetic.', palette: ['#ffffff', '#2c2c2c', '#ffeb3b'] },
            { name: 'Claymorphism', file: 'claymorphism.html', desc: 'Soft 3D clay-like UI elements.', palette: ['#ff6b6b', '#4ecdc4', '#f7fff7'] },
            { name: 'Corporate', file: 'corporate.html', desc: 'Professional business aesthetic.', palette: ['#1e3a8a', '#ffffff', '#f3f4f6'] },
            { name: 'Industrial', file: 'industrial.html', desc: 'Raw materials and utilitarian design.', palette: ['#ff6b35', '#004e89', '#1a1a1d'] },
            { name: 'Isometric', file: 'isometric.html', desc: '3D isometric perspective design.', palette: ['#6c5ce7', '#fd79a8', '#fdcb6e'] },
            { name: 'Newspaper', file: 'newspaper.html', desc: 'Classic print journalism layout.', palette: ['#000000', '#ffffff', '#d4d4d4'] },
            { name: 'Ukiyo-e', file: 'ukiyoe.html', desc: 'Japanese woodblock print aesthetics.', palette: ['#d32f2f', '#1976d2', '#fbc02d'] },
            { name: 'Scientific', file: 'scientific.html', desc: 'Academic research paper styling.', palette: ['#1565c0', '#ffffff', '#e0e0e0'] },
            { name: 'Dashboard', file: 'dashboard.html', desc: 'Data visualization and metrics.', palette: ['#00bcd4', '#ff5722', '#ffffff'] },
            { name: 'Bento Box', file: 'bentobox.html', desc: 'Japanese grid-based card layout.', palette: ['#ff6b6b', '#4ecdc4', '#ffffff'] },
            { name: 'Risograph', file: 'risograph.html', desc: 'Vintage print texture and color.', palette: ['#ff6b6b', '#feca57', '#48dbfb'] },
            { name: 'Origami', file: 'origami.html', desc: 'Folded paper geometric design.', palette: ['#e91e63', '#00bcd4', '#ffffff'] },
            { name: 'Bauhaus', file: 'bauhaus.html', desc: 'Geometric modernist German design.', palette: ['#ff0000', '#ffeb00', '#0066cc'] },
            { name: 'Film Grain', file: 'filmgrain.html', desc: 'Vintage analog photography feel.', palette: ['#f5f5dc', '#8b4513', '#2c2c2c'] },
            { name: 'Minecraft', file: 'minecraft.html', desc: 'Blocky voxel game aesthetic.', palette: ['#8bc34a', '#795548', '#00bcd4'] },
            { name: 'RPG', file: 'rpg.html', desc: 'Fantasy role-playing game interface.', palette: ['#d4af37', '#8b0000', '#2c1810'] },
            { name: 'Desert', file: 'desert.html', desc: 'Warm sandy dunes and earthy tones.', palette: ['#f4a460', '#deb887', '#8b4513'] },
            { name: 'Nordic', file: 'nordic.html', desc: 'Scandinavian minimalism and nature.', palette: ['#2e5266', '#d6e4e5', '#497174'] },
            { name: 'Dota 2', file: 'dota2.html', desc: 'Epic MOBA game fantasy theme.', palette: ['#c41e3a', '#00758f', '#1a1a1a'] },
            { name: 'Underwater', file: 'underwater.html', desc: 'Deep ocean aquatic atmosphere.', palette: ['#006994', '#00d4ff', '#002b49'] },
            { name: 'Cosmic', file: 'cosmic.html', desc: 'Outer space and galaxies.', palette: ['#6a0dad', '#00ffff', '#0a0a0a'] },
            { name: 'Neon Noir', file: 'neonnoir.html', desc: 'Dark cyberpunk crime aesthetics.', palette: ['#ff006e', '#8338ec', '#0a0a0a'] },
            { name: 'Dieselpunk', file: 'dieselpunk.html', desc: 'Retro-futuristic diesel-powered tech.', palette: ['#8b4513', '#ff8c00', '#2f4f4f'] },
            { name: 'Weathered', file: 'weathered.html', desc: 'Aged and distressed vintage look.', palette: ['#a0826d', '#7a6a5a', '#f5f5dc'] }
        ];
    }

    // Konami Code Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    function getCurrentTemplate() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        const found = templates.find(t => t.file === filename || (filename === '' && t.file === 'index.html'));
        return found ? found.name.toLowerCase() : 'minimal';
    }

    const currentTheme = getCurrentTemplate();

    // Drag state to prevent clicking when dragging
    let isDragging = false;

    // --- 2. CSS Generator ---

    function getThemeCSS() {
        const commonCSS = `
            #ts-root { font-family: sans-serif; z-index: 10000; position: relative; }
            
            /* Floating Button */
            #ts-btn {
                position: fixed; bottom: 32px; right: 32px; width: 60px; height: 60px;
                border-radius: 50%; cursor: grab; display: flex; align-items: center; justify-content: center;
                font-size: 24px; transition: transform 0.2s, box-shadow 0.2s;
                z-index: 10001; user-select: none; touch-action: none;
            }
            #ts-btn:active { cursor: grabbing; }
            #ts-btn:hover { transform: scale(1.1); }

            /* Overlay */
            #ts-overlay {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.6); opacity: 0; visibility: hidden;
                transition: opacity 0.3s; z-index: 10002; backdrop-filter: blur(4px);
            }
            #ts-overlay.active { opacity: 1; visibility: visible; }

            /* Modal Container */
            #ts-modal {
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -45%) scale(0.95);
                width: 90%; max-width: 900px; height: 80vh;
                display: grid; grid-template-columns: 1.5fr 2fr; /* More space for preview */
                opacity: 0; visibility: hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                z-index: 10003; overflow: hidden;
            }
            #ts-modal.active { transform: translate(-50%, -50%) scale(1); opacity: 1; visibility: visible; }
            
            @media (max-width: 800px) {
                #ts-modal { grid-template-columns: 1fr; }
                #ts-info { display: none !important; }
            }

            /* Sections */
            #ts-grid { padding: 30px; display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 15px; overflow-y: auto; align-content: start; }
            #ts-info { padding: 40px; display: flex; flex-direction: column; justify-content: flex-start; position: relative; overflow: hidden; }
            
            /* Typography & Components */
            .ts-title { font-size: 24px; margin-bottom: 20px; grid-column: 1 / -1; font-weight: bold; }
            .ts-info-header { margin-bottom: 20px; }
            .ts-info-title { font-size: 32px; font-weight: 900; margin-bottom: 5px; line-height: 1; }
            .ts-info-desc { font-size: 14px; opacity: 0.8; line-height: 1.4; }
            
            /* Preview Iframe Wrapper */
            .ts-preview-box {
                width: 100%; flex-grow: 1; border-radius: 8px; overflow: hidden;
                position: relative; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                border: 1px solid rgba(0,0,0,0.1);
            }
            .ts-preview-iframe {
                width: 200%; height: 200%; transform: scale(0.5); transform-origin: 0 0;
                border: none; pointer-events: none; /* Prevent clicking inside iframe */
            }

            /* Selection Buttons */
            .ts-opt {
                padding: 15px; border: none; cursor: pointer; text-align: left;
                display: flex; flex-direction: column; gap: 5px; justify-content: center;
                transition: all 0.2s; position: relative; overflow: hidden; min-height: 70px;
            }
            .ts-opt-name { font-weight: bold; font-size: 14px; z-index: 2; line-height: 1.3; word-wrap: break-word; }
            .ts-opt-status { font-size: 10px; opacity: 0.6; z-index: 2; line-height: 1.2; }
            
            #ts-close {
                position: absolute; top: 20px; right: 20px; width: 32px; height: 32px;
                background: transparent; border: none; cursor: pointer; font-size: 20px;
                display: flex; align-items: center; justify-content: center; z-index: 10;
            }
            
            /* Shortcut Hint */
            .ts-hint {
                position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
                font-size: 12px; opacity: 0.5; pointer-events: none;
                background: rgba(0,0,0,0.1); padding: 4px 8px; border-radius: 4px;
            }
        `;

        const themeSpecifics = {
            'mobile app': `
                #ts-btn { background: #fff; color: #000; border: 1px solid #eee; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                #ts-modal { background: #fff; border-radius: 12px; }
                #ts-info { background: #f5f5f5; }
                .ts-opt { background: #fff; border: 1px solid #eee; border-radius: 8px; }
                .ts-opt:hover { border-color: #3b82f6; }
            `,
            minimal: `
                #ts-btn { background: #fff; color: #000; border: 1px solid #eee; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                #ts-modal { background: #fff; border-radius: 8px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
                #ts-info { background: #f9f9f9; border-left: 1px solid #eee; }
                .ts-opt { background: #fff; border: 1px solid #eee; border-radius: 6px; }
                .ts-opt:hover { border-color: #000; transform: translateY(-2px); }
            `,
            neubrutalism: `
                #ts-btn { background: #FFE800; color: #121212; border: 3px solid #121212; box-shadow: 4px 4px 0 #121212; border-radius: 0; }
                #ts-modal { background: #fff; border: 4px solid #121212; box-shadow: 12px 12px 0 #121212; border-radius: 0; }
                #ts-info { background: #FFE800; border-left: 4px solid #121212; }
                .ts-opt { background: #fff; border: 3px solid #121212; box-shadow: 4px 4px 0 #eee; border-radius: 0; }
                .ts-opt:hover { box-shadow: 2px 2px 0 #121212; transform: translate(2px, 2px); background: #f0f0f0; }
                .ts-title { text-transform: uppercase; font-weight: 900; }
            `,
            maximalist: `
                @keyframes jitter { 0% { transform: translate(0,0); } 25% { transform: translate(1px, 1px); } 50% { transform: translate(-1px, -1px); } 75% { transform: translate(1px, -1px); } }
                #ts-btn { background: linear-gradient(45deg, #CCFF00, #B026FF); border: 3px solid #000; animation: jitter 0.5s infinite; font-size: 30px; }
                #ts-modal { background: #000; border: 5px solid #CCFF00; outline: 5px solid #B026FF; border-radius: 0; }
                #ts-info { background: repeating-linear-gradient(45deg, #B026FF, #B026FF 10px, #a015ef 10px, #a015ef 20px); color: #fff; }
                #ts-grid { background: #1a1a1a; }
                .ts-opt { background: #333; border: 2px solid #fff; color: #CCFF00; }
                .ts-opt:hover { background: #CCFF00; color: #000; transform: scale(1.05); }
                .ts-title { text-transform: uppercase; font-size: 32px; color: #CCFF00; text-shadow: 3px 3px 0 #B026FF; }
            `,
            skeuomorphic: `
                #ts-btn { background: linear-gradient(#e6e6e6, #ccc); border: 1px solid #999; box-shadow: inset 0 1px 0 #fff, 0 5px 10px rgba(0,0,0,0.3); color: #333; text-shadow: 0 1px 0 #fff; }
                #ts-modal { background: linear-gradient(#f2f2f2, #d9d9d9); border: 1px solid #aaa; border-radius: 12px; box-shadow: 0 0 0 1px rgba(255,255,255,0.5) inset, 0 20px 50px rgba(0,0,0,0.5); }
                #ts-info { background: #2c3e50; box-shadow: inset 0 0 20px rgba(0,0,0,0.5); color: #ecf0f1; border-radius: 0 11px 11px 0; }
                .ts-opt { background: linear-gradient(#fff, #f0f0f0); border: 1px solid #bbb; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                .ts-opt:active { background: #e0e0e0; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); }
            `,
            aero: `
                #ts-btn { background: rgba(255,255,255,0.4); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); color: #fff; }
                #ts-modal { background: rgba(255, 255, 255, 0.25); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.18); }
                #ts-info { background: rgba(0, 210, 255, 0.1); border-left: 1px solid rgba(255,255,255,0.2); color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.3); }
                .ts-opt { background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 12px; color: #1a1a1a; }
                .ts-opt:hover { background: rgba(255, 255, 255, 0.7); box-shadow: 0 0 15px rgba(255,255,255,0.5); }
            `,
            swiss: `
                #ts-btn { background: #FF3000; border: none; color: #fff; border-radius: 0; }
                #ts-modal { background: #fff; border: none; border-radius: 0; }
                #ts-grid { padding: 0; gap: 0; }
                #ts-info { background: #000; color: #fff; }
                .ts-opt { border: none; border-bottom: 1px solid #000; border-radius: 0; padding: 20px; }
                .ts-opt:hover { background: #FF3000; color: #fff; }
                .ts-title { font-weight: 900; font-size: 36px; text-transform: uppercase; }
            `,
            cyberpunk: `
                #ts-btn { background: rgba(10,10,10,0.9); border: 2px solid #00ffff; color: #00ffff; box-shadow: 0 0 10px #00ffff; }
                #ts-modal { background: rgba(5, 5, 10, 0.95); border: 1px solid #00ffff; box-shadow: 0 0 30px rgba(0,255,255,0.2); border-radius: 4px; }
                #ts-info { background: linear-gradient(180deg, rgba(0,255,255,0.1) 0%, transparent 100%); border-left: 1px solid #00ffff; color: #eee; }
                .ts-opt { background: rgba(255, 255, 255, 0.05); border-left: 2px solid #333; color: #eee; }
                .ts-opt:hover { border-left: 4px solid #ff00ff; background: rgba(255, 0, 255, 0.1); color: #ff00ff; }
                .ts-title { color: #00ffff; text-transform: uppercase; text-shadow: 0 0 5px #00ffff; }
            `,
            retro: `
                #ts-btn { background: #D2691E; border: 3px double #654321; color: #F5F5DC; }
                #ts-modal { background: #F5F5DC; border: 10px solid #654321; border-radius: 4px; box-shadow: inset 0 0 20px rgba(0,0,0,0.1); }
                #ts-info { background: #E6D8AD; border-left: 2px dashed #654321; color: #654321; }
                .ts-opt { background: transparent; border: 1px solid #C0A080; color: #333; }
                .ts-opt:hover { background: #D2691E; color: #F5F5DC; border-color: #654321; }
                .ts-title { color: #654321; text-decoration: underline; }
            `,
            terminal: `
                #ts-btn { background: #000; border: 2px solid #00ff00; color: #00ff00; border-radius: 0; }
                #ts-btn::before { content: '>_'; }
                #ts-modal { background: #000; border: 2px solid #00ff00; border-radius: 0; }
                #ts-info { border-left: 1px solid #003300; color: #00ff00; }
                .ts-opt { background: #000; border: 1px solid #003300; color: #00aa00; padding: 10px; }
                .ts-opt:hover { background: #001100; border-color: #00ff00; color: #00ff00; }
                .ts-title { color: #00ff00; text-shadow: 0 0 5px #00ff00; }
            `,
            vaporwave: `
                #ts-btn { background: linear-gradient(135deg, #ff2a6d, #05d9e8); color: #fff; border: 2px solid #7700a6; box-shadow: 0 0 20px rgba(255,42,109,0.5); }
                #ts-modal { background: #0b0014; border: 2px solid #ff2a6d; box-shadow: 0 0 30px rgba(5,217,232,0.3); border-radius: 0; }
                #ts-info { background: linear-gradient(180deg, rgba(119,0,166,0.3), transparent); border-left: 2px solid #05d9e8; color: #fbf8cc; }
                #ts-grid { background: rgba(0,0,0,0.3); }
                .ts-opt { background: rgba(5,217,232,0.1); border: 1px solid rgba(255,42,109,0.3); color: #05d9e8; }
                .ts-opt:hover { background: rgba(255,42,109,0.2); border-color: #ff2a6d; color: #fbf8cc; }
                .ts-title { color: #ff2a6d; text-shadow: 0 0 10px #05d9e8; text-transform: uppercase; }
            `,
            'art deco': `
                #ts-btn { background: #D4AF37; color: #050505; border: 4px double #F9F1D0; box-shadow: 0 4px 20px rgba(212,175,55,0.3); }
                #ts-modal { background: #050505; border: 4px double #D4AF37; border-radius: 0; box-shadow: 0 0 40px rgba(212,175,55,0.2); }
                #ts-info { background: linear-gradient(180deg, rgba(212,175,55,0.1), transparent); border-left: 2px solid #D4AF37; color: #F9F1D0; }
                .ts-opt { background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.3); color: #F9F1D0; }
                .ts-opt:hover { background: #D4AF37; color: #050505; border-color: #F9F1D0; }
                .ts-title { color: #D4AF37; text-transform: uppercase; letter-spacing: 0.3em; }
            `,
            holographic: `
                #ts-btn { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); color: #fff; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
                #ts-modal { background: rgba(5,5,5,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; box-shadow: 0 0 40px rgba(255,255,255,0.1); }
                #ts-info { background: rgba(255,255,255,0.03); border-left: 1px solid rgba(255,255,255,0.1); color: #fff; }
                .ts-opt { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; }
                .ts-opt:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); transform: translateY(-2px); }
                .ts-title { background: linear-gradient(to right, #fff, #a5a5a5, #fff); -webkit-background-clip: text; background-clip: text; color: transparent; }
            `,
            'pixel art': `
                #ts-btn { background: #4aff4d; color: #000; border: 4px solid #000; box-shadow: 4px 4px 0 #000; border-radius: 0; }
                #ts-modal { background: #202028; border: 4px solid #4aff4d; box-shadow: 8px 8px 0 rgba(0,0,0,0.5); border-radius: 0; }
                #ts-info { background: #0f0f14; border-left: 4px solid #ffee00; color: #dedeff; }
                #ts-grid { background: #14141a; }
                .ts-opt { background: #2a2a32; border: 2px solid #4aff4d; color: #dedeff; border-radius: 0; }
                .ts-opt:hover { background: #4aff4d; color: #000; box-shadow: 2px 2px 0 #000; }
                .ts-title { color: #ffee00; text-transform: uppercase; text-shadow: 2px 2px 0 #000; }
            `,
            chalkboard: `
                #ts-btn { background: #2c2c2c; color: #fff; border: 3px solid #555; box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }
                #ts-modal { background: #2c2c2c; border: 8px solid #654321; border-radius: 4px; box-shadow: 0 0 0 4px #888, inset 0 0 30px rgba(0,0,0,0.5); }
                #ts-info { background: #1a1a1a; border-left: 3px dashed #ffeb3b; color: #fff; }
                .ts-opt { background: transparent; border: 2px dashed rgba(255,255,255,0.3); color: #fff; }
                .ts-opt:hover { background: rgba(255,235,59,0.1); border-color: #ffeb3b; color: #ffeb3b; }
                .ts-title { color: #ffeb3b; text-shadow: 1px 1px 0 rgba(0,0,0,0.5); }
            `,
            claymorphism: `
                #ts-btn { background: linear-gradient(135deg, #ff6b6b, #f7fff7); color: #333; border: none; border-radius: 30px; box-shadow: 0 8px 20px rgba(0,0,0,0.15), inset 0 -2px 6px rgba(0,0,0,0.1); }
                #ts-modal { background: #f7fff7; border: none; border-radius: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8); }
                #ts-info { background: linear-gradient(135deg, #4ecdc4, #95e1d3); border-left: none; border-radius: 0 40px 40px 0; color: #fff; }
                .ts-opt { background: #fff; border: none; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8); }
                .ts-opt:hover { background: #ff6b6b; color: #fff; transform: translateY(-3px); box-shadow: 0 6px 18px rgba(255,107,107,0.3); }
                .ts-title { color: #333; }
            `,
            corporate: `
                #ts-btn { background: #1e3a8a; color: #fff; border: 2px solid #2563eb; box-shadow: 0 4px 12px rgba(30,58,138,0.3); }
                #ts-modal { background: #fff; border: 2px solid #e5e7eb; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
                #ts-info { background: #f3f4f6; border-left: 3px solid #1e3a8a; color: #1f2937; }
                .ts-opt { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; color: #1f2937; }
                .ts-opt:hover { background: #1e3a8a; color: #fff; border-color: #1e3a8a; }
                .ts-title { color: #1e3a8a; font-weight: 700; }
            `,
            industrial: `
                #ts-btn { background: #1a1a1d; color: #ff6b35; border: 3px solid #333; box-shadow: 0 0 15px rgba(255,107,53,0.3); }
                #ts-modal { background: #1a1a1d; border: 4px solid #333; border-radius: 0; box-shadow: 0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5); }
                #ts-info { background: #0d0d0e; border-left: 4px solid #ff6b35; color: #ccc; }
                #ts-grid { background: #151517; }
                .ts-opt { background: #252527; border: 2px solid #333; color: #ccc; border-radius: 0; }
                .ts-opt:hover { background: #ff6b35; color: #000; border-color: #ff6b35; }
                .ts-title { color: #ff6b35; text-transform: uppercase; letter-spacing: 0.2em; }
            `,
            isometric: `
                #ts-btn { background: linear-gradient(135deg, #6c5ce7, #fd79a8); color: #fff; border: none; box-shadow: 4px 4px 0 rgba(0,0,0,0.2); transform: skewY(-2deg); }
                #ts-modal { background: #fff; border: 3px solid #6c5ce7; border-radius: 12px; box-shadow: 8px 8px 0 rgba(108,92,231,0.2); }
                #ts-info { background: linear-gradient(135deg, #fdcb6e, #fd79a8); border-left: 3px solid #6c5ce7; color: #fff; }
                .ts-opt { background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; transform: skewY(-1deg); }
                .ts-opt:hover { background: #6c5ce7; color: #fff; transform: skewY(-1deg) translateY(-3px); }
                .ts-title { color: #6c5ce7; }
            `,
            newspaper: `
                #ts-btn { background: #fff; color: #000; border: 3px solid #000; box-shadow: none; border-radius: 0; }
                #ts-modal { background: #fff; border: 4px double #000; border-radius: 0; box-shadow: none; }
                #ts-info { background: #f5f5f5; border-left: 3px solid #000; color: #000; }
                .ts-opt { background: #fff; border: 1px solid #000; border-radius: 0; color: #000; }
                .ts-opt:hover { background: #000; color: #fff; }
                .ts-title { color: #000; font-weight: 900; text-transform: uppercase; text-decoration: underline; }
            `,
            'ukiyo-e': `
                #ts-btn { background: #d32f2f; color: #fff; border: 3px solid #1976d2; box-shadow: 0 4px 12px rgba(211,47,47,0.3); }
                #ts-modal { background: #fef9e7; border: 6px solid #d32f2f; border-radius: 16px; box-shadow: 0 0 30px rgba(0,0,0,0.2); }
                #ts-info { background: linear-gradient(180deg, #1976d2, #0d47a1); border-left: none; color: #fff; border-radius: 0 16px 16px 0; }
                .ts-opt { background: #fff; border: 2px solid #d32f2f; border-radius: 8px; color: #333; }
                .ts-opt:hover { background: #d32f2f; color: #fff; border-color: #fbc02d; }
                .ts-title { color: #d32f2f; }
            `,
            scientific: `
                #ts-btn { background: #fff; color: #1565c0; border: 2px solid #1565c0; box-shadow: 0 2px 8px rgba(21,101,192,0.2); }
                #ts-modal { background: #fff; border: 1px solid #e0e0e0; border-radius: 4px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
                #ts-info { background: #f5f5f5; border-left: 4px solid #1565c0; color: #333; }
                .ts-opt { background: #fff; border: 1px solid #e0e0e0; border-radius: 4px; color: #333; }
                .ts-opt:hover { background: #1565c0; color: #fff; border-color: #1565c0; }
                .ts-title { color: #1565c0; font-weight: 600; }
            `,
            dashboard: `
                #ts-btn { background: linear-gradient(135deg, #00bcd4, #ff5722); color: #fff; border: none; box-shadow: 0 4px 16px rgba(0,188,212,0.3); }
                #ts-modal { background: #1a1a1a; border: 1px solid #333; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
                #ts-info { background: #0d0d0d; border-left: 3px solid #00bcd4; color: #fff; }
                #ts-grid { background: #141414; }
                .ts-opt { background: #252525; border: 1px solid #333; border-radius: 8px; color: #fff; }
                .ts-opt:hover { background: #00bcd4; border-color: #00bcd4; }
                .ts-title { color: #00bcd4; }
            `,
            'bento box': `
                #ts-btn { background: #fff; color: #ff6b6b; border: 2px solid #ff6b6b; border-radius: 16px; box-shadow: 0 4px 12px rgba(255,107,107,0.2); }
                #ts-modal { background: #fff; border: 2px solid #f0f0f0; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
                #ts-info { background: linear-gradient(135deg, #ff6b6b, #4ecdc4); border-left: none; border-radius: 0 24px 24px 0; color: #fff; }
                .ts-opt { background: #f8f9fa; border: 2px solid #f0f0f0; border-radius: 16px; }
                .ts-opt:hover { background: #ff6b6b; color: #fff; border-color: #ff6b6b; transform: scale(1.02); }
                .ts-title { color: #ff6b6b; }
            `,
            risograph: `
                #ts-btn { background: #ff6b6b; color: #fff; border: 3px solid #feca57; box-shadow: 4px 4px 0 #48dbfb; }
                #ts-modal { background: #fff; border: 4px solid #ff6b6b; box-shadow: 8px 8px 0 #feca57, 12px 12px 0 #48dbfb; border-radius: 0; }
                #ts-info { background: linear-gradient(135deg, #ff6b6b, #feca57); border-left: none; color: #fff; }
                .ts-opt { background: #fffef7; border: 2px solid #ff6b6b; color: #333; }
                .ts-opt:hover { background: #48dbfb; color: #fff; border-color: #48dbfb; }
                .ts-title { color: #ff6b6b; text-shadow: 2px 2px 0 #feca57; }
            `,
            origami: `
                #ts-btn { background: linear-gradient(135deg, #e91e63, #00bcd4); color: #fff; border: none; clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%); box-shadow: 0 4px 16px rgba(233,30,99,0.3); }
                #ts-modal { background: #fff; border: 2px solid #e91e63; border-radius: 0; clip-path: polygon(0 5%, 5% 0, 100% 0, 100% 95%, 95% 100%, 0 100%); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
                #ts-info { background: linear-gradient(135deg, #e91e63, #00bcd4); border-left: none; color: #fff; }
                .ts-opt { background: #f8f9fa; border: 2px solid #e91e63; clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%); }
                .ts-opt:hover { background: #e91e63; color: #fff; }
                .ts-title { color: #e91e63; }
            `,
            bauhaus: `
                #ts-btn { background: #ff0000; color: #fff; border: none; border-radius: 50%; box-shadow: 4px 4px 0 #ffeb00; }
                #ts-modal { background: #fff; border: 8px solid #000; border-radius: 0; box-shadow: 16px 16px 0 #ff0000, 32px 32px 0 #ffeb00; }
                #ts-info { background: #0066cc; border-left: none; color: #fff; }
                .ts-opt { background: #fff; border: 3px solid #000; border-radius: 0; }
                .ts-opt:hover { background: #ff0000; color: #fff; }
                .ts-title { color: #000; text-transform: uppercase; font-weight: 900; }
            `,
            'film grain': `
                #ts-btn { background: #f5f5dc; color: #2c2c2c; border: 3px solid #8b4513; box-shadow: 0 4px 12px rgba(139,69,19,0.3); }
                #ts-modal { background: #f5f5dc; border: 8px solid #8b4513; border-radius: 8px; box-shadow: inset 0 0 30px rgba(0,0,0,0.1), 0 0 40px rgba(0,0,0,0.2); }
                #ts-info { background: linear-gradient(180deg, #d4c5a9, #e8dcc8); border-left: 4px solid #8b4513; color: #2c2c2c; }
                .ts-opt { background: rgba(255,255,255,0.5); border: 2px solid #8b4513; color: #2c2c2c; }
                .ts-opt:hover { background: #8b4513; color: #f5f5dc; }
                .ts-title { color: #8b4513; }
            `,
            minecraft: `
                #ts-btn { background: #8bc34a; color: #000; border: 4px solid #4a5f2d; box-shadow: 4px 4px 0 #000; border-radius: 0; }
                #ts-modal { background: #795548; border: 8px solid #4a5f2d; border-radius: 0; box-shadow: 8px 8px 0 rgba(0,0,0,0.5); }
                #ts-info { background: #00bcd4; border-left: 4px solid #0097a7; color: #fff; }
                #ts-grid { background: #654321; }
                .ts-opt { background: #8bc34a; border: 3px solid #000; color: #000; border-radius: 0; }
                .ts-opt:hover { background: #00bcd4; color: #fff; }
                .ts-title { color: #000; text-shadow: 2px 2px 0 #4a5f2d; }
            `,
            rpg: `
                #ts-btn { background: linear-gradient(135deg, #d4af37, #8b0000); color: #fff; border: 3px solid #d4af37; box-shadow: 0 0 20px rgba(212,175,55,0.5); }
                #ts-modal { background: #2c1810; border: 4px solid #d4af37; border-radius: 12px; box-shadow: 0 0 40px rgba(212,175,55,0.3), inset 0 0 30px rgba(0,0,0,0.5); }
                #ts-info { background: linear-gradient(180deg, #8b0000, #5a0000); border-left: 3px solid #d4af37; color: #f5e6d3; }
                #ts-grid { background: rgba(0,0,0,0.5); }
                .ts-opt { background: rgba(212,175,55,0.1); border: 2px solid #d4af37; color: #f5e6d3; }
                .ts-opt:hover { background: #d4af37; color: #2c1810; }
                .ts-title { color: #d4af37; text-shadow: 0 0 10px #d4af37; }
            `,
            desert: `
                #ts-btn { background: #f4a460; color: #fff; border: 3px solid #deb887; box-shadow: 0 4px 16px rgba(244,164,96,0.4); }
                #ts-modal { background: linear-gradient(180deg, #faf0e6, #f5deb3); border: 4px solid #d2691e; border-radius: 8px; box-shadow: 0 20px 40px rgba(210,105,30,0.2); }
                #ts-info { background: linear-gradient(135deg, #f4a460, #deb887); border-left: none; color: #fff; }
                .ts-opt { background: rgba(255,255,255,0.7); border: 2px solid #d2691e; color: #8b4513; }
                .ts-opt:hover { background: #f4a460; color: #fff; }
                .ts-title { color: #8b4513; }
            `,
            nordic: `
                #ts-btn { background: #2e5266; color: #d6e4e5; border: 2px solid #497174; box-shadow: 0 4px 12px rgba(46,82,102,0.3); }
                #ts-modal { background: #d6e4e5; border: 3px solid #2e5266; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
                #ts-info { background: #2e5266; border-left: 3px solid #497174; color: #d6e4e5; }
                .ts-opt { background: #fff; border: 2px solid #497174; color: #2e5266; }
                .ts-opt:hover { background: #2e5266; color: #d6e4e5; }
                .ts-title { color: #2e5266; font-weight: 300; }
            `,
            'dota 2': `
                #ts-btn { background: linear-gradient(135deg, #c41e3a, #00758f); color: #fff; border: 3px solid #d4af37; box-shadow: 0 0 20px rgba(196,30,58,0.5); }
                #ts-modal { background: #1a1a1a; border: 3px solid #c41e3a; border-radius: 0; box-shadow: 0 0 40px rgba(196,30,58,0.3), inset 0 0 30px rgba(0,0,0,0.5); }
                #ts-info { background: linear-gradient(135deg, #c41e3a, #00758f); border-left: none; color: #fff; }
                #ts-grid { background: #0d0d0d; }
                .ts-opt { background: rgba(196,30,58,0.1); border: 2px solid #c41e3a; color: #fff; }
                .ts-opt:hover { background: #c41e3a; border-color: #d4af37; }
                .ts-title { color: #d4af37; text-shadow: 0 0 10px #c41e3a; }
            `,
            underwater: `
                #ts-btn { background: linear-gradient(135deg, #006994, #00d4ff); color: #fff; border: 2px solid #00d4ff; box-shadow: 0 0 20px rgba(0,212,255,0.5); }
                #ts-modal { background: linear-gradient(180deg, #002b49, #004d73); border: 2px solid #00d4ff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,212,255,0.2), inset 0 0 40px rgba(0,212,255,0.1); }
                #ts-info { background: rgba(0,212,255,0.1); border-left: 3px solid #00d4ff; color: #b3e5fc; }
                .ts-opt { background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.3); color: #b3e5fc; }
                .ts-opt:hover { background: #00d4ff; color: #002b49; }
                .ts-title { color: #00d4ff; text-shadow: 0 0 10px #00d4ff; }
            `,
            cosmic: `
                #ts-btn { background: linear-gradient(135deg, #6a0dad, #00ffff); color: #fff; border: none; box-shadow: 0 0 20px rgba(106,13,173,0.7); }
                #ts-modal { background: #0a0a0a; border: 2px solid #6a0dad; border-radius: 16px; box-shadow: 0 0 60px rgba(106,13,173,0.5), inset 0 0 40px rgba(0,255,255,0.1); }
                #ts-info { background: linear-gradient(180deg, rgba(106,13,173,0.3), transparent); border-left: 2px solid #00ffff; color: #e0e0ff; }
                #ts-grid { background: rgba(0,0,0,0.5); }
                .ts-opt { background: rgba(106,13,173,0.2); border: 1px solid rgba(0,255,255,0.3); color: #e0e0ff; }
                .ts-opt:hover { background: #6a0dad; border-color: #00ffff; color: #fff; }
                .ts-title { color: #00ffff; text-shadow: 0 0 15px #6a0dad; }
            `,
            'neon noir': `
                #ts-btn { background: #0a0a0a; color: #ff006e; border: 2px solid #ff006e; box-shadow: 0 0 20px rgba(255,0,110,0.7); }
                #ts-modal { background: #0a0a0a; border: 2px solid #ff006e; border-radius: 4px; box-shadow: 0 0 40px rgba(255,0,110,0.4), inset 0 0 30px rgba(131,56,236,0.2); }
                #ts-info { background: linear-gradient(180deg, rgba(131,56,236,0.3), transparent); border-left: 2px solid #8338ec; color: #fff; }
                #ts-grid { background: #000; }
                .ts-opt { background: rgba(255,0,110,0.1); border: 1px solid rgba(255,0,110,0.3); color: #fff; }
                .ts-opt:hover { background: #ff006e; border-color: #8338ec; }
                .ts-title { color: #ff006e; text-shadow: 0 0 15px #ff006e; }
            `,
            dieselpunk: `
                #ts-btn { background: linear-gradient(135deg, #8b4513, #ff8c00); color: #fff; border: 3px solid #2f4f4f; box-shadow: 0 4px 16px rgba(139,69,19,0.5); }
                #ts-modal { background: #2f4f4f; border: 4px solid #8b4513; border-radius: 0; box-shadow: 0 0 40px rgba(0,0,0,0.7), inset 0 0 30px rgba(0,0,0,0.5); }
                #ts-info { background: linear-gradient(180deg, #8b4513, #654321); border-left: 4px solid #ff8c00; color: #f5deb3; }
                #ts-grid { background: rgba(0,0,0,0.5); }
                .ts-opt { background: rgba(139,69,19,0.2); border: 2px solid #8b4513; color: #f5deb3; }
                .ts-opt:hover { background: #ff8c00; color: #2f4f4f; }
                .ts-title { color: #ff8c00; text-transform: uppercase; }
            `,
            weathered: `
                #ts-btn { background: #a0826d; color: #f5f5dc; border: 3px solid #7a6a5a; box-shadow: 0 4px 12px rgba(160,130,109,0.4); }
                #ts-modal { background: #f5f5dc; border: 6px solid #a0826d; border-radius: 4px; box-shadow: inset 0 0 30px rgba(122,106,90,0.2), 0 20px 40px rgba(0,0,0,0.2); }
                #ts-info { background: linear-gradient(180deg, #d4c4b0, #e8d8c8); border-left: 4px solid #7a6a5a; color: #4a3f35; }
                .ts-opt { background: rgba(255,255,255,0.7); border: 2px solid #a0826d; color: #4a3f35; }
                .ts-opt:hover { background: #a0826d; color: #f5f5dc; }
                .ts-title { color: #7a6a5a; }
            `
        };

        return `<style id="ts-styles">${commonCSS} ${themeSpecifics[currentTheme] || themeSpecifics.minimal}</style>`;
    }

    // --- 3. Core Logic ---

    // Feature 1: Physics-based Draggable Button
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let dragThreshold = 0;

        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            dragThreshold = 0; // Reset threshold
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            element.style.transition = 'none'; // Remove transition for immediate response
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Calculate cursor movement
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            // Calculate total distance moved to determine if it's a drag or a click
            dragThreshold += Math.abs(pos1) + Math.abs(pos2);

            if (dragThreshold > 5) isDragging = true;

            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            element.style.bottom = 'auto';
            element.style.right = 'auto';
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            element.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            // Snap Logic
            const screenWidth = window.innerWidth;
            const btnCenter = element.offsetLeft + (element.offsetWidth / 2);

            if (btnCenter < screenWidth / 2) {
                element.style.left = '32px';
            } else {
                element.style.left = (screenWidth - 92) + 'px';
            }

            // Reset dragging state after a short delay to allow click event to fire if it wasn't a drag
            setTimeout(() => { isDragging = false; }, 100);
        }
    }

    // Feature 4: Context Aware Titles
    function updateMeta(theme) {
        const titles = {
            minimal: 'Simplicity.',
            neubrutalism: 'B R U T A L',
            maximalist: '!!! MORE IS MORE !!!',
            skeuomorphic: 'Interface Design v1.0',
            aero: 'Windows Aero',
            swiss: 'International Style',
            cyberpunk: 'System.Root > Override',
            retro: 'The Daily Bugle',
            terminal: '~/admin/themes'
        };
        if (titles[theme]) document.title = titles[theme];
    }

    // --- 4. UI Construction ---

    function createUI() {
        // Remove existing
        const existing = document.getElementById('ts-root');
        if (existing) existing.remove();

        const root = document.createElement('div');
        root.id = 'ts-root';
        root.innerHTML = getThemeCSS();

        // Draggable Button
        const btn = document.createElement('div');
        btn.id = 'ts-btn';
        btn.innerHTML = currentTheme === 'terminal' ? '' : '🎨';
        btn.title = 'Change Theme (Ctrl+K)';
        // Only toggle if not dragging
        btn.onclick = () => { if (!isDragging) toggleModal(); };

        makeDraggable(btn); // Init physics

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'ts-overlay';
        overlay.onclick = closeModal;

        // Modal
        const modal = document.createElement('div');
        modal.id = 'ts-modal';

        // Close Btn
        const closeBtn = document.createElement('button');
        closeBtn.id = 'ts-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = closeModal;
        modal.appendChild(closeBtn);

        // Grid (Left)
        const grid = document.createElement('div');
        grid.id = 'ts-grid';

        const title = document.createElement('div');
        title.className = 'ts-title';
        title.textContent = 'Select Interface';
        grid.appendChild(title);

        // Info Panel (Right)
        const info = document.createElement('div');
        info.id = 'ts-info';

        // Feature 2: Live Preview Updater
        const updateInfo = (template) => {
            info.innerHTML = `
                <div class="ts-info-header">
                    <div class="ts-info-title">${template.name}</div>
                    <div class="ts-info-desc">${template.desc}</div>
                </div>
                <div class="ts-preview-box">
                    <iframe class="ts-preview-iframe" src="${template.file}" loading="lazy"></iframe>
                </div>
            `;
        };

        // Options Loop
        templates.forEach(t => {
            const opt = document.createElement('button');
            opt.className = 'ts-opt';

            const name = document.createElement('span');
            name.className = 'ts-opt-name';
            name.textContent = t.name;

            const status = document.createElement('span');
            status.className = 'ts-opt-status';
            status.textContent = currentTheme === t.name.toLowerCase() ? 'Active' : 'Switch';

            opt.appendChild(name);
            opt.appendChild(status);

            opt.onclick = () => switchTheme(t);
            opt.onmouseenter = () => updateInfo(t);

            if (currentTheme === t.name.toLowerCase()) {
                // Simple highlighting for active
                opt.style.borderLeft = '4px solid currentColor';
                updateInfo(t); // Set initial info
                // Run title update immediately
                updateMeta(t.name.toLowerCase());
            }

            grid.appendChild(opt);
        });

        // Feature 3: Keyboard Hint
        const hint = document.createElement('div');
        hint.className = 'ts-hint';
        hint.textContent = 'Press Ctrl + K to toggle';
        modal.appendChild(hint);

        modal.appendChild(grid);
        modal.appendChild(info);
        root.appendChild(btn);
        root.appendChild(overlay);
        root.appendChild(modal);
        document.body.appendChild(root);
    }

    // --- 5. Event Handlers ---

    function toggleModal() {
        const modal = document.getElementById('ts-modal');
        const overlay = document.getElementById('ts-overlay');
        const isActive = modal.classList.contains('active');

        if (isActive) {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            modal.classList.add('active');
            overlay.classList.add('active');
        }
    }

    function closeModal() {
        document.getElementById('ts-modal').classList.remove('active');
        document.getElementById('ts-overlay').classList.remove('active');
    }

    function switchTheme(template) {
        // Feature 4: Dynamic Title before unload
        updateMeta(template.name.toLowerCase());

        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        window.location.href = basePath + template.file;
    }

    // Feature 3 & 5: Global Key Listeners (Shortcuts + Konami)
    document.addEventListener('keydown', (e) => {
        // Shortcuts
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleModal();
        }
        if (e.key === 'Escape') closeModal();

        // Konami Code
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                alert('SYSTEM BREAK // SECRET THEME UNLOCKED');
                templates.push({
                    name: 'The Matrix',
                    file: 'matrix.html',
                    desc: 'The answer is out there, Neo.',
                    palette: ['#00FF00', '#000', '#0D0']
                });
                createUI(); // Re-render to show new option
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // --- 6. Init ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createUI);
    } else {
        createUI();
    }

})();