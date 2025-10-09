import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShareIcon,
  ArrowPathIcon,
  ChartBarIcon,
  TrophyIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import ResultSummary from "../components/ResultSummary";

export default function ResultPage(){
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const result = state?.result || JSON.parse(localStorage.getItem("latestResult") || "null");

  if (!result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-xl text-gray-600 mb-6">Tidak ada hasil ditemukan.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-200"
        >
          Kembali ke Home
        </motion.button>
      </motion.div>
    );
  }

  const personality = result.personality;

  const handleShare = async () => {
    setIsSharing(true);
    const shareText = `Aku baru saja menyelesaikan tes kepribadian MBTI dan hasilnya adalah ${result.type}! Temukan tipe kepribadianmu juga di KepribadianKu.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hasil Tes Kepribadian MBTI',
          text: shareText,
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Hasil tes berhasil disalin ke clipboard!');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
    setIsSharing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      {/* Hero Result Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl shadow-lg mb-8 border border-blue-100"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-2xl">
              {result.type}
            </div>
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <SparklesIcon className="w-5 h-5 text-yellow-800" />
            </motion.div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
                <TrophyIcon className="w-4 h-4" />
                Hasil Tes Kepribadian
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Kamu adalah <span className="text-indigo-600">{result.type}</span>
              </h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {personality?.personality || "The Personality"}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {personality?.description || "Deskripsi tipe kepribadian akan muncul di sini."}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Results */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <ResultSummary scores={result.scores} />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { localStorage.removeItem("latestResult"); navigate("/intro"); }}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Coba Tes Lagi
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/types/${result.type}`)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-indigo-200 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
        >
          <ChartBarIcon className="w-5 h-5" />
          Lihat Detail Tipe
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          disabled={isSharing}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          <ShareIcon className="w-5 h-5" />
          {isSharing ? "Membagikan..." : "Bagikan Hasil"}
        </motion.button>
      </motion.div>

      {/* Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Pengembangan Tipe Kepribadian
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Setiap tipe kepribadian memiliki kekuatan dan karakteristik unik yang dapat dikembangkan.
            Pemahaman mendalam tentang tipe Anda akan membantu dalam pengembangan diri dan hubungan interpersonal.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
