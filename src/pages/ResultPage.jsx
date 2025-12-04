import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShareIcon,
  ArrowPathIcon,
  ChartBarIcon,
  TrophyIcon,
  SparklesIcon,
  CheckIcon,
  HomeIcon
} from "@heroicons/react/24/outline";
import ResultSummary from "../components/ResultSummary";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  
  // Ambil data dari state atau localStorage
  const result = state?.result || JSON.parse(localStorage.getItem("latestResult") || "null");

  // --- LOGIC SCROLL TO TOP ---
  // Otomatis scroll ke atas saat halaman dimuat
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // --- NO RESULT STATE ---
  if (!result) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50/50 p-6 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md w-full border border-white/60"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-3xl mb-6 shadow-inner">
            <SparklesIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Hasil</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Sepertinya Anda belum menyelesaikan tes atau data tidak ditemukan.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Kembali ke Beranda
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const personality = result.personality;

  // --- SHARE LOGIC ---
  const handleShare = async () => {
    setIsSharing(true);
    const shareText = `Aku adalah seorang ${result.type} (${personality?.personality})! 🌟\n\nCek tipe kepribadianmu di KepribadianKu.`;

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
      try {
        await navigator.clipboard.writeText(shareText);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.log('Error copying:', err);
      }
    }
    setIsSharing(false);
  };

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] pb-24 pt-24 md:pt-32">
      
      {/* Background Decor (Konsisten) */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[50rem] h-[50rem] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob"></div>
        <div className="absolute top-[30%] right-[-10%] w-[40rem] h-[40rem] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        
        {/* --- HERO RESULT SECTION --- */}
        <motion.div 
          variants={itemVariants}
          className="relative bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/60 p-8 md:p-12 mb-12 overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-[100%] -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
            
            {/* Left: Avatar / Type Code */}
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white/30">
                <span className="text-4xl md:text-6xl font-black text-white tracking-wider">
                  {result.type}
                </span>
                <div className="mt-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                  <SparklesIcon className="w-5 h-5 text-yellow-300" />
                </div>
              </div>
              
              {/* Confetti Decoration */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-full border border-dashed border-indigo-300/50 rounded-full scale-125 pointer-events-none"
              ></motion.div>
            </motion.div>

            {/* Right: Text Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                  <TrophyIcon className="w-4 h-4" />
                  Analisis Selesai
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
                  Halo, sang <br/>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    {personality?.personality || "Visionary"}
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-2xl">
                  {personality?.description || "Deskripsi lengkap tentang kepribadian Anda belum tersedia di database, namun hasil perhitungan skor Anda tetap valid."}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* --- DETAILED SCORES SECTION --- */}
        <motion.div variants={itemVariants}>
          {/* Bungkus ResultSummary dengan style glass agar konsisten */}
          <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 shadow-lg border border-white/50 mb-10">
             <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
                <ChartBarIcon className="w-7 h-7 text-indigo-500" />
                Komposisi Kepribadian
             </h3>
             <ResultSummary scores={result.scores} />
          </div>
        </motion.div>

        {/* --- ACTION BUTTONS --- */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
        >
          {/* Tombol Retake */}
          <button
            onClick={() => { localStorage.removeItem("latestResult"); navigate("/intro"); }}
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-200 hover:border-indigo-200 text-gray-600 hover:text-indigo-600 rounded-2xl font-semibold shadow-sm hover:shadow-md transition-all duration-300"
          >
            <ArrowPathIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Tes Ulang
          </button>

          {/* Tombol Details */}
          <button
            onClick={() => navigate(`/types/${result.type}`)}
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-2xl font-semibold shadow-sm hover:shadow-md transition-all duration-300"
          >
            <ChartBarIcon className="w-5 h-5" />
            Detail {result.type}
          </button>

          {/* Tombol Share */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="relative overflow-hidden flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            {showCopied ? (
              <>
                 <CheckIcon className="w-5 h-5" />
                 Tersalin!
              </>
            ) : (
              <>
                 <ShareIcon className="w-5 h-5" />
                 {isSharing ? "..." : "Bagikan Hasil"}
              </>
            )}
          </button>
        </motion.div>

        {/* --- FOOTER INFO --- */}
        <motion.div 
          variants={itemVariants}
          className="text-center pb-10"
        >
           <button 
             onClick={() => navigate('/')}
             className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors text-sm font-medium"
           >
              <HomeIcon className="w-4 h-4" />
              Kembali ke Halaman Utama
           </button>
        </motion.div>

      </motion.div>
    </div>
  );
}