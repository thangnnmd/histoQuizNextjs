'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
  Chart,
  ChartConfiguration,
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions
} from 'chart.js';

// Add these constants
const QUIZ_RESULT_KEY = (topicId: string) => `quiz_result_${topicId}`;
const QUIZ_PROGRESS_KEY = (topicId: string) => `quiz_progress_${topicId}`;

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  timeSpent: string;
  correctAnswers: number;
  wrongAnswers: number;
  detailedResults: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
  onRetry: () => void;
  onBackToTopics: () => void; // Đảm bảo prop này được định nghĩa
  topic: { id: string; name: string }; // Add topic prop
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  timeSpent,
  correctAnswers,
  wrongAnswers,
  detailedResults,
  onRetry,
  onBackToTopics, // Đảm bảo prop này được nhận
  topic
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      Chart.register(DoughnutController, ArcElement, Legend, Tooltip);
      
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const data: ChartData<'doughnut', number[]> = {
          labels: ['Đúng', 'Sai'],
          datasets: [{
            data: [correctAnswers, wrongAnswers],
            backgroundColor: ['#4ade80', '#f87171'],
            borderWidth: 0,
            borderRadius: 6,
            spacing: 2
          }]
        };

        const options: ChartOptions<'doughnut'> = {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.formattedValue;
                  const dataset = context.dataset.data as number[];
                  const total = dataset.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((Number(context.raw) / total) * 100);
                  return `${label}: ${value} câu (${percentage}%)`;
                }
              },
              titleFont: {
                size: 14,
                family: "'Inter', sans-serif"
              },
              bodyFont: {
                size: 13,
                family: "'Inter', sans-serif"
              },
              padding: 12,
              boxPadding: 6
            }
          }
        };

        const config: ChartConfiguration<'doughnut'> = {
          type: 'doughnut',
          data,
          options: {
            ...options,
            cutout: '75%'
          }
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [correctAnswers, wrongAnswers]);

  const percentage = Math.round((score / totalQuestions) * 100);
  const getScoreMessage = (percent: number) => {
    if (percent >= 90) return { text: 'Xuất sắc!', icon: '🎉' };
    if (percent >= 80) return { text: 'Rất tốt!', icon: '👏' };
    if (percent >= 70) return { text: 'Khá tốt!', icon: '👍' };
    if (percent >= 60) return { text: 'Cần cố gắng thêm!', icon: '💪' };
    return { text: 'Hãy ôn tập lại nhé!', icon: '📚' };
  };

  const scoreMessage = getScoreMessage(percentage);

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Kết quả tổng quan */}
      <motion.div variants={itemVariants} className="bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2">
          <h2 className="text-lg sm:text-xl font-bold text-white text-center">Kết quả bài kiểm tra</h2>
          <p className="text-blue-100 text-center text-xs">{timeSpent}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
          {/* Điểm số */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-1 flex items-center">
              {percentage}<span className="text-xl ml-1">%</span>
            </div>
            <p className="text-gray-600 text-xs">{score}/{totalQuestions} câu đúng</p>
            <div className="mt-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
              <p className="text-xs font-medium text-blue-800 flex items-center gap-1">
                <span>{scoreMessage.icon}</span>{scoreMessage.text}
              </p>
            </div>
          </div>

          {/* Biểu đồ - Thiết kế nhỏ gọn */}
          <div className="bg-white rounded-lg border border-gray-100 p-3">
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-[140px] aspect-square mb-1">
                <canvas ref={chartRef} className="drop-shadow-sm" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-gray-800">{correctAnswers}</div>
                  <div className="text-xs text-gray-500">câu đúng</div>
                </div>
              </div>
              
              {/* Thông tin chi tiết */}
              <div className="w-full flex justify-center gap-4 mt-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#4ade80]"></div>
                  <span className="text-xs text-gray-700">Đúng: {correctAnswers} ({Math.round((correctAnswers / totalQuestions) * 100)}%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#f87171]"></div>
                  <span className="text-xs text-gray-700">Sai: {wrongAnswers} ({Math.round((wrongAnswers / totalQuestions) * 100)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chi tiết từng câu */}
      <motion.div variants={itemVariants} className="bg-white rounded-b-xl shadow-lg p-6 !mt-0">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Chi tiết từng câu hỏi
        </h3>
        <div className="space-y-4">
          {detailedResults.map((result, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`rounded-xl p-4 sm:p-6 border-2 ${
                result.isCorrect ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  result.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {result.isCorrect ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-3">Câu {index + 1}: {result.question}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Câu trả lời của bạn:
                      </p>
                      <p className={`font-medium ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {result.userAnswer}
                      </p>
                    </div>
                    {!result.isCorrect && (
                      <div>
                        <p className="text-gray-600 mb-1 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Đáp án đúng:
                        </p>
                        <p className="font-medium text-green-600">{result.correctAnswer}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Nút điều hướng */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 pt-4 pb-4 !mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Clear results and reset quiz
            localStorage.removeItem(QUIZ_RESULT_KEY(topic.id));
            
            // Clear saved answers
            localStorage.removeItem(QUIZ_PROGRESS_KEY(topic.id));
            
            onRetry();
          }}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-base font-medium shadow-md flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Làm lại bài kiểm tra
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Không cần xóa dữ liệu ở đây nữa vì đã được xử lý trong handleBackToTopics
            onBackToTopics();
          }}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-base font-medium shadow-md flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Chọn chủ đề khác
        </motion.button>
      </motion.div>
    </motion.div>
  );
}; 
