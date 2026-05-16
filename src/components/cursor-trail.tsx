"use client";

import * as React from "react";

const params = {
  pointsNumber: 40,
  widthFactor: 0.3,
  spring: 0.4,
  friction: 0.5,
};

interface TrailPoint {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export function CursorTrail() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = React.useState(true);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEnabled(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };
    let mouseMoved = false;
    let rafId = 0;

    const trail: TrailPoint[] = Array.from(
      { length: params.pointsNumber },
      () => ({ x: pointer.x, y: pointer.y, dx: 0, dy: 0 })
    );

    function readStrokeColor(): string {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim();
      return raw || "#000";
    }
    let strokeColor = readStrokeColor();

    const themeObserver = new MutationObserver(() => {
      strokeColor = readStrokeColor();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    function setupCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function updateMousePosition(eX: number, eY: number) {
      pointer.x = eX;
      pointer.y = eY;
    }

    function onMouseMove(e: MouseEvent) {
      mouseMoved = true;
      updateMousePosition(e.clientX, e.clientY);
    }
    function onClick(e: MouseEvent) {
      updateMousePosition(e.clientX, e.clientY);
    }
    function onTouchMove(e: TouchEvent) {
      mouseMoved = true;
      const t = e.targetTouches[0];
      if (t) updateMousePosition(t.clientX, t.clientY);
    }

    function onVisibility() {
      window.cancelAnimationFrame(rafId);
      if (!document.hidden) {
        rafId = window.requestAnimationFrame(update);
      }
    }

    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    window.addEventListener("touchmove", onTouchMove);
    document.addEventListener("visibilitychange", onVisibility);

    function update(t: number) {
      if (!ctx || !canvas) return;

      if (!mouseMoved) {
        pointer.x =
          (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
          window.innerWidth;
        pointer.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
          window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring =
          pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = "round";
      ctx.strokeStyle = strokeColor;
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
      }
      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      ctx.stroke();

      rafId = window.requestAnimationFrame(update);
    }

    rafId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
    };
  }, []);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
