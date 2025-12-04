import React from "react";
import { motion } from "framer-motion";

export default function QuestionCard({ question, value, onChange }) {
  const options = [
    { label: "Sangat Tidak Setuju", score: 1 },
    { label: "Tidak Setuju", score: 2 },
    { label: "Netral", score: 3 },
    { label: "Setuju", score: 4 },
    { label: "Sangat Setuju", score: 5 },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-medium text-gray-800 mb-6 leading-relaxed">
        {question.text || question.question || "Pertanyaan tidak dimuat"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {options.map((option) => {
          const isSelected = value === option.score;
          
          return (
            <motion.button
              key={option.score}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(option.score)} // Selalu bisa diklik
              className={`
                py-3 px-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200
                flex items-center justify-center text-center h-full
                ${isSelected 
                  ? "bg-blue-600 border-blue-600 text-white shadow-md transform scale-105" // Style jika dipilih
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50" // Style normal
                }
              `}
            >
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}