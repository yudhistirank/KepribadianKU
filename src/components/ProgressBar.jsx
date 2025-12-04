import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ current, total }) {
  // Hitung persentase (maksimal 100%)
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full">
      {/* Label Bagian Atas */}
      <div className="flex justify-between items-end mb-2 px-1">
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Progress
          </span>
          <span className="text-sm font-semibold text-gray-700">
            {current} <span className="text-gray-400 font-normal">/</span> {total}
          </span>
        </div>
        
        <div className="text-right">
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Track Progress Bar */}
      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-100">
        {/* Fill Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative overflow-hidden"
        >
          {/* Animated Shine Effect (Kilauan) */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 h-full skew-x-12"
          />
        </motion.div>
      </div>
    </div>
  );
}