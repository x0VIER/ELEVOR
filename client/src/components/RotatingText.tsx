import React, { useState, useEffect } from 'react';

interface RotatingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({ texts, interval = 3000, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsAnimating(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span
      className={`inline-block transition-all duration-500 ${
        isAnimating ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
      } ${className}`}
    >
      {texts[currentIndex]}
    </span>
  );
};

export default RotatingText;
