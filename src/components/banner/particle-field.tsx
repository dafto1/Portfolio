"use client";

import { useEffect, useRef } from "react";
import {
  ParticleEngine,
  type ParticleColor,
} from "./particle-engine";

type ParticleFieldProps = {
  palette: readonly ParticleColor[];
  density?: number;
  className?: string;
};

/**
 * Thin React wrapper around the imperative particle engine.
 * Sizing, viewport pausing and cleanup all live in the engine.
 */
export function ParticleField({ palette, density = 1, className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new ParticleEngine(canvas, { density, palette });
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
    // Palette changes are applied without reseeding the field.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  useEffect(() => {
    engineRef.current?.setPalette(palette);
  }, [palette]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  );
}
