'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResultScreen } from './ResultScreen';

interface QuizProps {
  topic: {
    id: string;
    name: string;
  };
  config: {
    questionCount: number;
    timeLimit: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  onBack: () => void;
  onBackToTopics: () => void;
}

interface Question {
  id: string;
  content: string;
  answers: {
    id: number;
    text: string;
    isCorrect: boolean;
  }[];
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type: 'warning' | 'confirm';
}

const Popup = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Xác nhận', type }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
        }`}>
          {type === 'warning' ? (
            <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center mb-6">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
          >
            Đóng
          </button>
          {type === 'confirm' && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              {confirmText}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const QUIZ_SESSION_KEY = 'quizSession';
const QUIZ_RESULT_KEY = (topicId: string) => `quiz_result_${topicId}`;
const QUIZ_PROGRESS_KEY = (topicId: string) => `quiz_progress_${topicId}`;

export default function Quiz({ topic, config, onBack, onBackToTopics }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(config.timeLimit * 60); // Convert minutes to seconds
  const [loading, setLoading] = useState(true);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<{
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
  } | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  // Save quiz session on mount
  useEffect(() => {
    const session = {
      topic,
      config,
      timestamp: Date.now(),
      inProgress: true // Đánh dấu là đang làm bài
    };
    localStorage.setItem(QUIZ_SESSION_KEY, JSON.stringify(session));

    // Cleanup on unmount
    return () => {
      const currentSession = localStorage.getItem(QUIZ_SESSION_KEY);
      if (currentSession) {
        const { timestamp } = JSON.parse(currentSession);
        // Only remove if it's the same session
        if (timestamp === session.timestamp) {
          localStorage.removeItem(QUIZ_SESSION_KEY);
        }
      }
    };
  }, [topic, config]);

  // Load saved result on mount
  useEffect(() => {
    const savedResult = localStorage.getItem(QUIZ_RESULT_KEY(topic.id));
    if (savedResult) {
      const result = JSON.parse(savedResult);
      setQuizResults(result);
      setShowResults(true);
    }
  }, [topic.id]);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem(QUIZ_SESSION_KEY);
    if (!savedSession && !localStorage.getItem(QUIZ_RESULT_KEY(topic.id))) {
      // No active session and no saved result, redirect back
      onBack();
      return;
    }

    if (savedSession) {
      const session = JSON.parse(savedSession);
      // Validate session
      if (session.topic.id !== topic.id || 
          session.config.questionCount !== config.questionCount || 
          session.config.difficulty !== config.difficulty) {
        // Session mismatch, redirect back
        onBack();
        return;
      }
    }
  }, [topic, config, onBack]);

  // Cải thiện cách khôi phục tiến trình đã lưu
  useEffect(() => {
    const savedProgress = localStorage.getItem(QUIZ_PROGRESS_KEY(topic.id));
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        console.log("Loaded saved progress:", progress); // Debug log
        
        // Khôi phục các câu trả lời đã chọn
        if (progress.answers) {
          setSelectedAnswers(progress.answers);
        }
        
        // Khôi phục thời gian còn lại
        if (progress.timeRemaining) {
          setTimeLeft(progress.timeRemaining);
        }
        
        // Khôi phục vị trí câu hỏi hiện tại
        if (typeof progress.currentIndex === 'number') {
          setCurrentQuestionIndex(progress.currentIndex);
        }
        
        // Nếu có câu hỏi đã lưu và chưa có câu hỏi được tải
        if (progress.questions && progress.questions.length > 0 && questions.length === 0) {
          setQuestions(progress.questions);
          setLoading(false); // Đánh dấu là đã tải xong
        }
      } catch (error) {
        console.error('Error parsing saved progress:', error);
      }
    }
  }, [topic.id]);

  // Sửa đổi useEffect để tải câu hỏi và đảm bảo thứ tự không thay đổi
  useEffect(() => {
    // Kiểm tra xem đã có câu hỏi từ tiến trình đã lưu chưa
    const savedProgress = localStorage.getItem(QUIZ_PROGRESS_KEY(topic.id));
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        if (progress.questions && progress.questions.length > 0 && progress.sessionId) {
          console.log("Using questions from saved progress"); // Debug log
          
          // Sử dụng chính xác câu hỏi đã lưu với thứ tự nguyên vẹn
          setQuestions(progress.questions);
          setSessionId(progress.sessionId);
          setLoading(false);
          return; // Không cần tải lại câu hỏi
        }
      } catch (error) {
        console.error('Error parsing saved progress for questions:', error);
      }
    }

    // Nếu không có câu hỏi từ tiến trình đã lưu, tạo sessionId mới và tải câu hỏi mới
    const newSessionId = `${topic.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSessionId);
    
    console.log("Fetching new questions with new sessionId:", newSessionId); // Debug log
    const fetchQuestions = async () => {
      try {
        // Thêm sessionId vào URL khi tạo bài kiểm tra mới
        const response = await fetch(`/api/questions?topicId=${topic.id}&count=${config.questionCount}&difficulty=${config.difficulty}&sessionId=${newSessionId}`);
        const data = await response.json();
        
        // Đảm bảo mỗi câu hỏi có một orderIndex để duy trì thứ tự
        const questionsWithOrder = data.map((q, index) => ({
          ...q,
          orderIndex: index // Thêm trường orderIndex để đảm bảo thứ tự
        }));
        
        setQuestions(questionsWithOrder);
        setLoading(false);
        
        // Lưu ngay lập tức để đảm bảo thứ tự được giữ nguyên
        const progressData = {
          answers: selectedAnswers,
          timeRemaining: timeLeft,
          currentIndex: currentQuestionIndex,
          questions: questionsWithOrder,
          sessionId: newSessionId, // Lưu sessionId
          timestamp: Date.now()
        };
        localStorage.setItem(QUIZ_PROGRESS_KEY(topic.id), JSON.stringify(progressData));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [topic.id, config.questionCount, config.difficulty]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    const newSelectedAnswers = {
      ...selectedAnswers,
      [questionId]: answerId,
    };
    
    setSelectedAnswers(newSelectedAnswers);
    
    // Lưu ngay lập tức sau khi chọn câu trả lời
    if (questions.length > 0) {
      const progressData = {
        answers: newSelectedAnswers,
        timeRemaining: timeLeft,
        currentIndex: currentQuestionIndex,
        questions: questions,
        sessionId: sessionId, // Thêm sessionId
        timestamp: Date.now()
      };
      localStorage.setItem(QUIZ_PROGRESS_KEY(topic.id), JSON.stringify(progressData));
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      
      // Cập nhật tiến trình ngay lập tức
      const progressData = {
        answers: selectedAnswers,
        timeRemaining: timeLeft,
        currentIndex: newIndex,
        questions: questions,
        timestamp: Date.now()
      };
      localStorage.setItem(QUIZ_PROGRESS_KEY(topic.id), JSON.stringify(progressData));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      
      // Cập nhật tiến trình ngay lập tức
      const progressData = {
        answers: selectedAnswers,
        timeRemaining: timeLeft,
        currentIndex: newIndex,
        questions: questions,
        timestamp: Date.now()
      };
      localStorage.setItem(QUIZ_PROGRESS_KEY(topic.id), JSON.stringify(progressData));
    }
  };

  const checkUnansweredQuestions = () => {
    const unanswered = questions
      .map((q, index) => (!selectedAnswers[q.id] ? index : -1))
      .filter(index => index !== -1);
    return unanswered;
  };

  const handleSubmit = async () => {
    const unanswered = checkUnansweredQuestions();
    if (unanswered.length > 0) {
      setUnansweredQuestions(unanswered);
      setShowWarningPopup(true);
    } else {
      setShowConfirmPopup(true);
    }
  };

  const handleConfirmSubmit = async () => {
    // Calculate results
    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    const detailedResults = questions.map(question => {
      const userAnswer = selectedAnswers[question.id];
      const userAnswerObj = question.answers.find(a => a.id === parseInt(userAnswer));
      const correctAnswerObj = question.answers.find(a => a.isCorrect);
      const isCorrect = userAnswerObj?.isCorrect || false;
      
      if (isCorrect) {
        score++;
        correctAnswers++;
      } else {
        wrongAnswers++;
      }

      return {
        question: question.content,
        userAnswer: userAnswerObj?.text || 'Không trả lời',
        correctAnswer: correctAnswerObj?.text || '',
        isCorrect
      };
    });

    // Calculate time spent
    const totalSeconds = config.timeLimit * 60 - timeLeft;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeSpent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const results = {
      score,
      totalQuestions: questions.length,
      timeSpent,
      correctAnswers,
      wrongAnswers,
      detailedResults
    };

    setQuizResults(results);
    setShowResults(true);
    setShowConfirmPopup(false);

    // Save results to localStorage
    localStorage.setItem(QUIZ_RESULT_KEY(topic.id), JSON.stringify(results));

    // Clear quiz progress and session
    localStorage.removeItem(QUIZ_PROGRESS_KEY(topic.id));
    localStorage.removeItem(QUIZ_SESSION_KEY);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 animate-pulse">Đang tải câu hỏi...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {showResults && quizResults ? (
        <ResultScreen
          {...quizResults}
          topic={topic}
          onRetry={() => {
            // Clear results and reset quiz
            localStorage.removeItem(QUIZ_RESULT_KEY(topic.id));
            localStorage.removeItem(QUIZ_PROGRESS_KEY(topic.id));
            setShowResults(false);
            setSelectedAnswers({});
            setTimeLeft(config.timeLimit * 60);
            setCurrentQuestionIndex(0);
            
            // Start new session
            const session = {
              topic,
              config,
              timestamp: Date.now()
            };
            localStorage.setItem('quizSession', JSON.stringify(session));
          }}
          onBackToTopics={onBackToTopics} // Use the prop passed from page.tsx
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white rounded-b-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <div className="flex justify-between items-center mb-5 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 bg-gray-100 hover:bg-blue-50 p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline ml-1 font-medium">Quay lại</span>
              </motion.button>
              <h2 className="text-lg sm:text-2xl font-semibold">
                Câu hỏi <span className="text-blue-600">{currentQuestionIndex + 1}</span>/{questions.length}
              </h2>
            </div>
            <div className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-base sm:text-xl font-semibold shadow-sm">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
            />
          </div>

          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-6 sm:mb-8 bg-blue-50 p-4 rounded-lg"
          >
            <p className="text-base sm:text-lg mb-4 sm:mb-5 font-bold text-gray-800">
              {currentQuestion.content}
            </p>
            <div className="space-y-3 sm:space-y-4">
              {currentQuestion.answers.map((answer, index) => (
                <motion.button
                  key={answer.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswerSelect(currentQuestion.id, answer.id.toString())}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                    selectedAnswers[currentQuestion.id] === answer.id.toString()
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-white border border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                    selectedAnswers[currentQuestion.id] === answer.id.toString()
                      ? 'bg-blue-500 text-white'
                      : 'text-blue-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{answer.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-between gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-base font-medium transition-all duration-300 ${
                currentQuestionIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Câu trước
            </motion.button>

            {currentQuestionIndex === questions.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
              >
                Nộp bài
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextQuestion}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-300"
              >
                Câu tiếp theo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {showWarningPopup && (
          <Popup
            key="warning-popup"
            isOpen={showWarningPopup}
            onClose={() => setShowWarningPopup(false)}
            title="Chưa hoàn thành bài thi"
            message={`Bạn chưa trả lời ${unansweredQuestions.length} câu hỏi (câu ${unansweredQuestions.map(i => i + 1).join(', ')}). Vui lòng hoàn thành tất cả câu hỏi trước khi nộp bài.`}
            type="warning"
          />
        )}

        {showConfirmPopup && (
          <Popup
            key="confirm-popup"
            isOpen={showConfirmPopup}
            onClose={() => setShowConfirmPopup(false)}
            onConfirm={handleConfirmSubmit}
            title="Xác nhận nộp bài"
            message="Bạn đã trả lời tất cả câu hỏi. Bạn có chắc chắn muốn nộp bài không?"
            type="confirm"
            confirmText="Nộp bài"
          />
        )}
      </AnimatePresence>
    </>
  );
} 
