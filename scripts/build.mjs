import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const profile=read('data/profile.json'), themes=read('data/themes.json');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tag=(t,c,cl='')=>`<${t}${cl?` class="${cl}"`:''}>${c}</${t}>`;
const join=a=>a.join('');
const photo=(cl='')=>`<figure class="portrait ${cl}"><img src="assets/img/krishna-thorat.jpg" alt="Krishna Thorat" width="600" height="800"><figcaption>Krishna Thorat · Pune, India</figcaption></figure>`;
const title=()=>`<h1>${esc(profile.name)}</h1>`;
const role=()=>`<p class="role">${esc(profile.role)}</p>`;
const summary=()=>`<p class="intro-copy">${esc(profile.summary)}</p>`;
const actions=()=>`<div class="actions"><a class="primary" href="#projects">Explore projects <span aria-hidden="true">↗</span></a><a href="resume.pdf" download="krishna-thorat-resume.pdf">Download résumé <span aria-hidden="true">↓</span></a></div>`;
const now=()=>`<aside class="current"><h2>Currently</h2><p><strong>Sr. System Developer</strong><br>Prescient Technologies</p><p>Bigtincan · Content Hub<br>2025 – Present</p></aside>`;
const intro=()=>title()+role()+summary()+actions();
const navLinks=()=>`<a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#contact">Contact</a>`;
const projectLinks=(cl='')=>`<nav class="project-shortcuts ${cl}" aria-label="Project index">${join(profile.projects.map(p=>`<a href="#project-${p.id}">${esc(p.name)}<span>${esc(p.subtitle)}</span></a>`))}</nav>`;
const profileFacts=()=>`<dl class="facts"><div><dt>Discipline</dt><dd>Full stack</dd></div><div><dt>Specialism</dt><dd>Agentic AI</dd></div><div><dt>Based in</dt><dd>Pune, India</dd></div><div><dt>Experience</dt><dd>5+ years</dd></div></dl>`;
const windows=(head,body)=>`<div class="window"><div class="window-bar">${head}<span aria-hidden="true">— □</span></div><div class="window-body">${body}</div></div>`;
const quote=()=>`<p class="manifesto">From database.<br>To interface.<br>To deployment.</p>`;
const heroes={
 intro:()=>`<div class="intro-grid"><div>${intro()}</div>${photo()}${now()}</div>`,
 swiss:()=>`<div class="swiss-grid"><div class="swiss-title">${title()}</div><div class="swiss-role">${role()}${summary()}${actions()}</div><div class="swiss-photo">${photo()}</div><div class="swiss-meta">${now()}</div></div>`,
 corporate:()=>`<div class="corporate-grid"><div>${title()}${role()}${summary()}${actions()}</div><aside>${photo()}${now()}</aside></div><div class="capability-strip"><span>Enterprise software</span><span>AI systems</span><span>Cloud delivery</span></div>`,
 paper:()=>`<div class="paper-title">${title()}${role()}<p>Pune, India · <a href="mailto:${profile.email}">${profile.email}</a></p></div><div class="abstract"><h2>Abstract</h2>${summary()}<p>${esc(profile.about)}</p>${actions()}</div><div class="paper-index"><h2>Contents</h2>${navLinks()}</div>`,
 dashboard:()=>`<div class="workspace-title">${title()}${role()}</div><div class="dashboard-overview">${now()}<div>${summary()}${actions()}</div>${photo()}</div>`,
 bento:()=>`<div class="bento-grid"><div class="bento-name">${title()}${role()}</div>${photo()}<div class="bento-statement">${summary()}${actions()}</div>${now()}<div class="bento-links"><h2>Build / ship / learn</h2><p>Web applications.<br>Real-time products.<br>AI-powered systems.</p></div></div>`,
 nordic:()=>`<div class="nordic-grid">${photo()}<div>${title()}${role()}${summary()}${actions()}</div></div><div class="nordic-note">${now()}<p>${esc(profile.about)}</p></div>`,
 newspaper:()=>`<div class="masthead">The Developer</div><div class="issue-line"><span>Krishna Thorat's portfolio</span><span>Pune edition · 2026</span></div><div class="news-lead"><div>${title()}${role()}${summary()}${actions()}</div>${photo()}${now()}</div>`,
 poster:()=>`<div class="poster-title">${title()}${role()}</div><div class="poster-row">${summary()}${photo()}<div>${now()}${actions()}</div></div>`,
 maximal:()=>`<div class="maximal-stage"><div class="maximal-name">${title()}</div><div class="maximal-role">${role()}</div>${photo()}<div class="maximal-copy">${summary()}${actions()}</div></div>`,
 bauhaus:()=>`<div class="bauhaus-grid"><div class="bauhaus-name">${title()}</div><div class="bauhaus-role">${role()}${actions()}</div>${photo()}<div class="bauhaus-copy">${summary()}${now()}</div></div>`,
 industrial:()=>`<div class="spec-plate"><div>${title()}${role()}${profileFacts()}</div>${photo()}</div><div class="industrial-summary">${summary()}${actions()}</div>`,
 desktop:()=>`<div class="desktop-grid">${windows('Profile.txt',intro())}<div class="desktop-side">${photo()}${windows('Current position',now())}</div></div>`,
 clay:()=>`<div class="clay-profile">${photo()}<div>${title()}${role()}</div></div><div class="clay-description">${summary()}${actions()}${now()}</div>`,
 isometric:()=>`<div class="iso-stage"><div class="iso-title">${title()}${role()}</div><div class="iso-photo">${photo()}</div><div class="iso-copy">${summary()}${actions()}</div><div class="iso-current">${now()}</div></div>`,
 fold:()=>`<div class="fold-spread"><div class="fold-cover">${title()}${role()}${photo()}</div><div class="fold-inside">${summary()}${now()}${actions()}</div></div>`,
 aero:()=>`<div class="aero-workspace">${windows('Krishna / Profile',`<div class="aero-profile">${photo()}<div>${intro()}</div></div>`)}<div class="aero-dock">${navLinks()}</div></div>`,
 hologram:()=>`<div class="holo-spread"><div class="holo-identity">${title()}${role()}${photo()}</div><div class="holo-copy">${summary()}${profileFacts()}${actions()}</div></div>`,
 cyber:()=>`<div class="cyber-grid"><div class="cyber-side">${photo()}${profileFacts()}</div><div class="cyber-main">${title()}${role()}${summary()}${actions()}${now()}</div></div>`,
 terminal:()=>`${windows('krishna@portfolio: ~',`<p class="command-line">$ whoami</p>${title()}${role()}<p class="command-line">$ cat about.txt</p>${summary()}${actions()}<div class="terminal-command"><form id="command-form"><label for="command">krishna@portfolio:~ $</label><input id="command" name="command" autocomplete="off" spellcheck="false" placeholder="Type help"><button type="submit">Run</button></form><p id="command-output" role="status">Commands: help, projects, experience, skills, contact, clear</p></div>`)}`,
 noir:()=>`<div class="noir-stage">${photo()}<div class="noir-caption">${title()}${role()}${summary()}${actions()}</div></div><div class="noir-index">${projectLinks()}</div>`,
 cosmic:()=>`<div class="cosmic-stage"><div class="cosmic-center">${title()}${role()}${summary()}${actions()}</div>${projectLinks('satellites')}</div>`,
 retro:()=>`<div class="retro-cover"><div class="retro-heading">${title()}${role()}</div><div class="retro-body">${photo()}<div>${summary()}${now()}${actions()}</div></div></div>`,
 vapor:()=>`<div class="vapor-desktop">${windows('profile.exe',intro())}<div class="vapor-second">${windows('portrait.bmp',photo())}</div><div class="vapor-third">${windows('system.info',profileFacts())}</div></div>`,
 deco:()=>`<div class="deco-plaque">${title()}${role()}<div class="deco-divider" aria-hidden="true"></div>${summary()}${actions()}</div><div class="deco-foot">${now()}${photo()}</div>`,
 film:()=>`<div class="film-title">${title()}${role()}</div><div class="contact-sheet">${photo()}<div>${summary()}${actions()}${now()}</div></div>`,
 riso:()=>`<div class="riso-spread"><div class="riso-cover">${title()}${role()}</div><div class="riso-image">${photo()}</div><div class="riso-text">${summary()}${actions()}</div></div>`,
 journal:()=>`<div class="journal-spread"><aside class="journal-margin">Pune, India<br>Full stack / AI${photo()}</aside><div class="journal-page">${title()}${role()}${summary()}${now()}${actions()}</div></div>`,
 diesel:()=>`<div class="diesel-console"><div class="diesel-title">${title()}${role()}</div><div class="diesel-plate">${profileFacts()}</div><div class="diesel-body">${photo()}<div>${summary()}${actions()}</div></div></div>`,
 pixel:()=>`<div class="pixel-screen"><div class="pixel-avatar">${photo()}${role()}</div><div class="pixel-main">${title()}${summary()}${actions()}</div><nav class="pixel-menu" aria-label="Profile menu">${navLinks()}</nav></div>`,
 blocks:()=>`<div class="block-stage"><div class="block-name">${title()}${role()}</div><div class="block-photo">${photo()}</div><div class="block-summary">${summary()}${actions()}</div><div class="block-facts">${profileFacts()}</div></div>`,
 character:()=>`<div class="character-sheet"><aside>${photo()}${profileFacts()}</aside><div>${title()}${role()}${summary()}<h2>Current quest</h2><p>Building the Bigtincan Content Hub at Prescient Technologies.</p>${actions()}</div></div>`,
 hero:()=>`<div class="hero-select"><div class="hero-portrait">${photo()}</div><div class="hero-bio">${title()}${role()}${summary()}${profileFacts()}${actions()}</div></div><nav class="ability-nav" aria-label="Portfolio sections">${navLinks()}</nav>`,
 chalk:()=>`<div class="chalk-board"><div class="chalk-heading">${title()}${role()}</div><div class="chalk-lesson">${summary()}${actions()}</div><aside class="chalk-syllabus"><h2>Syllabus</h2>${navLinks()}${now()}</aside></div>`,
 ukiyo:()=>`<div class="ukiyo-spread"><div class="ukiyo-name">${title()}</div>${photo()}<div class="ukiyo-story">${role()}${summary()}${actions()}</div></div>`,
 desert:()=>`<div class="desert-title">${title()}${role()}</div><div class="desert-horizon"><div>${summary()}${actions()}</div>${photo()}${now()}</div>`,
 ocean:()=>`<div class="ocean-opening"><div class="ocean-title">${title()}${role()}</div><div class="ocean-summary">${summary()}${actions()}</div><div class="ocean-guide"><h2>Explore the work</h2>${projectLinks()}</div></div>`,
 mobile:()=>`<div class="mobile-profile">${photo()}${title()}${role()}</div><div class="mobile-intro">${summary()}${actions()}</div>${now()}`,
 blueprint:()=>`<div class="blueprint-sheet"><div class="drawing-title">${title()}${role()}</div><div class="drawing-plan">${photo()}<div>${summary()}${profileFacts()}${actions()}</div></div><div class="drawing-footer"><span>Portfolio / Full stack & AI</span><span>Pune, India · 2026</span></div></div>`,
 kanban:()=>`<div class="kanban-header"><div>${title()}${role()}</div><div>${summary()}${actions()}</div></div><div class="board-note">Projects grouped by discipline. These columns describe the work, not its delivery status.</div>`,
 library:()=>`<div class="library-title">${title()}${role()}</div><div class="catalogue-desk"><div>${summary()}${actions()}</div><div class="catalogue-slip"><h2>Author record</h2>${profileFacts()}</div></div>`,
 dossier:()=>`<div class="dossier-tabs"><a href="#projects">Project exhibits</a><a href="#experience">Career record</a><a href="#skills">Capabilities</a></div><div class="dossier-sheet"><div>${title()}${role()}${summary()}${actions()}</div><aside>${photo()}${now()}</aside></div>`,
 studio:()=>`<div class="studio-opening">${photo()}<div class="studio-title">${title()}${role()}</div><div class="studio-copy">${summary()}${actions()}</div></div>`,
 atlas:()=>`<div class="atlas-opening"><div>${title()}${role()}${summary()}${actions()}</div><nav class="route-map" aria-label="Career route">${join([...profile.experience].reverse().map(j=>`<a href="#experience"><span>${esc(j.dates)}</span><strong>${esc(j.company.replace(' Pvt. Ltd.','').replace(' Ltd.',''))}</strong></a>`))}</nav></div>`
};
function project(p,i){return `<article class="project" id="project-${p.id}" data-category="${esc(p.category)}"><div class="project-label"><span>${esc(p.category)}</span><span class="project-index" aria-hidden="true">${String(i+1).padStart(2,'0')}</span></div><h3>${esc(p.name)}</h3><p class="project-subtitle">${esc(p.subtitle)}</p><p>${esc(p.description)}</p><details><summary>Implementation details</summary><p>${esc(p.detail)}</p><ul class="stack">${join(p.stack.map(s=>`<li>${esc(s)}</li>`))}</ul></details>${p.url?`<a class="project-link" href="${p.url}" target="_blank" rel="noopener noreferrer">Visit ${esc(p.name)} <span aria-hidden="true">↗</span></a>`:''}</article>`;}
function projects(t){let body;
 if(['kanban','board','inventory','abilities','books'].includes(t.projects)) body=join(['AI systems','Web platforms','Developer tools'].map(cat=>`<div class="project-group"><h3 class="group-title">${cat}</h3>${join(profile.projects.map((p,i)=>p.category===cat?project(p,i):''))}</div>`));
 else body=join(profile.projects.map(project));
 return `<section id="projects" class="projects-section"><div class="section-heading"><h2>${t.layout==='newspaper'?'Feature stories':t.layout==='terminal'?'~/projects':t.layout==='character'?'Quest journal':t.layout==='library'?'Project catalogue':'Selected projects'}</h2><p>Web platforms, developer tools and AI systems.</p></div><div class="projects projects-${t.projects}">${body}</div></section>`;}
