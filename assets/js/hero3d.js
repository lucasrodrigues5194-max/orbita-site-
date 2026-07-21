/* ============================================================
   ÓRBITA — hero 3D scene (home page only)
   Rotating Earth-at-night planet + orbiting category icons.
   Kept out of the shared bundle so category/product/cart/checkout
   pages don't pay for WebGL + a texture load they never use.
   ============================================================ */

function makeIconMat(color){
  return new THREE.MeshStandardMaterial({color, roughness:0.32, metalness:0.4});
}

function buildTechIcon(color){ // headphones
  const mat = makeIconMat(color);
  const g = new THREE.Group();
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.045, 14, 32, Math.PI), mat);
  band.rotation.z = Math.PI;
  g.add(band);
  const cupGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.11, 18);
  const cupL = new THREE.Mesh(cupGeo, mat); cupL.position.set(-0.4, -0.02, 0); cupL.rotation.z = Math.PI/2; g.add(cupL);
  const cupR = cupL.clone(); cupR.position.x = 0.4; g.add(cupR);
  return g;
}

function buildHomeIcon(color){ // little house
  const mat = makeIconMat(color);
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.4, 0.5), mat);
  base.position.y = -0.08;
  g.add(base);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(0.46, 0.36, 4), mat);
  roof.rotation.y = Math.PI/4;
  roof.position.y = 0.28;
  g.add(roof);
  return g;
}

function buildCarIcon(color){ // car silhouette
  const mat = makeIconMat(color);
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.26, 0.4), mat);
  g.add(body);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.22, 0.36), mat);
  cabin.position.y = 0.22;
  g.add(cabin);
  const wheelGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.44, 14);
  [-0.28, 0.28].forEach(x=>{
    const w = new THREE.Mesh(wheelGeo, mat);
    w.rotation.x = Math.PI/2;
    w.position.set(x, -0.16, 0);
    g.add(w);
  });
  return g;
}

function buildOfficeIcon(color){ // briefcase
  const mat = makeIconMat(color);
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.42, 0.16), mat);
  g.add(body);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.028, 10, 20, Math.PI), mat);
  handle.position.y = 0.24;
  handle.rotation.z = Math.PI;
  g.add(handle);
  return g;
}

function buildTravelIcon(color){ // suitcase
  const mat = makeIconMat(color);
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.62, 0.26), mat);
  g.add(body);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.024, 10, 20, Math.PI), mat);
  handle.position.y = 0.4;
  handle.rotation.z = Math.PI;
  g.add(handle);
  return g;
}

