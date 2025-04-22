'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSignOut: () => void;
}

export default function MobileMenu({ isOpen, onClose, user, onSignOut }: MobileMenuProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('main'); // 'main' | 'topics'

  // Close menu when clicking overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const topics = [
    {
      id: 'ancient',
      name: 'Thời kỳ Bắc thuộc',
      icon: '👑',
      description: 'Khám phá lịch sử và các cuộc khởi nghĩa giành độc lập từ năm 111 TCN đến 939',
      bgColor: 'from-orange-100 to-orange-50',
      iconBg: 'bg-orange-500',
      borderColor: 'border-orange-200',
      path: '/learn/ancient',
      status: 'Đang tải...'
    },
    {
      id: 'medieval',
      name: 'Thời kỳ Đại Việt',
      icon: '⚔️',
      description: 'Tìm hiểu về thời kỳ phong kiến và các triều đại Việt Nam từ thế kỷ X đến XIX',
      bgColor: 'from-blue-100 to-blue-50',
      iconBg: 'bg-blue-500',
      borderColor: 'border-blue-200',
      path: '/learn/medieval',
      status: 'Đang tải...'
    },
    {
      id: 'modern',
      name: 'Cách mạng Việt Nam',
      icon: '🎋',
      description: 'Khám phá con đường đấu tranh giành độc lập và thống nhất đất nước',
      bgColor: 'from-red-100 to-red-50',
      iconBg: 'bg-red-500',
      borderColor: 'border-red-200',
      path: '/learn/modern',
      status: 'Đang tải...'
    }
  ];

  const mainNavItems = [
    { 
      href: '/quiz', 
      label: 'Trắc nghiệm', 
      description: 'Kiểm tra kiến thức qua các bài trắc nghiệm',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      href: '/learn', 
      label: 'Học tập',
      description: 'Khám phá các chủ đề lịch sử hấp dẫn',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      href: '/about', 
      label: 'Giới thiệu',
      description: 'Tìm hiểu thêm về HistoQuiz',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const cardVariants = {
    initial: { 
      scale: 0.95,
      opacity: 0,
      y: 20
    },
    animate: (index: number) => ({ 
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    tap: { 
      scale: 0.97,
      transition: {
        duration: 0.1
      }
    },
    hover: { 
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  } as const;

  const iconVariants = {
    initial: { 
      rotate: -10,
      scale: 0.8
    },
    animate: { 
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  } as const;

  const statusVariants = {
    initial: { 
      opacity: 0,
      x: -10
    },
    animate: { 
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.3
      }
    }
  } as const;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleOverlayClick}
    >
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-[320px] bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-4 h-16 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-2">
            {activeSection === 'topics' && (
              <button
                onClick={() => setActiveSection('main')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h3 className="text-lg font-semibold text-gray-800">
              {activeSection === 'main' ? 'Menu' : 'Chọn chủ đề'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Đóng menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-4rem)] overflow-y-auto bg-gray-50">
          <AnimatePresence mode="wait">
            {activeSection === 'main' ? (
              <motion.div
                key="main"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {/* User Info Section */}
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={user?.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                        alt="Avatar" 
                        className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
                      />
                      {user && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {user ? (user.user_metadata?.full_name || user.email?.split('@')[0]) : 'Chào mừng'}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {user ? user.email : 'Vui lòng đăng nhập để tiếp tục'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Navigation */}
                <div className="p-2">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl text-gray-700 ${
                        pathname === item.href 
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        if (item.href === '/learn') {
                          setActiveSection('topics');
                        } else {
                          onClose();
                        }
                      }}
                    >
                      <span className={`${pathname === item.href ? 'text-blue-600' : 'text-gray-400'}`}>
                        {item.icon}
                      </span>
                      <div className="ml-3">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                      {item.href === '/learn' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>

                {/* User Actions */}
                {user ? (
                  <div className="p-2">
                    <div className="h-px bg-gray-100 my-2" />
                    <Link 
                      href="/profile"
                      className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50"
                      onClick={onClose}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div className="ml-3">
                        <div className="font-medium">Hồ sơ cá nhân</div>
                        <div className="text-sm text-gray-500">Xem và chỉnh sửa thông tin</div>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/stats"
                      className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50"
                      onClick={onClose}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <div className="ml-3">
                        <div className="font-medium">Thống kê</div>
                        <div className="text-sm text-gray-500">Xem tiến độ học tập</div>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/settings"
                      className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50"
                      onClick={onClose}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div className="ml-3">
                        <div className="font-medium">Cài đặt</div>
                        <div className="text-sm text-gray-500">Tùy chỉnh ứng dụng</div>
                      </div>
                    </Link>

                    <div className="h-px bg-gray-100 my-2" />
                    
                    <button 
                      onClick={() => {
                        onSignOut();
                        onClose();
                      }}
                      className="flex items-center w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <div className="ml-3">
                        <div className="font-medium">Đăng xuất</div>
                        <div className="text-sm text-red-400">Thoát khỏi tài khoản</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 space-y-2">
                    <Link 
                      href="/login"
                      className="flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200"
                      onClick={onClose}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Đăng nhập
                    </Link>
                    <Link 
                      href="/register"
                      className="flex items-center justify-center w-full px-4 py-2.5 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors duration-200"
                      onClick={onClose}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Đăng ký
                    </Link>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="topics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                {topics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    custom={index}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    className="transform-gpu"
                  >
                    <Link
                      href={topic.path}
                      className={`block rounded-2xl border ${topic.borderColor} overflow-hidden transition-all duration-300 active:scale-95`}
                      onClick={onClose}
                    >
                      <div className={`bg-gradient-to-br ${topic.bgColor} p-4 relative overflow-hidden`}>
                        <motion.div 
                          className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200"
                          whileHover={{ opacity: 1 }}
                        />
                        <div className="flex items-start space-x-4 relative z-10">
                          <motion.div 
                            className={`w-12 h-12 ${topic.iconBg} rounded-xl flex items-center justify-center shadow-lg`}
                            variants={iconVariants}
                          >
                            <span className="text-2xl">{topic.icon}</span>
                          </motion.div>
                          <div className="flex-1">
                            <motion.h3 
                              className="font-semibold text-gray-900 mb-1"
                              layout
                            >
                              {topic.name}
                            </motion.h3>
                            <motion.p 
                              className="text-sm text-gray-600 line-clamp-2"
                              layout
                            >
                              {topic.description}
                            </motion.p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between relative z-10">
                          <motion.div 
                            className="flex items-center space-x-2"
                            variants={statusVariants}
                          >
                            <span className="inline-block px-2 py-1 bg-white/50 backdrop-blur-sm rounded-md text-xs font-medium text-gray-600">
                              {topic.status}
                            </span>
                          </motion.div>
                          <motion.button 
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/50 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-gray-900 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
} 