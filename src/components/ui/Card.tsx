import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  glass = false 
}) => {
  const baseClasses = 'rounded-xl shadow-lg transition-all duration-300';
  const glassClasses = glass 
    ? 'backdrop-blur-md bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30' 
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';
  
  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={classes}
    >
      {children}
    </motion.div>
  );
};

export default Card;