import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../config/content";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    let raf: number;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = (t: number) => {
      const pct = Math.min(1, (t - start) / duration);
      setProgress(pct);
      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => setExiting(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timeout); };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "var(--bg-deep)" }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display italic text-lg md:text-xl mb-6"
            style={{ color: "var(--cream-dim)" }}
          >
            for {siteConfig.friendName}
          </motion.div>
          <div className="relative w-52 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(247,236,217,0.15)" }}>
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ background: "linear-gradient(90deg, var(--gold), var(--coral))", width: `${progress * 100}%` }}
            />
          </div>
          <div className="mt-4 font-body text-xs tracking-[0.3em]" style={{ color: "var(--cream-dim)" }}>
            {Math.floor(progress * 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
