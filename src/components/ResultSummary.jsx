import React from "react";
import { motion } from "framer-motion";

export default function ResultSummary({ scores }) {
  // scores: { I: val, E: val, N: val, S: val, F: val, T: val, J: val, P: val }
  const dims = [
    { pair: ["I","E"], label: "Introversion vs Extroversion", color: "from-blue-500 to-blue-600" },
    { pair: ["N","S"], label: "Intuition vs Sensing", color: "from-green-500 to-green-600" },
    { pair: ["F","T"], label: "Feeling vs Thinking", color: "from-purple-500 to-purple-600" },
    { pair: ["J","P"], label: "Judging vs Perceiving", color: "from-orange-500 to-orange-600" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {dims.map(({ pair: [a, b], label, color }, index) => {
        const aScore = scores[a] ?? 0;
        const bScore = scores[b] ?? 0;
        const total = aScore + bScore || 1;
        const aPct = Math.round((aScore / total) * 100);
        const bPct = 100 - aPct;

        return (
          <motion.div
            key={a}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-gray-800">{label}</div>
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {aScore} / {bScore}
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className={`${aPct > bPct ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>
                  {a} ({aPct}%)
                </span>
                <span className={`${bPct > aPct ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>
                  {b} ({bPct}%)
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div className="flex h-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${aPct}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className={`bg-gradient-to-r ${color} h-full rounded-l-full`}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bPct}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className="bg-gradient-to-r from-gray-300 to-gray-400 h-full rounded-r-full"
                  />
                </div>
              </div>

              {/* Visual indicator for dominant trait */}
              <div className="mt-2 text-center">
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  aPct > bPct
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {aPct > bPct ? `${a} Dominan` : `${b} Dominan`}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
