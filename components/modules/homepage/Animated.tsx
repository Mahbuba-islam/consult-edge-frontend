"use client";

import { useScrollAnimation } from "@/hooks/scrollAnimation";
import { ReactNode } from "react";

interface AnimatedProps {
  children: ReactNode;
  className?: string;
}

export function Animated({ children, className = "" }: AnimatedProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`opacity-0 ${isVisible ? "animate-fadeUp" : ""} ${className}`}
    >
      {children}
    </div>
  );
}