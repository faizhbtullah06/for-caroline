(() => {
  const C = CONFIG;
  const T = C.lockText;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rand = n => Math.floor(Math.random() * n);
  const pad2 = n => String(n).padStart(2, "0");
  const NS = "http://www.w3.org/2000/svg";
  const COLORS = ["#FBB3BB", "#D46C8C", "#9B3160", "#FFFFFF"];
  const ordinal = n => {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  /* small helper to make an svg sticker element */
  function symEl(id, cls, color, w, h) {
    const s = document.createElementNS(NS, "svg");
    s.setAttribute("class", cls);
    s.style.width = w + "px";
    s.style.height = (h || w) + "px";
    if (color) s.style.color = color;
    const u = document.createElementNS(NS, "use");
    u.setAttribute("href", "#" + id);
    s.appendChild(u);
    return s;
  }

  document.title = `For ${C.herName} 🤍`;

  /* =========================================================
     CONFETTI (hearts + paper)
     ========================================================= */
  const cv = $("#confetti"), ctx = cv.getContext("2d");
  const HEART = new Path2D("M50 90C12 62 4 34 22 18c13-11 25-4 28 8 3-12 15-19 28-8 18 16 10 44-28 72z");
  let parts = [], running = false;
  const cColors = ["#FBB3BB", "#D46C8C", "#9B3160", "#FFFFFF", "#FFD6DC", "#EBCBA8"];
  function resizeCv() {
    const r = $("#app").getBoundingClientRect();
    cv.width = r.width; cv.height = r.height;
  }
  resizeCv();
  addEventListener("resize", resizeCv);

  function burst(x, y, n = 110) {
    if (x == null) x = cv.width / 2;
    if (y == null) y = cv.height / 3;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = 4 + Math.random() * 9;
      parts.push({
        x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, g: 0.18,
        r: 5 + Math.random() * 5, c: cColors[rand(cColors.length)],
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        life: 140 + Math.random() * 60, heart: Math.random() < 0.45,
      });
    }
    if (!running) { running = true; loop(); }
  }
  function loop() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.life > 0 && p.y < cv.height + 40);
    for (const p of parts) {
      p.vy += p.g; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.min(1, p.life / 40);
      ctx.fillStyle = p.c;
      if (p.heart) {
        const s = p.r / 22;
        ctx.scale(s, s);
        ctx.translate(-50, -50);
        ctx.fill(HEART);
      } else {
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
      }
      ctx.restore();
    }
    if (parts.length) requestAnimationFrame(loop);
    else { running = false; ctx.clearRect(0, 0, cv.width, cv.height); }
  }

  /* =========================================================
     BACKGROUND HEARTS + TAP SPARKLES
     ========================================================= */
  const floaters = $("#floaters");
  setInterval(() => {
    if (document.hidden) return;
    const size = 10 + Math.random() * 18;
    const f = symEl("st-heart", "fl", COLORS[rand(3)], size);
    f.style.left = Math.random() * 100 + "%";
    const d = 9 + Math.random() * 7;
    f.style.animationDuration = d + "s";
    f.style.setProperty("--sway", Math.random() * 80 - 40 + "px");
    floaters.appendChild(f);
    setTimeout(() => f.remove(), d * 1000);
  }, 1000);

  addEventListener("pointerdown", e => {
    for (let i = 0; i < 6; i++) {
      const isHeart = Math.random() < 0.6;
      const s = symEl(isHeart ? "st-heart" : "st-sparkle", "spark", isHeart ? COLORS[rand(3)] : "#C99A6B", 10 + Math.random() * 12);
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      const a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 50;
      s.style.setProperty("--dx", Math.cos(a) * d + "px");
      s.style.setProperty("--dy", Math.sin(a) * d - 20 + "px");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    }
  });

  /* =========================================================
     PAGES + NAVIGATION
     ========================================================= */
  const stage = $("#stage");
  const gatePage = $("#gate");
  const all = {};
  $$(".page[data-page]", stage).forEach(p => (all[p.dataset.page] = p));
  const order = C.order.filter(id => all[id] && id !== "gate");
  Object.keys(all).forEach(id => { if (id !== "gate" && !order.includes(id)) all[id].remove(); });
  order.forEach(id => stage.appendChild(all[id]));
  const pages = order.map(id => all[id]);
  [gatePage, ...pages].forEach(p => $$(".rise", p).forEach((el, i) => el.style.setProperty("--i", i)));

  const nav = $("#nav"), navBack = $("#navBack"), navNext = $("#navNext"), navDots = $("#navDots");
  let idx = -1; // -1 = gate
  pages.forEach(() => navDots.appendChild(document.createElement("i")));

  function updateNav() {
    if (idx < 0) return;
    const p = pages[idx];
    $$("i", navDots).forEach((d, i) => {
      d.classList.toggle("on", i === idx);
      d.classList.toggle("done", i < idx);
    });
    navBack.classList.toggle("off", idx === 0);
    const last = idx === pages.length - 1;
    navNext.classList.toggle("off", last);
    const locked = p.classList.contains("locked");
    navNext.classList.toggle("disabled", locked);
    navNext.classList.toggle("ready", !locked && !last && p.dataset.ready === "1");
    $("#navNextText").textContent = p.dataset.next || "Continue";
  }

  const hooks = {};
  function activate(page) {
    $$(".page.active", stage).forEach(p => p.classList.remove("active"));
    page.classList.add("active");
    page.scrollTop = 0;
    // stop video when leaving
    const v = $("video", $("#vframe"));
    if (v && page.dataset.page !== "video") v.pause();
    const h = hooks[page.dataset.page];
    if (h) h();
    updateNav();
  }
  function go(i) {
    if (i < 0 || i >= pages.length) return;
    idx = i;
    activate(pages[idx]);
  }
  navNext.addEventListener("click", () => {
    if (navNext.classList.contains("disabled")) return;
    go(idx + 1);
  });
  navBack.addEventListener("click", () => go(idx - 1));
  addEventListener("keydown", e => {
    if (activeLock || $(".modal.open") || idx < 0) return;
    if (e.key === "ArrowRight" && !navNext.classList.contains("disabled")) go(idx + 1);
    if (e.key === "ArrowLeft") go(idx - 1);
  });

  /* =========================================================
     LOCK (keypad) component
     ========================================================= */
  let activeLock = null;
  function makeLock(o) {
    const len = o.code.length;
    let val = "", busy = false;
    const el = document.createElement("div");
    el.className = "lock";
    el.innerHTML =
      '<svg class="lock-ico"><use href="#st-lock"/></svg><h2></h2><p class="sub"></p>' +
      '<div class="dots"></div><p class="msg"></p><div class="pad"></div><p class="hint"></p>';
    $("h2", el).textContent = o.title;
    $(".sub", el).textContent = o.sub;
    $(".hint", el).textContent = o.hint;
    const dots = $(".dots", el), msg = $(".msg", el), padEl = $(".pad", el);
    for (let i = 0; i < len; i++) dots.appendChild(document.createElement("i"));
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].forEach(k => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = k;
      if (k === "") { b.className = "blank"; b.tabIndex = -1; }
      else b.addEventListener("click", () => (k === "⌫" ? back() : push(k)));
      padEl.appendChild(b);
    });
    function render() { $$("i", dots).forEach((d, i) => d.classList.toggle("on", i < val.length)); }
    function push(d) {
      if (busy || val.length >= len) return;
      val += d; msg.textContent = ""; render();
      if (val.length === len) check();
    }
    function back() { if (busy) return; val = val.slice(0, -1); render(); }
    function check() {
      busy = true;
      if (val === o.code) {
        el.classList.add("ok");
        msg.textContent = T.ok;
        setTimeout(() => { busy = false; o.onOk(); }, 800);
      } else {
        el.classList.add("shake");
        msg.textContent = T.bad;
        setTimeout(() => { el.classList.remove("shake"); val = ""; render(); busy = false; }, 650);
      }
    }
    function reset() { val = ""; busy = false; msg.textContent = ""; el.classList.remove("ok", "shake"); render(); }
    return { el, push, back, reset };
  }
  addEventListener("keydown", e => {
    if (!activeLock) return;
    if (/^\d$/.test(e.key)) activeLock.push(e.key);
    else if (e.key === "Backspace") activeLock.back();
  });

  /* modal helpers */
  const openModal = m => m.classList.add("open");
  const closeModal = m => m.classList.remove("open");
  $$(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m) { closeModal(m); if (m.id === "lockModal") activeLock = null; } }));
  addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    $$(".modal.open").forEach(m => closeModal(m));
    if (!$("#gate").classList.contains("active")) activeLock = null;
  });

  /* =========================================================
     GATE (password 1)
     ========================================================= */
  $("#gateKicker").textContent = T.gateKicker;
  const gateLock = makeLock({
    code: C.codes.birthday, title: T.gateTitle, sub: T.gateSub, hint: T.gateHint,
    onOk: unlockSite,
  });
  $("#gateMount").appendChild(gateLock.el);
  activeLock = gateLock;

 
