/* ============================================================
   ÓRBITA — shared header, footer, toast & quick-view modal
   Injected into every page via #site-header / #site-footer
   placeholders so nav/footer markup lives in exactly one place.
   ============================================================ */

const HEADER_HTML = `
<div class="announce" id="announce">
  <span id="announce-text">Free shipping over £40 across the UK.</span>
  <button class="announce-close" id="announce-close" aria-label="Close">✕</button>
</div>
<header>
  <nav>
    <div class="nav-left">
      <button class="menu-btn" id="menu-btn" aria-label="Menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
      <a href="orbita.html" class="logo">ÓRBITA</a>
    </div>
    <div class="nav-links">
      <a href="orbita.html">Home</a>
      <a href="category.html?cat=tech">Tech</a>
      <a href="category.html?cat=home">Home</a>
      <a href="category.html?cat=car">Car</a>
      <a href="category.html?cat=office">Office</a>
      <a href="category.html?cat=travel">Travel</a>
    </div>
    <div class="nav-actions">
      <button class="icon-btn" id="search-btn" aria-label="Search" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      </button>
      <a href="wishlist.html" class="icon-btn" aria-label="Wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
        <span class="badge zero" id="wishlist-count">0</span>
      </a>
      <a href="cart.html" class="icon-btn" aria-label="Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <span class="badge zero" id="cart-count">0</span>
      </a>
      <a href="#" class="nav-cta">Sign in</a>
    </div>
  </nav>
  <div class="search-bar" id="search-bar">
    <div class="wrap search-bar-inner">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" id="search-input" placeholder="Search products…" autocomplete="off">
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <div class="wrap mobile-menu-inner">
      <a href="orbita.html">Home ›</a>
      <a href="category.html?cat=tech">Tech ›</a>
      <a href="category.html?cat=home">Home ›</a>
      <a href="category.html?cat=car">Car ›</a>
      <a href="category.html?cat=office">Office ›</a>
      <a href="category.html?cat=travel">Travel ›</a>
      <a href="wishlist.html">Wishlist ›</a>
      <a href="cart.html">Cart ›</a>
    </div>
  </div>
</header>
`;

const FOOTER_HTML = `
<footer>
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="logo" style="color:var(--text);">ÓRBITA</div>
        <p>One store, five worlds. Home, Tech, Car, Office and Travel — genuinely curated.</p>
        <div class="footer-social">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1Z"/></svg></a>
          <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 4a5 5 0 0 0 5 5"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Worlds</h5>
        <a href="category.html?cat=home">Home</a>
        <a href="category.html?cat=tech">Tech</a>
        <a href="category.html?cat=car">Car</a>
        <a href="category.html?cat=office">Office</a>
        <a href="category.html?cat=travel">Travel</a>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <a href="#">About</a>
        <a href="#">Curation criteria</a>
        <a href="#">Careers</a>
      </div>
      <div class="footer-col">
        <h5>Support</h5>
        <a href="#">Track order</a>
        <a href="#">Returns &amp; exchanges</a>
        <a href="#">Contact us</a>
      </div>
      <div class="footer-col">
        <h5>Legal</h5>
        <a href="#">Privacy</a>
        <a href="#">Terms of use</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 ÓRBITA. All rights reserved.</span>
      <span>Made for people who don't want five tabs open to buy five things.</span>
    </div>
  </div>
</footer>
`;

const SHARED_WIDGETS_HTML = `
<div class="toast" id="toast">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
  <span id="toast-text">Added to cart</span>
</div>

<div class="modal-overlay" id="quickview-overlay">
  <div class="modal-panel" id="quickview-panel">
    <button class="modal-close" id="quickview-close" aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
    <div class="modal-media"><img id="qv-img" src="" alt=""></div>
    <div class="modal-body">
      <span class="product-tag" id="qv-tag"></span>
      <h3 id="qv-name"></h3>
      <div class="product-stock"><span class="dot"></span>In stock</div>
      <div class="product-price" id="qv-price"></div>
      <span class="product-installments" id="qv-installments"></span>
      <p class="desc" id="qv-desc"></p>
      <div class="modal-actions">
        <button class="btn-primary" id="qv-add" type="button">Add to Cart</button>
        <button class="btn-secondary" id="qv-wishlist" type="button">Wishlist</button>
      </div>
      <a href="#" id="qv-view-full" class="modal-view-full">View full details ›</a>
    </div>
  </div>
</div>
`;

function renderLayout(){
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');
  if(headerSlot) headerSlot.innerHTML = HEADER_HTML;
  if(footerSlot) footerSlot.innerHTML = FOOTER_HTML;
  document.body.insertAdjacentHTML('beforeend', SHARED_WIDGETS_HTML);
}
renderLayout();