(function(){
  const canvas = document.getElementById('hero-canvas');
  if(!canvas) return;
  const stage = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setClearColor(0x000000, 0);
  if('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

  const group = new THREE.Group();
  group.rotation.x = 0.08;
  scene.add(group);

  const isSmallScreen = window.matchMedia('(max-width:760px)').matches;

  function resize(){
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.5 : 2));
    const aspect = w / h;
    camera.aspect = aspect;
    if(aspect < 0.95){
      group.position.x = 0;
      group.position.y = -1.6;
      camera.position.set(0, 0.6, Math.max(20, 8 / aspect));
    } else {
      group.position.y = 0;
      group.position.x = Math.min(3.1, aspect * 1.9);
      camera.position.set(0, 0.3, 9.5);
    }
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  scene.add(new THREE.AmbientLight(0xbfe0ff, 0.5));
  const key = new THREE.DirectionalLight(0xdff0ff, 2.1);
  key.position.set(-6, 3, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fc6ff, 1.6);
  rim.position.set(5, -2, -3);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0x4f8bf7, 0.4);
  fill.position.set(2, -4, 5);
  scene.add(fill);

  const planetSegments = isSmallScreen ? 48 : 96;
  const planetGeo = new THREE.SphereGeometry(2.1, planetSegments, planetSegments);

  const texLoader = new THREE.TextureLoader();
  const earthTex = texLoader.load('assets/textures/earth_lights.jpg');
  if('encoding' in earthTex) earthTex.encoding = THREE.sRGBEncoding;
  earthTex.anisotropy = isSmallScreen ? 1 : 4;

  const planet = new THREE.Mesh(
    planetGeo,
    new THREE.MeshStandardMaterial({
      map: earthTex,
      emissiveMap: earthTex,
      emissive: 0xffffff,
      emissiveIntensity: 0.85,
      roughness: 0.85,
      metalness: 0.1,
    })
  );
  group.add(planet);

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(2.28, 32, 32),
    new THREE.MeshBasicMaterial({color:0x5bc4ff, transparent:true, opacity:0.24, side:THREE.BackSide})
  );
  group.add(glow);
  const glowOuter = new THREE.Mesh(
    new THREE.SphereGeometry(2.6, 32, 32),
    new THREE.MeshBasicMaterial({color:0x4f8bf7, transparent:true, opacity:0.1, side:THREE.BackSide})
  );
  group.add(glowOuter);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.6, 0.016, 16, 160),
    new THREE.MeshStandardMaterial({color:0xbfe4ff, emissive:0x6fc6ff, emissiveIntensity:1.2, roughness:0.4, transparent:true, opacity:0.85})
  );
  ring.rotation.x = Math.PI / 2.4;
  ring.rotation.z = 0.15;
  group.add(ring);

  const starCount = isSmallScreen ? 180 : 420;
  const starPositions = new Float32Array(starCount * 3);
  for(let i = 0; i < starCount; i++){
    starPositions[i*3]   = (Math.random()-0.5) * 32;
    starPositions[i*3+1] = (Math.random()-0.5) * 20;
    starPositions[i*3+2] = (Math.random()-0.5) * 18 - 4;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color:0xffffff, size:0.04, transparent:true, opacity:0.55}));
  scene.add(stars);

  const iconDefs = [
    {build:buildTechIcon,    color:0x1f8880},
    {build:buildHomeIcon,    color:0x9c6b17},
    {build:buildCarIcon,     color:0xc1443b},
    {build:buildOfficeIcon,  color:0x5f52c9},
    {build:buildTravelIcon,  color:0x2f7a52},
  ];
  const cards = [];
  iconDefs.forEach((def, i)=>{
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(0.3, 24),
      new THREE.MeshBasicMaterial({color:def.color, transparent:true, opacity:0.16})
    );
    const icon = def.build(def.color);
    icon.scale.setScalar(0.6);
    const pivot = new THREE.Group();
    pivot.add(glow);
    pivot.add(icon);
    const angle = (i / iconDefs.length) * Math.PI * 2;
    pivot.userData = {
      angle, radius:2.6, speed:0.1 + i*0.014,
      spinX: 0.004 + Math.random()*0.007,
      spinY: 0.007 + Math.random()*0.01,
    };
    icon.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
    group.add(pivot);
    cards.push(pivot);
  });

  let mouseX = 0, mouseY = 0;
  stage.addEventListener('mousemove', (e)=>{
    const r = stage.getBoundingClientRect();
    mouseX = ((e.clientX - r.left) / r.width - 0.5);
    mouseY = ((e.clientY - r.top) / r.height - 0.5);
  });

  const clock = new THREE.Clock();
  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    planet.rotation.y += 0.0016;
    ring.rotation.z += 0.0009;
    group.rotation.y += (mouseX*0.3 - group.rotation.y) * 0.03;
    group.rotation.x += ((0.08 + mouseY*0.12) - group.rotation.x) * 0.03;

    cards.forEach(c=>{
      const a = c.userData.angle + t * c.userData.speed;
      c.position.x = Math.cos(a) * c.userData.radius;
      c.position.z = Math.sin(a) * c.userData.radius * 0.55;
      c.position.y = Math.sin(a*1.3) * 0.6;
      const g = c.children[0], icon = c.children[1];
      g.lookAt(camera.position);
      icon.rotation.x += c.userData.spinX;
      icon.rotation.y += c.userData.spinY;
    });

    stars.rotation.y += 0.00008;

    renderer.render(scene, camera);
  }
  resize();
  animate();
})();
