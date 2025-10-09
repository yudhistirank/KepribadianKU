import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/apiClient";
import PersonalityCard from "../components/PersonalityCard";
import { UserGroupIcon } from "@heroicons/react/24/outline";

export default function PersonalityList(){
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/personalities");
        setTypes(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Group personalities by their first letter (E/I)
  const categories = {
    all: types,
    extrovert: types.filter(t => t.type.startsWith('E')),
    introvert: types.filter(t => t.type.startsWith('I'))
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
          <UserGroupIcon className="w-4 h-4" />
          Jelajahi 16 Tipe Kepribadian
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Semua Tipe MBTI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Temukan karakteristik unik dari setiap tipe kepribadian Myers-Briggs Type Indicator
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex justify-center"
      >
        <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-200">
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Semua', icon: null },
              { key: 'extrovert', label: 'Ekstrovert (E)', icon: null },
              { key: 'introvert', label: 'Introvert (I)', icon: null }
            ].map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <p className="text-gray-600">
          Menampilkan {categories[selectedCategory].length} tipe kepribadian
        </p>
      </motion.div>

      {/* Personality Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {categories[selectedCategory].map((personality) => (
          <motion.div
            key={personality.type}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <PersonalityCard p={personality} />
          </motion.div>
        ))}
      </motion.div>

      {/* Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Keunikan Setiap Tipe Kepribadian
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tidak ada tipe yang "lebih baik" dari yang lain. Setiap kombinasi dari 4 dimensi MBTI
            (Introversion/Extraversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving)
            menciptakan perspektif yang berharga dan cara pandang yang unik terhadap dunia.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
