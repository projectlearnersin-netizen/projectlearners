/* ═══════════════════════════════════════════════════════
   PROJECT LEARNERS — MASTER SCRIPT
   ═══════════════════════════════════════════════════════ */

(function(){
  'use strict';

  /* ─── CUSTOM CURSOR ─── */
  const cursor = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');
  if (cursor && cursorRing && window.innerWidth > 768){
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    (function animate(){
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      cursorRing.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(animate);
    })();
    document.querySelectorAll('a,button,.card,.pillar,.product,.blog-card,.episode,.benefit,.plan').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
    });
  }

  /* ─── SCROLL PROGRESS ─── */
  const progress = document.getElementById('progress');
  const nav = document.querySelector('.nav');
  function updateProgress(){
    const st = document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progress) progress.style.width = (st / h) * 100 + '%';
    if (nav) nav.classList.toggle('scrolled', st > 40);
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ─── SCROLL REVEAL ─── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ─── MOBILE MENU ─── */
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu){
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /* ─── THEME TOGGLE ─── */
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('pl-theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  if (themeToggle){
    themeToggle.addEventListener('click', () => {
      const cur = root.getAttribute('data-theme');
      const next = cur === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('pl-theme', next);
      updateThemeIcon(next);
    });
  }
  function updateThemeIcon(t){
    if (!themeToggle) return;
    themeToggle.innerHTML = t === 'dark'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* ─── SMOOTH ANCHOR SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target){
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── COUNTER ANIMATION ─── */
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting){
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();
        function tick(now){
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = (target * eased).toFixed(target % 1 === 0 ? 0 : 1);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));

  /* ─── MAGNETIC BUTTONS ─── */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ─── NEWSLETTER FORMS ─── */
  document.querySelectorAll('form[data-newsletter]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = '✓ Welcome aboard';
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--navy)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  });

  /* ─── NAV ACTIVE LINK ─── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

})();