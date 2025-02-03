import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  UserIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext'; // Assuming the useAuth hook is in this file

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate('/account');
        }
      } else {
        // For now, just show an error for registration
        setError('Registration is not yet implemented. Please use your existing account.');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: ''
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-reginify-gold/5 to-reginify-navy/5 pt-8 md:pt-20">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(212,175,55,0.15),transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(0,32,91,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-12 relative">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 relative overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-reginify-gold/5" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-garet text-reginify-navy mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-reginify-navy/60 font-garet-book">
                  {isLogin 
                    ? 'Sign in to access your account' 
                    : 'Join the Regenefi family today'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-reginify-gold/60" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-reginify-gold/20
                                   focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                                   text-reginify-navy placeholder-reginify-navy/50 bg-white/50"
                          required
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-reginify-gold/60" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-reginify-gold/20
                             focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                             text-reginify-navy placeholder-reginify-navy/50 bg-white/50"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-reginify-gold/60" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-reginify-gold/20
                             focus:border-reginify-gold focus:ring-1 focus:ring-reginify-gold/50
                             text-reginify-navy placeholder-reginify-navy/50 bg-white/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-reginify-navy/50 hover:text-reginify-navy"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <Link 
                      to="/forgot-password"
                      className="text-sm text-reginify-gold hover:text-reginify-gold/80 font-garet-book"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                )}

                {error && (
                  <div className="text-red-500 text-sm font-garet-book mb-4">
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-3 bg-gradient-to-r from-reginify-gold to-reginify-gold/90
                           text-reginify-navy rounded-lg font-garet text-sm uppercase tracking-wider
                           transition-all duration-300 hover:shadow-lg hover:shadow-reginify-gold/20
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center
                           space-x-2 relative overflow-hidden group mt-6"
                >
                  <span className="relative z-10">
                    {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                  </span>
                  {!loading && (
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </motion.button>
              </form>

              {/* Toggle between login and signup */}
              <div className="mt-6 text-center">
                <p className="text-reginify-navy/60 font-garet-book">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={toggleView}
                    className="ml-2 text-reginify-gold hover:text-reginify-gold/80 font-garet"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>

              {/* Social Login Options */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-reginify-gold/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-reginify-navy/60 font-garet-book">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border border-reginify-gold/20 rounded-lg
                             text-reginify-navy font-garet-book text-sm flex items-center
                             justify-center space-x-2 hover:bg-reginify-gold/5 transition-colors
                             duration-300"
                  >
                    <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-3 border border-reginify-gold/20 rounded-lg
                             text-reginify-navy font-garet-book text-sm flex items-center
                             justify-center space-x-2 hover:bg-reginify-gold/5 transition-colors
                             duration-300"
                  >
                    <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
