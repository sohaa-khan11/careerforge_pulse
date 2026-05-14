"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className, spotlightColor = "rgba(255,255,255,0.06)", ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current || isFocused) return;

      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
      setIsFocused(true);
      setOpacity(1);
    };

    const handleBlur = () => {
      setIsFocused(false);
      setOpacity(0);
    };

    const handleMouseEnter = () => {
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    // Combine external ref with internal divRef
    const combinedRef = (node: HTMLDivElement) => {
      divRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement>).current = node;
      }
    };

    return (
      <motion.div
        ref={combinedRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-zinc-900/50 editorial-shadow transition-colors duration-500",
          className
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";
