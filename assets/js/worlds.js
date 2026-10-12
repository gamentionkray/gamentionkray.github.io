(()=>{
'use strict';
const p=window.PORTFOLIO_PROFILE,theme=document.documentElement.dataset.theme;
if(!p)return;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],body=document.body;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storage={get:(k,f)=>{try{return JSON.parse(localStorage.getItem('kt-'+k))??f;}catch{return f;}},set:(k,v)=>{try{localStorage.setItem('kt-'+k,JSON.stringify(v));return true;}catch{return false;}}};
const text=(selector,value)=>{const el=$(selector);if(el)el.textContent=value;};
const projectMarkup=x=>`<article class="work"><div class="work-meta">${safe(x.category)}</div><h3>${safe(x.name)}</h3><p class="subtitle">${safe(x.subtitle)}</p><p>${safe(x.description)}</p><p>${safe(x.detail)}</p><ul class="stack">${x.stack.map(s=>`<li>${safe(s)}</li>`).join('')}</ul>${x.url?`<a href="${safe(x.url)}" target="_blank" rel="noopener">Visit ${safe(x.name)} ↗</a>`:''}</article>`;
function select(id){const x=p.projects.find(x=>x.id===id);if(!x)return;const el=$('[data-reader]');if(el){el.innerHTML=projectMarkup(x);const container=el.closest('.project-reader');container.setAttribute('data-changing','');setTimeout(()=>container.removeAttribute('data-changing'),400);}$$('[data-action=select]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.project===id)));}
const toggles={focus:'focus',grid:'grid',annotations:'annotations',compact:'compact',evening:'evening',edition:'evening-edition',remix:'remixed',geometry:'recomposed',arrange:'arranged',softness:'soft',constellation:'constellation',phosphor:'amber','noir-light':'noir-light',crt:'crt',negatives:'negatives',overprint:'overprint',wind:'wind',redact:'redacted'};
let blockTool='grass',signal=0,spotlight=0;
const questState=new Set(storage.get('quests',[]));
function updateQuests(){const valid=new Set([...questState].filter(id=>p.projects.some(x=>x.id===id)));text('[data-quest-status]',`${valid.size} of ${p.projects.length} quests explored`);$$('[data-action=quest]').forEach(b=>{const on=valid.has(b.dataset.project);b.setAttribute('aria-pressed',String(on));b.textContent=on?'Explored · undo':'Mark explored';b.closest('.quest')?.classList.toggle('explored',on);});}updateQuests();
const initialTerrain=$$('.terrain-cell').map(c=>c.className);
const initialBoard=$('.board-columns')?.innerHTML;
function moveCard(card,column){const target=$(`[data-column="${column}"]`);if(!target||!card)return;target.append(card);card.querySelector('select').value=column;text('[data-board-status]',`${card.querySelector('h4').textContent} moved to ${target.querySelector('h3').textContent}.`);}
let px=0,py=0;const collected=new Set();
function updateGame(){const arena=$('.game-arena');arena?.style.setProperty('--px',px);arena?.style.setProperty('--py',py);$$('.game-signal').forEach(b=>{if(Number(b.style.getPropertyValue('--gx'))===px&&Number(b.style.getPropertyValue('--gy'))===py)collect(b.dataset.project);});text('[data-game-status]',`Signals collected: ${collected.size} / ${p.projects.length}${collected.size===p.projects.length?' · All projects discovered!':''}`);}
function collect(id){collected.add(id);select(id);$$('.game-signal').forEach(b=>b.classList.toggle('collected',collected.has(b.dataset.project)));text('[data-game-status]',`Signals collected: ${collected.size} / ${p.projects.length}`);}
function move(direction){const delta={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}[direction];if(!delta)return;px=Math.max(0,Math.min(11,px+delta[0]));py=Math.max(0,Math.min(6,py+delta[1]));updateGame();}
function resetPositions(){for(const el of $$('.sticker-work,.desk-window')){el.style.translate='';el.dataset.dx='0';el.dataset.dy='0';}}
document.addEventListener('click',ev=>{
 const b=ev.target.closest('[data-action]');if(!b)return;const action=b.dataset.action;
 if(toggles[action]){const on=body.classList.toggle(toggles[action]);b.setAttribute('aria-pressed',String(on));return;}
 if(action==='select'){select(b.dataset.project);return;}
 if(action==='sticker'){b.classList.toggle('sticker-pop');b.textContent=b.classList.contains('sticker-pop')?'NICE CLICK.':'PRESS ME';}
 if(action==='shuffle'){const root=$('.bento-projects');const cards=[...root.querySelectorAll('.work')];for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]];}cards.forEach(c=>root.append(c));}
 if(action==='reset-stickers')resetPositions();
 if(action==='desktop-projects'){$('.projects-window').scrollIntoView({behavior:reduced?'instant':'smooth'});$('.projects-window').classList.toggle('window-highlight');}
 if(action==='desktop-career'){$('.career-window').scrollIntoView({behavior:reduced?'instant':'smooth'});$('.career-window').classList.toggle('window-highlight');}
 if(action==='start-menu'){const el=$('.aero-start');el.hidden=!el.hidden;b.setAttribute('aria-expanded',String(!el.hidden));}
 if(action==='signal'){signal=(signal+1)%3;body.classList.toggle('signal-purple',signal===1);body.classList.toggle('signal-yellow',signal===2);text('[data-signal]',`Signal / ${['cyan','purple','yellow'][signal]}`);}
 if(action==='stamp'){$('[data-stamp]').hidden=false;const date=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',dateStyle:'medium'}).format(new Date());text('[data-stamp]',`VISITED / ${date}`);b.textContent='Visit stamped';}
 if(action==='engine'){const on=body.classList.toggle('engine-on');b.setAttribute('aria-pressed',String(on));b.textContent=on?'Disengage engine':'Engage engine';text('[data-engine]',on?'Engine engaged · systems ready':'Engine idle · portfolio accessible');}
 if(action==='collect')collect(b.dataset.project);
 if(action==='move')move(b.dataset.direction);
 if(action==='restart-game'){px=py=0;collected.clear();$$('.game-signal').forEach(el=>el.classList.remove('collected'));updateGame();select(p.projects[0].id);}
 if(action==='block-tool'){blockTool=['grass','stone','wood','glass','erase'][Number(b.dataset.value)];$$('[data-action=block-tool]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));text('[data-build-status]',`${b.textContent} selected. Tap a cell.`);}
 if(action==='block'){const next=blockTool==='erase'?'empty':blockTool;b.className='terrain-cell'+(next==='empty'?'':' '+next);b.setAttribute('aria-label',b.getAttribute('aria-label').replace(/, .*/,', '+next));text('[data-build-status]',`${next==='empty'?'Cleared':'Placed '+next} block.`);}
 if(action==='reset-world'){$$('.terrain-cell').forEach((c,i)=>{c.className=initialTerrain[i];c.setAttribute('aria-label',`Terrain cell ${i+1}, ${i>71?'dirt':i>59?'grass':'empty'}`);});text('[data-build-status]','World reset. Build again.');}
 if(action==='quest'){const id=b.dataset.project;questState.has(id)?questState.delete(id):questState.add(id);storage.set('quests',[...questState]);updateQuests();}
 if(action==='filter'){const categories=['All work','AI systems','Web platforms','Developer tools'];const cat=categories[Number(b.dataset.value)];$$('[data-action=filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));$$('.case-study').forEach(el=>el.hidden=cat!=='All work'&&el.dataset.category!==cat);}
 if(action==='reset-board'){$('.board-columns').innerHTML=initialBoard;text('[data-board-status]','Original categories restored.');}
 if(action==='career-stop'){const j=p.experience[Number(b.dataset.stop)];if(j){$('[data-career-reader]').innerHTML=`<h2>${safe(j.company)}</h2><p>${safe(j.role)} · ${safe(j.dates)}</p><p>${safe(j.context)}</p><ul>${j.points.map(s=>`<li>${safe(s)}</li>`).join('')}</ul>`;$$('[data-action=career-stop]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));}}
 if(action==='spotlight'){const rows=$$('.studio-index article');body.classList.add('spotlight');rows.forEach((row,i)=>row.classList.toggle('spotlit',i===spotlight));rows[spotlight].scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});spotlight=(spotlight+1)%rows.length;}
 if(action==='save-contact'){const card=`BEGIN:VCARD\nVERSION:3.0\nFN:${p.name}\nEMAIL:${p.email}\nURL:${p.github}\nEND:VCARD\n`;const url=URL.createObjectURL(new Blob([card],{type:'text/vcard'}));const a=document.createElement('a');a.href=url;a.download='krishna-thorat.vcf';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);b.textContent='Contact downloaded';}
});
document.addEventListener('input',ev=>{const el=ev.target;
 if(el.dataset.range){const value=Number(el.value),action=el.dataset.range;
  if(action==='foil')body.style.setProperty('--foil-angle',value+'deg');
  if(action==='document-scale')body.style.setProperty('--document-scale',value/100);
  if(action==='drawing-zoom')body.style.setProperty('--drawing-zoom',value/100);
  if(action==='sun'){body.style.setProperty('--sun-y',(10+value*.35)+'%');body.style.setProperty('--sky',`hsl(${38-value*.15} 55% ${90-value*.15}%)`);}
  if(action==='depth'){const x=p.projects[value];$$('.depth-project').forEach((item,i)=>item.classList.toggle('active-depth',i===value));text('[data-depth]',`${value*100}m / ${x.name}`);}
 }
 if(el.matches('[data-library-search]')){const query=el.value.trim().toLowerCase();let count=0;$$('.library-book').forEach(book=>{book.hidden=!book.dataset.search.includes(query);if(!book.hidden)count++;});text('[data-library-status]',`${count} of ${p.projects.length} records match`);$('.library-empty').hidden=count!==0;}
 if(el.matches('[data-notes]'))text('[data-note-status]',storage.set('field-note',el.value)?'Note saved on this device.':'Storage unavailable. This note lasts for this visit.');
});
document.addEventListener('change',ev=>{if(ev.target.matches('[data-move-card]'))moveCard(ev.target.closest('.board-card'),ev.target.value);});
let draggingCard=null;
document.addEventListener('dragstart',ev=>{const card=ev.target.closest('.board-card');if(card){draggingCard=card;ev.dataTransfer.effectAllowed='move';ev.dataTransfer.setData('text/plain',card.id);}});
document.addEventListener('dragover',ev=>{const col=ev.target.closest('.board-column');if(col){ev.preventDefault();col.classList.add('drag-over');}});
document.addEventListener('dragleave',ev=>ev.target.closest('.board-column')?.classList.remove('drag-over'));
document.addEventListener('drop',ev=>{const col=ev.target.closest('.board-column');if(col){ev.preventDefault();moveCard(draggingCard,col.dataset.column);$$('.drag-over').forEach(c=>c.classList.remove('drag-over'));draggingCard=null;}});
if($('[data-notes]'))$('[data-notes]').value=storage.get('field-note','');
if($('[data-clock]')){const update=()=>text('[data-clock]',new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'}).format(new Date()));update();setInterval(update,60000);}
if($('[data-date]'))text('[data-date]',new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',dateStyle:'full'}).format(new Date()));
$('.game-arena')?.addEventListener('keydown',ev=>{const dirs={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};if(dirs[ev.key]){ev.preventDefault();move(dirs[ev.key]);}});
if(theme==='dota2')document.addEventListener('keydown',ev=>{if(ev.ctrlKey||ev.metaKey||ev.altKey||/INPUT|TEXTAREA|SELECT/.test(ev.target.tagName)||ev.target.closest('portfolio-theme-picker'))return;const i=['q','w','e','r','d','f','g'].indexOf(ev.key.toLowerCase());if(i>=0){select(p.projects[i].id);}});
// Window and sticker dragging includes keyboard equivalents and stays within the page.
for(const handle of $$('.window-handle,.sticker-work h3')){
 const el=handle.closest('.desk-window,.sticker-work');handle.tabIndex=0;handle.setAttribute('aria-label',handle.textContent+' · drag or use arrow keys to move');
 let start=null;
 const translate=(x,y)=>{const rect=el.getBoundingClientRect(),oldX=Number(el.dataset.dx||0),left=rect.left-oldX;const max=Math.max(0,innerWidth-left-rect.width-12);const min=-left+12;const nx=Math.max(min,Math.min(max,x)),ny=Math.max(-100,Math.min(160,y));el.dataset.dx=nx;el.dataset.dy=ny;el.style.translate=`${nx}px ${ny}px`;};
 handle.addEventListener('pointerdown',ev=>{if(ev.button!==0)return;start={x:ev.clientX,y:ev.clientY,dx:Number(el.dataset.dx||0),dy:Number(el.dataset.dy||0)};handle.setPointerCapture(ev.pointerId);});
 handle.addEventListener('pointermove',ev=>{if(start)translate(start.dx+ev.clientX-start.x,start.dy+ev.clientY-start.y);});
 handle.addEventListener('pointerup',()=>start=null);handle.addEventListener('pointercancel',()=>start=null);
 handle.addEventListener('keydown',ev=>{const d={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]}[ev.key];if(d){ev.preventDefault();translate(Number(el.dataset.dx||0)+d[0],Number(el.dataset.dy||0)+d[1]);}});
}
$$('.clay-object').forEach(el=>el.addEventListener('pointerdown',()=>{el.classList.add('squished');setTimeout(()=>el.classList.remove('squished'),300);}));
// Terminal commands use textContent for untrusted input. No eval or remote execution.
const form=$('#command-form');
if(form){const input=$('#command'),log=$('#terminal-log');function append(value){const line=document.createElement('p');line.textContent=value;log.append(line);while(log.children.length>40)log.firstChild.remove();log.scrollTop=log.scrollHeight;}
 form.addEventListener('submit',ev=>{ev.preventDefault();const raw=input.value.trim(),[cmd,...args]=raw.toLowerCase().split(/\s+/);input.value='';
  if(cmd==='clear'){log.replaceChildren();return;}append('$ '+raw);
  if(!cmd||cmd==='help')append('ls / projects — list projects\ncat <project> — read a project (try cat cue)\nwhoami / about — profile\nskills — toolkit\nexperience — career\ncontact — email\ntheme — open theme picker\nclear — clear this screen');
  else if(cmd==='ls'||cmd==='projects')append(p.projects.map(x=>x.id.padEnd(12)+' '+x.subtitle).join('\n'));
  else if(cmd==='cat'){const q=args.join(' '),x=p.projects.find(x=>x.id===q||x.name.toLowerCase()===q);append(x?x.name+'\n'+x.description+'\n'+x.detail+'\n'+x.stack.join(' · '):'File not found. Use ls to see project names.');}
  else if(cmd==='whoami'||cmd==='about')append(p.name+'\n'+p.role+'\n'+p.about);
  else if(cmd==='skills')append(Object.entries(p.skills).map(([k,v])=>k+': '+v.join(', ')).join('\n'));
  else if(cmd==='experience')append(p.experience.map(j=>j.dates+' | '+j.company+' | '+j.role).join('\n'));
  else if(cmd==='contact')append(p.email+'\n'+p.github);
  else if(cmd==='theme')$('portfolio-theme-picker')?.shadowRoot?.querySelector('.launch')?.click();
  else append('Unknown command. Type help to see available commands.');
 });}
// Optional chalk sketch: retina-sized input coordinates, pointer capture, no global listeners.
const canvas=$('#chalk-canvas');
if(canvas){const ctx=canvas.getContext('2d');let drawing=false,colour='#f5f0d0';ctx.lineWidth=3;ctx.lineCap='round';const point=ev=>{const r=canvas.getBoundingClientRect();return[(ev.clientX-r.left)*canvas.width/r.width,(ev.clientY-r.top)*canvas.height/r.height];};
 canvas.addEventListener('pointerdown',ev=>{drawing=true;canvas.setPointerCapture(ev.pointerId);ctx.beginPath();ctx.moveTo(...point(ev));});canvas.addEventListener('pointermove',ev=>{if(!drawing)return;ctx.strokeStyle=colour;ctx.lineTo(...point(ev));ctx.stroke();});canvas.addEventListener('pointerup',()=>drawing=false);canvas.addEventListener('pointercancel',()=>drawing=false);
 document.addEventListener('click',ev=>{const b=ev.target.closest('[data-action]');if(!b)return;if(b.dataset.action==='chalk'){colour=b.dataset.color;text('[data-chalk-status]',b.textContent+' selected');}if(b.dataset.action==='erase-chalk'){ctx.clearRect(0,0,canvas.width,canvas.height);text('[data-chalk-status]','Board erased');}});
}
})();
