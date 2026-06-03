"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollAnimationWrapper({ children, className = "", delay = 0 }: ScrollAnimationWrapperProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15, triggerOnce: false });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
