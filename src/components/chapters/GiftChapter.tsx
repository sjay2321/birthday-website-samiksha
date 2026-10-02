import { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../../config/content";

const GiftBoxScene = lazy(() => import("../../scenes/GiftBoxScene"));

export default function GiftChapter({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 w-full">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="font-body text-xs md:text-sm tracking-widest uppercase mb-2 text-center"
        style={{ color: "var(--gold-soft)" }}
      >
        {siteConfig.giftHeading}
      </motion.p>

      <div className="w-full max-w-md h-[380px] md:h-[440px] flex items-center justify-center">
        <Suspense
          fallback={
            <div
              className="w-10 h-10 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(240,185,77,0.25)", borderTopColor: "var(--gold)" }}
            />
          }
        >
          <GiftBoxScene onOpened={() => setOpened(true)} revealText={siteConfig.giftRevealText} />
        </Suspense>
      </div>

      <motion.button
        animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 10 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          pointerEvents: opened ? "auto" : "none",
          background: "linear-gradient(135deg, var(--gold), var(--coral))",
          color: "#1f1230",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        data-cursor-hover
        className="mt-6 px-9 py-3.5 rounded-full font-body font-medium text-sm"
      >
        {siteConfig.giftButtonLabel}
      </motion.button>
    </div>
  );
}
