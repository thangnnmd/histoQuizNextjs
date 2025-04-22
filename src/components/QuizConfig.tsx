import React from 'react';
import { motion } from 'framer-motion';

interface QuizConfigProps {
  topic: {
    id: string;
    name: string;
  };
  onBack: () => void;
  onStart: (config: {
    questionCount: number;
    timeLimit: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }) => void;
}

const QuizConfig: React.FC<QuizConfigProps> = ({ topic, onBack, onStart }) => {
  // Initialize state with values from localStorage if they exist
  const [questionCount, setQuestionCount] = React.useState<number>(() => {
    const savedConfig = localStorage.getItem('quizConfig');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      return config.questionCount || 5;
    }
    return 5;
  });

  const [timeLimit, setTimeLimit] = React.useState<number>(() => {
    const savedConfig = localStorage.getItem('quizConfig');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      return config.timeLimit || 5;
    }
    return 5;
  });

  const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard'>(() => {
    const savedConfig = localStorage.getItem('quizConfig');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      return config.difficulty || 'easy';
    }
    return 'easy';
  });

  // Check for saved quiz result
  React.useEffect(() => {
    const savedResult = localStorage.getItem(`quiz_result_${topic.id}`);
    if (savedResult) {
      // If there's a saved result, start the quiz with current config
      handleStart();
    }
  }, [topic.id]);

  // Save config to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('quizConfig', JSON.stringify({
      questionCount,
      timeLimit,
      difficulty
    }));
  }, [questionCount, timeLimit, difficulty]);

  const handleStart = () => {
    // Clear saved config when starting quiz
    localStorage.removeItem('quizConfig');
    onStart({
      questionCount,
      timeLimit,
      difficulty
    });
  };

  // Estimated completion time calculation
  const getEstimatedTime = () => {
    // Tính thời gian trung bình cho mỗi câu hỏi (phút)
    const timePerQuestion = timeLimit / questionCount;
    
    // Nếu thời gian mỗi câu < 30 giây, thêm 1 phút để review
    // Nếu thời gian mỗi câu >= 30 giây, không cần thêm thời gian review
    const reviewTime = timePerQuestion < 0.5 ? 1 : 0;
    
    return timeLimit + reviewTime;
  };

  const estimatedTime = getEstimatedTime();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-b-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8"
    >
      <div className="flex items-center mb-6 sm:mb-8 justify-center relative">
        <button 
          onClick={onBack}
          className="absolute left-0 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 bg-gray-100 hover:bg-blue-50 p-2 rounded-full group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline ml-1 font-medium">Quay lại</span>
        </button>
        <motion.h2 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        >
          Cấu hình bài kiểm tra
        </motion.h2>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <div className="bg-blue-50 rounded-xl p-4 sm:p-6 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-gray-700 font-semibold text-lg">Số câu hỏi</label>
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {questionCount} câu
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Chọn số lượng câu hỏi phù hợp với thời gian của bạn</p>
          <div className="grid grid-cols-4 gap-3">
            {[5, 10, 15, 20].map((count) => (
              <label key={count} className="flex flex-col items-center">
                <input
                  type="radio"
                  name="question-count"
                  value={count}
                  checked={questionCount === count}
                  onChange={() => setQuestionCount(count)}
                  className="sr-only question-count-radio"
                />
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`option-box w-full py-3 text-center rounded-lg border transition-all duration-300 text-base font-medium ${
                    questionCount === count 
                    ? 'bg-blue-500 border-blue-600 text-white shadow-lg transform scale-105' 
                    : 'border-blue-200 bg-white text-blue-800 hover:bg-blue-50'
                  }`}
                >
                  {count}
                </motion.span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 sm:p-6 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-gray-700 font-semibold text-lg">Thời gian</label>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {timeLimit} phút
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Thời gian làm bài phù hợp với số câu hỏi đã chọn</p>
          <div className="grid grid-cols-4 gap-3">
            {[5, 10, 15, 20].map((time) => (
              <label key={time} className="flex flex-col items-center">
                <input
                  type="radio"
                  name="time-limit"
                  value={time}
                  checked={timeLimit === time}
                  onChange={() => setTimeLimit(time)}
                  className="sr-only time-limit-radio"
                />
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`option-box w-full py-3 text-center rounded-lg border transition-all duration-300 text-base font-medium ${
                    timeLimit === time 
                    ? 'bg-green-500 border-green-600 text-white shadow-lg transform scale-105' 
                    : 'border-green-200 bg-white text-green-800 hover:bg-green-50'
                  }`}
                >
                  {time}
                </motion.span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 sm:p-6 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-gray-700 font-semibold text-lg">Mức độ</label>
            <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
              {difficulty === 'easy' ? 'Dễ' : difficulty === 'medium' ? 'Trung bình' : 'Khó'}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Chọn độ khó phù hợp với trình độ của bạn</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'easy', label: 'Dễ', desc: 'Phù hợp cho người mới bắt đầu' },
              { value: 'medium', label: 'Trung bình', desc: 'Cần suy nghĩ kỹ hơn' },
              { value: 'hard', label: 'Khó', desc: 'Thử thách kiến thức' }
            ].map((option) => (
              <label key={option.value} className="flex flex-col items-center group">
                <input
                  type="radio"
                  name="difficulty"
                  value={option.value}
                  checked={difficulty === option.value}
                  onChange={() => setDifficulty(option.value as 'easy' | 'medium' | 'hard')}
                  className="sr-only difficulty-radio"
                />
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`option-box w-full py-3 text-center rounded-lg border transition-all duration-300 text-base font-medium relative ${
                    difficulty === option.value 
                    ? 'bg-purple-500 border-purple-600 text-white shadow-lg transform scale-105' 
                    : 'border-purple-200 bg-white text-purple-800 hover:bg-purple-50'
                  }`}
                >
                  {option.label}
                  <span className="absolute -bottom-8 left-0 right-0 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {option.desc}
                  </span>
                </motion.span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Thời gian dự kiến: {estimatedTime === timeLimit ? timeLimit : `${timeLimit}+${estimatedTime - timeLimit}`} phút
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {questionCount} câu hỏi
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 text-white py-4 px-4 rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 transition-all duration-300 text-lg font-medium shadow-md flex items-center justify-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bắt đầu làm bài
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizConfig; 