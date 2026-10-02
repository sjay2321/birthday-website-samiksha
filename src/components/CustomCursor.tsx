import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("button, a, [data-cursor-hover]");
      ringRef.current?.classList.toggle("scale-150", !!interactive);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);

    let raf: number;
    const animate = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "auto";
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[70] hidden md:block"
        style={{ background: "var(--gold)", marginLeft: -3, marginTop: -3 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[70] hidden md:block transition-transform duration-150 border"
        style={{ borderColor: "rgba(240,185,77,0.5)", marginLeft: -16, marginTop: -16 }}
      />
    </>
  );
}
