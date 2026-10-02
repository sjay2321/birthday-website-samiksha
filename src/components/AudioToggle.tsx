import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed top-5 right-5 z-40 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
      style={{
        background: "rgba(247,236,217,0.08)",
        border: "1px solid rgba(240,185,77,0.35)",
        color: "var(--gold-soft)",
      }}
    >
      {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
