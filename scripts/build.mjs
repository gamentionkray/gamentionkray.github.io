import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createWorlds} from './worlds.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const profile=JSON.parse(fs.readFileSync(path.join(root,'data/profile.json')));
const themes=JSON.parse(fs.readFileSync(path.join(root,'data/themes.json')));
const worlds=createWorlds(profile);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const t of themes){
 let body=worlds.render(t);
 if(!body.includes('id="projects"'))body=body.replace('class="project-reader"','class="project-reader" id="projects"');
 const html=`<!doctype html>\n<!-- Generated from scripts/worlds.mjs and data/profile.json. -->\n<html lang="en" data-theme="${t.slug}" style="--bg:${t.bg};--fg:${t.fg};--accent:${t.accent};--display:var(--${t.font});"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(profile.name+' — '+profile.role+'. '+profile.summary)}"><meta name="theme-color" content="${t.bg}"><title>${esc(profile.name)} | ${esc(t.name)}</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/css/worlds.css"><script src="assets/js/themes.js" defer></script><script src="assets/js/profile.js" defer></script><script src="assets/js/template-switcher.js" defer></script><script src="assets/js/worlds.js" defer></script></head><body class="theme-${t.slug}"><a class="skip-link" href="#main">Skip to content</a>${body}<portfolio-theme-picker></portfolio-theme-picker></body></html>`;
 fs.writeFileSync(path.join(root,t.file),html);
}
fs.writeFileSync(path.join(root,'assets/js/themes.js'),`window.PORTFOLIO_THEMES=${JSON.stringify(themes)};\n`);
fs.writeFileSync(path.join(root,'assets/js/profile.js'),`window.PORTFOLIO_PROFILE=${JSON.stringify(profile)};\n`);
fs.writeFileSync(path.join(root,'themes.html'),`<!doctype html><html lang="en" style="--bg:#f7f7f2;--fg:#202822;--accent:#326348"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>44 theme worlds | Krishna Thorat</title><link rel="stylesheet" href="assets/css/worlds.css"></head><body><nav class="world-nav"><a href="index.html">← Krishna Thorat</a></nav><main id="main"><h1>Pick a world.</h1><p>One developer. 44 completely different places to explore the work.</p><nav class="theme-directory" aria-label="All portfolio themes">${themes.map(t=>`<a href="${t.file}"><strong>${esc(t.name)}</strong><span>${esc(t.description)}</span></a>`).join('')}</nav></main></body></html>`);
console.log(`Built ${themes.length} independent theme worlds.`);
