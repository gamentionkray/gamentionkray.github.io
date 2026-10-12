import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const themes=JSON.parse(fs.readFileSync(path.join(root,'data/themes.json')));
const worlds=new Set();
const profile=JSON.parse(fs.readFileSync(path.join(root,'data/profile.json')));
for(const t of themes){
 const html=fs.readFileSync(path.join(root,t.file),'utf8');
 assert(html.includes('Prescient Technologies Pvt. Ltd.'),`${t.file}: current employer missing`);
 assert(!html.includes('Ergabite'),`${t.file}: outdated employer spelling`);
 assert.equal((html.match(/<h1>/g)||[]).length,1,`${t.file}: heading hierarchy`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,`${t.file}: duplicate IDs`);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(url.startsWith('#'))assert(ids.includes(url.slice(1)),`${t.file}: broken anchor ${url}`);
  else if(!/^[a-z]+:/i.test(url))assert(fs.existsSync(path.join(root,url)),`${t.file}: missing local asset ${url}`);
 }
 const world=html.match(/<main id="main" class="([^"]+)"/);
 assert(world,`${t.file}: missing independently named world`);
 worlds.add(world[1]);
 for(const project of profile.projects)assert(html.includes(project.name),`${t.file}: project missing ${project.name}`);
 assert(fs.existsSync(path.join(root,`assets/previews/${t.slug}.webp`)),`${t.file}: preview missing`);
 assert(html.includes('assets/js/worlds.js'),`${t.file}: world runtime missing`);
 assert(html.includes('portfolio-theme-picker'),`${t.file}: missing picker`);
}
assert.equal(worlds.size,themes.length,'Every route must own its complete main structure');
assert.equal(new Set(themes.map(t=>t.layout)).size,themes.length,'Each route must have its own opening composition');
assert.equal(themes.filter(t=>t.new).length,6);
const picker=fs.readFileSync(path.join(root,'assets/js/template-switcher.js'),'utf8');
assert(picker.includes('attachShadow'),'Picker styles must stay isolated');
assert(!picker.includes('iframe'),'Picker must not recursively load whole themed pages');
assert(!picker.includes('window.location.href ='),'Theme picker must not force device redirects');
console.log(`Verified ${themes.length} routes, distinct opening compositions, local links, anchors and current profile coverage.`);
