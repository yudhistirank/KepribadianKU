import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/apiClient";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";

export default function TestPage(){
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: score }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log("TestPage rendered, loading:", loading, "questions length:", questions.length);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/questions");
        const data = res.data?.data || [];

        if (data.length === 0) {
          throw new Error("Tidak ada pertanyaan tersedia");
        }

        setQuestions(data);
      } catch (err) {
        console.error("Error loading questions:", err);

        let errorMessage = "Gagal memuat pertanyaan dari server.";

        if (err.code === 'ECONNABORTED') {
          errorMessage = "Koneksi timeout. Pastikan server backend sedang berjalan.";
        } else if (err.response) {
          if (err.response.status === 404) {
            errorMessage = "API endpoint tidak ditemukan. Pastikan backend server berjalan di port 5000.";
          } else if (err.response.status >= 500) {
            errorMessage = "Server backend bermasalah. Silakan coba lagi nanti.";
          } else {
            errorMessage = `Server error: ${err.response.status} - ${err.response.statusText}`;
          }
        } else if (err.request) {
          errorMessage = "Tidak dapat terhubung ke server backend. Pastikan server berjalan di http://localhost:5000";
        } else {
          errorMessage = `Error: ${err.message}`;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function handleAnswer(questionIndex, score){
    setAnswers(prev => ({ ...prev, [questionIndex]: score }));
  }

  async function handleNext(){
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      return;
    }
    // submit
    const payload = {
      userId: null,
      answers: questions.map((q, index) => ({
        questionId: index,
        score: answers[index] ?? 3 // default netral 3
      }))
    };
    try {
      const res = await api.post("/test/submit", payload);
      const result = res.data?.result;
      // save locally so ResultPage dapat akses walau refresh
      localStorage.setItem("latestResult", JSON.stringify(result));
      navigate("/result", { state: { result } });
    } catch (err) {
      console.error(err);
      alert("Gagal submit jawaban.");
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full mb-6"
        />
        <p className="text-lg text-gray-600 font-medium">Memuat Pertanyaan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Terjadi Kesalahan</h3>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">{error}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setError(null);
              setLoading(true);
              window.location.reload();
            }}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Coba Lagi
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-white border-2 border-blue-200 text-blue-700 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-200"
          >
            Kembali ke Beranda
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!questions.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-xl text-gray-600">Tidak ada pertanyaan tersedia.</p>
      </motion.div>
    );
  }

  const q = questions[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto"
    >
      <ProgressBar current={current+1} total={questions.length} />
      <QuestionCard question={q} value={answers[current]} onChange={handleAnswer} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="flex justify-between items-center mt-12"
      >
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
            current === 0
              ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white border-2 border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50"
          }`}
        >
          <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Sebelumnya
        </motion.button>

        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="text-base text-gray-600 bg-blue-50 px-4 py-3 rounded-2xl border border-blue-200"
          >
            Soal {current+1} dari {questions.length}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className={`px-10 py-4 rounded-2xl font-bold text-white transition-all duration-200 shadow-lg hover:shadow-xl ${
              current === questions.length - 1
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            }`}
          >
            {current === questions.length - 1 ? (
              <span className="flex items-center gap-2">
                Selesai & Lihat Hasil
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Berikutnya
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
