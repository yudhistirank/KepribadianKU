import React, { useEffect } from "react"; // Tambahkan useEffect
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckBadgeIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  SparklesIcon,
  ArrowRightIcon,
  BoltIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  // --- LOGIC SCROLL TO TOP ---
  // Setiap kali halaman ini dibuka, scroll otomatis ke paling atas
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Variabel animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50/50">
      
      {/* --- Background Decor --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-32 lg:pt-40 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center mb-8">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-600 text-sm font-semibold shadow-sm backdrop-blur-sm">
                <SparklesIcon className="w-4 h-4 mr-2 text-yellow-500" />
                Temukan Potensi Tersembunyi Anda
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
              Kenali Diri, <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Pahami Potensi
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Tes kepribadian berbasis MBTI yang dirancang untuk membantu Anda memahami kekuatan, kelemahan, dan cara Anda berinteraksi dengan dunia.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/intro"
                className="group relative px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12 -ml-4 w-[150%]"></div>
                <span className="relative flex items-center gap-2">
                  Mulai Tes Sekarang
                  <ArrowRightIcon className="w-5 h-5" />
                </span>
              </Link>
              
              <Link
                to="/types"
                className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 hover:text-blue-600 transition-all duration-300"
              >
                Jelajahi Tipe MBTI
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* --- STATS SECTION (Floating Glass Cards) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Tipe Kepribadian", value: "16", icon: SparklesIcon },
            { label: "Pertanyaan", value: "80", icon: DocumentTextIcon },
            { label: "Durasi (Menit)", value: "10", icon: ClockIcon },
            { label: "Akurasi", value: "99%", icon: CheckBadgeIcon },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 text-center hover:transform hover:scale-105 transition-transform duration-300">
               <div className="flex justify-center mb-3">
                 <stat.icon className="w-8 h-8 text-blue-500/80" />
               </div>
               <div className="text-3xl font-black text-gray-800 mb-1">{stat.value}</div>
               <div className="text-sm font-medium text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="py-32 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Platform Kami?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Teknologi analisis modern yang memberikan wawasan mendalam tentang diri Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={CheckBadgeIcon}
              title="Akurat & Valid"
              desc="Metode penilaian yang dikalibrasi dengan standar psikologi modern."
              color="text-green-500"
              bg="bg-green-50"
            />
            <FeatureCard 
              icon={BoltIcon}
              title="Cepat & Instan"
              desc="Algoritma cerdas yang memproses jawaban Anda secara real-time."
              color="text-yellow-500"
              bg="bg-yellow-50"
            />
            <FeatureCard 
              icon={DocumentTextIcon}
              title="Laporan Detail"
              desc="Bukan sekadar kode 4 huruf, tapi analisis mendalam tentang potensi karir & hubungan."
              color="text-blue-500"
              bg="bg-blue-50"
            />
             <FeatureCard 
              icon={ChartBarIcon}
              title="Visualisasi Data"
              desc="Grafik interaktif untuk melihat dominasi sifat Introvert vs Ekstrovert Anda."
              color="text-purple-500"
              bg="bg-purple-50"
            />
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-indigo-400 opacity-20 blur-2xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Siap Menjelajahi Diri Sendiri?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Jangan biarkan potensi Anda tersembunyi. Bergabunglah dengan ribuan orang yang telah menemukan arah hidup mereka.
            </p>
            <Link
              to="/intro"
              className="inline-flex items-center px-10 py-4 bg-white text-blue-700 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <BoltIcon className="w-6 h-6 mr-2" />
              Ambil Tes Gratis
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

// Komponen Kecil untuk Kartu Fitur agar kode lebih rapi
function FeatureCard({ icon: Icon, title, desc, color, bg }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-6`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">
        {desc}
      </p>
    </motion.div>
  );
}