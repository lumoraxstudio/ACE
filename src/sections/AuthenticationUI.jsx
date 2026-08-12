import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AuthenticationUI = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        // Handle login
        console.log('Login:', { email: formData.email, password: formData.password });
        setMessage('Login successful! Redirecting...');
      } else {
        // Handle signup
        if (formData.password !== formData.confirmPassword) {
          setMessage('Passwords do not match!');
          setLoading(false);
          return;
        }
        console.log('Signup:', { name: formData.name, email: formData.email });
        setMessage('Account created! Please verify your email.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ace-black flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        {/* Auth Container */}
        <div className="p-8 rounded-2xl border border-ace-cyan/30 bg-gradient-to-br from-ace-navy/60 to-ace-black/60 backdrop-blur-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-4xl font-black bg-gradient-to-r from-ace-cyan to-ace-violet bg-clip-text text-transparent mb-2">
              ⚡ ACE
            </div>
            <p className="text-white/60 text-sm">Aura Core Esports</p>
          </div>

          {/* Toggle */}
          <div className="flex gap-4 mb-8 bg-ace-black/50 p-1 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded font-bold text-sm transition-all duration-300 ${
                isLogin
                  ? 'bg-ace-cyan text-ace-black'
                  : 'text-ace-cyan/60 hover:text-ace-cyan'
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded font-bold text-sm transition-all duration-300 ${
                !isLogin
                  ? 'bg-ace-cyan text-ace-black'
                  : 'text-ace-cyan/60 hover:text-ace-cyan'
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-ace-cyan text-xs font-bold mb-2 uppercase">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                  placeholder="Your name"
                />
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-ace-cyan text-xs font-bold mb-2 uppercase">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                placeholder="you@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-ace-cyan text-xs font-bold mb-2 uppercase">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-ace-cyan text-xs font-bold mb-2 uppercase">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-2 bg-ace-black border border-ace-cyan/30 rounded text-white placeholder-white/30 focus:border-ace-cyan focus:outline-none transition-colors duration-300"
                  placeholder="••••••••"
                />
              </motion.div>
            )}

            {/* Forgot Password Link (Login Only) */}
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-ace-cyan text-xs hover:text-ace-violet transition">
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 bg-gradient-to-r from-ace-cyan to-ace-cyan text-ace-black font-bold rounded border border-ace-cyan hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Processing...' : isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
            </motion.button>
          </form>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 rounded text-center text-sm font-bold ${
                message.includes('error') || message.includes('do not match')
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-ace-cyan/20 text-ace-cyan border border-ace-cyan/30'
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ace-cyan/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-ace-black text-white/60">OR</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-2">
            <button className="w-full py-2 border border-ace-cyan/30 rounded text-ace-cyan text-sm font-bold hover:border-ace-cyan hover:bg-ace-cyan/10 transition-all duration-300">
              Sign in with Discord
            </button>
            <button className="w-full py-2 border border-ace-cyan/30 rounded text-ace-cyan text-sm font-bold hover:border-ace-cyan hover:bg-ace-cyan/10 transition-all duration-300">
              Sign in with Google
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs text-white/50 mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-ace-cyan hover:text-ace-violet transition font-bold"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthenticationUI;
