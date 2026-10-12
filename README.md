# Krishna Thorat's portfolio

Static portfolio with 44 theme pages and a searchable theme picker. The six additions are Blueprint, Kanban, Library, Dossier, Studio and Atlas; all 38 previous themes, including Mobile App, retain their URLs.

## Maintain

- `data/profile.json`: shared career, education, skills and project content, transcribed from the user-supplied résumé dated October 12, 2026. Cue's name and hire.rest destination come from the current conversation.
- `data/themes.json`: theme names, URLs, categories, palettes and layout choices.
- `scripts/build.mjs`: HTML templates and shared rendering helpers. Some short profile labels and current-role text also live here; keep them aligned with the profile data.
- `assets/css/portfolio.css`: shared styles, theme layouts, responsive rules and print styles.
- `assets/js/template-switcher.js`: isolated Shadow DOM picker with native dialog, search and filters.
- `PRODUCT.md` and `DESIGN.md`: product constraints and implemented design guidance. `.impeccable/design.json` extends the design tokens with component previews and behavioral metadata.

Run from the repository root with Node.js installed:

```sh
npm run build
npm test
npm run serve
```

The build regenerates theme HTML, `themes.html` and the picker theme registry. Edit sources, then rebuild; direct changes to generated HTML will be overwritten. The server command uses Python 3 and serves at http://localhost:8765.

`npm test` runs the static repository checks in `scripts/check.mjs`; it is not a browser interaction or visual accessibility test. Check affected layouts and picker behavior in a browser before publishing.

The site has no runtime packages or CDN dependencies. Fonts are self-hosted under `assets/fonts/` with their license; preserve the license and existing portrait. The HTML remains readable without JavaScript, with `themes.html` as the theme-selection fallback. GitHub Pages serves the `gh-pages` branch with custom domain `me.hire.rest`; preserve `CNAME` when deploying.
