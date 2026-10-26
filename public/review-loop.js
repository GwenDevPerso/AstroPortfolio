(() => {
// The bald, mustached head drawn in code, ponytail.dev style: white strokes become bright code, the grey fill faint code.
const HEAD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110"><g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round">
<circle cx="13" cy="58" r="6" fill="#555"/><circle cx="87" cy="58" r="6" fill="#555"/>
<path d="M50 14 C74 14 88 32 88 58 C88 84 72 98 50 98 C28 98 12 84 12 58 C12 32 26 14 50 14Z" fill="#555"/>
<path d="M28 32 Q34 22 46 19"/><path d="M29 42 Q36 40 43 44"/><path d="M57 42 L70 42"/>
<path d="M44 85 Q50 87 56 85" stroke-width="2.5"/>
<path d="M50 70 C44 64 34 64 28 70 C24 74 19 72 17 66 C17 76 28 81 39 77 C45 75 48 74 50 73 C52 74 55 75 61 77 C72 81 83 76 83 66 C81 72 76 74 72 70 C66 64 56 64 50 70Z" fill="#fff" stroke="none"/>
<g fill="#fff" stroke="none"><circle cx="24" cy="76" r="1.3"/><circle cx="28" cy="83" r="1.3"/><circle cx="35" cy="89" r="1.3"/><circle cx="43" cy="92" r="1.3"/><circle cx="57" cy="92" r="1.3"/><circle cx="65" cy="89" r="1.3"/><circle cx="72" cy="83" r="1.3"/><circle cx="76" cy="76" r="1.3"/></g>
</g></svg>`;
const EYES = [[38, 54], [62, 54]];
const SRC = 'constlazy=()=>structuredClone(ctx);//shortcut:lesscodewins;if(!need)returnnull;exportdefaultreuse(it);';
const GLYPHS = '01<>{}[]=+*#%$/\\|';
const HOLO = [[60, 170, 120], [123, 224, 176], [205, 248, 222]];   // greens around --accent (#7be0b0)
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
const holoAt = u => (u = clamp(u)) < 0.5 ? mix(HOLO[0], HOLO[1], u * 2) : mix(HOLO[1], HOLO[2], (u - 0.5) * 2);
const hash = (a, b, c = 0) => { let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
const FS = 7, LH = 8;

class ReviewLoop extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' }).innerHTML = '<style>:host{display:block;width:100%;height:100%;min-height:240px}canvas{display:block;width:100%;height:100%}</style><canvas></canvas>';
      this.cv = this.shadowRoot.querySelector('canvas');
      this.img = new Image();
      this.img.src = 'data:image/svg+xml,' + encodeURIComponent(HEAD);
    }
    this.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.t0 = performance.now();
    this.ro = new ResizeObserver(() => this.build());
    this.ro.observe(this);
    this.io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; if (this.visible) this.loop(); });
    this.io.observe(this);
    Promise.all([this.img.decode(), document.fonts.ready]).then(() => this.build());
  }
  disconnectedCallback() { this.ro.disconnect(); this.io.disconnect(); cancelAnimationFrame(this.raf); this.visible = false; }
  build() {
    if (!this.img.complete || !this.clientWidth) return;
    const dpr = Math.min(2, devicePixelRatio || 1), W = this.clientWidth, H = this.clientHeight;
    this.cv.width = W * dpr; this.cv.height = H * dpr;
    const g = this.g = this.cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.font = getComputedStyle(this).getPropertyValue('--rl-font').trim() || 'ui-monospace, monospace';
    g.font = `${FS}px ${this.font}`;
    const CW = this.CW = g.measureText('M').width, cols = Math.floor(W / CW), rows = Math.floor(H / LH);
    // fit the 100x110 drawing, centred
    const h = Math.min(H, W * 1.1), w = h / 1.1, ox = (W - w) / 2, oy = (H - h) / 2;
    const off = new OffscreenCanvas(W, H), o = off.getContext('2d', { willReadFrequently: true });
    o.drawImage(this.img, ox, oy, w, h);
    const px = o.getImageData(0, 0, W, H).data;
    const eyes = EYES.map(([x, y]) => [ox + x / 100 * w, oy + y / 110 * h]), er = w * 0.036;
    this.cells = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const cx = (x + 0.5) * CW, cy = (y + 0.5) * LH;
      const eye = eyes.some(([ex, ey]) => Math.hypot(ex - cx, ey - cy) < Math.max(er, CW * 0.6));
      let v = 0;   // brightest pixel in the cell
      for (let sy = y * LH; sy < (y + 1) * LH; sy += 2) for (let sx = Math.floor(x * CW); sx < (x + 1) * CW; sx += 2) v = Math.max(v, px[(sy * W + sx) * 4] * px[(sy * W + sx) * 4 + 3] / 255);
      const k = eye || v > 150 ? 1 : v > 40 ? 0.13 : 0;
      if (k) this.cells.push({ x, y, k, eye, i: this.cells.length, d: hash(x, y) * 1.2 + y / rows * 0.6, u: x / cols * 0.7 + y / rows * 0.3 });
    }
    this.cells.sort((a, b) => a.k - b.k);   // faint cells first, so the font changes once per frame
    this.draw(this.reduce ? 1e4 : (performance.now() - this.t0) / 1000);
  }
  loop() {
    cancelAnimationFrame(this.raf);
    if (this.reduce || !this.visible) return;
    const step = now => { this.draw((now - this.t0) / 1000); if (this.visible) this.raf = requestAnimationFrame(step); };
    this.raf = requestAnimationFrame(step);
  }
  draw(t) {
    const { g, cells, CW } = this;
    if (!cells) return;
    g.clearRect(0, 0, this.clientWidth, this.clientHeight);
    const blink = t % 4.2 > 4.05;
    let k;
    for (const c of cells) {
      if (c.eye && blink) continue;
      const a = clamp((t - c.d) / 0.5);
      if (!a) continue;
      const col = holoAt(c.u + 0.06 * Math.sin(t * 0.35 + c.y * 0.05));
      // scramble while appearing, then steady code that flickers now and then
      const ch = a < 1 || hash(c.i, Math.floor(t * 3), 7) > 0.97 ? GLYPHS[(hash(c.i, Math.floor(t * 18), 3) * GLYPHS.length) | 0] : SRC[c.i % SRC.length];
      if (c.k !== k) g.font = `${(k = c.k) === 1 ? 600 : 400} ${FS}px ${this.font}`;
      g.globalAlpha = c.k * a;
      g.fillStyle = `rgb(${col[0] | 0},${col[1] | 0},${col[2] | 0})`;
      g.fillText(ch, c.x * CW, (c.y + 1) * LH - 2);
    }
    g.globalAlpha = 1;
  }
}
if (!customElements.get('review-loop')) customElements.define('review-loop', ReviewLoop);
})();
