import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayIcon, ClockIcon, CheckCircleIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export default function TestIntro(){
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/test');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-6">
          <LightBulbIcon className="w-4 h-4" />
          Persiapan Tes Kepribadian
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Siap Menemukan Diri{' '}
          <span className="text-indigo-600">Sebenarnya?</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Tes ini akan membantu Anda memahami tipe kepribadian MBTI Anda melalui serangkaian pertanyaan yang telah disiapkan secara ilmiah.
        </p>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white p-10 rounded-3xl shadow-lg border border-blue-100 mb-10"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Panduan Tes MBTI
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Tidak Ada Jawaban Benar/Salah</h3>
                <p className="text-gray-600 text-sm">Pilih jawaban yang paling sesuai dengan perasaan dan pengalaman Anda.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Skala Penilaian</h3>
                <p className="text-gray-600 text-sm">Skor 1 (Sangat tidak setuju) hingga 5 (Sangat setuju).</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ClockIcon className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Waktu Pengerjaan</h3>
                <p className="text-gray-600 text-sm">Tes terdiri dari 80 pertanyaan dan membutuhkan waktu sekitar 8-12 menit.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Jawab dengan Jujur</h3>
                <p className="text-gray-600 text-sm">Jawaban yang jujur akan memberikan hasil yang lebih akurat.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 rounded-3xl border border-blue-200 mb-10"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Tips untuk Hasil Terbaik
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl border border-blue-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Jawab secara spontan tanpa terlalu banyak berpikir
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-blue-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Pilih jawaban pertama yang muncul di pikiran Anda
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-blue-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Pertanyaan menggambarkan situasi umum dalam hidup
            </p>
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartTest}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <PlayIcon className="w-6 h-6" />
          Mulai Tes Sekarang
          <span className="text-2xl ml-2">🚀</span>
        </motion.button>

        <p className="text-gray-500 text-sm mt-4">
          Tes akan dimulai setelah Anda menekan tombol di atas
        </p>
      </motion.div>

      {/* Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-blue-50 text-blue-800 rounded-2xl text-sm font-medium border border-blue-200">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Dipercaya oleh lebih dari 50 juta pengguna di seluruh dunia</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
