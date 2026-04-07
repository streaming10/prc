/* ============================================
   PRC Data & Intelligence — Main JS
   ============================================ */
'use strict';

(function () {

  /* ------------------------------------------
     PRELOADER
     ------------------------------------------ */
  const preloader = document.querySelector('.preloader');

  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
  }

  if (preloader) {
    window.addEventListener('load', () => setTimeout(hidePreloader, 700));
    setTimeout(hidePreloader, 3500); // fallback
  }

  /* ------------------------------------------
     HEADER — transparent → glass on scroll
     ------------------------------------------ */
  const header = document.querySelector('.header');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------
     MOBILE MENU
     ------------------------------------------ */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('is-active');
      mobileNav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-active');
        mobileNav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ------------------------------------------
     SMOOTH SCROLL (anchor links)
     ------------------------------------------ */
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute('href');
    if (id === '#' || id === '#main') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY
              - (header ? header.offsetHeight : 0) - 24;
    window.scrollTo({ top, behavior: 'smooth' });
  });

  /* ------------------------------------------
     ACTIVE NAV LINK on scroll (IntersectionObserver)
     ------------------------------------------ */
  const navLinks = document.querySelectorAll('.nav__link[data-section]');
  const navSections = document.querySelectorAll('section[id]');

  if (navLinks.length && navSections.length && 'IntersectionObserver' in window) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.dataset.section === id);
        });
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    navSections.forEach(sec => navIO.observe(sec));
  }

  /* ------------------------------------------
     SCROLL REVEAL — IntersectionObserver
     ------------------------------------------ */
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        // stagger direct .reveal-item children
        el.querySelectorAll('.reveal-item').forEach((child, i) => {
          child.style.transitionDelay = i * 110 + 'ms';
          child.classList.add('is-visible');
        });

        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => io.observe(el));
  }

  /* ------------------------------------------
     ANIMATED COUNTERS
     ------------------------------------------ */
  function animateCount(el) {
    const end = +el.dataset.count;
    const dur = 2200;
    const t0 = performance.now();

    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);         // ease-out cubic
      el.textContent = Math.floor(ease * end);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = end;
    })(t0);
  }

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        animateCount(e.target);
        cio.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cio.observe(c));
  }

  /* ------------------------------------------
     CONTACT FORM — floating labels + validation
     ------------------------------------------ */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const fields = contactForm.querySelectorAll('.form__field');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    // Track select value for floating label
    const selects = contactForm.querySelectorAll('.form__field--select');
    selects.forEach(sel => {
      sel.addEventListener('change', () => {
        sel.classList.toggle('has-value', sel.value !== '');
        validateField(sel);
      });
    });

    // Validate on blur
    fields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        const group = field.closest('.form__group');
        if (group && group.classList.contains('is-invalid')) {
          validateField(field);
        }
      });
    });

    function validateField(field) {
      const group = field.closest('.form__group');
      if (!group) return true;
      const errorEl = group.querySelector('.form__error');
      let valid = true;
      let msg = '';

      if (field.required && !field.value.trim()) {
        valid = false;
        msg = 'Este campo es obligatorio.';
      } else if (field.type === 'email' && field.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(field.value.trim())) {
          valid = false;
          msg = 'Introduce un email válido.';
        }
      } else if (field.type === 'tel' && field.value.trim()) {
        const telRe = /^[\d\s\+\-().]{6,}$/;
        if (!telRe.test(field.value.trim())) {
          valid = false;
          msg = 'Introduce un teléfono válido.';
        }
      }

      group.classList.toggle('is-valid', valid && field.value.trim() !== '');
      group.classList.toggle('is-invalid', !valid);
      if (errorEl) errorEl.textContent = msg;
      return valid;
    }

    // Privacy checkbox
    const privacyCheck = document.getElementById('privacy');

    function validateCheckbox() {
      if (!privacyCheck) return true;
      const group = privacyCheck.closest('.form__group');
      const errorEl = group ? group.querySelector('.form__error') : null;
      const valid = privacyCheck.checked;
      if (group) {
        group.classList.toggle('is-invalid', !valid);
        group.classList.toggle('is-valid', valid);
      }
      if (errorEl) errorEl.textContent = valid ? '' : 'Debe aceptar la Política de Privacidad.';
      return valid;
    }

    if (privacyCheck) {
      privacyCheck.addEventListener('change', validateCheckbox);
    }

    // Submit
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all required
      let allValid = true;
      fields.forEach(f => {
        if (!validateField(f)) allValid = false;
      });
      if (!validateCheckbox()) allValid = false;

      if (!allValid) return;

      // Loading state
      submitBtn.classList.add('is-loading');

      // Simulate network
      setTimeout(() => {
        submitBtn.classList.remove('is-loading');
        contactForm.hidden = true;
        if (formSuccess) {
          formSuccess.hidden = false;
        }
      }, 1800);
    });
  }

  /* ------------------------------------------
     HERO — animated floating nodes (canvas)
     ------------------------------------------ */
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], mouse = { x: -9999, y: -9999 };
    const NODE_COUNT = 60;
    const CONNECT_DIST = 140;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function initNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2 + 1
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = (1 - dist / CONNECT_DIST) * 0.12;
            ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // nodes
      nodes.forEach(n => {
        // mouse proximity glow
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        const glow = md < 200 ? (1 - md / 200) * 0.6 : 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + (0.25 + glow) + ')';
        ctx.fill();

        // update position
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      requestAnimationFrame(draw);
    }

    let canvasRect = null;

    function updateRect() {
      canvasRect = canvas.getBoundingClientRect();
    }

    resize();
    initNodes();
    draw();
    updateRect();

    window.addEventListener('resize', () => { resize(); initNodes(); updateRect(); });
    window.addEventListener('scroll', updateRect, { passive: true });

    canvas.addEventListener('mousemove', (e) => {
      if (!canvasRect) return;
      mouse.x = e.clientX - canvasRect.left;
      mouse.y = e.clientY - canvasRect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

})();
