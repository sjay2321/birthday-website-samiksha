import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../../config/content";

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rot: number;
  rotSpeed: number;
}

function ConfettiCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["#f0b94d", "#ff7a93", "#b79ce8", "#f6d38a"];
    const pieces: Piece[] = Array.from({ length: 140 }, () => ({
      x: Math.random() * width,
      y: -20 - Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * 2 + 1.5,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 6,
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    let raf: number;
    let active = !document.hidden;
    const onVisibility = () => { active = !document.hidden; if (active) raf = requestAnimationFrame(draw); else cancelAnimationFrame(raf); };
    const draw = () => {
      if (!active) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    if (active) draw();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />;
}

export default function Finale({ onReplay }: { onReplay: () => void }) {
  const [showSurprise, setShowSurprise] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center relative">
      <ConfettiCanvas />
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-5xl md:text-7xl mb-4 text-glow relative z-10"
        style={{ color: "var(--cream)" }}
      >
        {siteConfig.finalHeading}, {siteConfig.friendName}!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="font-body text-base md:text-lg mb-10 max-w-md relative z-10"
        style={{ color: "var(--cream-dim)" }}
      >
        {siteConfig.finalSubline}
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowSurprise((value) => !value)}
        className="relative z-10 mb-4 px-7 py-3 rounded-full font-body text-sm"
        style={{ background: "rgba(255,122,147,0.13)", border: "1px solid rgba(255,122,147,0.45)", color: "var(--coral-soft)" }}
        aria-expanded={showSurprise}
      >
        {showSurprise ? "Close your surprise" : "A little surprise for you ✨"}
      </motion.button>
      {showSurprise && (
        <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} role="status" className="relative z-10 max-w-md rounded-2xl px-6 py-4 mb-5" style={{ background: "rgba(247,236,217,0.09)", border: "1px solid rgba(240,185,77,0.35)", color: "var(--cream)" }}>
          Samiksha, never forget how special you are. Keep dreaming big, keep smiling, and may life surprise you with beautiful moments. With warm wishes, Jay 💗
        </motion.div>
      )}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onReplay}
        data-cursor-hover
        className="relative z-10 px-9 py-3.5 rounded-full font-body font-medium text-sm"
        style={{
          background: "rgba(247,236,217,0.08)",
          border: "1px solid rgba(240,185,77,0.4)",
          color: "var(--gold-soft)",
        }}
      >
        {siteConfig.replayButtonLabel}
      </motion.button>
    </div>
  );
}
