import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientSphereProps {
  size?: number;
  className?: string;
  children?: ReactNode;
}

export function GradientSphere({ size = 400, className = "", children }: GradientSphereProps) {
  return (
    <motion.div
      className={`gradient-sphere relative ${className}`}
      style={{
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </motion.div>
  );
}
