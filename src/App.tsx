import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import ProgressDots from "./components/ProgressDots";
import AudioToggle from "./components/AudioToggle";
import CustomCursor from "./components/CustomCursor";
import AmbientParticles from "./components/AmbientParticles";
import Hero from "./components/chapters/Hero";
import Reasons from "./components/chapters/Reasons";
import GiftChapter from "./components/chapters/GiftChapter";
import Letter from "./components/chapters/Letter";
import Gallery from "./components/chapters/Gallery";
import Finale from "./components/chapters/Finale";
import { siteConfig } from "./config/content";

const CHAPTERS = ["hero", "reasons", "gift", "letter", "gallery", "finale"] as const;

const BG_GRADIENTS = [
  "radial-gradient(circle at 30% 20%, #2f1c46, #150c20 65%)",
  "radial-gradient(circle at 70% 30%, #351f4d, #150c20 65%)",
  "radial-gradient(circle at 50% 70%, #241536, #0f081a 65%)",
  "radial-gradient(circle at 30% 60%, #2f1c46, #150c20 65%)",
  "radial-gradient(circle at 70% 40%, #2a1a3d, #150c20 65%)",
  "radial-gradient(circle at 50% 30%, #3a2050, #150c20 65%)",
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    setChapter((current) => Math.max(0, Math.min(CHAPTERS.length - 1, current + (dx < 0 ? 1 : -1))));
  };

  const goNext = () => setChapter((c) => Math.min(c + 1, CHAPTERS.length - 1));
  const replay = () => setChapter(0);

  const ensurePlaying = () => {
    if (!siteConfig.musicEnabled || !audioRef.current) return;
    void audioRef.current.play().catch(() => setPlaying(false));
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      void audioRef.current.play().catch(() => setPlaying(false));
    }
  };

  useEffect(() => {
    document.title = `A Surprise for ${siteConfig.friendName} 🎉`;
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "var(--bg-deep)", touchAction: "pan-y" }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {loading && <Loader onDone={() => setLoading(false)} />}

      {!loading && (
        <>
          <CustomCursor />
          <AmbientParticles mode={chapter === CHAPTERS.length - 1 ? "rise" : "float"} />
          <div className="grain" />

          {siteConfig.musicEnabled && (
            <>
              <audio ref={audioRef} src={siteConfig.musicSrc} loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />
              <AudioToggle playing={playing} onToggle={toggleAudio} />
            </>
          )}

          <motion.div
            className="absolute inset-0 -z-10"
            animate={{ background: BG_GRADIENTS[chapter] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <div className="relative w-full h-full" style={{ zIndex: 2 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter}
                initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                {CHAPTERS[chapter] === "hero" && (
                  <Hero
                    onNext={() => {
                      ensurePlaying();
                      goNext();
                    }}
                  />
                )}
                {CHAPTERS[chapter] === "reasons" && <Reasons onNext={goNext} />}
                {CHAPTERS[chapter] === "gift" && <GiftChapter onNext={goNext} />}
                {CHAPTERS[chapter] === "letter" && <Letter onNext={goNext} />}
                {CHAPTERS[chapter] === "gallery" && <Gallery onNext={goNext} />}
                {CHAPTERS[chapter] === "finale" && <Finale onReplay={replay} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <ProgressDots total={CHAPTERS.length} current={chapter} />
        </>
      )}
    </div>
  );
}
