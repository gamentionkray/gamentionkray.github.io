(()=>{
 'use strict';
 const form=document.querySelector('#command-form');
 if(form){
  const input=form.querySelector('input'),output=document.querySelector('#command-output');
  form.addEventListener('submit',e=>{
   e.preventDefault();const command=input.value.trim().toLowerCase();
   if(command==='clear'){output.textContent='';input.value='';return;}
   if(command==='help'||!command)output.textContent='Commands: projects, experience, skills, contact, clear. Type a section name to jump there.';
   else if(['projects','experience','skills','contact'].includes(command)){const section=document.getElementById(command);section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});output.textContent=`Opened ${command}.`;section.setAttribute('tabindex','-1');section.focus({preventScroll:true});}
   else output.textContent=`Unknown command: ${input.value.trim()}. Type help for available commands.`;
   input.value='';
  });
 }
 const mode=document.querySelector('.mode-toggle');
 if(mode){
  let dark=false;try{dark=localStorage.getItem('portfolio-minimal-dark')==='true';}catch{}
  function setDark(value){dark=value;const html=document.documentElement;html.style.setProperty('--bg',dark?'#17241c':'#f7f7f2');html.style.setProperty('--fg',dark?'#eff4e9':'#202822');html.style.setProperty('--accent',dark?'#b1d4a6':'#326348');html.style.colorScheme=dark?'dark':'light';mode.textContent=dark?'Light mode':'Dark mode';mode.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');mode.setAttribute('aria-pressed',String(dark));try{localStorage.setItem('portfolio-minimal-dark',String(dark));}catch{}}
  setDark(dark);mode.addEventListener('click',()=>setDark(!dark));
 }
})();
