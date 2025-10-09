import React from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon, ClockIcon, UserGroupIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-12">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Temukan Tipe Kepribadian Anda
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Kepribadian<span className="text-blue-600">Ku</span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Platform terpercaya untuk menganalisis tipe kepribadian MBTI Anda melalui tes komprehensif dengan 80 pertanyaan ilmiah.
              Dapatkan pemahaman mendalam tentang karakteristik unik diri Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/intro"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Mulai Tes MBTI
                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/types"
                className="group bg-white border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300"
              >
                Jelajahi Tipe MBTI
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">16</div>
                <div className="text-gray-600 font-medium">Tipe Kepribadian</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">80</div>
                <div className="text-gray-600 font-medium">Pertanyaan</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">8-12</div>
                <div className="text-gray-600 font-medium">Menit</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600 font-medium">Akurat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-indigo-200 rounded-full opacity-10 blur-3xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Keunggulan Platform Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Teknologi analisis kepribadian terkini dengan akurasi tinggi dan pemahaman mendalam
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Akurat & Valid</h3>
              <p className="text-gray-600 leading-relaxed">
                Metode penilaian berdasarkan standar MBTI internasional dengan validitas terbukti
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Cepat & Efisien</h3>
              <p className="text-gray-600 leading-relaxed">
                Proses analisis cepat dengan hasil instan tanpa menunggu lama
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Detail Lengkap</h3>
              <p className="text-gray-600 leading-relaxed">
                Analisis mendalam dengan penjelasan karakteristik tipe kepribadian
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Visualisasi Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Representasi grafis yang membantu memahami hasil analisis dengan mudah
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Mulai Perjalanan Pengenalan Diri Anda
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Bergabunglah dengan komunitas profesional yang telah memahami kepribadian mereka
          </p>
          <Link
            to="/intro"
            className="inline-flex items-center bg-white text-blue-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Mulai Tes Sekarang
          </Link>
        </div>
      </div>

    </div>
  );
}
