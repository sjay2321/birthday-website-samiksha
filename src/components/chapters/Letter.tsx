import { motion } from "framer-motion";
import { siteConfig } from "../../config/content";

export default function Letter({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotate: 0, scale: 1.01 }}
        className="w-full max-w-lg rounded-sm p-8 md:p-10 thin-scroll overflow-y-auto"
        style={{
          background: "linear-gradient(160deg, #fbf3e2, #f4e8cf)",
          color: "#3a2b1a",
          maxHeight: "70vh",
          boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
        }}
      >
        <h2 className="font-hand text-4xl mb-5" style={{ color: "#8a3b52" }}>
          {siteConfig.letterHeading}
        </h2>
        {siteConfig.letterBody.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }}
            className="font-hand text-xl md:text-2xl leading-relaxed mb-4"
          >
            {line}
          </motion.p>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + siteConfig.letterBody.length * 0.25 + 0.2 }}
          className="font-hand text-xl md:text-2xl text-right mt-6"
        >
          — {siteConfig.fromName}
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + siteConfig.letterBody.length * 0.25 + 0.7, duration: 0.6 }}
        style={{
          background: "linear-gradient(135deg, var(--gold), var(--coral))",
          color: "#1f1230",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        data-cursor-hover
        className="mt-6 px-9 py-3.5 rounded-full font-body font-medium text-sm"
      >
        {siteConfig.letterButtonLabel}
      </motion.button>
    </div>
  );
}
