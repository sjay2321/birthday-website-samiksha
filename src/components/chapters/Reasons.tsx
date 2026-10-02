import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../../config/content";

function FlipCard({ text, index, onFlip }: { text: string; index: number; onFlip: () => void }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    if (flipped) return;
    setFlipped(true);
    onFlip();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.06, duration: 0.5 }}
      onClick={handleClick}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); handleClick(); } }}
      role="button"
      tabIndex={0}
      aria-label={`Reveal reason ${index + 1}`}
      aria-pressed={flipped}
      data-cursor-hover
      className="relative h-24 md:h-28 cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(247,236,217,0.06)",
            border: "1px solid rgba(240,185,77,0.3)",
            color: "var(--gold-soft)",
          }}
        >
          ?
        </div>
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center text-center p-3 text-xs md:text-sm font-medium"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(255,122,147,0.12)",
            border: "1px solid rgba(255,122,147,0.4)",
            color: "var(--cream)",
          }}
        >
          {text}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Reasons({ onNext }: { onNext: () => void }) {
  const [flippedCount, setFlippedCount] = useState(0);
  const allFlipped = flippedCount === siteConfig.reasons.length;

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-3xl mx-auto w-full">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl md:text-5xl mb-8 text-center"
        style={{ color: "var(--cream)" }}
      >
        {siteConfig.reasonsHeading}
      </motion.h2>

      <div className="grid grid-cols-3 gap-3 md:gap-4 w-full mb-8">
        {siteConfig.reasons.map((r, i) => (
          <FlipCard key={i} text={r} index={i} onFlip={() => setFlippedCount((c) => c + 1)} />
        ))}
      </div>

      <motion.button
        animate={{ opacity: allFlipped ? 1 : 0, y: allFlipped ? 0 : 10 }}
        transition={{ duration: 0.5 }}
        style={{
          pointerEvents: allFlipped ? "auto" : "none",
          background: "linear-gradient(135deg, var(--gold), var(--coral))",
          color: "#1f1230",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        data-cursor-hover
        className="px-9 py-3.5 rounded-full font-body font-medium text-sm"
      >
        {siteConfig.reasonsButtonLabel}
      </motion.button>
    </div>
  );
}
