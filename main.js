/* --------------------------------
    スクロールで要素をフェードイン
   -------------------------------- */
const fadeEls = document.querySelectorAll(
  '.section-about, .section-menu, .section-flow, .section-news, .section-access, ' +
  '.about-grid, .menu-card, .flow li, .news li, .access-card, ' +
  'h2, h3, .lead, .text, .about-alt, .about-note, .checklist, ' +
  '.mrow, .access-dl, .access-name, .map-card, .menu-title, .menu-sub, .menu-foot'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');  // ← これを追加
      }
    });
  },
  { threshold: 0.12 }   // 12% 見えたら発火
);

fadeEls.forEach((el) => {
  el.classList.add('fade-in');   // 初期状態（非表示）クラスを付与
  observer.observe(el);
});

/* ------------------------------------
    ヘッダー：スクロールで背景を強調
   ------------------------------------ */
const header = document.querySelector('.header');

function updateHeader() {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader(); // 初期状態もチェック


/* ------------------------
    SCROLLインジケーター
   ------------------------ */
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '1';
    }
  }, { passive: true });
}


/* -----------------
     ナビゲーション
   ----------------- */
document.addEventListener('click', (e) => {
  const nav    = document.querySelector('.gnav');
  const burger = document.querySelector('.hamburger');
  if (!nav || !burger) return;

  // メニューが開いていて、ヘッダー外をクリックした場合
  if (nav.classList.contains('active') && !header.contains(e.target)) {
    nav.classList.remove('active');
    burger.classList.remove('active');
  }
});


/* -------------------------------
   ステップを時間差でフェードイン
   ------------------------------- */
document.querySelectorAll('.flow li').forEach((li, i) => {
  li.style.transitionDelay = `${i * 0.12}s`;
});


/* ---------------
    カーソルライト
   --------------- */
if (window.matchMedia('(pointer: fine)').matches) {
  const cursorLight = document.createElement('div');
  cursorLight.className = 'cursor-light';
  document.body.appendChild(cursorLight);

  const SIZE = 80;
  let mx = window.innerWidth  / 2;
  let my = window.innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  // transform ではなく left/top を直接セット → 確実に動く
  // SIZE/2 を引くことで円の中心がマウス位置に来る
  function animateCursor() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    cursorLight.style.left = `${cx - SIZE / 2}px`;
    cursorLight.style.top  = `${cy - SIZE / 2}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}
