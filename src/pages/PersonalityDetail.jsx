import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  UserIcon,
  HeartIcon,
  UsersIcon,
  StarIcon,
  AcademicCapIcon,
  SparklesIcon,
  BoltIcon
} from "@heroicons/react/24/outline";
import api from "../api/apiClient";

export default function PersonalityDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/personalities/${type}`);
        setP(res.data?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [type]);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-indigo-600 font-medium">Memuat Detail...</p>
      </div>
    );
  }

  // --- NOT FOUND STATE ---
  if (!p) {
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
             <span className="text-3xl">🤔</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tipe Tidak Ditemukan</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Maaf, tipe kepribadian yang Anda cari tidak tersedia di database kami.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/types")}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all"
          >
            Kembali ke Daftar Tipe
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] pb-24 pt-24 md:pt-32">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[50rem] h-[50rem] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob"></div>
        <div className="absolute top-[40%] right-[-10%] w-[40rem] h-[40rem] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8"
      >
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ x: -4 }}
          onClick={() => navigate("/types")}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Kembali ke Daftar Tipe
        </motion.button>

        {/* --- HERO DETAIL SECTION --- */}
        <motion.div
          variants={itemVariants}
          className="relative bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/60 p-8 md:p-12 overflow-hidden"
        >
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-[100%] -mr-10 -mt-10 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white/30">
                <span className="text-4xl md:text-5xl font-black text-white tracking-wider">
                  {p.type}
                </span>
                <div className="mt-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                  <StarIcon className="w-5 h-5 text-yellow-300" />
                </div>
              </div>
            </motion.div>

            {/* Title & Desc */}
            <div className="flex-1 text-center md:text-left">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                  <UserIcon className="w-4 h-4" />
                  Profil Kepribadian
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {p.personality}
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* --- CONTENT GRID --- */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Career Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-lg border border-white/50 h-full"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <BriefcaseIcon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Karier Ideal</h3>
            </div>

            {p.career && p.career.length > 0 ? (
              <div className="grid gap-3">
                {p.career.map((career, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5, backgroundColor: "rgba(240, 253, 244, 0.8)" }}
                    className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-2xl border border-gray-100 transition-all cursor-default"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm shadow-green-200"></div>
                    <span className="text-gray-700 font-medium">{career}</span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Data karier belum tersedia.</p>
            )}
          </motion.div>

          {/* Characteristics Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-lg border border-white/50 h-full"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <AcademicCapIcon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Karakteristik Utama</h3>
            </div>

            {p.characteristic && p.characteristic.length > 0 ? (
              <div className="grid gap-3">
                {p.characteristic.map((char, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5, backgroundColor: "rgba(239, 246, 255, 0.8)" }}
                    className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-2xl border border-gray-100 transition-all cursor-default"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm shadow-blue-200"></div>
                    <span className="text-gray-700 font-medium">{char}</span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Data karakteristik belum tersedia.</p>
            )}
          </motion.div>
        </div>

        {/* --- RELATIONSHIPS SECTION --- */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-white/50"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500">
              <HeartIcon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Dinamika Hubungan</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Romance */}
            <div className="bg-pink-50/50 p-6 rounded-3xl border border-pink-100">
              <h4 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-4">
                <HeartIcon className="w-6 h-6 text-pink-500" />
                Asmara & Pasangan
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {p.lovers || "Belum ada informasi spesifik mengenai hubungan asmara untuk tipe ini."}
              </p>
            </div>

            {/* Friendship */}
            <div className="bg-purple-50/50 p-6 rounded-3xl border border-purple-100">
              <h4 className="flex items-center gap-3 text-lg font-bold text-gray-900 mb-4">
                <UsersIcon className="w-6 h-6 text-purple-500" />
                Pertemanan & Sosial
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {p.friendship || "Belum ada informasi spesifik mengenai dinamika pertemanan untuk tipe ini."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- CTA SECTION --- */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-indigo-400 opacity-20 blur-2xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ingin Mengetahui Tipemu?
            </h3>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              Ikuti tes komprehensif kami dan dapatkan analisis mendalam tentang kepribadian Anda dalam kurang dari 12 menit.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/intro")}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-700 rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              <BoltIcon className="w-6 h-6" />
              Mulai Tes Sekarang
            </motion.button>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}