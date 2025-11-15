import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login with:', { email });
      const userData = await login(email, password);
      console.log('Login successful:', userData);
      
      setSuccess(true);
      
      // Redirect based on user role
      setTimeout(() => {
        if (userData.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (userData.role === 'organizer') {
          navigate('/organizer/dashboard');
        } else {
          navigate('/events');
        }
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.message || 
                          err.response?.data?.message || 
                          'Invalid email or password. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF] to-[#FF8F00] opacity-10"></div>
      <div className="absolute inset-0 bg-dots opacity-20"></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#5A43FF] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#FF8F00] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full relative z-10 animate-fade-in">
        <div className="glass-dark rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaUser className="text-white text-3xl" />
            </div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#5A43FF] via-purple-500 to-[#FF8F00] bg-clip-text text-transparent animate-gradient">
              Welcome Back
            </h2>
            <p className="text-white text-lg font-medium">Login to continue to EventMe</p>
          </div>
        
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-xl mb-6 animate-slide-up">
              <p className="font-medium">⚠️ {error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-xl mb-6 animate-slide-up">
              <p className="font-medium">✅ Login successful! Redirecting...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white mb-2 font-semibold text-sm">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="your@email.com"
                  required
                />
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 font-semibold text-sm">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover-lift shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : success ? (
                <>
                  ✓ Success!
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  Login to Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link to="/forgot-password" className="block text-white hover:text-[#FF8F00] transition-colors font-semibold text-sm">
              🔑 Forgot your password?
            </Link>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-300 font-medium">or</span>
              </div>
            </div>
            <div>
              <p className="text-gray-300 mb-3 font-medium">
                Don't have an account?
              </p>
              <Link to="/register" className="inline-block text-white bg-gradient-to-r from-[#5A43FF] to-purple-500 hover:from-[#FF8F00] hover:to-yellow-500 font-bold transition-all duration-300 px-6 py-2.5 rounded-xl hover:scale-105 shadow-lg">
                Sign up now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
