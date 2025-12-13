import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextGlowHoverProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function TextGlowHover({
  children,
  className = "",
  glowColor = "rgba(74, 158, 255, 0.6)",
}: TextGlowHoverProps) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      whileHover={{
        textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
        scale: 1.05,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.span>
  );
}
