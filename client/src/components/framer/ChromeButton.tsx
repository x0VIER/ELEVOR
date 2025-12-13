import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ChromeButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export function ChromeButton({
  children,
  onClick,
  href,
  className = "",
  variant = "primary",
}: ChromeButtonProps) {
  const baseClasses = "chrome-button inline-flex items-center justify-center gap-2";
  const variantClasses = variant === "secondary" 
    ? "bg-gradient-to-br from-orange-500 to-orange-600" 
    : "";

  const content = (
    <motion.div
      className={`${baseClasses} ${variantClasses} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
