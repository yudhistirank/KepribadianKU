import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 font-bold text-3xl text-blue-600 hover:text-blue-700 transition-colors"
          >
            KepribadianKu
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-12 flex items-center space-x-10">
              <Link
                to="/intro"
                className="text-gray-700 hover:text-blue-600 px-4 py-3 text-base font-medium transition-all duration-200 relative group"
              >
                Mulai Tes
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                to="/types"
                className="text-gray-700 hover:text-blue-600 px-4 py-3 text-base font-medium transition-all duration-200 relative group"
              >
                Jelajahi Tipe
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            >
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100 pb-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-3 pt-3 pb-4 space-y-2 bg-blue-50 rounded-2xl mt-4">
            <Link
              to="/intro"
              className="text-gray-700 hover:text-blue-600 block px-4 py-3 text-base font-medium transition-colors duration-200 rounded-xl hover:bg-white"
              onClick={() => setIsOpen(false)}
            >
              Mulai Tes
            </Link>
            <Link
              to="/types"
              className="text-gray-700 hover:text-blue-600 block px-4 py-3 text-base font-medium transition-colors duration-200 rounded-xl hover:bg-white"
              onClick={() => setIsOpen(false)}
            >
              Jelajahi Tipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