function experience(t){return `<section id="experience" class="experience-section"><div class="section-heading"><h2>${t.layout==='terminal'?'~/experience':'Experience'}</h2><p>Building products and enterprise software since 2020.</p></div><div class="experience-list">${join(profile.experience.map((j,i)=>`<article class="job"><div class="job-date">${esc(j.dates)}</div><div class="job-body"><h3>${esc(j.company)}</h3><p class="job-role">${esc(j.role)}</p><p>${esc(j.context)}</p><ul>${join(j.points.map(p=>`<li>${esc(p)}</li>`))}</ul><details><summary>Technologies</summary><p>${esc(j.stack.join(' · '))}</p></details></div></article>`))}</div></section>`;}
function skills(){return `<section id="skills" class="skills-section"><div class="section-heading"><h2>Technical skills</h2><p>The tools behind the work.</p></div><dl class="skills-list">${join(Object.entries(profile.skills).map(([label,items])=>`<div><dt>${esc(label)}</dt><dd>${esc(items.join(' · '))}</dd></div>`))}</dl></section>`;}
function education(){return `<section id="education" class="education-section"><div class="section-heading"><h2>Education & learning</h2></div><div class="education-list">${join(profile.education.map(e=>`<article><h3>${esc(e.degree)}</h3><p>${esc(e.school)}</p><p>${esc(e.dates)} · ${esc(e.score)}</p></article>`))}</div><details class="certifications"><summary>View certifications</summary><ul>${join(profile.certifications.map(c=>`<li>${esc(c)}</li>`))}</ul></details></section>`;}
function body(t){const hero=`<header class="opening layout-${t.layout}" id="home">${heroes[t.layout]()}</header>`;let sections;
 if(['paper','industrial','blueprint'].includes(t.layout))sections=skills()+projects(t)+experience(t)+education();
 else if(['corporate','dossier','atlas'].includes(t.layout))sections=experience(t)+projects(t)+skills()+education();
 else if(['character','hero','blocks'].includes(t.layout))sections=skills()+projects(t)+experience(t)+education();
 else sections=projects(t)+experience(t)+skills()+education();
 return hero+`<div class="content content-${t.layout}">${sections}</div>`;
}
for(const t of themes){
 const css=`--bg:${t.bg};--fg:${t.fg};--accent:${t.accent};--display:var(--${t.font});`;
 const html=`<!doctype html>
<!-- Generated by scripts/build.mjs. Edit data/profile.json, data/themes.json and shared assets. -->
<html lang="en" style="${css}" data-theme="${t.slug}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(profile.name+' — '+profile.role+'. '+profile.summary)}"><meta name="theme-color" content="${t.bg}"><title>${esc(profile.name)} | ${esc(t.name)} Portfolio</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/css/portfolio.css"><script src="assets/js/themes.js" defer></script><script src="assets/js/template-switcher.js" defer></script><script src="assets/js/portfolio.js" defer></script></head>
<body class="theme-${t.slug}"><a class="skip-link" href="#main">Skip to content</a><header class="site-nav"><a class="brand" href="index.html" aria-label="Krishna Thorat home">KT<span> / ${esc(t.name)}</span></a><nav aria-label="Main navigation">${navLinks()}</nav>${t.slug==='index'?'<button class="mode-toggle" type="button" aria-label="Switch to dark mode" aria-pressed="false">Dark mode</button>':''}<a class="theme-fallback" href="themes.html">Themes</a></header><main id="main">${body(t)}</main><footer id="contact"><div><h2>Let's talk.</h2><p>Products, engineering and ideas worth building.</p><a class="contact-email" href="mailto:${profile.email}">${profile.email}</a></div><nav aria-label="Social links"><a href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="resume.pdf" download="krishna-thorat-resume.pdf">Résumé ↓</a></nav><p class="colophon">Krishna Thorat · Pune, India · 2026</p></footer><portfolio-theme-picker></portfolio-theme-picker></body></html>`;
 fs.writeFileSync(path.join(root,t.file),html);
}
fs.writeFileSync(path.join(root,'assets/js/themes.js'),`// Generated from data/themes.json\nwindow.PORTFOLIO_THEMES = ${JSON.stringify(themes)};\n`);
const fallback=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Choose a theme | Krishna Thorat</title><link rel="stylesheet" href="assets/css/portfolio.css"></head><body class="theme-index"><header class="site-nav"><a href="index.html">← Portfolio</a></header><main id="main"><h1>Choose your perspective.</h1><p>The same work, ${themes.length} different ways to explore it. Every theme works on mobile.</p><nav class="theme-directory" aria-label="All portfolio themes">${join(themes.map(t=>`<a href="${t.file}"><strong>${esc(t.name)}${t.new?' · New':''}</strong><span>${esc(t.description)}</span></a>`))}</nav></main></body></html>`;
fs.writeFileSync(path.join(root,'themes.html'),fallback);
console.log(`Built ${themes.length} portfolios + accessible theme directory from one profile.`);
