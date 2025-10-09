import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ current, total }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const pct = Math.round((current / total) * 100);

  useEffect(() => {
    // Animate progress change
    const timer = setTimeout(() => {
      setAnimatedProgress(pct);
    }, 100);
    return () => clearTimeout(timer);
  }, [pct]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm font-medium text-gray-700">
          Progress Tes
        </div>
        <div className="text-sm font-semibold text-indigo-600">
          {current} / {total}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative overflow-hidden"
        >
          {/* Animated shine effect */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>

      <div className="mt-2 text-center">
        <span className="text-sm text-gray-600">
          {animatedProgress}% selesai
        </span>
      </div>
    </motion.div>
  );
}
