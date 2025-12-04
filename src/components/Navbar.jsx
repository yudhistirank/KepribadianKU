import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // --- 1. DEKLARASIKAN SEMUA HOOKS TERLEBIH DAHULU ---
  
  // Efek shadow saat discroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu mobile saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // --- 2. BARU LAKUKAN PENGECEKAN RETURN ---
  // Jika sedang berada di halaman "/test", jangan tampilkan navbar
  // PENTING: Ini harus ditaruh SETELAH semua hooks (useState, useEffect)
  if (location.pathname === "/test") {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* --- LOGO --- */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
              Kepribadian<span className="text-blue-600">Ku</span>
            </span>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/types"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group"
            >
              Jelajahi Tipe
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Tombol CTA */}
            <Link
              to="/intro"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Mulai Tes
            </Link>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link
                to="/types"
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Jelajahi Tipe
              </Link>
              <Link
                to="/intro"
                className="block px-4 py-3 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md text-center transition-transform active:scale-95"
              >
                Mulai Tes Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}