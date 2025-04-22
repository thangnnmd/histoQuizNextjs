'use client';

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useSupabase } from '@/app/supabase-provider'
import { RealtimePostgresChangesPayload, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useQuestions } from "@/hooks/useQuestions";
import { Topic } from '@/types/topic'
import Header from "../components/Header";
import TopicAvatar from "../components/TopicAvatar";
import QuizConfig from "../components/QuizConfig";
import LoadingSkeleton from '@/components/LoadingSkeleton';
import Quiz from '@/components/Quiz';

interface TopicQuestionCount {
  id: string;
  count: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  level: number;
  xp: number;
  streak: number;
  last_active: string;
  created_at: string;
  updated_at: string;
}

interface TopicStats {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

interface TopicWithStats extends Topic {
  stats?: TopicStats;
}

const subscriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const topicVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Home() {
  const [topics, setTopics] = useState<TopicWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showQuizConfig, setShowQuizConfig] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quizConfig, setQuizConfig] = useState({
    questionCount: 10,
    timeLimit: 15,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard'
  });
  const [quizInProgress, setQuizInProgress] = useState(false);
  const { getQuestionCountByTopic } = useQuestions();
  const { supabase } = useSupabase();
  const questionCounts: TopicQuestionCount[] = getQuestionCountByTopic();

  // Memoize computedTopicsWithCounts
  const computedTopicsWithCounts = useMemo(() => {
    return topics.map(topic => {
      const count = questionCounts.find(q => q.id === topic.id);
      return {
        ...topic,
        questionCount: count ? {
          total: count.count,
          easy: count.easyCount,
          medium: count.mediumCount,
          hard: count.hardCount
        } : undefined
      };
    });
  }, [topics, questionCounts]);

  // Load saved state and check for quiz results
  useEffect(() => {
    if (topics.length === 0) return; // Skip if topics haven't loaded yet

    const savedState = localStorage.getItem('quizState');
    const savedConfig = localStorage.getItem('quizConfig');
    const quizSession = localStorage.getItem('quizSession');
    
    // Kiểm tra xem có bài kiểm tra đang làm dở không
    if (quizSession) {
      const session = JSON.parse(quizSession);
      const topicId = session.topic.id;
      const matchingTopic = topics.find(t => t.id === topicId);
      
      if (matchingTopic) {
        setSelectedTopic(matchingTopic);
        if (savedConfig) {
          setQuizConfig(JSON.parse(savedConfig));
        }
        
        // Kiểm tra xem có kết quả đã lưu không
        const savedResult = localStorage.getItem(`quiz_result_${topicId}`);
        if (savedResult) {
          // Nếu có kết quả, hiển thị màn hình kết quả
          setShowQuiz(true);
        } else {
          // Nếu không có kết quả nhưng có tiến trình, tiếp tục bài kiểm tra
          const savedProgress = localStorage.getItem(`quiz_progress_${topicId}`);
          if (savedProgress) {
            setShowQuiz(true);
            setQuizInProgress(true);
          } else {
            // Nếu không có tiến trình, hiển thị màn hình cấu hình
            setShowQuizConfig(true);
          }
        }
        return;
      }
    }

    // Nếu không có bài kiểm tra đang làm dở, kiểm tra kết quả đã lưu
    let hasResult = false;
    for (const topic of topics) {
      const savedResult = localStorage.getItem(`quiz_result_${topic.id}`);
      if (savedResult) {
        setSelectedTopic(topic);
        if (savedConfig) {
          setQuizConfig(JSON.parse(savedConfig));
        }
        setShowQuiz(true);
        hasResult = true;
        break;
      }
    }

    // Nếu không tìm thấy kết quả, kiểm tra trạng thái đã lưu
    if (!hasResult && savedState) {
      const { showConfig, topic } = JSON.parse(savedState);
      setShowQuizConfig(showConfig);
      setSelectedTopic(topic);
    }
  }, [topics]); // Chỉ phụ thuộc vào mảng topics

  useEffect(() => {
    const fetchTopicsAndStats = async () => {
      try {
        // Fetch topics
        const response = await fetch('/api/topics');
        const topicsData = await response.json();

        // Fetch stats
        const statsResponse = await fetch('/api/topics/stats');
        const statsData = await statsResponse.json();

        // Combine topics with their stats
        const topicsWithStats = topicsData.map((topic: Topic) => ({
          ...topic,
          stats: statsData[topic.name] || { total: 0, easy: 0, medium: 0, hard: 0 }
        }));

        setTopics(topicsWithStats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicsAndStats();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else {
            setProfile(profileData);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profileData);
      } else {
        setProfile(null);
      }
    });

    // Subscribe to profile changes
    const profileSubscription = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        async (payload: RealtimePostgresChangesPayload<Profile>) => {
          const newProfile = payload.new as Profile;
          if (newProfile?.id === profile?.id) {
            setProfile(newProfile);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      profileSubscription.unsubscribe();
    };
  }, [profile?.id]); // Add profile.id as dependency to prevent unnecessary re-runs

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setShowQuizConfig(true);
    // Save state to localStorage
    localStorage.setItem('quizState', JSON.stringify({
      showConfig: true,
      topic
    }));
  };

  const handleQuizConfigBack = () => {
    setShowQuizConfig(false);
    setSelectedTopic(null);
    setShowQuiz(false);
    
    // Clear all saved states
    localStorage.removeItem('quizState');
    localStorage.removeItem('quizConfig');
    localStorage.removeItem('quizSession');
    
    // If there are any other quiz-related keys that need to be cleared
    if (selectedTopic?.id) {
      localStorage.removeItem(`quiz_result_${selectedTopic.id}`);
      localStorage.removeItem(`quiz_progress_${selectedTopic.id}`);
    }
  };

  const handleQuizStart = (config: {
    questionCount: number;
    timeLimit: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }) => {
    // Save config when starting quiz
    localStorage.setItem('quizConfig', JSON.stringify(config));
    setQuizConfig(config);
    setShowQuiz(true);
  };

  const handleQuizBack = () => {
    setShowQuiz(false);
    setShowQuizConfig(true);
    // Save state when going back to config
    if (selectedTopic) {
      localStorage.setItem('quizState', JSON.stringify({
        showConfig: true,
        topic: selectedTopic
      }));
    }
  };

  const handleBackToTopics = () => {
    // Reset all states
    setShowQuizConfig(false);
    setSelectedTopic(null);
    setShowQuiz(false);
    
    // Clear all saved states
    localStorage.removeItem('quizState');
    localStorage.removeItem('quizConfig');
    localStorage.removeItem('quizSession');
    
    // Clear all topic-specific quiz data
    if (selectedTopic?.id) {
      localStorage.removeItem(`quiz_result_${selectedTopic.id}`);
      localStorage.removeItem(`quiz_progress_${selectedTopic.id}`);
    }
    
    // Additionally, clear any other quiz-related data that might exist
    // This ensures a clean slate for new quizzes
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('quiz_result_') || 
        key.startsWith('quiz_progress_') ||
        key === 'quizState' ||
        key === 'quizConfig' ||
        key === 'quizSession'
      )) {
        keysToRemove.push(key);
      }
    }
    
    // Remove all identified keys
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100"
    >
      {/* Beta Notice */}
      {/* <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="container mx-auto max-w-4xl px-4 sm:py-8"
      >
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-center text-sm rounded-lg">
          <strong>Phiên bản Beta:</strong> Chúng tôi đang thử nghiệm HistoQuiz. Mọi ý kiến đóng góp vui lòng gửi về{" "}
          <a href="mailto:info.histoquiz@gmail.com" className="underline">
            info.histoquiz@gmail.com
          </a>
        </div>
      </motion.div> */}

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-4xl">
        <Header />
        

        {/* Topic Selection or Quiz Config or Quiz */}
        {showQuiz && selectedTopic ? (
          <Quiz
            topic={selectedTopic}
            config={quizConfig}
            onBack={handleQuizBack}
            onBackToTopics={handleBackToTopics} // Đảm bảo prop này được truyền
          />
        ) : showQuizConfig && selectedTopic ? (
          <QuizConfig
            topic={selectedTopic}
            onBack={handleQuizConfigBack}
            onStart={handleQuizStart}
          />
        ) : (
          <div className="bg-white rounded-b-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
            >
              Chọn chủ đề
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              variants={topicVariants}
              initial="hidden"
              animate="visible"
            >
              {computedTopicsWithCounts.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTopicSelect(topic)}
                >
                  <div className={`h-full p-4 sm:p-6 ${topic.bgGradient} transition-all duration-300`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <TopicAvatar seed={topic.name} color={topic.color} size={56} />
                        <motion.div 
                          className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"
                          initial={false}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <div className={`w-3 h-3 rounded-full ${topic.countBg}`}></div>
                        </motion.div>
                      </div>
                      <motion.div 
                        className="flex flex-col items-end gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${topic.countBg} ${topic.countText} transition-all duration-300 group-hover:shadow-md`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {topic.stats ? (
                            <div className="flex flex-col items-end">
                              <span className="font-bold whitespace-nowrap">{topic.stats.total} câu hỏi</span>
                              {/* <span className="text-[10px] sm:text-xs opacity-75 whitespace-nowrap">
                                {topic.stats.easy} dễ • {topic.stats.medium} vừa • {topic.stats.hard} khó
                              </span> */}
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Đang tải...
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    </div>
                    <motion.h3 
                      className={`font-bold text-lg sm:text-xl text-center ${topic.textColor} mb-2 sm:mb-3 transition-all duration-300 group-hover:scale-105`}
                    >
                      {topic.name}
                    </motion.h3>
                    <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2 sm:line-clamp-none">
                      {topic.description}
                    </p>
                    <motion.div 
                      className={`flex items-center justify-center p-2 sm:p-3 rounded-xl ${topic.countBg} ${topic.textColor} cursor-pointer transition-all duration-300 group-hover:shadow-md`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-medium text-sm sm:text-base">Bắt đầu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Subscription Form */}
        <motion.div 
          variants={subscriptionVariants}
          initial="hidden"
          animate="show"
          className="bg-white rounded-lg shadow-lg"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="p-6 md:p-8 md:w-1/2">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-xl sm:text-2xl font-bold text-white mb-2"
                >
                  Nhận thông báo câu hỏi mới
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-blue-100 mb-4 text-sm sm:text-base"
                >
                  Đăng ký để nhận thông báo khi có câu hỏi mới và cập nhật từ HistoQuiz.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input 
                    type="email" 
                    placeholder="Email của bạn" 
                    className="flex-grow p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white" 
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors duration-300 shadow-sm hover:shadow-md"
                  >
                    Đăng ký
                  </motion.button>
                </motion.div>
              </div>
              <div className="md:w-1/2 relative hidden md:block">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-white" viewBox="0 0 512 512">
                    <rect width="512" height="341.3" fill="#DA251D"/>
                    <polygon points="256,68.3 316.3,193.8 451.4,193.8 342.6,273.9 402.9,399.4 256,319.3 109.1,399.4 169.4,273.9 60.6,193.8 195.7,193.8" fill="#FFFF00"/>
                  </svg>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="p-6 md:p-8 flex items-center justify-center h-full relative z-10"
                >
                  <div className="text-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-white/20 p-4 rounded-full inline-block mb-3 transform transition-transform duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 512 512">
                        <rect width="512" height="341.3" fill="#DA251D"/>
                        <polygon points="256,68.3 316.3,193.8 451.4,193.8 342.6,273.9 402.9,399.4 256,319.3 109.1,399.4 169.4,273.9 60.6,193.8 195.7,193.8" fill="#FFFF00"/>
                      </svg>
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className="text-white text-lg font-semibold"
                    >
                      Nhận ngay
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                      className="text-blue-100 text-sm"
                    >
                      5 câu hỏi lịch sử thú vị
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.4 }}
                      className="mt-4 bg-blue-500/30 rounded-lg p-3"
                    >
                      <p className="text-white text-xs">
                        Tham gia ngay để khám phá những câu chuyện lịch sử đầy hấp dẫn!
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="container mx-auto px-3 sm:px-4 pb-8 pt-4 max-w-4xl"
      >
        <div className="border-t border-gray-200 pt-6 pb-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Giới thiệu</h3>
                    <p className="text-sm text-gray-600 mb-3">HistoQuiz - Ứng dụng trắc nghiệm lịch sử Việt Nam giúp bạn học tập, ôn luyện kiến thức một cách thú vị và hiệu quả.</p>
                    <p className="text-xs text-gray-500">© 2023 HistoQuiz. Bản quyền thuộc về nhóm phát triển.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Tài liệu tham khảo</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="hover:text-blue-600 transition-colors duration-200">
                            <a href="#" className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Sách giáo khoa Lịch sử Việt Nam
                            </a>
                        </li>
                        <li className="hover:text-blue-600 transition-colors duration-200">
                            <a href="#" className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Từ điển Bách khoa Việt Nam
                            </a>
                        </li>
                        <li className="hover:text-blue-600 transition-colors duration-200">
                            <a href="#" className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Bảo tàng Lịch sử Việt Nam
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Liên hệ</h3>
                    <div className="flex space-x-3 mb-4">
                        <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                        </a>
                        <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/></svg>
                        </a>
                        <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        </a>
                    </div>
                    <div className="text-sm text-gray-600">
                        <p className="flex items-center mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            info.histoquiz@gmail.com
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Hà Nội, Việt Nam
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center mt-4">
            <div className="flex space-x-1 px-3 py-1 rounded-full bg-blue-50">
                <a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200">Điều khoản sử dụng</a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200">Chính sách bảo mật</a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200">Trợ giúp</a>
            </div>
        </div>
    </motion.footer>
    </motion.div>
  );
}
