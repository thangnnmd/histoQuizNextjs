'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.replace('/');
          return;
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [router]);

  // If still checking auth status, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage('Email hoặc mật khẩu không chính xác');
        return;
      }

      if (data?.user) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      // Social login will redirect to OAuth provider
    } catch (error) {
      console.error('Social login error:', error);
      setMessage('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-lg hover:translate-y-[-2px] transition-all duration-300">
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập HistoQuiz</h1>
          <p className="text-gray-500 text-base mb-8">Chào mừng bạn quay trở lại! 👋</p>
        </div>

        {/* Hình ảnh minh họa với animation */}
        <AnimatePresence>
          {!isPasswordFocused && (
            <motion.div 
              className="mb-6 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
            >
              <motion.svg 
                width="200" 
                height="160" 
                viewBox="0 0 200 160" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-40 w-auto" 
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut" 
                }}
              >
                {/* Boy's head */}
                <circle cx="100" cy="50" r="25" fill="#FFD7B5" />
                <path d="M85 45 Q 100 60 115 45" stroke="#333" strokeWidth="1.5" fill="none" />
                
                {/* Boy's eyes */}
                <circle cx="90" cy="40" r="3" fill="#333" />
                <circle cx="110" cy="40" r="3" fill="#333" />
                
                {/* Boy's hair */}
                <path d="M75 40 Q 85 20 100 25 Q 115 20 125 40" fill="#8B4513" />
                <path d="M75 40 Q 85 30 100 35 Q 115 30 125 40" fill="#8B4513" />
                
                {/* Boy's body */}
                <path d="M85 75 L 85 120 L 115 120 L 115 75" fill="#3B82F6" />
                <rect x="85" y="75" width="30" height="10" fill="#2563EB" />
                
                {/* Boy's arms */}
                <path d="M85 80 L 65 100 L 70 105 L 90 85" fill="#FFD7B5" />
                <path d="M115 80 L 135 100 L 130 105 L 110 85" fill="#FFD7B5" />
                
                {/* History book */}
                <rect x="60" y="95" width="40" height="30" rx="2" fill="#E6EFFC" stroke="#3B82F6" strokeWidth="2" />
                <line x1="80" y1="95" x2="80" y2="125" stroke="#3B82F6" strokeWidth="2" />
                <path d="M65 105 L 75 105" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="1" />
                <path d="M65 110 L 75 110" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="1" />
                <path d="M65 115 L 75 115" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="1" />
                <path d="M85 105 L 95 105" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="1" />
                <path d="M85 110 L 95 110" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="1" />
                <path d="M85 115 L 95 115" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="1" />
                
                {/* Book title */}
                <text x="80" y="90" textAnchor="middle" fill="#3B82F6" fontSize="6" fontWeight="bold">LỊCH SỬ</text>
                
                {/* Boy's legs */}
                <rect x="85" y="120" width="10" height="25" fill="#1F2937" />
                <rect x="105" y="120" width="10" height="25" fill="#1F2937" />
                
                {/* Boy's shoes */}
                <path d="M85 145 L 75 145 L 75 140 L 95 140 L 95 145 Z" fill="#111827" />
                <path d="M105 145 L 95 145 L 95 140 L 115 140 L 115 145 Z" fill="#111827" />
                
                {/* Vietnam flag symbol on book */}
                <polygon points="80,100 83,103 86,100 83,97" fill="#FFFF00" />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all duration-200 text-gray-700"
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={6}
                ref={passwordRef}
                className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all duration-200 text-gray-700"
                placeholder="Nhập mật khẩu"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
            </div>
            <div className="flex justify-end mt-2">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Quên mật khẩu?
              </Link>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center text-white font-medium text-base h-11 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:translate-y-[-1px] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Đăng nhập
              </>
            )}
          </motion.button>
        </form>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center text-sm font-medium text-red-600"
          >
            {message}
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Hoặc đăng nhập với</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c2.17 0 4.1.72 5.63 1.92l4.25-4.25C19.27 0.47 15.91 0 12 0 7.31 0 3.23 2.7 1.26 6.63l4.97 3.85C7.39 7.52 9.48 5.04 12 5.04z"></path>
                <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"></path>
                <path fill="#FBBC05" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96L.33 17.43C2.29 21.44 6.61 24 12 24z"></path>
                <path fill="#34A853" d="M5.27 14.29C4.99 13.57 4.83 12.8 4.83 12s.16-1.57.44-2.29L.33 6.57C-.15 8.27-.4 10.1-.4 12c0 1.9.25 3.73.73 5.43l4.94-3.14z"></path>
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.622h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
          <div className="text-gray-500">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
