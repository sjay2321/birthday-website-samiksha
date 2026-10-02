import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  hue: "gold" | "coral" | "lavender";
  o: number;
}

const COLORS: Record<Particle["hue"], string> = {
  gold: "240,185,77",
  coral: "255,122,147",
  lavender: "183,156,232",
};

export default function AmbientParticles({ mode = "float" }: { mode?: "float" | "rise" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const hues: Particle["hue"][] = ["gold", "coral", "lavender"];
    const count = width < 640 ? 22 : 40;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.4 + 0.8,
      vy: Math.random() * 0.35 + 0.08,
      vx: (Math.random() - 0.5) * 0.15,
      hue: hues[Math.floor(Math.random() * hues.length)],
      o: Math.random() * 0.5 + 0.2,
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / width - 0.5) * 2;
      mouseRef.current.y = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        if (mode === "rise") {
          p.y -= p.vy * 2.2;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        } else {
          p.y -= p.vy;
          p.x += p.vx + mouseRef.current.x * 0.12;
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `rgba(${COLORS[p.hue]},${p.o})`);
        grad.addColorStop(1, `rgba(${COLORS[p.hue]},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${COLORS[p.hue]},${Math.min(1, p.o + 0.3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
