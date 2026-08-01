/* ===================================================================
   SOLARC — Shoe Store
   Vanilla JavaScript — no frameworks/libraries
   Handles: product rendering, category filter, cart state, mobile nav,
   sticky header, newsletter form
   ================================================================= */

(function () {
  'use strict';

  /* ---------------- Product Data ---------------- */
  const products = [
    { id: 'p1', name: 'Aero Runner', category: 'running', price: 129, desc: 'Lightweight mesh built for long-distance road miles.' },
    { id: 'p2', name: 'Trail Blazer X', category: 'running', price: 145, desc: 'Grip-heavy sole tuned for uneven, off-road terrain.' },
    { id: 'p3', name: 'Urban Slate', category: 'casual', price: 89,  desc: 'Everyday low-top with a soft, breathable canvas upper.' },
    { id: 'p4', name: 'Weekend Canvas', category: 'casual', price: 75,  desc: 'Relaxed fit for slow mornings and long walks.' },
    { id: 'p5', name: 'Court Flex Pro', category: 'sport', price: 110, desc: 'Responsive cushioning built for quick lateral moves.' },
    { id: 'p6', name: 'Momentum Sprint', category: 'sport', price: 135, desc: 'Explosive push-off support for interval training.' },
    { id: 'p7', name: 'Oxford Classic', category: 'formal', price: 150, desc: 'Hand-finished leather for the boardroom and beyond.' },
    { id: 'p8', name: 'Derby Heritage', category: 'formal', price: 160, desc: 'A timeless silhouette with a modern arc-support sole.' }
  ];

  /* ---------------- Cart State ---------------- */
  let cart = []; // { id, name, price, qty }

  /* ---------------- DOM References ---------------- */
  const productsGrid   = document.getElementById('productsGrid');
  const categoryTabs   = document.getElementById('categoryTabs');
  const cartBtn        = document.getElementById('cartBtn');
  const cartCount      = document.getElementById('cartCount');
  const cartDrawer     = document.getElementById('cartDrawer');
  const cartItemsEl    = document.getElementById('cartItems');
  const cartEmptyEl    = document.getElementById('cartEmpty');
  const cartTotalEl    = document.getElementById('cartTotal');
  const closeCartBtn   = document.getElementById('closeCart');
  const overlay        = document.getElementById('overlay');
  const menuToggle      = document.getElementById('menuToggle');
  const mainNav         = document.getElementById('mainNav');
  const siteHeader      = document.getElementById('siteHeader');
  const newsletterForm  = document.getElementById('newsletterForm');
  const formStatus      = document.getElementById('formStatus');
  const checkoutBtn     = document.getElementById('checkoutBtn');

  /* ---------------- Shoe Icon (reused per card, tinted by category) ---------------- */
  function shoeIcon(category) {
    return `
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <path class="icon-sole" d="M10 95 Q 20 75, 55 70 Q 95 64, 135 76 Q 170 85, 188 76 Q 192 90, 175 100 Q 100 112, 30 105 Q 12 102, 10 95 Z"/>
      <path class="icon-upper" d="M25 82 Q 35 48, 78 40 Q 118 33, 148 56 Q 162 68, 166 79 Q 125 66, 85 72 Q 50 77, 25 82 Z"/>
      <path class="icon-lace" d="M70 52 L 90 66 M 82 45 L 102 60 M 94 40 L 114 55" fill="none"/>
    </svg>`;
  }

  const categoryColor = {
    running: 'var(--mocha-dark)',
    casual: 'var(--ethereal-blue-dark)',
    sport: 'var(--mocha)',
    formal: 'var(--ink)'
  };

  /* ---------------- Render Products ---------------- */
  function renderProducts(filter) {
    const list = filter === 'all' ? products : products.filter(p => p.category === filter);

    if (list.length === 0) {
      productsGrid.innerHTML = `<p class="no-results">No shoes in this collection yet — check back soon.</p>`;
      return;
    }

    productsGrid.innerHTML = list.map(p => `
      <article class="product-card" data-id="${p.id}">
        <div class="product-media" style="color:${categoryColor[p.category]}">
          <span class="product-tag">${capitalize(p.category)}</span>
          ${shoeIcon(p.category)}
        </div>
        <div class="product-info">
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-footer">
            <span class="product-price">$${p.price}</span>
            <button class="add-cart-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">Add to Bag</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* ---------------- Category Filtering ---------------- */
  categoryTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;

    categoryTabs.querySelectorAll('.cat-tab').forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    renderProducts(tab.dataset.category);
  });

  /* ---------------- Add to Cart (event delegation) ---------------- */
  productsGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-cart-btn');
    if (!btn) return;

    const product = products.find(p => p.id === btn.dataset.id);
    if (!product) return;

    addToCart(product);

    btn.textContent = 'Added ✓';
    btn.classList.add('is-added');
    setTimeout(() => {
      btn.textContent = 'Add to Bag';
      btn.classList.remove('is-added');
    }, 1200);
  });

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    }
    updateCartUI();
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    cartCount.textContent = totalItems;
    cartBtn.setAttribute('aria-label', `Open cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`);
    cartTotalEl.textContent = `$${totalPrice}`;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '';
      cartEmptyEl.style.display = 'block';
    } else {
      cartEmptyEl.style.display = 'none';
      cartItemsEl.innerHTML = cart.map(item => `
        <li class="cart-item">
          <div class="cart-item-icon" style="color:var(--mocha-dark)">${shoeIcon()}</div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>Qty ${item.qty} &middot; $${item.price * item.qty}</p>
            <button class="cart-item-remove" data-id="${item.id}">Remove</button>
          </div>
        </li>
      `).join('');
    }
  }

  cartItemsEl.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.cart-item-remove');
    if (!removeBtn) return;
    removeFromCart(removeBtn.dataset.id);
  });

  /* ---------------- Cart Drawer Open/Close ---------------- */
  function openCart() {
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-active');
    closeCartBtn.focus();
  }
  function closeCart() {
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-active');
    if (!mainNav.classList.contains('is-open')) overlay.classList.remove('is-active');
  }

  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    alert('This is a demo store — checkout is not connected to a payment system yet. Thanks for trying SOLARC!');
  });

  /* ---------------- Mobile Menu Toggle ---------------- */
  function openMenu() {
    mainNav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    overlay.classList.add('is-active');
  }
  function closeMenu() {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('is-active');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  mainNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeMenu();
  });

  /* Overlay closes whichever panel is open */
  overlay.addEventListener('click', () => {
    closeMenu();
    closeCart();
  });

  /* Escape key closes drawers */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeCart();
    }
  });

  /* ---------------- Sticky Header Shadow ---------------- */
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  /* ---------------- Newsletter Form ---------------- */
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    if (!email) return;
    formStatus.textContent = `Thanks — we'll send new drops to ${email}.`;
    newsletterForm.reset();
  });

  /* ---------------- Init ---------------- */
  renderProducts('all');
  updateCartUI();

})();
