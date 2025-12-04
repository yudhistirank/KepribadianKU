import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Hanya untuk Progress Bar
import api from "../api/apiClient";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0); 
  const [answers, setAnswers] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const QUESTIONS_PER_PAGE = 10;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/questions");
        const data = res.data?.data || [];
        if (data.length === 0) throw new Error("Tidak ada pertanyaan tersedia");
        setQuestions(data);
      } catch (err) {
        console.error("Error loading questions:", err);
        setError("Gagal memuat pertanyaan. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // --- LOGIC SMOOTH SCROLL TO TOP ---
  // Setiap ganti halaman, scroll ke atas dengan animasi halus
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [current]);

  function handleAnswer(globalIndex, score) {
    setAnswers(prev => ({ ...prev, [globalIndex]: score }));
    
    // Auto scroll logic antar pertanyaan
    setTimeout(() => {
      const nextIndex = globalIndex + 1;
      const isNextQuestionOnPage = nextIndex < (current + 1) * QUESTIONS_PER_PAGE;

      if (isNextQuestionOnPage) {
        const nextQuestionElement = document.getElementById(`question-${nextIndex}`);
        if (nextQuestionElement) {
          nextQuestionElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        const navButtons = document.getElementById("navigation-buttons");
        if (navButtons) {
          navButtons.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }, 200); 
  }

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  async function handleNext() {
    if (current < totalPages - 1) {
      setCurrent(c => c + 1);
      return;
    }

    const payload = {
      userId: null,
      answers: questions.map((q, index) => ({
        questionId: index,
        score: answers[index] ?? 3 
      }))
    };

    try {
      const res = await api.post("/test/submit", payload);
      const result = res.data?.result;
      localStorage.setItem("latestResult", JSON.stringify(result));
      navigate("/result", { state: { result } });
    } catch (err) {
      console.error(err);
      alert("Gagal submit jawaban.");
    }
  }

  function handlePrev() {
    if (current > 0) {
      setCurrent(c => c - 1);
    }
  }

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-indigo-600 font-medium">Memuat data...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-red-100">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-red-500 rounded-full mb-4">
            <ExclamationCircleIcon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) return null;

  // --- DATA PAGINATION ---
  const startIndex = current * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);
  const progressPercent = Math.min(((startIndex + currentQuestions.length) / questions.length) * 100, 100);

  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] text-gray-800 font-sans pb-32">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[40rem] h-[40rem] bg-indigo-200/30 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-200/30 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-6">
        
        {/* --- FLOATING HEADER HUD --- */}
        <div className="sticky top-6 z-50 mb-10">
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg shadow-indigo-900/5 rounded-3xl p-5 md:p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 leading-none">Tes Kepribadian</h2>
                  <p className="text-xs text-gray-500 font-medium mt-1 tracking-wide">
                    HALAMAN {current + 1} / {totalPages}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-indigo-600 leading-none">
                  {Math.round(progressPercent)}%
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Selesai</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={false}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-indigo-600 rounded-full"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
          </div>
        </div>

        {/* --- QUESTIONS LIST --- */}
        <div className="flex flex-col gap-6">
          {currentQuestions.map((q, index) => {
            const globalIndex = startIndex + index;
            return (
              <div
                id={`question-${globalIndex}`} 
                key={q.id || globalIndex}
                className="group relative"
              >
                {/* Decorative Line */}
                <div className="absolute -left-3 md:-left-8 top-0 bottom-0 w-0.5 bg-indigo-100 hidden md:block"></div>
                
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-white text-indigo-600 border border-indigo-100 text-sm font-bold shadow-sm">
                    {globalIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Pertanyaan
                  </span>
                </div>
                
                {/* QuestionCard */}
                <div className="transition-transform duration-200 hover:translate-x-1">
                   <QuestionCard 
                     question={q} 
                     value={answers[globalIndex]} 
                     onChange={(val) => handleAnswer(globalIndex, val)} 
                   />
                </div>
              </div>
            );
          })}
        </div>

        {/* --- NAVIGATION FOOTER --- */}
        <div 
          id="navigation-buttons" 
          className="mt-16 flex justify-between items-center bg-white/80 backdrop-blur-sm p-4 rounded-[2rem] border border-gray-100 mb-10"
        >
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200 active:scale-95 ${
              current === 0 
                ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                : "bg-white text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
            }`}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <div className="text-xs font-medium text-gray-400 uppercase tracking-widest hidden sm:block">
            Langkah {current + 1} dari {totalPages}
          </div>

          <button
            onClick={handleNext}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all duration-200 active:scale-95 ${
              current === totalPages - 1
              ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30"
            }`}
          >
            {current === totalPages - 1 ? (
              <>
                <span>Selesai</span>
                <CheckCircleIcon className="w-6 h-6" />
              </>
            ) : (
              <>
                <span>Lanjut</span>
                <ArrowRightIcon className="w-6 h-6" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}