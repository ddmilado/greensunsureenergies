"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
};

export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  const reduceMotion = useReducedMotion();

  return (
    <Component
      className={className}
      variants={variants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-24px" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
