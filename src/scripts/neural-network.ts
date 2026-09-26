// Canvas port of the "Réseau neuronal particules" loop (src/assets/Réseau neuronal particules animé/network-loop.jsx).
// Scenes: Drift → Assemble → Connect → Signal → Dissolve, looping every 15.5 s.

const W = 1920;
const H = 1080;
const PER_NODE = 14;
const LAYERS = [5, 8, 8, 4];
const PALETTE = { hot: '#ffffff', cool: '#8a93ff', bg: '#04050b' };

const SCENES = [
    { name: 'Drift', dur: 2.5 },
    { name: 'Assemble', dur: 3.5 },
    { name: 'Connect', dur: 2.5 },
    { name: 'Signal', dur: 4 },
    { name: 'Dissolve', dur: 3 },
] as const;

type SceneName = (typeof SCENES)[number]['name'];

const CUES = {} as Record<SceneName, number>;
let LOOP = 0;
for (const scene of SCENES) {
    CUES[scene.name] = LOOP;
    LOOP += scene.dur;
}

/** Frame shown when the visitor prefers reduced motion: network fully built, no pulses. */
const STILL_T = CUES.Signal - 0.2;

const Easing = {
    easeOutQuad: (t: number) => t * (2 - t),
    easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
    easeOutBack: (t: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
};
const MOTION = { enter: Easing.easeInOutCubic, draw: Easing.easeOutQuad, pop: Easing.easeOutBack };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const ramp = (T: number, start: number, dur: number, ease: (t: number) => number) =>
    ease(clamp((T - start) / dur, 0, 1));

function rng(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

type RGB = [number, number, number];
const hex = (h: string): RGB => {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const mixRgb = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const css = ([r, g, b]: RGB) => `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;

const HOT = hex(PALETTE.hot);
const COOL = hex(PALETTE.cool);
const WHITE: RGB = [255, 255, 255];
const col = (c: number) => mixRgb(COOL, HOT, c);

type NetNode = { l: number; x: number; y: number; c: number };
type Edge = { a: number; b: number; l: number; h: [number, number, number] };
type Particle = {
    n: number; bx: number; by: number; ax: number; ay: number; ph: number; ph2: number;
    orb: number; oa: number; dir: number; d: number; s: number;
};
type Dust = { bx: number; by: number; ax: number; ay: number; ph: number; ph2: number; s: number; o: number };

function buildNet() {
    const r = rng(7);
    const x0 = 470;
    const x1 = 1450;
    const gap = 100;
    const nodes: NetNode[] = [];
    LAYERS.forEach((n, l) => {
        for (let j = 0; j < n; j++) {
            nodes.push({ l, x: x0 + ((x1 - x0) * l) / (LAYERS.length - 1), y: H / 2 + (j - (n - 1) / 2) * gap, c: l / (LAYERS.length - 1) });
        }
    });
    const edges: Edge[] = [];
    nodes.forEach((a, i) =>
        nodes.forEach((b, k) => {
            if (b.l === a.l + 1) edges.push({ a: i, b: k, l: a.l, h: [r(), r(), r()] });
        }),
    );
    const parts: Particle[] = [];
    nodes.forEach((_, ni) => {
        for (let p = 0; p < PER_NODE; p++) {
            parts.push({
                n: ni, bx: r() * W, by: r() * H, ax: 20 + r() * 60, ay: 20 + r() * 60, ph: r() * 6.28, ph2: r() * 6.28,
                orb: 6 + r() * 14, oa: r() * 6.28, dir: r() < 0.5 ? 1 : -1, d: r(), s: 1.6 + r() * 2,
            });
        }
    });
    const dust: Dust[] = [];
    for (let i = 0; i < 90; i++) {
        dust.push({ bx: r() * W, by: r() * H, ax: 30 + r() * 90, ay: 30 + r() * 90, ph: r() * 6.28, ph2: r() * 6.28, s: 0.8 + r() * 1.6, o: 0.15 + r() * 0.35 });
    }
    return { nodes, edges, parts, dust };
}

const NET = buildNet();

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0, radius), 0, Math.PI * 2);
}

/** Draws the scene at composition time `T` (seconds) in 1920×1080 scene units. */
function drawScene(ctx: CanvasRenderingContext2D, glow: CanvasRenderingContext2D, T: number, pulses: boolean) {
    const w = (2 * Math.PI * T) / LOOP;
    const scatter = (p: { bx: number; by: number; ax: number; ay: number; ph: number; ph2: number }) =>
        [p.bx + p.ax * Math.sin(w + p.ph), p.by + p.ay * Math.sin(2 * w + p.ph2)] as const;

    const nodeOn = NET.nodes.map(
        (n) => ramp(T, CUES.Assemble + n.l * 0.4 + 1.4, 0.9, MOTION.pop) * (1 - ramp(T, CUES.Dissolve, 0.8, MOTION.draw)),
    );
    const edgeDraw = (l: number) => ramp(T, CUES.Connect + l * 0.6, 1.1, MOTION.draw);
    const edgeFade = 1 - ramp(T, CUES.Dissolve, 0.9, MOTION.draw);

    const HOP = 0.45;
    const waves = [0, 1.2, 2.4].map((k) => CUES.Signal + k);
    const gauss = (x: number) => Math.exp(-Math.pow(x / 0.18, 2));
    const flash = NET.nodes.map((n) => {
        if (!pulses) return 0;
        const offset = n.l === 0 ? 0 : n.l * HOP + HOP;
        return waves.reduce((m, s) => Math.max(m, gauss(T - (s + offset))), 0);
    });

    const cam = 1 + 0.07 * Math.pow(Math.sin((Math.PI * T) / LOOP), 2);
    const rot = ((1.2 * Math.sin(w)) * Math.PI) / 180;
    const applyCamera = (c: CanvasRenderingContext2D) => {
        c.translate(W / 2, H / 2);
        c.scale(cam, cam);
        c.rotate(rot);
        c.translate(-W / 2, -H / 2);
    };

    // Background
    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.hypot(W / 2, H / 2) * 0.65);
    bg.addColorStop(0, css(mixRgb(hex(PALETTE.bg), COOL, 0.12)));
    bg.addColorStop(1, PALETTE.bg);
    ctx.fillStyle = PALETTE.bg;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    applyCamera(ctx);

    // Dust
    ctx.fillStyle = css(COOL);
    for (const d of NET.dust) {
        const [x, y] = scatter(d);
        ctx.globalAlpha = d.o;
        circle(ctx, x, y, d.s);
        ctx.fill();
    }

    // Synapses
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.22 * edgeFade;
    for (const e of NET.edges) {
        const drawn = edgeDraw(e.l);
        if (drawn * edgeFade <= 0.001) continue;
        const a = NET.nodes[e.a];
        const b = NET.nodes[e.b];
        ctx.strokeStyle = css(col((a.c + b.c) / 2));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * drawn, a.y + (b.y - a.y) * drawn);
        ctx.stroke();
    }
    ctx.restore();

    // Glowing layer: pulses, neurons and particles (drawn separately, then blurred + composited)
    glow.clearRect(0, 0, W, H);
    glow.save();
    applyCamera(glow);

    if (pulses) {
        glow.lineCap = 'round';
        NET.edges.forEach((e) =>
            waves.forEach((s, k) => {
                if (e.h[k] > 0.4) return;
                const u = (T - (s + e.l * HOP + HOP)) / HOP;
                if (u < 0 || u > 1) return;
                const a = NET.nodes[e.a];
                const b = NET.nodes[e.b];
                const q = MOTION.draw(u);
                const tq = Math.max(0, q - 0.18);
                const x = a.x + (b.x - a.x) * q;
                const y = a.y + (b.y - a.y) * q;
                glow.globalAlpha = 0.9;
                glow.lineWidth = 2.4;
                glow.strokeStyle = css(col(a.c + (b.c - a.c) * q));
                glow.beginPath();
                glow.moveTo(a.x + (b.x - a.x) * tq, a.y + (b.y - a.y) * tq);
                glow.lineTo(x, y);
                glow.stroke();
                glow.globalAlpha = 1;
                glow.fillStyle = '#fff';
                circle(glow, x, y, 3.5);
                glow.fill();
            }),
        );
    }

    NET.nodes.forEach((n, i) => {
        const o = nodeOn[i];
        if (o <= 0.001) return;
        const f = flash[i];
        glow.globalAlpha = clamp(0.5 * o + f * 0.5, 0, 1);
        glow.lineWidth = 1.5;
        glow.strokeStyle = css(col(n.c));
        circle(glow, n.x, n.y, (22 + f * 10) * o);
        glow.stroke();
        glow.globalAlpha = clamp(o, 0, 1);
        glow.fillStyle = css(f > 0.05 ? mixRgb(n.c > 0.5 ? HOT : COOL, WHITE, f * 0.7) : col(n.c));
        circle(glow, n.x, n.y, (7 + f * 5) * o);
        glow.fill();
    });

    for (const p of NET.parts) {
        const n = NET.nodes[p.n];
        const inn = ramp(T, CUES.Assemble + n.l * 0.4 + p.d * 0.6, 1.7, MOTION.enter);
        const out = ramp(T, CUES.Dissolve + p.d * 0.9, 1.8, MOTION.enter);
        const m = inn * (1 - out);
        const [sx, sy] = scatter(p);
        const oa = p.oa + p.dir * 3 * w;
        const tx = n.x + p.orb * Math.cos(oa);
        const ty = n.y + p.orb * Math.sin(oa);
        glow.globalAlpha = 0.55 + 0.45 * m;
        glow.fillStyle = css(mixRgb(COOL, col(n.c), m));
        circle(glow, sx + (tx - sx) * m, sy + (ty - sy) * m, p.s * (1 - 0.3 * m));
        glow.fill();
    }
    glow.restore();

    // feGaussianBlur(6) + feMerge(blur, source). The glow canvas already has the scene's pixel size.
    const pixelScale = ctx.getTransform().a;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.filter = `blur(${6 * pixelScale}px)`;
    ctx.drawImage(glow.canvas, 0, 0);
    ctx.filter = 'none';
    ctx.drawImage(glow.canvas, 0, 0);
    ctx.restore();
}

/** Starts the loop on a canvas; the scene is scaled to cover the canvas box. Returns a cleanup function. */
export function mountNeuralNetwork(canvas: HTMLCanvasElement): () => void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};

    const scene = document.createElement('canvas');
    const sceneCtx = scene.getContext('2d');
    const glowCanvas = document.createElement('canvas');
    const glowCtx = glowCanvas.getContext('2d');
    if (!sceneCtx || !glowCtx) return () => {};

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = true;
    let start = performance.now();
    let resolution = 1;

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.round(width * dpr));
        canvas.height = Math.max(1, Math.round(height * dpr));
        // Render the 1920×1080 scene at the resolution actually needed on screen.
        resolution = Math.min(1, Math.max(canvas.width / W, canvas.height / H));
        scene.width = glowCanvas.width = Math.round(W * resolution);
        scene.height = glowCanvas.height = Math.round(H * resolution);
    };

    const render = (T: number) => {
        sceneCtx.setTransform(resolution, 0, 0, resolution, 0, 0);
        glowCtx.setTransform(resolution, 0, 0, resolution, 0, 0);
        drawScene(sceneCtx, glowCtx, T, !reducedMotion.matches);

        // object-fit: cover
        const scale = Math.max(canvas.width / scene.width, canvas.height / scene.height);
        const dw = scene.width * scale;
        const dh = scene.height * scale;
        ctx.fillStyle = PALETTE.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(scene, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
    };

    const tick = (now: number) => {
        frame = 0;
        render(((now - start) / 1000) % LOOP);
        schedule();
    };

    const schedule = () => {
        if (!frame && visible && !reducedMotion.matches) frame = requestAnimationFrame(tick);
    };

    const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
    };

    const refresh = () => {
        stop();
        resize();
        if (reducedMotion.matches) render(STILL_T);
        else schedule();
    };

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
        else stop();
    });
    intersectionObserver.observe(canvas);

    const onMotionChange = () => {
        start = performance.now();
        refresh();
    };
    reducedMotion.addEventListener('change', onMotionChange);

    refresh();

    return () => {
        stop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        reducedMotion.removeEventListener('change', onMotionChange);
    };
}
