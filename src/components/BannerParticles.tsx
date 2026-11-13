"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  baseOpacity: number;
  phase: number;
  flickerSpeed: number;
  cyan: boolean;
};

/**
 * Subtle animated particle overlay for the profile banner.
 * Rendered as a transparent canvas layered on top of the existing banner image.
 * The canvas itself renders nothing until mounted client-side and has
 * pointer-events: none, so the banner beneath remains untouched.
 */
export function BannerParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let running = false;
    let dpr = 1;

    const PARTICLE_COUNT = 50;
    const particles: Particle[] = [];

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      // Mixed sizes: most particles stay small, a few are noticeably larger
      size: Math.random() < 0.75 ? Math.random() * 1.2 + 0.4 : Math.random() * 2 + 1.8,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.2,
      baseOpacity: Math.random() * 0.5 + 0.35,
      phase: Math.random() * Math.PI * 2,
      flickerSpeed: Math.random() * 0.015 + 0.005,
      cyan: Math.random() < 0.3,
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.offsetWidth * dpr);
      canvas.height = Math.round(canvas.offsetHeight * dpr);
      // Re-seed particles on resize so positions stay proportional.
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());
    };

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX * dpr;
        p.y += p.speedY * dpr;
        p.phase += p.flickerSpeed;

        // Seamless wrap-around at canvas edges
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Gentle opacity oscillation for a firefly effect
        const opacity = p.baseOpacity * (0.6 + 0.4 * Math.sin(p.phase));
        ctx.fillStyle = p.cyan
          ? `rgba(103, 232, 249, ${opacity})`
          : `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    const start = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const stop = () => {
      if (running) {
        running = false;
        cancelAnimationFrame(rafId);
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pause when the banner is off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
}
