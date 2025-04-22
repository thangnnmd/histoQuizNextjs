'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
        setIsCheckingAuth(false);
      }
    };

    checkUser();
  }, [router]);

  // If still checking auth status, show loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (password !== confirmPassword) {
        throw new Error('Mật khẩu nhập lại không khớp!');
      }

      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      setIsSuccess(true);
      setMessage('');
      
      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      setMessage(error.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
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
    } catch (error) {
      console.error('Social login error:', error);
      setMessage('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col items-center">
          <motion.svg 
            width="200" 
            height="160" 
            viewBox="0 0 200 160" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-40 w-auto mb-6" 
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut" 
            }}
          >
            {/* Ancient scroll */}
            <path d="M30 50 C30 40 40 40 40 40 L160 40 C160 40 170 40 170 50 L170 110 C170 120 160 120 160 120 L40 120 C40 120 30 120 30 110 Z" fill="#F3E8D6" stroke="#C19A6B" strokeWidth="2" />
            
            {/* Scroll edges */}
            <path d="M30 50 C30 50 20 60 20 80 C20 100 30 110 30 110" stroke="#C19A6B" strokeWidth="2" fill="none" />
            <path d="M170 50 C170 50 180 60 180 80 C180 100 170 110 170 110" stroke="#C19A6B" strokeWidth="2" fill="none" />
            
            {/* Scroll shadows */}
            <path d="M30 50 L40 50 L40 110 L30 110" fill="#E6D5B8" />
            <path d="M170 50 L160 50 L160 110 L170 110" fill="#E6D5B8" />
            
            {/* Quill pen */}
            <path d="M140 70 L160 50" stroke="#555" strokeWidth="2" />
            <path d="M140 70 L120 90 L125 95 L145 75" fill="#F8F8FF" stroke="#555" strokeWidth="1" />
            <path d="M120 90 L115 95 L120 100 L125 95" fill="#3B82F6" stroke="#2563EB" strokeWidth="1" />
            
            {/* Ink bottle */}
            <rect x="145" y="75" width="15" height="15" rx="2" fill="#1E3A8A" stroke="#555" strokeWidth="1" />
            <rect x="145" y="75" width="15" height="5" fill="#3B82F6" />
            
            {/* Text lines on scroll */}
            <path d="M50 60 L110 60" stroke="#C19A6B" strokeOpacity="0.7" strokeWidth="1" />
            <path d="M50 70 L100 70" stroke="#C19A6B" strokeOpacity="0.7" strokeWidth="1" />
            <path d="M50 80 L105 80" stroke="#C19A6B" strokeOpacity="0.7" strokeWidth="1" />
            <path d="M50 90 L90 90" stroke="#C19A6B" strokeOpacity="0.7" strokeWidth="1" />
            <path d="M50 100 L110 100" stroke="#C19A6B" strokeOpacity="0.7" strokeWidth="1" />
            
            {/* Magnifying glass */}
            <circle cx="70" cy="130" r="12" fill="white" stroke="#3B82F6" strokeWidth="2" />
            <line x1="78" y1="138" x2="90" y2="150" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
            
            {/* Compass */}
            <circle cx="130" cy="130" r="12" fill="white" stroke="#3B82F6" strokeWidth="2" />
            <path d="M130 118 L130 130" stroke="#3B82F6" strokeWidth="2" />
            <path d="M130 130 L138 138" stroke="#E11D48" strokeWidth="2" />
            <circle cx="130" cy="130" r="2" fill="#3B82F6" />
            
            {/* Stars */}
            <path d="M40 30 L42 35 L47 35 L43 38 L45 43 L40 40 L35 43 L37 38 L33 35 L38 35 Z" fill="#FFFF00" />
            <path d="M160 30 L162 35 L167 35 L163 38 L165 43 L160 40 L155 43 L157 38 L153 35 L158 35 Z" fill="#FFFF00" />
          </motion.svg>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký HistoQuiz</h1>
          <p className="text-gray-500 text-base mb-8">Tạo tài khoản mới để bắt đầu hành trình! 🚀</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              placeholder="Tạo mật khẩu"
            />
            <p className="mt-1 text-sm text-gray-500">Mật khẩu phải có ít nhất 6 ký tự</p>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">Nhập lại mật khẩu</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center text-white font-medium text-base h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Đăng ký
              </>
            )}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm font-medium text-red-600">{message}</div>
        )}

        {isSuccess && (
          <div className="mt-4 bg-green-50 text-green-700 p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Đăng ký thành công!</span>
            </div>
            <p className="text-sm">Vui lòng kiểm tra email để xác nhận tài khoản.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Hoặc đăng ký với</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c2.17 0 4.1.72 5.63 1.92l4.25-4.25C19.27 0.47 15.91 0 12 0 7.31 0 3.23 2.7 1.26 6.63l4.97 3.85C7.39 7.52 9.48 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
                <path fill="#FBBC05" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96L.33 17.43C2.29 21.44 6.37 24 12 24z" />
                <path fill="#34A853" d="M12 9.5c1.77 0 3.35.61 4.6 1.8L20.27 7c-2.09-1.95-4.81-3.15-8.27-3.15-5.63 0-9.71 2.56-11.67 6.58l4.97 3.85C6.22 11.52 8.31 9.5 12 9.5z" />
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.622h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
          <div className="text-gray-500">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
