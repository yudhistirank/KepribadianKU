import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline"; // Pastikan install heroicons atau ganti dengan svg biasa

export default function PersonalityCard({ p }) {
  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100 p-6 h-full flex flex-col overflow-hidden transition-all duration-300">
      
      {/* Decorative Gradient Background di atas */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-white opacity-60 z-0"></div>

      {/* Header: Icon & Type */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {p.type}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="relative z-10 flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-indigo-700 transition-colors">
          {p.personality}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {p.description}
        </p>
      </div>

      {/* Footer: Action Button */}
      <div className="relative z-10 mt-6 pt-4 border-t border-gray-50">
        <Link 
          to={`/types/${p.type}`} 
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Lihat Detail
          <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
      
    </div>
  );
}