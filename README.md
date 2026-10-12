# Krishna Thorat portfolio
44 independent static theme worlds hosted on GitHub Pages. Each renderer owns its structure and interaction; shared facts live in data/profile.json.

## Build and check
- `npm run build`: regenerates all HTML, browser data and the theme directory.
- `npm test`: checks content coverage, anchors, assets and unique IDs.
- `node scripts/browser-check.cjs`: Playwright interaction checks. Install Playwright first; set PORTFOLIO_BROWSER to a Chromium path when needed.

## Theme implementation
- scripts/worlds.mjs: 44 page renderers with shared factual atoms.
- assets/css/worlds.css: theme structure, materials, mobile rules and motion.
- assets/js/worlds.js: local interactions; no remote calls or code evaluation.
- assets/previews: actual first-viewport captures used by the isolated theme picker.

All pages include professional records and a no-JavaScript browsing path. Quest progress and field notes are saved only in localStorage. The optional chalk sketch and block terrain are session-only. Contact-card download is local. Playful visuals never imply real project status, performance analytics or proficiency scores.