/* optional music */
let audio = null;
const musicBtn = $("#musicBtn");

if (C.music) {
  audio = new Audio(C.music);
  audio.loop = true;
  musicBtn.hidden = false;

  // Coba putar musik otomatis saat website dibuka
  audio.volume = 0.7;
  audio.play()
    .then(() => musicBtn.classList.add("on"))
    .catch(() => {
      // Autoplay mungkin diblokir oleh browser
    });

  musicBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play()
        .then(() => musicBtn.classList.add("on"))
        .catch(() => {});
    } else {
      audio.pause();
      musicBtn.classList.remove("on");
    }
  });
}


  function unlockSite() {
    activeLock = null;
    nav.classList.remove("hidden");
    gatePage.classList.remove("active");
    go(0);
    burst(cv.width * 0.25, cv.height * 0.5, 90);
    burst(cv.width * 0.75, cv.height * 0.5, 90);
    setTimeout(() => burst(cv.width / 2, cv.height * 0.35, 120), 350);
    if (audio) {
  audio.muted = false;
  audio.volume = 0.7;
  audio.play()
    .then(() => musicBtn.classList.add("on"))
    .catch((err) => console.log("Musik gagal:", err));
}
    setTimeout(() => gatePage.remove(), 900);
  }

  /* =========================================================
     LETTER (envelope)
     ========================================================= */
  if (all.letter) {
    const env = $("#envelope"), paper = $("#paper");
    const greet = $("#greet");
    greet.textContent = C.greeting + " ";
    greet.appendChild(symEl("st-heart", "inl-heart", "#D46C8C", 28));
    $("#greetSub").textContent = C.greetingSub;
    $("#fromName").textContent = C.fromName;
    const body = $("#letterBody");
    C.letter.forEach((t, i) => {
      const p = document.createElement("p");
      p.className = "line";
      p.style.setProperty("--i", i);
      p.textContent = t;
      body.appendChild(p);
    });
    env.addEventListener("click", () => {
      if (env.classList.contains("open")) return;
      env.classList.add("open");
      $("#tapHint").classList.add("hide");
      setTimeout(() => env.classList.add("gone"), 850);
      setTimeout(() => {
        paper.classList.add("show");
        burst(cv.width / 2, cv.height * 0.45, 50);
      }, 1050);
      setTimeout(() => {
        all.letter.classList.remove("locked");
        all.letter.dataset.ready = "1";
        updateNav();
      }, 2200);
    });
  }

  /* =========================================================
     COVER (photo + party hat + hearts)
     ========================================================= */
  if (all.cover) {
    $("#coverTitle").innerHTML = `Happy <em>${ordinal(C.age)}</em> Birthday`;
    $("#coverName").textContent = C.herName;
    $("#fullName").textContent = C.fullName;
    $("#bigNum").textContent = C.age;
    $("#coverKicker").textContent = C.birthdayDate || "today is your day";

    const img = $("#heroImg");
    img.src = C.heroPhoto.src;
    img.onerror = () => { img.onerror = null; img.src = "photos/caroline.svg"; };
    const hat = C.heroPhoto.hat || {};
    const cut = $("#cutout");
    if (hat.show === false) $("#hat").style.display = "none";
    if (hat.x) cut.style.setProperty("--hat-x", hat.x);
    if (hat.y) cut.style.setProperty("--hat-y", hat.y);
    if (hat.width) cut.style.setProperty("--hat-w", hat.width);
    if (hat.rotate != null) cut.style.setProperty("--hat-r", hat.rotate + "deg");

    const host = $("#heroHearts");
    setInterval(() => {
      if (!all.cover.classList.contains("active")) return;
      const h = symEl("st-heart", "rh", COLORS[rand(3)], 12 + Math.random() * 18);
      h.style.left = 6 + Math.random() * 88 + "%";
      const d = 3 + Math.random() * 2.5;
      h.style.setProperty("--dur", d + "s");
      h.style.setProperty("--sx", Math.random() * 60 - 30 + "px");
      host.appendChild(h);
      setTimeout(() => h.remove(), d * 1000);
    }, 320);

    let first = true;
    hooks.cover = () => {
      if (first) { first = false; setTimeout(() => burst(cv.width / 2, cv.height * 0.4, 80), 500); }
    };
  }

  /* =========================================================
     MEMORIES (photo deck)
     ========================================================= */
  if (all.memories) {
    const deck = $("#deck");
    const n = C.photos.length;
    const cards = [];
    C.photos.forEach(p => {
      const f = document.createElement("figure");
      f.className = "mcard";
      f.innerHTML = '<img alt="" draggable="false" /><figcaption></figcaption>';
      const im = $("img", f);
      im.src = p.src;
      im.alt = p.caption || "Our photo";
      im.onerror = () => { im.onerror = null; im.src = "photos/photo1.svg"; };
      $("figcaption", f).textContent = p.caption || "";
      f.addEventListener("animationend", () => f.classList.remove("deal"));
      deck.insertBefore(f, deck.firstChild);
      cards.push(f);
    });
    $("#memNote").textContent = C.memoriesNote;
    let cur = 0, busy = false;
    function layout() {
      cards.forEach((c, i) => {
        const pos = (i - cur + n) % n;
        c.dataset.pos = pos < 3 ? pos : "x";
        c.style.zIndex = pos < 3 ? 10 - pos : 0;
      });
      $("#mCount").textContent = `${pad2(cur + 1)} / ${pad2(n)}`;
    }
    function step(dir) {
      if (busy || n < 2) return;
      busy = true;
      const top = cards[cur];
      top.classList.add(dir > 0 ? "fly-r" : "fly-l");
      setTimeout(() => {
        top.style.transition = "none";
        top.classList.remove("fly-r", "fly-l");
        cur = (cur + dir + n) % n;
        layout();
        void top.offsetWidth;
        top.style.transition = "";
        const nt = cards[cur];
        nt.classList.remove("deal");
        void nt.offsetWidth;
        nt.classList.add("deal");
        busy = false;
      }, 420);
    }
    layout();
    $("#mNext").addEventListener("click", () => step(1));
    $("#mPrev").addEventListener("click", () => step(-1));
    let sx = null;
    deck.addEventListener("pointerdown", e => { sx = e.clientX; });
    deck.addEventListener("pointerup", e => {
      if (sx == null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); else step(1);
    });
    deck.addEventListener("pointercancel", () => { sx = null; });
  }

  /* =========================================================
     VIDEO
     ========================================================= */
  if (all.video) {
    const vf = $("#vframe"), V = C.video || {};
    $("#vidNote").textContent = V.note || "";
    if (V.youtube) {
      const f = document.createElement("iframe");
      f.src = `https://www.youtube.com/embed/${encodeURIComponent(V.youtube)}?rel=0&playsinline=1`;
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      f.title = "Our video";
      vf.appendChild(f);
    } else if (V.src) {
      const v = document.createElement("video");
      v.src = V.src;
      v.controls = true;
      v.playsInline = true;
      v.preload = "metadata";
      if (V.poster) v.poster = V.poster;
      vf.appendChild(v);
    } else {
      vf.innerHTML = '<div class="vph"><div><svg><use href="#st-heart"/></svg><p>Our little movie is coming soon</p></div></div>';
      $("#vidNote").textContent = "";
    }
  }

  /* =========================================================
     REASONS (heart grid + popup)
     ========================================================= */
  if (all.reasons) {
    const grid = $("#rGrid"), R = C.reasons, N = R.length;
    const seen = new Set(), tiles = [];
    $("#rTotal").textContent = N;
    const tint = ["#FBB3BB", "#D46C8C", "#9B3160"], numCol = ["#6f2144", "#fff", "#fff"];
    R.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "tile";
      b.style.setProperty("--d", i * 0.13 + "s");
      b.style.color = tint[i % 3];
      b.style.setProperty("--num", numCol[i % 3]);
      b.innerHTML = '<svg><use href="#st-heart"/></svg><b></b>';
      $("b", b).textContent = i + 1;
      b.setAttribute("aria-label", "Reason " + (i + 1));
      b.addEventListener("click", () => openReason(i));
      grid.appendChild(b);
      tiles.push(b);
    });
    const m = $("#rModal");
    let ri = 0;
    function openReason(i) {
      ri = (i + N) % N;
      $("#rNum").textContent = ri + 1;
      $("#rText").textContent = R[ri];
      openModal(m);
      seen.add(ri);
      tiles[ri].classList.add("seen");
      $("#rSeen").textContent = seen.size;
      if (seen.size === N) setTimeout(() => burst(cv.width / 2, cv.height * 0.35, 120), 400);
    }
    $("#rClose").addEventListener("click", () => closeModal(m));
    $("#rPrev").addEventListener("click", () => openReason(ri - 1));
    $("#rNext").addEventListener("click", () => openReason(ri + 1));
  }

  /* =========================================================
     CAKE
     ========================================================= */
  if (all.cake) {
    $("#cakeTitle").textContent = `Happy ${ordinal(C.age)}, ${C.herName}`;
    $("#wish").textContent = C.wishText;
    const cake = $("#cake"), blowBtn = $("#blow"), relightBtn = $("#relight"), wish = $("#wish");
    function blow() {
      if (cake.classList.contains("out")) return;
      cake.classList.add("out");
      wish.classList.add("show");
      blowBtn.hidden = true;
      relightBtn.hidden = false;
      const a = $("#app").getBoundingClientRect(), r = cake.getBoundingClientRect();
      burst(r.left - a.left + r.width / 2, r.top - a.top, 150);
      setTimeout(() => burst(cv.width * 0.2, cv.height * 0.4, 70), 300);
      setTimeout(() => burst(cv.width * 0.8, cv.height * 0.4, 70), 500);
    }
    function relight() {
      cake.classList.remove("out");
      wish.classList.remove("show");
      blowBtn.hidden = false;
      relightBtn.hidden = true;
    }
    cake.addEventListener("click", blow);
    cake.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); blow(); } });
    blowBtn.addEventListener("click", blow);
    relightBtn.addEventListener("click", relight);
  }

  /* =========================================================
     GIFT (password 2)
     ========================================================= */
  if (all.gift) {
    const giftBtn = $("#giftBtn"), hint = $("#giftHint");
    const lockModal = $("#lockModal"), letterModal = $("#letterModal");
    let unlocked = false;

    const giftLock = makeLock({
      code: C.codes.gift, title: T.giftTitle, sub: T.giftSub, hint: T.giftHint,
      onOk: () => {
        unlocked = true;
        closeModal(lockModal);
        activeLock = null;
        openGift(true);
      },
    });
    $("#lockMount").appendChild(giftLock.el);

    // letter content
    const gl = $("#glBody"), G = C.gift;
    G.lines.forEach((t, i) => {
      const p = document.createElement("p");
      p.className = i === 0 ? "gl-big" : "gl-line";
      p.textContent = t;
      gl.appendChild(p);
    });
    if (G.sign) {
      const s = document.createElement("p");
      s.className = "gl-sign";
      s.textContent = G.sign;
      s.appendChild(symEl("st-heart", "inl-heart", "#D46C8C", 22));
      gl.appendChild(s);
    }

    function openGift(first) {
      giftBtn.classList.add("opened");
      hint.textContent = "tap the gift to read your note again";
      if (first) {
        const a = $("#app").getBoundingClientRect(), r = giftBtn.getBoundingClientRect();
        burst(r.left - a.left + r.width / 2, r.top - a.top + r.height * 0.3, 140);
        const host = $("#giftHearts");
        for (let i = 0; i < 12; i++) {
          setTimeout(() => {
            const h = symEl("st-heart", "rh", COLORS[rand(3)], 14 + Math.random() * 16);
            h.style.left = 20 + Math.random() * 60 + "%";
            h.style.setProperty("--dur", 2.4 + Math.random() * 1.2 + "s");
            h.style.setProperty("--sx", Math.random() * 60 - 30 + "px");
            host.appendChild(h);
            setTimeout(() => h.remove(), 3800);
          }, i * 140);
        }
      }
      setTimeout(() => openModal(letterModal), first ? 1100 : 0);
    }

    giftBtn.addEventListener("click", () => {
      if (unlocked) return openGift(false);
      giftLock.reset();
      activeLock = giftLock;
      openModal(lockModal);
    });
    $("#lockClose").addEventListener("click", () => { closeModal(lockModal); activeLock = null; });
    $("#glClose").addEventListener("click", () => closeModal(letterModal));
  }

  updateNav();
})();
