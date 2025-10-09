import React from "react";
import { motion } from "framer-motion";

export default function QuestionCard({ question, value, onChange }) {
  // value: 1..5
  const labels = ["Sangat tidak setuju","Tidak setuju","Netral","Setuju","Sangat setuju"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mb-6 text-xl font-medium text-gray-800 leading-relaxed"
      >
        {question.question}
      </motion.p>

      <div className="flex gap-3 justify-between">
        {[1,2,3,4,5].map((v, index) => (
          <motion.button
            key={v}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05, duration: 0.2 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(question._id, v)}
            className={`flex-1 py-4 px-2 rounded-xl border-2 transition-all duration-200 relative overflow-hidden ${
              value === v
                ? "ring-2 ring-indigo-400 bg-indigo-50 border-indigo-400 text-indigo-700"
                : "bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-gray-700"
            }`}
            title={labels[v-1]}
          >
            <motion.div
              animate={{ scale: value === v ? 1.1 : 1 }}
              className="relative z-10"
            >
              <div className="text-sm font-medium">{labels[v-1]}</div>
              <div className={`text-xs mt-1 ${value === v ? "text-indigo-600" : "text-gray-400"}`}>
                ({v})
              </div>
            </motion.div>

            {/* Background animation for selected state */}
            {value === v && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Progress indicator */}
      {value && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            Jawaban dipilih: {labels[value-1]}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
