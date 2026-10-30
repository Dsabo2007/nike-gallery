/* ═══════════════════════════════════════════════
   NIKE demo store — front-end only
   Vanilla JS: catalogue, filters, bag, wishlist.
   State persists in localStorage. No backend.
   ═══════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const money = n => '$' + n;

  const ALL_SIZES = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];
  const FREE_SHIPPING = 120;

  /* ───────────── Catalogue ───────────── */
  const PRODUCTS = [
    {
      id: 'af1-premium',
      name: 'Dunk High Premium',
      category: 'lifestyle',
      catLabel: 'Lifestyle',
      gender: 'Unisex',
      price: 130,
      img: 'assets/shoes/af1-premium.jpg',
      badge: 'New',
      colors: [
        { name: 'Sail / Black', hex: '#e8dfce' },
        { name: 'Black', hex: '#1c1c1e' },
        { name: 'Total Orange', hex: '#e2622a' }
      ],
      soldOut: ['6', '6.5', '13'],
      desc: 'A court classic in tumbled leather, with a gum sole and a stacked ankle collar. Built to be worn until the leather softens around you.',
      details: ['Tumbled leather upper', 'Gum rubber cupsole', 'Padded high-cut collar', 'Perforated toe box']
    },
    {
      id: 'af1-white',
      name: "Air Force 1 '07",
      category: 'lifestyle',
      catLabel: 'Lifestyle',
      gender: 'Men',
      price: 115,
      img: 'assets/shoes/af1-white.jpg',
      badge: null,
      colors: [
        { name: 'White / White', hex: '#f4f4f2' },
        { name: 'White / Court Blue', hex: '#6d8fc7' }
      ],
      soldOut: ['6', '12', '13'],
      desc: 'The one that started it all. Crisp leather, a clean toe box and Air cushioning that still feels like 1982.',
      details: ['Full-grain leather upper', 'Nike Air cushioning', 'Non-marking rubber outsole', 'Perforated toe box']
    },
    {
      id: 'airmax-90',
      name: 'Air Max 90',
      category: 'running',
      catLabel: 'Running',
      gender: 'Men',
      price: 140,
      img: 'assets/shoes/airmax-90.jpg',
      badge: null,
      colors: [
        { name: 'White / Total Orange', hex: '#e2622a' },
        { name: 'White / Grey', hex: '#e7e6e2' },
        { name: 'Black / Anthracite', hex: '#232323' }
      ],
      soldOut: ['13'],
      desc: "Visible Air in the heel, a waffle outsole and undeniable '90s DNA. Still the reference point for every retro runner since.",
      details: ['Layered mesh and leather upper', 'Visible Max Air heel unit', 'Waffle-pattern rubber outsole', 'Foam midsole']
    },
    {
      id: 'af1-shadow',
      name: 'Air Force 1 Shadow',
      category: 'lifestyle',
      catLabel: 'Lifestyle',
      gender: 'Women',
      price: 135,
      img: 'assets/shoes/af1-shadow.jpg',
      badge: 'Limited',
      colors: [
        { name: 'Pastel Pink', hex: '#f2c7d6' },
        { name: 'Sky Blue', hex: '#b8d5e8' },
        { name: 'Cream', hex: '#ece3cf' }
      ],
      soldOut: ['6', '6.5', '7', '11.5', '12'],
      desc: 'Layered panels and a doubled-up sole give the classic a stacked, playful look — built for people who never wear one colour.',
      details: ['Doubled Swoosh overlays', 'Lifted foam midsole', 'Leather and synthetic upper', 'Nike Air cushioning']
    },
    {
      id: 'zoom-freak',
      name: 'LeBron Witness 8',
      category: 'basketball',
      catLabel: 'Basketball',
      gender: 'Men',
      price: 140,
      img: 'assets/shoes/zoom-freak.jpg',
      badge: null,
      colors: [
        { name: 'Black / Team Red', hex: '#c8342a' },
        { name: 'Black / White', hex: '#1a1a1a' },
        { name: 'White / Red', hex: '#ece7e2' }
      ],
      soldOut: ['6', '6.5'],
      desc: 'Built for the first step. A locked-in midfoot band and Zoom Air under the forefoot keep you low, fast and explosive.',
      details: ['Zoom Air forefoot unit', 'Cushlon foam midsole', 'Midfoot containment band', 'Herringbone traction pattern']
    },
    {
      id: 'pegasus-volt',
      name: 'Pegasus 41',
      category: 'running',
      catLabel: 'Running',
      gender: 'Men',
      price: 150,
      img: 'assets/shoes/pegasus-volt.jpg',
      badge: 'New',
      colors: [
        { name: 'Volt / Black', hex: '#d8ff3e' },
        { name: 'White / Pure Platinum', hex: '#f0f0ee' },
        { name: 'Black / Anthracite', hex: '#191919' }
      ],
      soldOut: ['6', '11.5', '12', '13'],
      desc: "The workhorse of the running line. ReactX foam, a breathable engineered mesh and 41 years of getting quieter, smoother, faster.",
      details: ['ReactX foam midsole', 'Engineered mesh upper', 'Air Zoom unit in forefoot and heel', 'Waffle-inspired outsole']
    },
    {
      id: 'af1-luxe',
      name: 'Air Force 1 Luxe',
      category: 'lifestyle',
      catLabel: 'Lifestyle',
      gender: 'Unisex',
      price: 150,
      img: 'assets/shoes/af1-luxe.jpg',
      badge: null,
      colors: [
        { name: 'Flax / Wheat', hex: '#b98a55' },
        { name: 'Ale Brown', hex: '#6b4a2f' },
        { name: 'Black / Gum', hex: '#1b1b1b' }
      ],
      soldOut: ['6', '6.5', '7'],
      desc: 'Flax suede, tonal stitching and a winterised build for the months when the pavement bites back.',
      details: ['Flax suede upper', 'Winterised inner lining', 'Gum rubber outsole', 'Metal lace dubrae']
    },
    {
      id: 'af1-essential',
      name: "Air Force 1 '07 Essential",
      category: 'lifestyle',
      catLabel: 'Lifestyle',
      gender: 'Women',
      price: 110,
      img: 'assets/shoes/af1-essential.jpg',
      badge: null,
      colors: [
        { name: 'White / Black', hex: '#f2f2ef' },
        { name: 'Triple White', hex: '#fbfbf9' }
      ],
      soldOut: ['13'],
      desc: 'The everyday pair: soft leather, a low-cut collar and Nike Air that lasts from the first coffee to the last train.',
      details: ['Soft synthetic leather upper', 'Nike Air cushioning', 'Rubber outsole with pivot circle', 'Foam sockliner']
    }
  ];

  const byId = id => PRODUCTS.find(p => p.id === id);
  const defaultSize = p => ['9', '8.5', '9.5', '10', '8'].find(s => !p.soldOut.includes(s))
    || ALL_SIZES.find(s => !p.soldOut.includes(s));

  /* ───────────── Persisted state ───────────── */
  const store = {
    read(key, fallback) {
      try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; }
      catch { return fallback; }
    },
    write(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ }
    }
  };

  const BAG_KEY = 'nike.bag.v1';
  const WISH_KEY = 'nike.wish.v1';

  let bag = store.read(BAG_KEY, []).filter(i => i && byId(i.id) && ALL_SIZES.includes(i.size));
  let wish = new Set(store.read(WISH_KEY, []).filter(id => byId(id)));
  let filter = { key: 'all' };
  let query = '';

  /* ───────────── Elements ───────────── */
  const grid = $('#productGrid');
  const emptyState = $('#emptyState');
  const resultsCount = $('#resultsCount');
  const cartDrawer = $('#cartDrawer');
  const wishPanel = $('#wishPanel');
  const overlay = $('#overlay');
  const modal = $('#productModal');
  const cartBtn = $('#cartBtn');
  const wishBtn = $('#wishBtn');

  const bagTotal = () => bag.reduce((sum, i) => sum + byId(i.id).price * i.qty, 0);
  const bagCount = () => bag.reduce((sum, i) => sum + i.qty, 0);

  /* ───────────── Icons ───────────── */
  const ICON = {
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-9.4A4.4 4.4 0 0 1 12 8.2a4.4 4.4 0 0 1 7.5 2.9c0 4.8-7.5 9.4-7.5 9.4Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9.5 8V6.5a2.5 2.5 0 0 1 5 0V8"/></svg>'
  };

  /* ───────────── Catalogue rendering ───────────── */
  function matches(p) {
    if (query) {
      const hay = [p.name, p.catLabel, p.gender, ...p.colors.map(c => c.name)].join(' ').toLowerCase();
      if (!hay.includes(query)) return false;
    }
    switch (filter.key) {
      case 'running': case 'basketball': case 'lifestyle': return p.category === filter.key;
      case 'new': return p.badge === 'New' || p.badge === 'Limited';
      case 'men': return p.gender === 'Men' || p.gender === 'Unisex';
      case 'women': return p.gender === 'Women' || p.gender === 'Unisex';
      default: return true;
    }
  }

  function cardHTML(p) {
    const badge = p.badge
      ? `<span class="badge${p.badge === 'Limited' ? ' badge--limited' : ''}">${p.badge}</span>`
      : '';
    const saved = wish.has(p.id);
    return `
      <article class="product reveal" data-id="${p.id}">
        <div class="product-media">
          ${badge}
          <button class="heart${saved ? ' is-saved' : ''}" data-act="wish" data-id="${p.id}"
                  aria-label="${saved ? 'Remove' : 'Save'} ${p.name} ${saved ? 'from' : 'to'} wishlist"
                  aria-pressed="${saved}">${ICON.heart}</button>
          <img src="${p.img}" alt="${p.name} in ${p.colors[0].name}" width="900" height="1125" loading="lazy">
          <button class="quick-add" data-act="quick" data-id="${p.id}">${ICON.plus} Quick add</button>
        </div>
        <div class="product-body">
          <div class="product-top">
            <h3><button class="p-open" data-act="open" data-id="${p.id}">${p.name}</button></h3>
            <span class="price">${money(p.price)}</span>
          </div>
          <p class="product-cat">${p.catLabel} · ${p.gender === 'Unisex' ? "Unisex" : p.gender + "'s"}</p>
          <div class="swatches" aria-hidden="true">
            ${p.colors.map((c, i) => `<span class="swatch${i === 0 ? ' is-active' : ''}" style="background:${c.hex}" title="${c.name}"></span>`).join('')}
          </div>
        </div>
      </article>`;
  }

  function renderProducts() {
    const list = PRODUCTS.filter(matches);
    grid.innerHTML = list.map(cardHTML).join('');
    emptyState.hidden = list.length > 0;
    resultsCount.textContent = `${list.length} ${list.length === 1 ? 'style' : 'styles'}`;
    $$('.reveal', grid).forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i, 7) * 45}ms`;
      revealObserver.observe(el);
    });
  }

  /* ───────────── Wishlist ───────────── */
  function toggleWish(id) {
    const p = byId(id);
    if (wish.has(id)) {
      wish.delete(id);
      toast(`${p.name} removed from wishlist`);
    } else {
      wish.add(id);
      toast(`${p.name} saved`);
    }
    store.write(WISH_KEY, [...wish]);
    updateCounts();
    renderProducts();
    renderWishlist();
  }

  function wishItemHTML(p) {
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div>
          <h3>${p.name}</h3>
          <p class="ci-meta">${p.catLabel} · ${money(p.price)}</p>
          <div class="ci-bottom">
            <button class="link-ish" data-wish-add="${p.id}">Add to bag</button>
            <button class="ci-remove" data-wish-remove="${p.id}">Remove</button>
          </div>
        </div>
      </div>`;
  }

  function renderWishlist() {
    const items = [...wish].map(byId).filter(Boolean);
    $('#wishItems').innerHTML = items.length
      ? items.map(wishItemHTML).join('')
      : `<div class="wish-empty">Nothing saved yet. Tap the heart on any pair to keep it here.</div>`;
    $('#wishQtyLabel').textContent = items.length ? `(${items.length})` : '';
  }

  /* ───────────── Bag ───────────── */
  function addToBag(id, size, qty = 1) {
    const p = byId(id);
    if (!p || !size || p.soldOut.includes(size)) return false;
    const line = bag.find(i => i.id === id && i.size === size);
    if (line) line.qty = Math.min(line.qty + qty, 9);
    else bag.push({ id, size, qty });
    store.write(BAG_KEY, bag);
    updateCounts();
    renderBag();
    bump(cartBtn);
    return true;
  }

  function itemHTML(line) {
    const p = byId(line.id);
    return `
      <div class="cart-item" data-line="${p.id}|${line.size}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div>
          <h3>${p.name}</h3>
          <p class="ci-meta">US ${line.size} · ${p.colors[0].name}</p>
          <div class="ci-bottom">
            <div class="ci-qty">
              <button data-act="dec" aria-label="Decrease quantity of ${p.name}">−</button>
              <span>${line.qty}</span>
              <button data-act="inc" aria-label="Increase quantity of ${p.name}">+</button>
            </div>
            <button class="ci-remove" data-act="remove">Remove</button>
          </div>
          <p class="ci-price">${money(p.price * line.qty)}</p>
        </div>
      </div>`;
  }

  function renderBag() {
    const items = bag.map(byId).filter(Boolean);
    $('#cartItems').innerHTML = items.length
      ? bag.map(itemHTML).join('')
      : `<div class="cart-empty">${ICON.bag}<p>Your bag is empty.<br>Let’s fix that.</p>
         <button class="btn btn-primary" data-act="shop">Shop best sellers</button></div>`;

    const total = bagTotal();
    $('#cartSubtotal').textContent = money(total);
    $('#cartShipping').textContent = total >= FREE_SHIPPING ? 'Free' : 'Calculated at checkout';
    $('#cartQtyLabel').textContent = items.length ? `(${bagCount()})` : '';

    const left = Math.max(FREE_SHIPPING - total, 0);
    $('#shipMsg').innerHTML = items.length === 0
      ? `Free shipping on orders over ${money(FREE_SHIPPING)}.`
      : left > 0
        ? `You’re <strong>${money(left)}</strong> away from free shipping.`
        : `<strong>Free shipping unlocked.</strong> Nice one.`;
    $('#shipFill').style.width = `${Math.min((total / FREE_SHIPPING) * 100, 100)}%`;
  }

  function updateCounts() {
    $('#cartCount').textContent = bagCount();
    $('#cartCount').hidden = bagCount() === 0;
    $('#wishCount').textContent = wish.size;
    $('#wishCount').hidden = wish.size === 0;
  }

  function bump(btn) {
    const c = $('.count', btn);
    if (!c) return;
    c.classList.remove('is-bump');
    void c.offsetWidth;
    c.classList.add('is-bump');
  }

  /* ───────────── Panels ───────────── */
  let lastFocus = null;

  function anyOpen() {
    return !modal.hidden || cartDrawer.classList.contains('is-open') || wishPanel.classList.contains('is-open');
  }

  let overlayTimer;

  function syncOverlay() {
    const open = anyOpen();
    document.body.classList.toggle('is-locked', open);
    clearTimeout(overlayTimer);
    if (open) {
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add('is-open'));
    } else {
      overlay.classList.remove('is-open');
      overlayTimer = setTimeout(() => { overlay.hidden = true; }, 420);
    }
  }

  function openPanel(panel) {
    lastFocus = document.activeElement;
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('is-open');
    syncOverlay();
    const focusable = panel.querySelector('button, a, input');
    if (focusable) setTimeout(() => focusable.focus({ preventScroll: true }), 120);
    if (panel === cartDrawer) cartBtn.setAttribute('aria-expanded', 'true');
    if (panel === wishPanel) wishBtn.setAttribute('aria-expanded', 'true');
  }

  function closePanel(panel) {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    if (panel === cartDrawer) cartBtn.setAttribute('aria-expanded', 'false');
    if (panel === wishPanel) wishBtn.setAttribute('aria-expanded', 'false');
    syncOverlay();
    if (lastFocus && !anyOpen() && modal.hidden) lastFocus.focus({ preventScroll: true });
  }

  function closeAll() {
    if (!modal.hidden) closeModal();
    if (cartDrawer.classList.contains('is-open')) closePanel(cartDrawer);
    if (wishPanel.classList.contains('is-open')) closePanel(wishPanel);
    syncOverlay();
  }

  /* ───────────── Product modal ───────────── */
  let current = null;

  const VIEWS = [
    { pos: '50% 50%', scale: 1, label: 'Full view' },
    { pos: '26% 54%', scale: 1.75, label: 'Detail: heel' },
    { pos: '76% 62%', scale: 1.75, label: 'Detail: toe' }
  ];

  function openModal(id) {
    const p = byId(id);
    if (!p) return;
    current = { id, size: null, qty: 1, color: 0, view: 0 };
    lastFocus = document.activeElement;

    $('#pmImg').src = p.img;
    $('#pmImg').alt = `${p.name} in ${p.colors[0].name}`;
    $('#pmImg').style.objectPosition = VIEWS[0].pos;
    $('#pmCat').textContent = `${p.catLabel} · ${p.gender === 'Unisex' ? 'Unisex' : p.gender + "'s"}`;
    $('#pmTitle').textContent = p.name;
    $('#pmPrice').textContent = money(p.price);
    $('#pmDesc').textContent = p.desc;
    $('#pmQty').textContent = '1';
    $('#sizeError').hidden = true;

    $('#pmThumbs').innerHTML = VIEWS.map((v, i) => `
      <button class="${i === 0 ? 'is-active' : ''}" data-view="${i}" aria-label="${v.label} view" aria-pressed="${i === 0}">
        <img src="${p.img}" alt="" style="object-position:${v.pos};transform:scale(${v.scale})">
      </button>`).join('');

    $('#pmColors').innerHTML = p.colors.map((c, i) => `
      <button class="swatch${i === 0 ? ' is-active' : ''}" data-color="${i}"
              style="background:${c.hex}" aria-label="Colour ${c.name}" aria-pressed="${i === 0}"></button>`).join('');
    $('#pmColorName').textContent = p.colors[0].name;

    $('#pmSizes').innerHTML = ALL_SIZES.map(s => {
      const out = p.soldOut.includes(s);
      return `<button data-size="${s}" ${out ? 'disabled aria-label="Size US ' + s + ' sold out"' : ''}>${s}</button>`;
    }).join('');

    $('#pmAcc').innerHTML = `
      <div class="acc-item">
        <button class="acc-btn" aria-expanded="false" data-acc>Product details <span class="acc-sign">+</span></button>
        <div class="acc-panel" hidden><ul>${p.details.map(d => `<li>${d}</li>`).join('')}</ul></div>
      </div>
      <div class="acc-item">
        <button class="acc-btn" aria-expanded="false" data-acc>Shipping &amp; returns <span class="acc-sign">+</span></button>
        <div class="acc-panel" hidden>Free standard shipping on orders over ${money(FREE_SHIPPING)}. Returns are free within 30 days, unworn and in the original box.</div>
      </div>`;

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    syncOverlay();
    requestAnimationFrame(() => modal.classList.add('is-open'));
    setTimeout(() => $('.modal-close').focus({ preventScroll: true }), 120);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => { modal.hidden = true; syncOverlay(); }, 240);
    if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    current = null;
  }

  $('#pmThumbs').addEventListener('click', e => {
    const btn = e.target.closest('[data-view]');
    if (!btn) return;
    const i = +btn.dataset.view;
    $$('#pmThumbs button').forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on);
    });
    const img = $('#pmImg');
    img.style.objectPosition = VIEWS[i].pos;
    img.style.transform = VIEWS[i].scale === 1 ? 'none' : `scale(${VIEWS[i].scale})`;
  });

  $('#pmColors').addEventListener('click', e => {
    const btn = e.target.closest('[data-color]');
    if (!btn || !current) return;
    const i = +btn.dataset.color;
    current.color = i;
    $$('#pmColors .swatch').forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on);
    });
    const p = byId(current.id);
    $('#pmColorName').textContent = p.colors[i].name;
    $('#pmImg').alt = `${p.name} in ${p.colors[i].name}`;
  });

  $('#pmSizes').addEventListener('click', e => {
    const btn = e.target.closest('[data-size]');
    if (!btn || btn.disabled || !current) return;
    current.size = btn.dataset.size;
    $$('#pmSizes button').forEach(b => b.classList.toggle('is-active', b === btn));
    $('#sizeError').hidden = true;
  });

  $('.pm-buy .qty').addEventListener('click', e => {
    const btn = e.target.closest('[data-qty]');
    if (!btn || !current) return;
    current.qty = Math.min(Math.max(current.qty + Number(btn.dataset.qty), 1), 9);
    $('#pmQty').textContent = current.qty;
  });

  $('#pmAdd').addEventListener('click', () => {
    if (!current) return;
    const p = byId(current.id);
    if (!current.size) {
      $('#sizeError').hidden = false;
      $('#pmSizes button:not([disabled])')?.focus();
      return;
    }
    addToBag(p.id, current.size, current.qty);
    toast(`${p.name} · US ${current.size} added to bag`);
    closeModal();
    setTimeout(() => openPanel(cartDrawer), 280);
  });

  $('#pmAcc').addEventListener('click', e => {
    const btn = e.target.closest('[data-acc]');
    if (!btn) return;
    const panel = btn.nextElementSibling;
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    panel.hidden = open;
  });

  $('#sizeGuide').addEventListener('click', () => toast('US 7 = EU 40 · US 9 = EU 42.5 · US 11 = EU 45'));

  /* ───────────── Grid interactions ───────────── */
  grid.addEventListener('click', e => {
    const action = e.target.closest('[data-act]');
    const card = e.target.closest('.product');
    if (!card) return;

    if (action?.dataset.act === 'wish') {
      e.preventDefault();
      toggleWish(action.dataset.id);
      return;
    }
    if (action?.dataset.act === 'quick') {
      const p = byId(action.dataset.id);
      const size = defaultSize(p);
      addToBag(p.id, size);
      toast(`Added to bag · US ${size}`);
      return;
    }
    openModal(card.dataset.id);
  });

  /* ───────────── Filters ───────────── */
  const filterMap = {
    all: { key: 'all' }, running: { key: 'running' }, basketball: { key: 'basketball' },
    lifestyle: { key: 'lifestyle' }, new: { key: 'new' }, men: { key: 'men' }, women: { key: 'women' }
  };

  function setFilter(key) {
    filter = filterMap[key] || filterMap.all;
    const chip = $(`.chip[data-filter="${filter.key}"]`);
    $$('.chip').forEach(c => {
      const on = c === chip;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-selected', String(on));
    });
    renderProducts();
  }

  $$('.chip').forEach(chip => chip.addEventListener('click', () => {
    query = '';
    $('#searchInput').value = '';
    setFilter(chip.dataset.filter);
  }));

  $$('[data-filter-link]').forEach(link => link.addEventListener('click', () => {
    query = '';
    $('#searchInput').value = '';
    setFilter(link.dataset.filterLink);
    closeMobileNav();
  }));

  $('#resetAll').addEventListener('click', () => {
    query = '';
    $('#searchInput').value = '';
    setFilter('all');
  });

  /* ───────────── Search ───────────── */
  const searchBar = $('#searchBar');
  const searchInput = $('#searchInput');

  function openSearch() {
    searchBar.hidden = false;
    $('#searchToggle').setAttribute('aria-expanded', 'true');
    setTimeout(() => searchInput.focus(), 40);
  }
  function closeSearch() {
    searchBar.hidden = true;
    $('#searchToggle').setAttribute('aria-expanded', 'false');
  }

  $('#searchToggle').addEventListener('click', () => {
    searchBar.hidden ? openSearch() : closeSearch();
  });
  $('#searchClose').addEventListener('click', closeSearch);

  searchInput.addEventListener('input', () => {
    const hadQuery = query.length > 0;
    query = searchInput.value.trim().toLowerCase();
    if (query) {
      filter = { key: 'all' };
      $$('.chip').forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
    }
    renderProducts();
    if (query && !hadQuery) document.getElementById('collection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $$('[data-suggest]').forEach(b => b.addEventListener('click', () => {
    searchInput.value = b.dataset.suggest;
    query = '';
    searchInput.dispatchEvent(new Event('input'));
  }));

  /* ───────────── Cart & wishlist events ───────────── */
  $('#cartItems').addEventListener('click', e => {
    const shop = e.target.closest('[data-act="shop"]');
    if (shop) { closePanel(cartDrawer); document.getElementById('collection').scrollIntoView({ behavior: 'smooth' }); return; }

    const row = e.target.closest('[data-line]');
    if (!row) return;
    const [id, size] = row.dataset.line.split('|');
    const line = bag.find(i => i.id === id && i.size === size);
    if (!line) return;

    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'inc') line.qty = Math.min(line.qty + 1, 9);
    else if (act === 'dec') line.qty -= 1;
    else if (act === 'remove') line.qty = 0;
    else return;

    bag = bag.filter(i => i.qty > 0);
    store.write(BAG_KEY, bag);
    updateCounts();
    renderBag();
  });

  $('#wishItems').addEventListener('click', e => {
    const add = e.target.closest('[data-wish-add]');
    if (add) {
      const p = byId(add.dataset.wishAdd);
      const size = defaultSize(p);
      addToBag(p.id, size);
      toast(`${p.name} · US ${size} added to bag`);
      return;
    }
    const rm = e.target.closest('[data-wish-remove]');
    if (rm) toggleWish(rm.dataset.wishRemove);
  });

  $('#checkoutBtn').addEventListener('click', () => {
    if (!bag.length) { toast('Your bag is empty — add a pair first'); return; }
    toast('Demo store · checkout is not connected');
  });

  cartBtn.addEventListener('click', () => {
    if (cartDrawer.classList.contains('is-open')) closePanel(cartDrawer);
    else { if (!modal.hidden) closeModal(); openPanel(cartDrawer); }
  });
  wishBtn.addEventListener('click', () => {
    if (wishPanel.classList.contains('is-open')) closePanel(wishPanel);
    else { if (!modal.hidden) closeModal(); openPanel(wishPanel); }
  });

  $$('[data-close]').forEach(btn => btn.addEventListener('click', () => {
    const kind = btn.dataset.close;
    if (kind === 'cart') closePanel(cartDrawer);
    else if (kind === 'wish') closePanel(wishPanel);
    else if (kind === 'modal') closeModal();
  }));

  overlay.addEventListener('click', closeAll);

  /* ───────────── Mobile nav ───────────── */
  const menuBtn = $('#menuBtn');
  const mobileNav = $('#mobileNav');

  function closeMobileNav() {
    mobileNav.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.hidden;
    mobileNav.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  /* ───────────── Keyboard ───────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!modal.hidden) closeModal();
      else if (cartDrawer.classList.contains('is-open')) closePanel(cartDrawer);
      else if (wishPanel.classList.contains('is-open')) closePanel(wishPanel);
      else if (!searchBar.hidden) closeSearch();
      else if (!mobileNav.hidden) closeMobileNav();
    }
    if (e.key === 'Tab' && !modal.hidden) {
      const f = $$('button:not([disabled]), a[href], input', modal).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ───────────── Newsletter ───────────── */
  $('#newsForm').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#email');
    const msg = $('#newsMsg');
    const value = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);
    msg.className = 'news-msg ' + (valid ? 'is-ok' : 'is-error');
    if (!valid) {
      msg.textContent = 'Please enter a valid email address.';
      input.focus();
      return;
    }
    msg.textContent = 'You’re on the list. Watch your inbox for the next drop.';
    input.value = '';
  });

  /* ───────────── Toasts ───────────── */
  function toast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${ICON.check}<span>${message}</span>`;
    $('#toasts').appendChild(el);
    setTimeout(() => {
      el.classList.add('is-out');
      setTimeout(() => el.remove(), 320);
    }, 2800);
  }

  /* ───────────── Scroll & reveal ───────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  const header = $('#header');
  addEventListener('scroll', () => {
    header.classList.toggle('is-stuck', scrollY > 6);
  }, { passive: true });

  function countUp(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const dur = 1100;
    function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      if (e.target.dataset.count) countUp(e.target);
      statObserver.unobserve(e.target);
    });
  }, { threshold: 0.6 });

  /* ───────────── Init ───────────── */
  renderProducts();
  renderBag();
  renderWishlist();
  updateCounts();
  $('#year').textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    $$('.reveal').forEach(el => revealObserver.observe(el));
    $$('[data-count]').forEach(el => statObserver.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-in'));
  }

  $('#toTop').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  addEventListener('resize', () => {
    if (innerWidth > 940 && !mobileNav.hidden) closeMobileNav();
  });
})();
