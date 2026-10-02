import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X } from "lucide-react";
import { siteConfig } from "../../config/content";

function TiltCard({
  src,
  caption,
  onOpen,
}: {
  src: string;
  caption: string;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ rotateX: py * -12, rotateY: px * 12 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({ rotateX: 0, rotateY: 0 })}
      onClick={onOpen}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(); } }}
      role="button"
      tabIndex={src ? 0 : -1}
      aria-label={`View photo: ${caption}`}
      data-cursor-hover
      className="rounded-2xl overflow-hidden cursor-pointer relative aspect-[4/5]"
      style={{
        transformStyle: "preserve-3d",
        perspective: 800,
        rotateX: style.rotateX,
        rotateY: style.rotateY,
        border: "1px solid rgba(240,185,77,0.25)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.03 }}
    >
      {src ? (
        <img src={src} alt={caption} className="w-full h-full object-cover" />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, rgba(240,185,77,0.18), rgba(255,122,147,0.18))",
          }}
        >
          <ImageIcon size={28} style={{ color: "var(--gold-soft)" }} />
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs font-medium"
        style={{
          background: "linear-gradient(to top, rgba(21,12,32,0.85), transparent)",
          color: "var(--cream)",
        }}
      >
        {caption}
      </div>
    </motion.div>
  );
}

export default function Gallery({ onNext }: { onNext: () => void }) {
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 w-full max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl md:text-5xl mb-2 text-center"
        style={{ color: "var(--cream)" }}
      >
        {siteConfig.galleryHeading}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-body text-sm mb-7 text-center max-w-md"
        style={{ color: "var(--cream-dim)" }}
      >
        {siteConfig.galleryText}
      </motion.p>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        {siteConfig.gallery.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
          >
            <TiltCard src={g.src} caption={g.caption} onOpen={() => g.src && setModalSrc(g.src)} />
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{
          background: "linear-gradient(135deg, var(--gold), var(--coral))",
          color: "#1f1230",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        data-cursor-hover
        className="px-9 py-3.5 rounded-full font-body font-medium text-sm"
      >
        {siteConfig.galleryButtonLabel}
      </motion.button>

      <AnimatePresence>
        {modalSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalSrc(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(10,6,16,0.92)" }}
          >
            <button
              onClick={() => setModalSrc(null)}
              className="absolute top-5 right-5"
              style={{ color: "var(--cream)" }}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              src={modalSrc}
              alt="Expanded memory"
              className="max-w-full max-h-[80vh] rounded-lg"
              style={{ boxShadow: "0 0 40px rgba(240,185,77,0.25)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
