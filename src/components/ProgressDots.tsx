export default function ProgressDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-5 z-40 flex gap-2"
      aria-label={`Chapter ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full transition-all duration-500"
          style={{
            width: i === current ? "22px" : "6px",
            background:
              i === current
                ? "linear-gradient(90deg, var(--gold), var(--coral))"
                : "rgba(247,236,217,0.25)",
          }}
        />
      ))}
    </div>
  );
}
