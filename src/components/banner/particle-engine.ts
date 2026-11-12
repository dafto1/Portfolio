export type ParticleColor = {
  /** RGB triplet without the `rgb()` wrapper, e.g. "103, 232, 249". */
  rgb: string;
  /** Solid pixel core colour. */
  core: string;
  /** Relative selection weight. */
  weight: number;
};

export type ParticleFieldOptions = {
  /** Multiplier for the particle count. */
  density?: number;
  palette?: readonly ParticleColor[];
  minParticles?: number;
  maxParticles?: number;
  maxDpr?: number;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  twinkleSpeed: number;
  phase: number;
  colorIndex: number;
  glow: number;
  sparkle: boolean;
};

const DEFAULTS = {
  density: 1,
  palette: [
    { rgb: "165, 243, 252", core: "#ecfeff", weight: 0.46 },
    { rgb: "103, 232, 249", core: "#cffafe", weight: 0.34 },
    { rgb: "224, 242, 254", core: "#ffffff", weight: 0.2 },
  ] as readonly ParticleColor[],
  minParticles: 36,
  maxParticles: 190,
  maxDpr: 2,
} as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

function makeGlowSprite(rgb: string): HTMLCanvasElement {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;

  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;

  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, `rgba(${rgb}, 0.9)`);
  gradient.addColorStop(0.28, `rgba(${rgb}, 0.34)`);
  gradient.addColorStop(0.62, `rgba(${rgb}, 0.08)`);
  gradient.addColorStop(1, `rgba(${rgb}, 0)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

/**
 * Canvas particle field used by the pixel-art banner.
 *
 * Owns rendering, DPR-aware sizing, resize observation, viewport pausing and
 * reduced-motion handling. It deliberately has no React dependency so the
 * presentation component can stay declarative.
 */
export class ParticleEngine {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly density: number;
  private readonly minParticles: number;
  private readonly maxParticles: number;
  private readonly maxDpr: number;

  private palette: readonly ParticleColor[];
  private glowSprites: HTMLCanvasElement[] = [];

  private particles: Particle[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;

  private rafId = 0;
  private running = false;
  private reducedMotion = false;
  private inView = true;
  private time = 0;
  private lastFrame = 0;

  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private motionQuery: MediaQueryList | null = null;

  constructor(canvas: HTMLCanvasElement, options: ParticleFieldOptions = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.density = options.density ?? DEFAULTS.density;
    this.minParticles = options.minParticles ?? DEFAULTS.minParticles;
    this.maxParticles = options.maxParticles ?? DEFAULTS.maxParticles;
    this.maxDpr = options.maxDpr ?? DEFAULTS.maxDpr;
    this.palette = options.palette?.length ? options.palette : DEFAULTS.palette;

    this.rebuildSprites();

    this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.reducedMotion = this.motionQuery.matches;
    this.motionQuery.addEventListener("change", this.handleMotionChange);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    this.measure();

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.measure());
      this.resizeObserver.observe(canvas);
    }

    if (typeof IntersectionObserver !== "undefined") {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          this.inView = entry.isIntersecting;
          this.syncPlayback();
        },
        { rootMargin: "120px 0px", threshold: 0 },
      );
      this.intersectionObserver.observe(canvas);
    }

    this.syncPlayback();
  }

  setPalette(palette: readonly ParticleColor[]): void {
    if (!palette.length) return;
    this.palette = palette;
    this.rebuildSprites();

    for (const particle of this.particles) {
      particle.colorIndex = this.pickColor();
    }

    if (!this.running) this.draw();
  }

  destroy(): void {
    this.stop();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.motionQuery?.removeEventListener("change", this.handleMotionChange);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    this.particles = [];
    this.glowSprites = [];
  }

  private rebuildSprites(): void {
    this.glowSprites = this.palette.map((color) => makeGlowSprite(color.rgb));
  }

  private handleMotionChange = (event: MediaQueryListEvent) => {
    this.reducedMotion = event.matches;
    this.syncPlayback();
  };

  private handleVisibilityChange = () => {
    this.syncPlayback();
  };

  private syncPlayback(): void {
    const shouldAnimate =
      this.inView && !this.reducedMotion && !document.hidden && this.width > 0 && this.height > 0;

    if (shouldAnimate) {
      this.start();
    } else {
      this.stop();
      this.draw();
    }
  }

  private measure(): void {
    const bounds = this.canvas.getBoundingClientRect();
    const width = Math.round(bounds.width);
    const height = Math.round(bounds.height);
    if (width <= 0 || height <= 0) return;

    const dpr = clamp(window.devicePixelRatio || 1, 1, this.maxDpr);
    const needsResize =
      width !== this.width ||
      height !== this.height ||
      dpr !== this.dpr ||
      this.canvas.width !== Math.round(width * dpr);

    if (!needsResize) return;

    this.width = width;
    this.height = height;
    this.dpr = dpr;
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);

    const ctx = this.ctx;
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.reconcileParticles();
    if (!this.running) this.draw();
    this.syncPlayback();
  }

  private count(): number {
    const area = this.width * this.height;
    const scaled = Math.round((area / 2300) * this.density);
    return clamp(scaled, this.minParticles, this.maxParticles);
  }

  private reconcileParticles(): void {
    const target = this.count();

    if (this.particles.length > target) {
      this.particles.length = target;
    }

    while (this.particles.length < target) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    const color = this.pickColor();
    const depth = Math.random();
    const size = randomBetween(0.7, 1.9) * (0.75 + depth * 0.55);
    const speed = 0.35 + depth * 0.9;

    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      size,
      vx: randomBetween(-0.16, 0.16) * speed,
      vy: randomBetween(-0.09, 0.045) * speed,
      opacity: randomBetween(0.2, 0.82),
      twinkleSpeed: randomBetween(0.008, 0.032),
      phase: Math.random() * Math.PI * 2,
      colorIndex: color,
      glow: Math.random() < 0.18 ? randomBetween(0.75, 1) : randomBetween(0.1, 0.4),
      sparkle: Math.random() < 0.06,
    };
  }

  private pickColor(): number {
    const total = this.palette.reduce((sum, color) => sum + color.weight, 0);
    let cursor = Math.random() * total;
    for (let index = 0; index < this.palette.length; index += 1) {
      cursor -= this.palette[index].weight;
      if (cursor <= 0) return index;
    }
    return this.palette.length - 1;
  }

  private start(): void {
    if (this.running || !this.ctx) return;
    this.running = true;
    this.lastFrame = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private stop(): void {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  private tick = (now: number) => {
    if (!this.running) return;

    const delta = Math.min((now - this.lastFrame) / 1000, 0.05);
    this.lastFrame = now;
    this.time += delta;

    this.update(delta);
    this.draw();

    this.rafId = requestAnimationFrame(this.tick);
  };

  private update(delta: number): void {
    const margin = 18;
    const step = delta * 60;

    for (const particle of this.particles) {
      particle.x += particle.vx * step;
      particle.y += particle.vy * step;

      if (particle.x < -margin) particle.x = this.width + margin;
      else if (particle.x > this.width + margin) particle.x = -margin;

      if (particle.y < -margin) particle.y = this.height + margin;
      else if (particle.y > this.height + margin) particle.y = -margin;
    }
  }

  private draw(): void {
    const ctx = this.ctx;
    if (!ctx || this.width <= 0 || this.height <= 0) return;

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.globalCompositeOperation = "lighter";

    for (const particle of this.particles) {
      const flicker = 0.64 + 0.36 * (0.5 + 0.5 * Math.sin(this.time * 60 * particle.twinkleSpeed + particle.phase));
      const alpha = clamp(particle.opacity * flicker, 0, 1);
      const sprite = this.glowSprites[particle.colorIndex];
      const core = this.palette[particle.colorIndex].core;

      if (particle.glow > 0.45 && sprite) {
        const glowSize = particle.size * (5 + particle.glow * 11);
        ctx.globalAlpha = alpha * 0.42;
        ctx.drawImage(sprite, particle.x - glowSize / 2, particle.y - glowSize / 2, glowSize, glowSize);
      }

      ctx.globalAlpha = alpha;
      ctx.fillStyle = core;

      if (particle.sparkle) {
        const reach = particle.size * 2.4;
        const thickness = Math.max(1, particle.size * 0.9);
        ctx.fillRect(particle.x - reach / 2, particle.y - thickness / 2, reach, thickness);
        ctx.fillRect(particle.x - thickness / 2, particle.y - reach / 2, thickness, reach);
      } else {
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      }
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
}
