gsap.registerPlugin(ScrollTrigger);

/* ---------- preloader ---------- */
let pct = {v:0};
const preCount = document.getElementById('preCount');
const preBar = document.getElementById('preBar');
const tlPre = gsap.timeline({
  onComplete: () => {
    gsap.to('#preloader', {
      yPercent:-100, duration:1, ease:'power4.inOut', delay:0.15,
      onComplete: () => { document.getElementById('preloader').style.display='none'; introAnim(); }
    });
  }
});
tlPre.to(pct, {
  v:100, duration:1.8, ease:'power2.inOut',
  onUpdate: () => { preCount.textContent = String(Math.floor(pct.v)).padStart(2,'0'); }
});
tlPre.to(preBar, {width:'100%', duration:1.8, ease:'power2.inOut'}, 0);

/* ---------- intro (hero) animation ---------- */
function introAnim(){
  const tl = gsap.timeline({defaults:{ease:'power4.out'}});
  tl.from('.hero-title .line span', {yPercent:110, duration:1, stagger:0.12})
    .from('.hero-tag', {opacity:0, y:10, duration:0.6}, '-=0.7')
    .from('.hero-sub', {opacity:0, y:14, duration:0.7}, '-=0.5')
    .from('.marquee', {opacity:0, duration:0.8}, '-=0.4')
    .from('header', {yPercent:-100, duration:0.8}, 0.2);
}

/* ---------- custom cursor ---------- */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
const coord = document.getElementById('cursorCoord');
let mx=0,my=0, rx=0, ry=0;
window.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
  gsap.to(dot, {x:mx, y:my, duration:0.1});
  gsap.to(coord, {x:mx, y:my, duration:0.15});
  coord.textContent = `X:${String(mx).padStart(4,'0')} Y:${String(my).padStart(4,'0')}`;
});
gsap.ticker.add(()=>{
  rx += (mx-rx)*0.15; ry += (my-ry)*0.15;
  gsap.set(ring, {x:rx, y:ry});
});
document.querySelectorAll('a, .work-card, .magnetic-btn, .process-row, .short-card, .lf-row').forEach(el=>{
  el.addEventListener('mouseenter', ()=> gsap.to(ring, {scale:1.8, duration:0.3, borderColor:'#3a5bff'}));
  el.addEventListener('mouseleave', ()=> gsap.to(ring, {scale:1, duration:0.3, borderColor:'rgba(191,208,255,0.32)'}));
});

/* ---------- marquee ---------- */
gsap.to('#marqueeTrack', {xPercent:-50, duration:22, ease:'none', repeat:-1});

/* ---------- scroll reveals ---------- */
document.querySelectorAll('.reveal-up').forEach(el=>{
  gsap.from(el, {
    opacity:0, y:60, duration:1, ease:'power3.out',
    scrollTrigger:{trigger:el, start:'top 85%'}
  });
});

/* ---------- section title split-in ---------- */
gsap.utils.toArray('.sec-title').forEach(t=>{
  gsap.from(t, {
    clipPath:'inset(0 0 100% 0)', duration:1, ease:'power4.out',
    scrollTrigger:{trigger:t, start:'top 88%'}
  });
});

/* ---------- work card stagger ---------- */
gsap.from('.work-card', {
  opacity:0, y:80, duration:1, stagger:0.15, ease:'power3.out',
  scrollTrigger:{trigger:'.work-grid', start:'top 80%'}
});

/* ---------- counters ---------- */
document.querySelectorAll('.stat-num').forEach(el=>{
  const target = +el.dataset.count;
  ScrollTrigger.create({
    trigger:el, start:'top 90%', once:true,
    onEnter:()=>{
      let obj={v:0};
      gsap.to(obj, {v:target, duration:1.6, ease:'power2.out', onUpdate:()=>{ el.textContent = Math.floor(obj.v); }});
    }
  });
});

/* ---------- process row underline reveal on scroll ---------- */
gsap.utils.toArray('.process-row').forEach((row,i)=>{
  gsap.from(row, {opacity:0, x:-30, duration:0.8, ease:'power3.out',
    scrollTrigger:{trigger:row, start:'top 90%'}});
});

/* ---------- magnetic button ---------- */
const btn = document.querySelector('.magnetic-btn');
btn.addEventListener('mousemove', e=>{
  const r = btn.getBoundingClientRect();
  const x = e.clientX - r.left - r.width/2;
  const y = e.clientY - r.top - r.height/2;
  gsap.to(btn, {x:x*0.3, y:y*0.4, duration:0.4, ease:'power3.out'});
});
btn.addEventListener('mouseleave', ()=> gsap.to(btn, {x:0, y:0, duration:0.5, ease:'elastic.out(1,0.4)'}));

/* ---------- short-form cards: hover play, tap sound toggle ---------- */
document.querySelectorAll('.short-card').forEach(card=>{
  const vid = card.querySelector('video');
  const soundBtn = card.querySelector('.short-sound');
  if(vid){
    card.addEventListener('mouseenter', ()=>{ if(vid.currentSrc || vid.querySelector('source')) vid.play().catch(()=>{}); });
    card.addEventListener('mouseleave', ()=>{ vid.pause(); vid.currentTime = 0; });
  }
  if(soundBtn){
    soundBtn.addEventListener('click', e=>{
      e.stopPropagation();
      if(!vid) return;
      vid.muted = !vid.muted;
      soundBtn.textContent = vid.muted ? '🔇' : '🔊';
    });
  }
});

/* ---------- long-form rows: hover play ---------- */
document.querySelectorAll('.lf-row').forEach(row=>{
  const vid = row.querySelector('video');
  if(!vid) return;
  row.addEventListener('mouseenter', ()=>{ if(vid.currentSrc) vid.play().catch(()=>{}); });
  row.addEventListener('mouseleave', ()=>{ vid.pause(); vid.currentTime = 0; });
});

/* ---------- shorts strip: mouse-drag horizontal scroll ---------- */
const shortsTrack = document.getElementById('shortsTrack');
if(shortsTrack){
  let isDown=false, startX, scrollLeft;
  shortsTrack.addEventListener('mousedown', e=>{
    isDown=true; startX=e.pageX - shortsTrack.offsetLeft; scrollLeft=shortsTrack.scrollLeft;
  });
  window.addEventListener('mouseup', ()=> isDown=false);
  shortsTrack.addEventListener('mouseleave', ()=> isDown=false);
  shortsTrack.addEventListener('mousemove', e=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - shortsTrack.offsetLeft;
    shortsTrack.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });
}

/* ---------- new sections: card / row stagger reveal ---------- */
gsap.from('.short-card', {
  opacity:0, y:50, duration:0.9, stagger:0.1, ease:'power3.out',
  scrollTrigger:{trigger:'.shorts-strip', start:'top 85%'}
});
gsap.utils.toArray('.lf-row').forEach(row=>{
  gsap.from(row, {opacity:0, y:40, duration:0.9, ease:'power3.out',
    scrollTrigger:{trigger:row, start:'top 88%'}});
});

/* ---------- nav background on scroll ---------- */
ScrollTrigger.create({
  start:'top -80', end: 99999, toggleClass:{targets:'header', className:'scrolled'}
});
