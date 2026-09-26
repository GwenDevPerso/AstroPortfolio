// Progressive enhancements shared by every page. The markup is fully usable without them.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = (n: number) => String(n).padStart(2, '0');

function scrollProgress() {
    const bars = document.querySelectorAll<HTMLElement>('[data-scroll-progress]');
    if (!bars.length) return;

    let scheduled = false;
    const update = () => {
        scheduled = false;
        const root = document.documentElement;
        const max = root.scrollHeight - root.clientHeight;
        const progress = max > 0 ? Math.min(1, root.scrollTop / max) : 0;
        bars.forEach((bar) => (bar.style.transform = `scaleX(${progress})`));
    };

    window.addEventListener(
        'scroll',
        () => {
            if (scheduled) return;
            scheduled = true;
            requestAnimationFrame(update);
        },
        { passive: true },
    );
    update();
}

function terminal() {
    const spinners = document.querySelectorAll<HTMLElement>('[data-spinner]');
    const boot = document.querySelector<HTMLElement>('[data-boot-lines]');
    const clocks = document.querySelectorAll<HTMLElement>('[data-clock]');
    const bootLines: string[] = boot ? JSON.parse(boot.dataset.bootLines ?? '[]') : [];

    const tickClock = () => {
        const d = new Date();
        const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
        clocks.forEach((clock) => (clock.textContent = time));
    };
    tickClock();
    setInterval(tickClock, 1000);

    if (reducedMotion) return;

    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let tick = 0;
    setInterval(() => {
        tick++;
        spinners.forEach((spinner) => (spinner.textContent = frames[tick % frames.length]));
        if (boot && bootLines.length && tick % 26 === 0) {
            boot.textContent = bootLines[(tick / 26) % bootLines.length];
        }
    }, 110);
}

function countUp() {
    if (reducedMotion) return;
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const digits = el.textContent?.trim().length ?? 1;
        const duration = 1000;
        const start = performance.now();
        const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased)).padStart(digits, '0');
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    });
}

function reveal() {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
        nodes.forEach((node) => node.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    nodes.forEach((node) => observer.observe(node));
}

scrollProgress();
terminal();
countUp();
reveal();
