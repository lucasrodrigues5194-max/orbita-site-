/* ============================================================
   ÓRBITA — cart, wishlist, search, quick view, nav wiring
   Shared across every page. State lives in localStorage so it
   survives navigation between pages (this is what a real
   Shopify/WooCommerce/REST backend would replace later — every
   call below is isolated behind these functions for that reason).
   ============================================================ */

const CART_KEY = 'orbita_cart';
const WISHLIST_KEY = 'orbita_wishlist';
const COUPONS = { ORBITA10: 0.10 };
const FREE_SHIPPING_THRESHOLD = 40;
const SHIPPING_FLAT = 4.99;

/* ---------------- CART ---------------- */
function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e){ return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateNavBadges();
}
function addToCart(id, qty){
  qty = qty || 1;
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if(line) line.qty += qty;
  else cart.push({id, qty});
  saveCart(cart);
}
function setCartQty(id, qty){
  let cart = getCart();
  if(qty <= 0){
    cart = cart.filter(l => l.id !== id);
  } else {
    const line = cart.find(l => l.id === id);
    if(line) line.qty = qty;
  }
  saveCart(cart);
}
function removeFromCart(id){
  saveCart(getCart().filter(l => l.id !== id));
}
function clearCart(){
  saveCart([]);
}
function getCartLines(){
  return getCart().map(l => {
    const product = getProduct(l.id);
    return product ? {product, qty: l.qty} : null;
  }).filter(Boolean);
}
function getCartCount(){
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}
function getCartSubtotal(){
  return getCartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
}

/* ---------------- WISHLIST ---------------- */
function getWishlist(){
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch(e){ return []; }
}
function saveWishlist(list){
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  updateNavBadges();
}
function isWishlisted(id){
  return getWishlist().includes(id);
}
function toggleWishlist(id){
  let list = getWishlist();
  let added;
  if(list.includes(id)){
    list = list.filter(x => x !== id);
    added = false;
  } else {
    list.push(id);
    added = true;
  }
  saveWishlist(list);
  return added;
}

/* ---------------- NAV BADGES ---------------- */
function updateNavBadges(){
  const cartEl = document.getElementById('cart-count');
  const wishEl = document.getElementById('wishlist-count');
  const cartN = getCartCount();
  const wishN = getWishlist().length;
  if(cartEl){
    cartEl.textContent = cartN;
    cartEl.classList.toggle('zero', cartN === 0);
  }
  if(wishEl){
    wishEl.textContent = wishN;
    wishEl.classList.toggle('zero', wishN === 0);
  }
}

/* ---------------- TOAST ---------------- */
let toastTimer = null;
function showToast(message){
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if(!toast || !toastText) return;
  toastText.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('show'), 2600);
}

/* ---------------- PRODUCT CARD (shared markup builder) ---------------- */
function productCardHTML(p){
  const installments = (p.price/3).toLocaleString('en-GB', {minimumFractionDigits:2, maximumFractionDigits:2});
  const favActive = isWishlisted(p.id) ? 'active' : '';
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-media">
        <button class="product-fav ${favActive}" type="button" data-id="${p.id}" aria-label="Save to wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
        </button>
        <a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
        <button class="product-quickview" type="button" data-id="${p.id}">Quick View</button>
      </div>
      <div class="product-body">
        <span class="product-tag" style="color:var(--${p.cat})">${getCategory(p.cat) ? getCategory(p.cat).name : p.cat}</span>
        <h4><a href="product.html?id=${p.id}">${p.name}</a></h4>
        <div class="product-stock"><span class="dot"></span>In stock</div>
        <div class="product-price">${formatGBP(p.price)}</div>
        <span class="product-installments">or 3x £ ${installments}</span>
        <div class="product-links">
          <a href="product.html?id=${p.id}">Learn more ›</a>
          <button class="btn-add" data-id="${p.id}" data-name="${p.name}" type="button">Add to cart ›</button>
        </div>
      </div>
    </div>`;
}

function renderProductGrid(container, list){
  if(!container) return;
  if(list.length === 0){
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></svg>
        <h3>No products here yet</h3>
        <p>We're still curating this category — check back soon for new arrivals.</p>
        <a href="orbita.html" class="btn-secondary">Back to home</a>
      </div>`;
    return;
  }
  container.innerHTML = list.map(productCardHTML).join('');
}

