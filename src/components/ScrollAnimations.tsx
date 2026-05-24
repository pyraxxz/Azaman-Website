"use client";

import React, { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   1. ParallaxLayer
   A wrapper that moves its children at a different speed relative to scroll.
   ───────────────────────────────────────────────────────────────────────────── */

interface ParallaxLayerProps {
  /** Scroll speed multiplier (-1 to 1). Negative = opposite direction. */
  speed?: number;
  className?: string;
  children?: React.ReactNode;
}

export function ParallaxLayer({
  speed = 0.5,
  className,
  children,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clampedSpeed = Math.max(-1, Math.min(1, speed));
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [`${clampedSpeed * -100}px`, `${clampedSpeed * 100}px`]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. RevealOnScroll
   Reveals children when they enter the viewport with configurable direction.
   ───────────────────────────────────────────────────────────────────────────── */

type RevealDirection = "up" | "down" | "left" | "right";

interface RevealOnScrollProps {
  /** Direction from which the element enters */
  direction?: RevealDirection;
  /** Delay before animation starts (seconds) */
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

const revealOffsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function RevealOnScroll({
  direction = "up",
  delay = 0,
  className,
  children,
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = revealOffsets[direction];

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. StaggerContainer
   Staggers the entrance animations of its children.
   ───────────────────────────────────────────────────────────────────────────── */

interface StaggerContainerProps {
  /** Delay between each child's animation (seconds) */
  staggerDelay?: number;
  className?: string;
  children?: React.ReactNode;
}

export function StaggerContainer({
  staggerDelay = 0.1,
  className,
  children,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          delayChildren: 0.1,
        },
      },
    }),
    [staggerDelay, prefersReducedMotion]
  );

  const childVariants: Variants = useMemo(
    () => ({
      hidden: prefersReducedMotion
        ? { opacity: 1 }
        : { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    }),
    [prefersReducedMotion]
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={childVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. FloatingElement
   Makes its children float with a subtle up/down animation.
   ───────────────────────────────────────────────────────────────────────────── */

interface FloatingElementProps {
  /** Vertical float distance in pixels */
  amplitude?: number;
  /** Animation cycle duration in seconds */
  duration?: number;
  /** Start delay in seconds */
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

export function FloatingElement({
  amplitude = 10,
  duration = 3,
  delay = 0,
  className,
  children,
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        prefersReducedMotion
          ? {}
          : { y: [-amplitude, amplitude, -amplitude] }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. TextReveal
   Text that reveals character by character or word by word.
   ───────────────────────────────────────────────────────────────────────────── */

interface TextRevealProps {
  /** The text to animate */
  text: string;
  /** Reveal mode: by word or by character */
  mode?: "word" | "char";
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
}

export function TextReveal({
  text,
  mode = "word",
  className,
  delay = 0,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const segments = useMemo(() => {
    if (mode === "char") {
      return text.split("");
    }
    // Split into words but preserve spaces
    return text.split(/(\s+)/);
  }, [text, mode]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : mode === "char" ? 0.03 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const segmentVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className={className}
      aria-label={text}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={`${segment}-${i}`}
          variants={segmentVariants}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          aria-hidden="true"
        >
          {segment}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. ScaleOnHover
   Scales up slightly on hover with a spring animation.
   ───────────────────────────────────────────────────────────────────────────── */

interface ScaleOnHoverProps {
  /** Scale factor on hover */
  scale?: number;
  className?: string;
  children?: React.ReactNode;
}

export function ScaleOnHover({
  scale = 1.05,
  className,
  children,
}: ScaleOnHoverProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale }}
      whileTap={prefersReducedMotion ? {} : { scale: scale * 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   7. GlowPulse
   A subtle pulsing glow effect behind its children.
   ───────────────────────────────────────────────────────────────────────────── */

interface GlowPulseProps {
  /** Glow color (any CSS color) */
  color?: string;
  /** Glow spread size in pixels */
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

export function GlowPulse({
  color = "rgba(99, 102, 241, 0.6)",
  size = 20,
  className,
  children,
}: GlowPulseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div style={{ position: "relative", display: "inline-block" }} className={className}>
      {/* Glow layer */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: `-${size / 2}px`,
          borderRadius: "inherit",
          background: "transparent",
          zIndex: -1,
          pointerEvents: "none",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                boxShadow: [
                  `0 0 ${size}px ${size / 2}px ${color}`,
                  `0 0 ${size * 1.5}px ${size}px ${color}`,
                  `0 0 ${size}px ${size / 2}px ${color}`,
                ],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}
