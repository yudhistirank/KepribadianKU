import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/apiClient";
import PersonalityCard from "../components/PersonalityCard";
import { SparklesIcon } from "@heroicons/react/24/solid"; // Menggunakan icon yang lebih estetik

export default function PersonalityList() {
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

  // Filter Logic
  const categories = {
    all: types,
    extrovert: types.filter((t) => t.type.startsWith("E")),
    introvert: types.filter((t) => t.type.startsWith("I")),
  };

  const filteredData = categories[selectedCategory];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
        />
        <p className="mt-4 text-indigo-400 font-medium animate-pulse">Memuat Karakteristik...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      {/* Background Decor - Abstrak Blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        {/* --- Header Section --- */}
        <div className="text-center pt-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-sm font-semibold shadow-sm mb-4">
              <SparklesIcon className="w-4 h-4 text-yellow-500" />
              Explorasi Diri
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                16 Tipe Kepribadian
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Pahami dirimu dan orang lain lebih dalam. Temukan bagaimana setiap tipe berinteraksi dengan dunia.
            </p>
          </motion.div>
        </div>

        {/* --- Floating Filter Menu --- */}
        <div className="sticky top-4 z-30 flex justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-1.5 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl flex gap-1"
          >
            {[
              { key: "all", label: "Semua" },
              { key: "extrovert", label: "Extrovert (E)" },
              { key: "introvert", label: "Introvert (I)" },
            ].map((tab) => {
              const isActive = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`
                    relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                    ${isActive ? "text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* --- Results Count --- */}
        <div className="text-center text-sm font-medium text-gray-400">
           Menampilkan {filteredData.length} hasil
        </div>

        {/* --- Grid Layout --- */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((personality) => (
              <motion.div
                layout
                key={personality.type}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="h-full"
              >
                {/* Wrapper agar Card terlihat lebih menonjol */}
                <div className="h-full transform transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 rounded-3xl">
                   <PersonalityCard p={personality} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- Footer Info --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 relative overflow-hidden rounded-3xl bg-indigo-900 text-white p-10 md:p-16 text-center shadow-2xl"
        >
          {/* Decorative circles inside footer */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 rounded-full bg-white opacity-5"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Setiap Kepribadian Itu Unik
            </h3>
            <p className="text-indigo-200 text-lg leading-relaxed mb-8">
              Tidak ada tipe yang "lebih baik" dari yang lain. Kombinasi 
              <span className="text-white font-semibold"> Introversion/Extraversion</span>, 
              <span className="text-white font-semibold"> Sensing/Intuition</span>, 
              <span className="text-white font-semibold"> Thinking/Feeling</span>, dan 
              <span className="text-white font-semibold"> Judging/Perceiving </span>
              menciptakan perspektif dunia yang berwarna.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}