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
  AcademicCapIcon
} from "@heroicons/react/24/outline";
import api from "../api/apiClient";

export default function PersonalityDetail(){
  const { type } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!p) {
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
        <p className="text-xl text-gray-600 mb-6">Tipe kepribadian tidak ditemukan.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/types")}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-200"
        >
          Kembali ke Daftar Tipe
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ x: -2 }}
        onClick={() => navigate("/types")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Daftar Tipe
      </motion.button>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl shadow-lg border border-blue-100"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-2xl">
              {p.type}
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <StarIcon className="w-5 h-5 text-yellow-800" />
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
                <UserIcon className="w-4 h-4" />
                Tipe Kepribadian {p.type}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {p.personality}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Career Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <BriefcaseIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Karier yang Cocok</h3>
          </div>

          {p.career && p.career.length > 0 ? (
            <div className="space-y-3">
              {p.career.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{career}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Informasi karir belum tersedia.</p>
          )}
        </motion.div>

        {/* Characteristics Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <AcademicCapIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Ciri Khas</h3>
          </div>

          {p.characteristic && p.characteristic.length > 0 ? (
            <div className="space-y-3">
              {p.characteristic.map((characteristic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{characteristic}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Informasi ciri khas belum tersedia.</p>
          )}
        </motion.div>
      </div>

      {/* Relationships Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <HeartIcon className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Hubungan & Interaksi</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2 flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-pink-500" />
                Dalam Pasangan
              </h4>
              <div className="p-4 bg-pink-50 rounded-lg">
                <p className="text-gray-700">{p.lovers || "Informasi tentang pasangan belum tersedia."}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2 flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-purple-500" />
                Dalam Pertemanan
              </h4>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-gray-700">{p.friendship || "Informasi tentang pertemanan belum tersedia."}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Ingin Tahu Tipe Kepribadianmu?</h3>
        <p className="text-blue-100 mb-6">
          Jawab 80 pertanyaan sederhana dan temukan tipe kepribadian aslimu dalam 8-12 menit!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/intro")}
          className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Mulai Tes Sekarang
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
