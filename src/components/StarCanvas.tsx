"use client";

import { useEffect, useRef } from "react";

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette: [number, number, number][] = [
      [232, 184, 75],
      [245, 168, 130],
      [184, 168, 212],
      [158, 200, 224],
      [140, 184, 154],
      [240, 192, 96],
    ];

    interface Star {
      ox: number;
      oy: number;
      driftAmp: number;
      driftSpeed: number;
      driftPhaseX: number;
      driftPhaseY: number;
      r: number;
      phase: number;
      speed: number;
      color: [number, number, number];
    }

    const starCount = window.innerWidth < 768 ? 15 : 40;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      ox: Math.random(),
      oy: Math.random(),
      driftAmp: Math.random() * 0.03 + 0.01,
      driftSpeed: Math.random() * 0.3 + 0.1,
      driftPhaseX: Math.random() * Math.PI * 2,
      driftPhaseY: Math.random() * Math.PI * 2,
      r: Math.random() * 3.0 + 1.0,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.007 + 0.002,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    const dpr = window.devicePixelRatio || 1;
    let contentHalf = 0;

    function resize() {
      if (!canvas) return;
      const vw = window.innerWidth;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      contentHalf = vw > 760 ? 380 / vw : 0;
    }

    let raf: number;
    let t = 0;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.025;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const s of stars) {
        const x = s.ox + Math.sin(t * s.driftSpeed + s.driftPhaseX) * s.driftAmp;
        const y = s.oy + Math.cos(t * s.driftSpeed * 0.7 + s.driftPhaseY) * s.driftAmp;
        const raw = 0.5 + 0.5 * Math.sin(t * s.speed * 150 + s.phase);

        const fadeMargin = 0.06;
        const distFromCenter = Math.abs(x - 0.5);
        const edgeFade = Math.min(1, Math.max(0, (distFromCenter - (contentHalf - fadeMargin)) / fadeMargin));

        const a = Math.pow(raw, 3) * 0.85 * edgeFade;
        const [r, g, b] = s.color;
        ctx.font = `${Math.round(s.r * 5 * dpr)}px serif`;
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fillText("✦", x * canvas.width, y * canvas.height);
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
