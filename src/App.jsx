import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import TestIntro from "./pages/TestIntro";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import PersonalityList from "./pages/PersonalityList";
import PersonalityDetail from "./pages/PersonalityDetail";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <AnimatePresence mode="wait">
        <div
          key={location.pathname}
          className="flex-1"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/intro" element={<TestIntro />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/types" element={<PersonalityList />} />
            <Route path="/types/:type" element={<PersonalityDetail />} />
          </Routes>
        </div>
      </AnimatePresence>
    </div>
  );
}
