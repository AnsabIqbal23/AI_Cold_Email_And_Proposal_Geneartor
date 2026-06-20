"use client";
import { CSSProperties, useEffect, useRef, useState } from "react";

type AnimationType = "fadeUp" | "fadeIn" | "scaleUp";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
}

const HIDDEN: Record<AnimationType, CSSProperties> = {
  fadeUp:  { opacity: 0, transform: "translateY(28px)" },
  fadeIn:  { opacity: 0, transform: "none" },
  scaleUp: { opacity: 0, transform: "scale(0.95) translateY(16px)" },
};

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function AnimateIn({
  children,
  className = "",
  delay = 0,
  animation = "fadeUp",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenStyle = HIDDEN[animation];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : hiddenStyle.opacity,
        transform: visible ? "none" : (hiddenStyle.transform as string),
        transition: `opacity 0.65s ${EASING} ${delay}ms, transform 0.65s ${EASING} ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