/* ---------------- DELEGATED CLICKS: add-to-cart / wishlist / quick view ---------------- */
document.addEventListener('click', (e)=>{
  const favBtn = e.target.closest('.product-fav, .wishlist-toggle');
  if(favBtn && favBtn.dataset.id){
    e.preventDefault();
    const added = toggleWishlist(favBtn.dataset.id);
    document.querySelectorAll(`[data-id="${favBtn.dataset.id}"].product-fav, [data-id="${favBtn.dataset.id}"].wishlist-toggle`)
      .forEach(el => el.classList.toggle('active', added));
    showToast(added ? 'Saved to wishlist' : 'Removed from wishlist');
    return;
  }

  const addBtn = e.target.closest('.btn-add');
  if(addBtn && addBtn.dataset.id){
    e.preventDefault();
    addToCart(addBtn.dataset.id, 1);
    showToast(`${addBtn.dataset.name || 'Item'} added to cart`);
    const cartBadge = document.getElementById('cart-count');
    if(cartBadge){ cartBadge.classList.remove('bump'); void cartBadge.offsetWidth; cartBadge.classList.add('bump'); }
    const original = addBtn.innerHTML;
    addBtn.classList.add('added');
    addBtn.textContent = 'Added ✓';
    setTimeout(()=>{ addBtn.classList.remove('added'); addBtn.innerHTML = original; }, 1400);
    return;
  }

  const qvBtn = e.target.closest('.product-quickview');
  if(qvBtn && qvBtn.dataset.id){
    e.preventDefault();
    openQuickView(qvBtn.dataset.id);
    return;
  }
});

/* ---------------- QUICK VIEW MODAL ---------------- */
function openQuickView(id){
  const p = getProduct(id);
  if(!p) return;
  const overlay = document.getElementById('quickview-overlay');
  if(!overlay) return;
  document.getElementById('qv-img').src = p.img;
  document.getElementById('qv-img').alt = p.name;
  document.getElementById('qv-tag').textContent = getCategory(p.cat) ? getCategory(p.cat).name : p.cat;
  document.getElementById('qv-tag').style.color = `var(--${p.cat})`;
  document.getElementById('qv-name').textContent = p.name;
  document.getElementById('qv-price').textContent = formatGBP(p.price);
  document.getElementById('qv-installments').textContent = `or 3x £ ${(p.price/3).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  document.getElementById('qv-desc').textContent = p.description;
  document.getElementById('qv-view-full').href = `product.html?id=${p.id}`;
  const addBtn = document.getElementById('qv-add');
  addBtn.onclick = ()=>{ addToCart(p.id, 1); showToast(`${p.name} added to cart`); };
  const wishBtn = document.getElementById('qv-wishlist');
  function refreshWishBtn(){ wishBtn.textContent = isWishlisted(p.id) ? 'In Wishlist ✓' : 'Wishlist'; }
  refreshWishBtn();
  wishBtn.onclick = ()=>{ toggleWishlist(p.id); refreshWishBtn(); };
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeQuickView(){
  const overlay = document.getElementById('quickview-overlay');
  if(!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------------- INIT (nav, menu, search, announce, reveal) ---------------- */
function initStoreUI(){
  updateNavBadges();

  const announceClose = document.getElementById('announce-close');
  if(announceClose){
    announceClose.addEventListener('click', ()=> document.getElementById('announce').classList.add('hidden'));
  }

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', ()=>{
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  const searchBtn = document.getElementById('search-btn');
  const searchBar = document.getElementById('search-bar');
  const searchInput = document.getElementById('search-input');
  if(searchBtn && searchBar){
    searchBtn.addEventListener('click', ()=>{
      const open = searchBar.classList.toggle('open');
      searchBtn.setAttribute('aria-expanded', open);
      if(open) setTimeout(()=> searchInput.focus(), 150);
    });
  }
  if(searchInput){
    searchInput.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' && searchInput.value.trim()){
        window.location.href = `category.html?search=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }

  const qvClose = document.getElementById('quickview-close');
  const qvOverlay = document.getElementById('quickview-overlay');
  if(qvClose) qvClose.addEventListener('click', closeQuickView);
  if(qvOverlay) qvOverlay.addEventListener('click', (e)=>{ if(e.target === qvOverlay) closeQuickView(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeQuickView(); });

  const cartIconBtn = document.querySelector('.icon-btn[href="cart.html"]');
  // (cart icon is a normal link now, no click hijack needed)

  initRevealObserver();
}

function initRevealObserver(){
  const revealEls = document.querySelectorAll('.reveal');
  if(!revealEls.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el=> io.observe(el));
}

/* run once layout.js has injected the header/footer into the DOM */
document.addEventListener('DOMContentLoaded', initStoreUI);
