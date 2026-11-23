import { useEffect, useState } from "react";

const phrases = ["machine learning models", "AI agents", "automation workflows", "data pipelines"];

export function RotatingHeadline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timers: ReturnType<typeof setTimeout>[] = [];
    const sync = () => {
      timers.forEach(clearTimeout);
      setActive(0);
      if (!motion.matches) {
        timers = phrases.map((_, index) => setTimeout(() => setActive((index + 1) % phrases.length), (index + 1) * 1150));
      }
    };
    sync();
    motion.addEventListener("change", sync);
    return () => {
      timers.forEach(clearTimeout);
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <p className="rotating-headline mt-6 font-display text-2xl text-muted-foreground sm:text-3xl">
      <span className="sr-only">I build machine learning models, AI agents, automation workflows, and data pipelines.</span>
      <span aria-hidden="true">I build </span>
      <span className="headline-phrases" aria-hidden="true">
        {phrases.map((phrase, index) => (
          <span key={phrase} className={`headline-phrase font-bold ${active === index ? "headline-phrase-active" : ""}`}>
            {phrase}
          </span>
        ))}
      </span>
    </p>
  );
}
