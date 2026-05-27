/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2700; // 2700ms total loading sequence

  // Counter animation using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const updateCounter = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * 100);

      countRef.current = currentCount;
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        // After reaching 100, add 400ms delay then call onComplete
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Word cycling every 900ms (3 words over 2700ms)
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <div 
      id="loading-screen"
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12 lg:p-16 select-none"
    >
      {/* Top Left: Portfolio Label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
      >
        Portfolio
      </motion.div>

      {/* Center: Rotating Words */}
      <div className="flex items-center justify-center flex-1">
        <div className="h-20 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 0.8, filter: "blur(0px)" }}
              exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary"
            >
              {WORDS[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Section: Counter and Metabar */}
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          {/* Subtle system detail */}
          <div className="text-[10px] font-mono text-muted/50 tracking-wider">
            SYSTEM_BOOT_SEQUENCE // OK
          </div>

          {/* Bottom-right: Counter display */}
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary leading-none tabular-nums select-none font-light">
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="relative w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full accent-gradient transition-transform duration-75 ease-out origin-left rounded-full"
            style={{ 
              width: '100%',
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 12px rgba(137, 170, 204, 0.6)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
