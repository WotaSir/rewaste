import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Leaf {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  duration: number;
}

const FloatingLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const generateLeaves = () => {
      const newLeaves: Leaf[] = [];
      for (let i = 0; i < 15; i++) {
        newLeaves.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5,
          duration: 20 + Math.random() * 10
        });
      }
      setLeaves(newLeaves);
    };

    generateLeaves();
    window.addEventListener('resize', generateLeaves);
    return () => window.removeEventListener('resize', generateLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-green-300/20 dark:text-green-600/10"
          initial={{
            x: leaf.x,
            y: leaf.y,
            rotate: leaf.rotation,
            scale: leaf.scale
          }}
          animate={{
            x: leaf.x + (Math.random() - 0.5) * 100,
            y: leaf.y + (Math.random() - 0.5) * 100,
            rotate: leaf.rotation + 360,
            scale: leaf.scale * (0.8 + Math.random() * 0.4)
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingLeaves;