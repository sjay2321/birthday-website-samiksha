import { motion } from "framer-motion";
import { siteConfig } from "../../config/content";

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.045, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero({ onNext }: { onNext: () => void }) {
  const greeting = `${siteConfig.heroGreeting} ${siteConfig.friendName}`;

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 h-full max-w-2xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="font-body text-xs tracking-[0.4em] uppercase mb-6"
        style={{ color: "var(--gold-soft)" }}
      >
        A little something for you
      </motion.p>

      <h1 className="font-display text-5xl md:text-7xl mb-6 text-glow" style={{ color: "var(--cream)" }}>
        {greeting.split("").map((ch, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="show"
            style={{ display: "inline-block" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="font-body text-base md:text-lg mb-10"
        style={{ color: "var(--cream-dim)" }}
      >
        {siteConfig.heroSubline}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        data-cursor-hover
        className="px-9 py-3.5 rounded-full font-body font-medium text-sm tracking-wide"
        style={{
          background: "linear-gradient(135deg, var(--gold), var(--coral))",
          color: "#1f1230",
          boxShadow: "0 8px 30px rgba(240,185,77,0.35)",
        }}
      >
        {siteConfig.heroButtonLabel}
      </motion.button>
    </div>
  );
}
