import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  PlayIcon, 
  ClockIcon, 
  CheckBadgeIcon, 
  LightBulbIcon,
  BoltIcon,
  HeartIcon,
  GlobeAsiaAustraliaIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function TestIntro() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/test');
  };

  // Variabel Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50/50 pt-24 pb-20">
      
      {/* --- Background Decor (Konsisten dengan Home) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[40%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6"
      >
        {/* --- HERO HEADER --- */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-600 rounded-full text-sm font-semibold shadow-sm mb-6">
            <LightBulbIcon className="w-4 h-4" />
            Persiapan Tes Kepribadian
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Siap Menemukan Diri{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Sebenarnya?
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Luangkan waktu sejenak untuk mengenal diri Anda lebih dalam melalui 
            pertanyaan psikologis yang dirancang khusus.
          </p>
        </motion.div>

        {/* --- INSTRUCTIONS CARD (Glassmorphism) --- */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-white/50 mb-10 relative overflow-hidden"
        >
           {/* Decorative sheen */}
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-400 opacity-10 blur-2xl rounded-full"></div>

          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
            <ShieldCheckIcon className="w-7 h-7 text-indigo-600" />
            Panduan Tes MBTI
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Kolom Kiri */}
            <div className="space-y-6">
              <GuideItem 
                icon={CheckBadgeIcon} 
                color="text-green-500" 
                bgColor="bg-green-50"
                title="Tidak Ada Benar/Salah" 
                desc="Jadilah diri sendiri. Pilih jawaban yang paling menggambarkan kondisi alami Anda."
              />
              <GuideItem 
                icon={ClockIcon} 
                color="text-blue-500" 
                bgColor="bg-blue-50"
                title="Estimasi Waktu" 
                desc="Tes ini terdiri dari 80 pertanyaan ringan yang memakan waktu sekitar 8-12 menit."
              />
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6">
              <GuideItem 
                icon={BoltIcon} 
                color="text-yellow-500" 
                bgColor="bg-yellow-50"
                title="Skala Penilaian" 
                desc="Skor 1 (Sangat Tidak Setuju) hingga Skor 5 (Sangat Setuju)."
              />
              <GuideItem 
                icon={HeartIcon} 
                color="text-red-500" 
                bgColor="bg-red-50"
                title="Kejujuran itu Kunci" 
                desc="Hasil akurat hanya bisa didapat jika Anda menjawab dengan jujur, bukan 'ingin terlihat' seperti apa."
              />
            </div>
          </div>
        </motion.div>

        {/* --- TIPS SECTION --- */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Tips untuk Hasil Terbaik
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <TipCard 
              icon={BoltIcon}
              text="Jawab secara spontan tanpa terlalu banyak berpikir (kurang dari 5 detik)"
            />
            <TipCard 
              icon={HeartIcon}
              text="Pilih jawaban yang muncul pertama kali di benak Anda"
            />
            <TipCard 
              icon={GlobeAsiaAustraliaIcon}
              text="Bayangkan perilaku Anda dalam situasi sehari-hari, bukan saat tertekan"
            />
          </div>
        </motion.div>

        {/* --- CTA BUTTON --- */}
        <motion.div variants={itemVariants} className="text-center relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartTest}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            <PlayIcon className="w-6 h-6" />
            <span>Mulai Tes Sekarang</span>
          </motion.button>

          <p className="text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
            <ShieldCheckIcon className="w-4 h-4" />
            Data Anda aman & tidak akan dipublikasikan
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}

// --- SUB-COMPONENTS untuk kerapian kode ---

function GuideItem({ icon: Icon, title, desc, color, bgColor }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors">
      <div className={`flex-shrink-0 w-12 h-12 ${bgColor} ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TipCard({ icon: Icon, text }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 text-indigo-600 rounded-full mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-gray-700 text-sm font-medium leading-relaxed">
        {text}
      </p>
    </div>
  );
}