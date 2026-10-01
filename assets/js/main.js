
const nav=document.querySelector('.nav');
const menu=document.querySelector('.menu');
const progress=document.querySelector('.progress');

if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const io=new IntersectionObserver((entries)=>{
 entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('show')})
},{threshold:.12});
document.querySelectorAll('.reveal,.stagger').forEach(el=>io.observe(el));

window.addEventListener('scroll',()=>{
 const max=document.documentElement.scrollHeight-innerHeight;
 if(progress) progress.style.width=(max>0?scrollY/max*100:0)+'%';
});

document.querySelectorAll('[data-count]').forEach(el=>{
 const target=Number(el.dataset.count), suffix=el.dataset.suffix||'';
 let started=false;
 const counter=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!started){
   started=true; const start=performance.now();
   const tick=(now)=>{
    const p=Math.min((now-start)/1000,1);
    el.textContent=Math.floor(target*p).toLocaleString()+suffix;
    if(p<1) requestAnimationFrame(tick);
   };
   requestAnimationFrame(tick); counter.disconnect();
  }
 });
 counter.observe(el);
});

const cursor=document.querySelector('.cursor');
if(cursor){
 document.addEventListener('mousemove',e=>{
  cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
 });
 document.querySelectorAll('a,button,.dest-card,.feature').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.width='34px';cursor.style.height='34px';cursor.style.background='rgba(190,140,40,.12)'});
  el.addEventListener('mouseleave',()=>{cursor.style.width='14px';cursor.style.height='14px';cursor.style.background='transparent'});
 });
}

document.querySelectorAll('[data-tilt]').forEach(card=>{
 card.addEventListener('mousemove',e=>{
  const r=card.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5;
  const y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`perspective(900px) rotateX(${y*-4}deg) rotateY(${x*4}deg) translateY(-5px)`;
 });
 card.addEventListener('mouseleave',()=>card.style.transform='');
});
