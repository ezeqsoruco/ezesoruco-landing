/* =========================================================
   Creá tu Página Web con IA — interacciones
   Sin librerías: todo vanilla para que cargue rápido en celular.
   Módulos: Media · Hero (la página que se arma sola) · Galería ·
   Reseñas · Revelados · Contadores · Temario · Cuenta regresiva ·
   Barra fija · Nav · FAQ · Micro-interacciones · Píxel de Meta
   ========================================================= */
(() => {
  "use strict";

  const C = window.SITE_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const isDesktop = () => innerWidth >= 1000;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------- Media + placeholders ---------------- */
  const ph = (label, hint) =>
    `<div class="ph"><b>[PENDIENTE]</b><span>${esc(label)}</span>${hint ? `<code>${esc(hint)}</code>` : ""}</div>`;

  function media(src, label, hint, alt, eager) {
    if (!src) return ph(label, hint);
    return `<img class="media-img" src="${esc(src)}" alt="${esc(alt || "")}" ${eager ? "" : 'loading="lazy"'} decoding="async" data-ph-label="${esc(label)}" data-ph-hint="${esc(hint || "")}">`;
  }
  // Si una imagen configurada no existe, vuelve a mostrar el placeholder.
  function guardImages(root = document) {
    $$("img[data-ph-label]", root).forEach((img) => {
      img.addEventListener("error", () => { img.outerHTML = ph(img.dataset.phLabel, img.dataset.phHint); }, { once: true });
    });
  }

  $$("[data-img]").forEach((el) => {
    const key = el.dataset.img;
    el.innerHTML = media((C.images || {})[key], el.dataset.pending, `config.js → images.${key}`, el.dataset.alt);
  });

  /* ---------------- Precio desde el 9/12 ---------------- */
  const post = String(C.precioPostPreventa || "").trim();
  $$("[data-post-price]").forEach((el) => {
    if (post) el.textContent = post; else el.classList.add("pending-inline");
  });

  /* ---------------- Checkout links ---------------- */
  const checkoutHref = (() => {
    try {
      const url = new URL(C.checkoutUrl);
      const q = new URLSearchParams(location.search);
      q.forEach((v, k) => { if (/^utm_|^fbclid$/.test(k)) url.searchParams.set(k, v); });
      return url.toString();
    } catch { return C.checkoutUrl || "#"; }
  })();
  $$("[data-checkout]").forEach((a) => { a.href = checkoutHref; a.rel = "noopener"; });

  /* ---------------- HERO: la página que se arma sola ---------------- */
  const stage = $("#stage");
  const hero = $(".hero");

  // Geometría compartida por el boceto y la estructura (unidades del viewBox).
  const GEO = {
    browser: {
      w: 600, h: 375,
      items: [
        { t: "rect", r: [24, 22, 70, 14], lbl: "logo" },
        { t: "line", r: [330, 26, 120, 6] },
        { t: "pill", r: [480, 18, 96, 24] },
        { t: "line", r: [24, 80, 120, 10] },
        { t: "line", r: [24, 100, 300, 24], lbl: "título" },
        { t: "line", r: [24, 130, 230, 24] },
        { t: "line", r: [24, 170, 270, 7] },
        { t: "line", r: [24, 183, 230, 7] },
        { t: "pill", r: [24, 206, 150, 30], lbl: "botón" },
        { t: "img", r: [340, 72, 236, 170], lbl: "imagen" },
        { t: "rect", r: [24, 262, 172, 90], lbl: "tarjetas" },
        { t: "rect", r: [214, 262, 172, 90] },
        { t: "rect", r: [404, 262, 172, 90] }
      ]
    },
    phone: {
      w: 120, h: 250,
      items: [
        { t: "rect", r: [10, 14, 40, 8] },
        { t: "line", r: [96, 14, 14, 8] },
        { t: "line", r: [10, 38, 60, 6] },
        { t: "line", r: [10, 50, 100, 12] },
        { t: "line", r: [10, 65, 76, 12] },
        { t: "line", r: [10, 84, 96, 4] },
        { t: "line", r: [10, 92, 80, 4] },
        { t: "pill", r: [10, 104, 74, 16] },
        { t: "img", r: [10, 130, 100, 64] },
        { t: "rect", r: [10, 202, 100, 36] }
      ]
    }
  };

  // Trazos "a mano": leve jitter para que el boceto no parezca perfecto.
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280 - 0.5);
  function roughRect(x, y, w, h, j) {
    const p = (a, b) => `${(a + rnd() * j).toFixed(1)} ${(b + rnd() * j).toFixed(1)}`;
    return `M${p(x, y)} L${p(x + w, y)} L${p(x + w, y + h)} L${p(x, y + h)} Z`;
  }
  function scribble(x, y, w, h, j) {
    // línea ondulada que simula texto
    const mid = y + h / 2, steps = Math.max(4, Math.round(w / (h * 1.4)));
    let d = `M${x} ${mid}`;
    for (let i = 1; i <= steps; i++) {
      const xx = x + (w * i) / steps, yy = mid + (i % 2 ? -1 : 1) * h * 0.32 + rnd() * j;
      d += ` Q${(xx - w / steps / 2).toFixed(1)} ${(yy + (i % 2 ? -h * 0.2 : h * 0.2)).toFixed(1)} ${xx.toFixed(1)} ${yy.toFixed(1)}`;
    }
    return d;
  }

  const sketchPaths = [];
  $$("[data-view]").forEach((view) => {
    const g = GEO[view.dataset.view];
    const j = g.w / 160;
    const svg = $("[data-sketch]", view);
    const struct = $("[data-struct]", view);
    let svgHTML = "", structHTML = "";
    g.items.forEach((it) => {
      const [x, y, w, h] = it.r;
      let d;
      if (it.t === "line") d = scribble(x, y, w, h, j);
      else if (it.t === "img") d = roughRect(x, y, w, h, j) + ` M${x} ${y} L${x + w} ${y + h} M${x + w} ${y} L${x} ${y + h}`;
      else d = roughRect(x, y, w, h, j);
      svgHTML += `<path class="sk${it.t === "pill" ? " sk--acc" : ""}" d="${d}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`;
      if (it.lbl && g.w > 200) svgHTML += `<text x="${x + 2}" y="${y - 5}">${it.lbl}</text>`;
      const cls = it.t === "pill" ? "sb sb--pill" : it.t === "line" ? "sb sb--line" : "sb";
      const hh = it.t === "line" ? Math.max(h * 0.6, 3) : h;
      structHTML += `<i class="${cls}" style="left:${(x / g.w) * 100}%;top:${((y + (h - hh) / 2) / g.h) * 100}%;width:${(w / g.w) * 100}%;height:${(hh / g.h) * 100}%"></i>`;
    });
    svg.innerHTML = svgHTML;
    struct.innerHTML = structHTML;
    sketchPaths.push(...$$("path", svg));
  });
  const sketchTexts = $$(".lyr--sketch text");

  // Imagen real del hero (opcional) o etiqueta [PENDIENTE]
  if (stage) {
    const src = (C.images || {}).heroMockup;
    const real = $("[data-hero-real]", stage);
    if (src) {
      const img = new Image();
      img.alt = "Página creada con el método del curso, en laptop y celular";
      img.decoding = "async";
      img.onload = () => stage.classList.add("has-real");
      img.onerror = () => img.remove();
      img.src = src;
      real.append(img);
    }
  }

  const urlEl = $("[data-url]");
  const URL_TXT = "tunegocio.com";
  const stepEls = $$(".steps li");
  let heroTarget = 0, heroCur = reduce ? 1 : 0, intro = 0;

  function heroScrollP() {
    if (!stage) return 0;
    const vh = innerHeight;
    if (isDesktop()) {
      const r = hero.getBoundingClientRect();
      const total = hero.offsetHeight - vh;
      return clamp(-r.top / (total * 0.88));
    }
    const r = stage.getBoundingClientRect();
    return clamp((vh * 0.95 - r.top) / (vh * 0.7));
  }

  function renderHero(p) {
    stage.style.setProperty("--p", p.toFixed(4));
    const draw = clamp(p / 0.3);
    const n = sketchPaths.length;
    sketchPaths.forEach((el, i) => {
      const local = clamp(draw * 1.7 - (i / n) * 0.7);
      el.style.strokeDashoffset = (1 - local).toFixed(3);
    });
    sketchTexts.forEach((t) => (t.style.opacity = clamp((draw - 0.4) * 3).toFixed(2)));
    const chars = Math.round(clamp((p - 0.1) / 0.62) * URL_TXT.length);
    if (urlEl) urlEl.textContent = URL_TXT.slice(0, chars);
    const idx = p < 0.3 ? 0 : p < 0.56 ? 1 : p < 0.84 ? 2 : 3;
    stepEls.forEach((li, i) => li.classList.toggle("on", i <= idx));
    const hint = $(".hero__scrollhint");
    if (hint) hint.style.opacity = p > 0.1 ? 0 : 1;
  }

  let heroRAF = 0;
  function heroLoop() {
    heroTarget = reduce ? 1 : Math.max(heroScrollP(), intro);
    heroCur += (heroTarget - heroCur) * 0.14;
    if (Math.abs(heroTarget - heroCur) < 0.0008) heroCur = heroTarget;
    renderHero(heroCur);
    heroRAF = heroCur !== heroTarget ? requestAnimationFrame(heroLoop) : 0;
  }
  const kickHero = () => { if (stage && !heroRAF) heroRAF = requestAnimationFrame(heroLoop); };

  if (stage) {
    renderHero(heroCur);
    // Intro: al cargar, el boceto empieza a dibujarse solo.
    if (!reduce) {
      const t0 = performance.now() + 450;
      const introTick = (now) => {
        const k = clamp((now - t0) / 1700);
        intro = 0.26 * (1 - Math.pow(1 - k, 3));
        kickHero();
        if (k < 1) requestAnimationFrame(introTick);
      };
      requestAnimationFrame(introTick);
    }
  }

  // Titular partido en palabras que suben
  $$("[data-split]").forEach((el) => {
    if (reduce) return;
    let i = 0;
    const frag = document.createDocumentFragment();
    Array.from(el.childNodes).forEach((n) => {
      const cls = n.nodeType === 1 ? n.className : "";
      n.textContent.split(/(\s+)/).forEach((tok) => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { frag.append(document.createTextNode(" ")); return; }
        const w = document.createElement("span");
        w.className = "w";
        const s = document.createElement("span");
        s.textContent = tok;
        if (cls) s.className = cls;
        s.style.setProperty("--d", (0.08 + i++ * 0.04).toFixed(2) + "s");
        w.append(s);
        frag.append(w);
      });
    });
    el.textContent = "";
    el.append(frag);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in")));
  });

  /* ---------------- Galería (carrusel infinito, se desliza con el dedo) ---------------- */
  const gal = $("[data-gallery]");
  const marquee = $("[data-marquee]");
  if (gal && marquee) {
    const items = C.galeria && C.galeria.length ? C.galeria : [{}, {}, {}, {}];
    const lock = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
    const card = (it, i, clone) => `
      <figure class="shot" ${clone ? 'aria-hidden="true"' : ""}>
        <div class="shot__win">
          <div class="shot__bar">
            <span class="shot__dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="shot__url ${it.rubro ? "" : "is-pending"}">${lock}${it.rubro ? esc(it.rubro) : "[PENDIENTE: rubro]"}</span>
          </div>
          <div class="shot__desk">${media(it.src, `Captura ${i + 1} · desktop + celular`, `config.js → galeria[${i}]`, it.rubro ? `Página para ${it.rubro}` : "Página creada con el método")}</div>
        </div>
      </figure>`;
    gal.innerHTML = items.map((it, i) => card(it, i)).join("") + items.map((it, i) => card(it, i, true)).join("");
    guardImages(gal);
    $$("img", gal).forEach((img) => { img.draggable = false; });

    // Movimiento: avanza solo y se puede arrastrar (dedo o mouse) con inercia.
    const SPEED = reduce ? 0 : 40;          // px por segundo en modo automático
    let x = 0, loopW = 0, vel = 0, dragging = false, hovering = false, inView = false;
    let startX = 0, startY = 0, startOff = 0, lastX = 0, lastT = 0, axis = null, raf = 0, prevT = 0;

    const measure = () => {
      const shots = gal.children;
      loopW = shots.length > items.length ? shots[items.length].offsetLeft - shots[0].offsetLeft : 0;
    };
    const wrap = () => {
      if (!loopW) return;
      while (x <= -loopW) x += loopW;
      while (x > 0) x -= loopW;
    };
    const paint = () => { gal.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`; };
    const tick = (t) => {
      const dt = Math.min(0.05, (t - (prevT || t)) / 1000);
      prevT = t;
      if (!dragging) {
        if (Math.abs(vel) > 5) { x += vel * dt; vel *= Math.pow(0.04, dt); }   // inercia
        else { vel = 0; if (!hovering) x -= SPEED * dt; }
      }
      wrap(); paint();
      raf = inView ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf) { prevT = 0; raf = requestAnimationFrame(tick); } };

    // Arrastre: mouse con pointer events; dedo con touch events (en iOS/Android los pointer events
    // se cancelan apenas el navegador detecta algo de scroll vertical y el swipe quedaba cortado).
    const begin = (cx, cy) => {
      dragging = true; axis = null; vel = 0;
      startX = lastX = cx; startY = cy; startOff = x; lastT = performance.now();
    };
    const move = (cx) => {
      const now = performance.now(), dtm = Math.max(1, now - lastT);
      vel = vel * 0.5 + ((cx - lastX) / dtm) * 1000 * 0.5;
      lastX = cx; lastT = now;
      x = startOff + (cx - startX); wrap(); paint();
    };
    const end = () => {
      if (!dragging) return;
      dragging = false; marquee.classList.remove("is-dragging");
      if (performance.now() - lastT > 100) vel = 0;       // se soltó quieto: sin inercia
      vel = Math.max(-3000, Math.min(3000, vel));
    };

    marquee.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) { end(); return; }
      begin(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    marquee.addEventListener("touchmove", (e) => {
      if (!dragging || e.touches.length !== 1) return;
      const t = e.touches[0], dx = t.clientX - startX, dy = t.clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
        axis = Math.abs(dx) >= Math.abs(dy) * 0.8 ? "x" : "y";
        if (axis === "y") { dragging = false; return; }   // deja scrollear la página
        marquee.classList.add("is-dragging");
      }
      if (e.cancelable) e.preventDefault();               // gesto horizontal: la página no se mueve
      move(t.clientX);
    }, { passive: false });
    marquee.addEventListener("touchend", end);
    marquee.addEventListener("touchcancel", end);

    marquee.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      begin(e.clientX, e.clientY); axis = "x";
      marquee.setPointerCapture(e.pointerId); marquee.classList.add("is-dragging");
    });
    marquee.addEventListener("pointermove", (e) => {
      if (e.pointerType === "mouse" && dragging) move(e.clientX);
    });
    marquee.addEventListener("pointerup", (e) => { if (e.pointerType === "mouse") end(); });
    marquee.addEventListener("lostpointercapture", (e) => { if (e.pointerType === "mouse") end(); });
    if (finePointer) {
      marquee.addEventListener("pointerenter", () => { hovering = true; });
      marquee.addEventListener("pointerleave", () => { hovering = false; });
    }

    measure();
    addEventListener("resize", () => { measure(); wrap(); paint(); }, { passive: true });
    $$("img", gal).forEach((img) => img.addEventListener("load", measure, { once: true }));
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) start(); }, { rootMargin: "100px" }).observe(marquee);
    } else { inView = true; start(); }
  }

  /* ---------------- Reseñas ---------------- */
  const rev = $("[data-reviews]");
  if (rev) {
    const list = C.resenas || [];
    if (list.length) {
      rev.innerHTML = list.map((r) => `
        <article class="review review--real glass">
          <header class="review__head">
            ${r.foto ? `<img class="review__avatar" src="${esc(r.foto)}" alt="" width="96" height="96" loading="lazy" decoding="async">` : ""}
            <div class="review__who"><b>${esc(r.nombre || "")}</b><span>${esc(r.rubro || "")}</span></div>
          </header>
          <div class="review__msg">${media(r.src, "Captura del testimonio", "", r.texto || `Mensaje de ${r.nombre || ""}`)}</div>
        </article>`).join("");
    } else {
      rev.innerHTML = [1, 2, 3].map((n) => `
        <article class="review glass">
          <div class="review__shot">${ph(`Testimonio real ${n}: captura`, "config.js → resenas")}</div>
          <div class="review__who is-pending"><b>[PENDIENTE] Nombre</b><span>[PENDIENTE] Rubro</span></div>
        </article>`).join("");
    }
    guardImages(rev);
  }
  guardImages();

  /* ---------------- Revelados al scroll ---------------- */
  const rvEls = $$(".rv");
  rvEls.forEach((el) => {
    const sibs = Array.from(el.parentElement.children).filter((c) => c.classList.contains("rv"));
    const i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty("--d", Math.min(i * 0.07, 0.35) + "s");
  });
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rvEls.forEach((el) => io.observe(el));
  } else rvEls.forEach((el) => el.classList.add("in"));

  /* ---------------- Contadores ---------------- */
  const fmt = new Intl.NumberFormat("es-AR");
  const counters = $$("[data-count]");
  const runCount = (el) => {
    const to = +el.dataset.count;
    if (reduce) { el.textContent = fmt.format(to); return; }
    const t0 = performance.now(), dur = 1900;
    const step = (now) => {
      const k = clamp((now - t0) / dur);
      el.textContent = fmt.format(Math.round(to * (1 - Math.pow(2, -10 * k))));
      if (k < 1) requestAnimationFrame(step); else el.textContent = fmt.format(to);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  } else counters.forEach(runCount);

  /* ---------------- Temario: línea que se llena ---------------- */
  const tl = $("[data-timeline]");
  const tlItems = $$(".tl", tl || document);
  function updateTimeline() {
    if (!tl) return;
    const vh = innerHeight, r = tl.getBoundingClientRect();
    const focus = vh * 0.62;
    tl.style.setProperty("--tl", clamp((focus - r.top) / r.height).toFixed(4));
    tlItems.forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < focus));
  }

  /* ---------------- Cuenta regresiva (fecha fija) ---------------- */
  const deadline = new Date(C.deadline || "2026-12-08T23:59:00-03:00").getTime();
  const pad = (n) => String(n).padStart(2, "0");
  let expired = false;
  function setExpired() {
    expired = true;
    document.documentElement.classList.add("is-expired");
    $$("[data-label-expired]").forEach((b) => { const l = $("[data-label]", b); if (l) l.textContent = b.dataset.labelExpired; });
  }
  function tick() {
    const diff = deadline - Date.now();
    if (diff <= 0) { if (!expired) setExpired(); return; }
    const s = Math.floor(diff / 1000);
    const v = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
    $$("[data-cd]").forEach((el) => { el.textContent = pad(v[el.dataset.cd]); });
    const inline = $("[data-cd-inline]");
    if (inline) inline.textContent = `Termina en ${v.d}d ${pad(v.h)}:${pad(v.m)}:${pad(v.s)}`;
  }
  tick();
  const cdTimer = setInterval(() => { tick(); if (expired) clearInterval(cdTimer); }, 1000);

  /* ---------------- Barra fija (celular) + nav ---------------- */
  const buybar = $("[data-buybar]");
  const bonos = $("#bonos");
  const nav = $("#nav");
  const navCta = $("[data-nav-cta]");
  const inlineBuys = $$("[data-checkout]").filter((a) => !buybar || !buybar.contains(a));
  let lastY = scrollY, navSwapped = false, navHidden = false;

  function updateChrome() {
    const vh = innerHeight;
    const pastBonos = bonos ? bonos.getBoundingClientRect().bottom < vh * 0.35 : false;

    if (buybar) {
      const buyVisible = inlineBuys.some((a) => { const r = a.getBoundingClientRect(); return r.top < vh && r.bottom > 0; });
      const show = !isDesktop() && pastBonos && !buyVisible;
      buybar.classList.toggle("show", show);
      buybar.setAttribute("aria-hidden", String(!show));
      const a = $("a", buybar); if (a) a.tabIndex = show ? 0 : -1;
    }
    if (navCta && pastBonos !== navSwapped) {
      navSwapped = pastBonos;
      navCta.textContent = pastBonos ? "Asegurá tu lugar" : "Ver el temario";
      navCta.setAttribute("href", pastBonos ? "#oferta" : "#temario");
      navCta.classList.toggle("btn--primary", pastBonos);
      navCta.classList.toggle("btn--ghost", !pastBonos);
    }
    const y = scrollY;
    // Se esconde al bajar y aparece al subir, con un umbral para que no titile.
    const dy = y - lastY;
    if (y < 240 || (isDesktop() && y < hero.offsetHeight - vh)) { navHidden = false; lastY = y; }
    else if (Math.abs(dy) > 24) { navHidden = dy > 0; lastY = y; }
    if (nav) nav.classList.toggle("is-hidden", navHidden);
  }

  /* ---------------- Profundidad de scroll (píxel) ---------------- */
  const depthSent = { 50: false, 75: false };
  function updateDepth() {
    const doc = document.documentElement;
    const pct = (scrollY + innerHeight) / doc.scrollHeight;
    [50, 75].forEach((n) => {
      if (!depthSent[n] && pct >= n / 100) { depthSent[n] = true; track("trackCustom", `Scroll${n}`, { porcentaje: n }); }
    });
  }

  /* ---------------- Loop de scroll ---------------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      kickHero();
      updateTimeline();
      updateChrome();
      updateDepth();
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ---------------- FAQ (acordeón) ---------------- */
  $$("[data-acc] .acc__item").forEach((item) => {
    const btn = $("button", item);
    btn.addEventListener("click", () => {
      const open = !item.classList.contains("open");
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------------- Micro-interacciones (solo puntero fino) ---------------- */
  if (finePointer && !reduce) {
    $$(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
    document.addEventListener("pointermove", (e) => {
      const g = e.target.closest && e.target.closest(".glass");
      if (!g) return;
      const r = g.getBoundingClientRect();
      g.style.setProperty("--mx", e.clientX - r.left + "px");
      g.style.setProperty("--my", e.clientY - r.top + "px");
    }, { passive: true });
  }

  /* ---------------- Píxel de Meta ---------------- */
  // Se carga después del load para no frenar la página. Sin ID = no se carga.
  // No dispara InitiateCheckout ni Purchase (los registra el píxel de Winnerfy).
  const pixelId = String(C.metaPixelId || "").trim();
  function track(kind, name, params) {
    if (!pixelId || typeof window.fbq !== "function") return;
    window.fbq(kind, name, params || {});
  }
  if (pixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
    }(window, document);
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
    window.fbq("track", "ViewContent", { content_name: "Creá tu Página Web con IA", content_category: "Curso online" });
    const load = () => {
      const s = document.createElement("script");
      s.async = true; s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.append(s);
    };
    const later = () => ("requestIdleCallback" in window ? requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 1200));
    if (document.readyState === "complete") later(); else addEventListener("load", later, { once: true });
  }

  $$("[data-checkout]").forEach((a) => {
    a.addEventListener("click", (e) => {
      track("trackCustom", "ClicComprar", { ubicacion: a.dataset.checkout });
      // Damos 200 ms para que el evento salga antes de ir al checkout.
      if (pixelId && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
        e.preventDefault();
        setTimeout(() => { location.href = a.href; }, 200);
      }
    });
  });
})();
