/* ============================================================
   ÓRBITA — shared product & category data
   Single source of truth used by every page (home, category,
   product, cart, checkout). Swap this file's contents for a
   fetch() to a real API/Shopify/WooCommerce endpoint later —
   every page already renders from these functions, not from
   hard-coded markup.
   ============================================================ */

const CATEGORIES = [
  {
    id: 'tech',
    name: 'Tech',
    tagline: 'Technology that connects',
    description: 'Accessories and gadgets tested for real everyday use.',
    accent: 'var(--tech)',
    banner: 'assets/categories/tech.jpg',
  },
  {
    id: 'home',
    name: 'Home',
    tagline: 'For your home and comfort',
    description: 'Objects that improve your home routine, without the excess.',
    accent: 'var(--home)',
    banner: 'assets/categories/home.jpg',
  },
  {
    id: 'car',
    name: 'Car',
    tagline: 'Everything for your car',
    description: 'Items that keep your car running better, for longer.',
    accent: 'var(--car)',
    banner: 'assets/categories/car.jpg',
  },
  {
    id: 'office',
    name: 'Office',
    tagline: 'Productivity, every day',
    description: 'Work tools built for heavy daily use.',
    accent: 'var(--office)',
    banner: 'assets/categories/office.jpg',
  },
  {
    id: 'travel',
    name: 'Travel',
    tagline: 'Travel with ease',
    description: 'Lightweight, durable gear designed for the road.',
    accent: 'var(--travel)',
    banner: 'assets/categories/travel.jpg',
  },
];

const PRODUCTS = [
  {
    id: 'ugreen-power-bank-100w',
    cat: 'tech',
    img: 'assets/ugreen.jpg',
    name: 'UGREEN 100W Fast Charging External Battery Power Bank 20000mAh',
    price: 62.98,
    description: "Keep your laptop, phone and tablet topped up on the go. This power bank delivers up to 100W of fast-charging output — enough to charge a laptop and a phone at the same time.",
    specs: [
      ['Capacity', '20,000mAh'],
      ['Max output', '100W'],
      ['Category', 'Tech'],
    ],
  },
  {
    id: 'baseus-earbuds-ep10',
    cat: 'tech',
    img: 'assets/baseus-earbuds.jpg',
    name: 'Baseus EP10 ANC Wireless Earbuds | Bluetooth 6.0 | Noise Cancelling',
    price: 39.99,
    description: 'Wireless earbuds with active noise cancellation and Bluetooth 6.0 for a stable, low-latency connection wherever you are.',
    specs: [
      ['Connectivity', 'Bluetooth 6.0'],
      ['Feature', 'Active Noise Cancelling (ANC)'],
      ['Category', 'Tech'],
    ],
  },
  {
    id: 'baseus-car-holder',
    cat: 'car',
    img: 'assets/baseus-car-holder.jpg',
    name: 'Baseus Magnetic Car Phone Holder | Universal Dashboard Mount',
    price: 19.99,
    description: 'A secure magnetic mount for your dashboard, keeping your phone in view and within easy reach while you drive.',
    specs: [
      ['Mount type', 'Magnetic'],
      ['Placement', 'Dashboard'],
      ['Category', 'Car'],
    ],
  },
  {
    id: 'baseus-usb-hub',
    cat: 'tech',
    img: 'assets/baseus-usb-hub.jpg',
    name: 'Baseus USB Hub 4 Port | High-Speed USB Adapter for Laptop & Tablet',
    price: 24.99,
    description: 'Expand a single USB port into four, so you can connect drives, keyboards and more to your laptop or tablet at once.',
    specs: [
      ['Ports', '4x USB'],
      ['Category', 'Tech'],
    ],
  },
  {
    id: 'lencent-travel-adapter',
    cat: 'travel',
    img: 'assets/lencent-adapter.jpg',
    name: 'LENCENT GaN Universal Travel Adapter 65W/100W Fast Charge',
    price: 45.99,
    description: 'One adapter for 200+ countries, with GaN fast-charging technology so you can travel with fewer cables.',
    specs: [
      ['Max output', '100W'],
      ['Compatibility', '200+ countries'],
      ['Category', 'Travel'],
    ],
  },
];

function formatGBP(v){
  return '£ ' + v.toLocaleString('en-GB', {minimumFractionDigits:2, maximumFractionDigits:2});
}

function getCategory(id){
  return CATEGORIES.find(c => c.id === id) || null;
}

function getProduct(id){
  return PRODUCTS.find(p => p.id === id) || null;
}

function getProductsByCategory(catId){
  return PRODUCTS.filter(p => p.cat === catId);
}

function getRelatedProducts(product, limit){
  limit = limit || 4;
  return PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, limit);
}

function searchProducts(query){
  const q = query.trim().toLowerCase();
  if(!q) return [];
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q)
  );
}
