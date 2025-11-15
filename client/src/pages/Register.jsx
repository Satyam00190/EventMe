import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaTicketAlt, FaCalendarPlus, FaSignInAlt } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      console.log('Registering user:', { name: formData.name, email: formData.email, role: formData.role });
      await register(formData.name, formData.email, formData.password, formData.role);
      setSuccess(true);
      
      // Show success message briefly then redirect
      setTimeout(() => {
        if (formData.role === 'organizer') {
          navigate('/organizer/dashboard');
        } else {
          navigate('/events');
        }
      }, 1500);
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.message || 
                          err.response?.data?.message || 
                          'Registration failed. Please try again.';
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

      <div className="max-w-md w-full relative z-10 animate-fade-in">
        <div className="glass-dark rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="gradient-secondary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaUserPlus className="text-white text-3xl" />
            </div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#5A43FF] via-purple-500 to-[#FF8F00] bg-clip-text text-transparent animate-gradient">
              Create Account
            </h2>
            <p className="text-white text-lg font-medium">Join EventMe and start your journey</p>
          </div>
        
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-xl mb-6 animate-slide-up">
              <p className="font-medium">⚠️ {error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-xl mb-6 animate-slide-up">
              <p className="font-medium">✅ Account created successfully! Redirecting...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white mb-2 font-semibold text-sm">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="John Doe"
                  required
                />
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 font-semibold text-sm">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
              <p className="text-xs text-gray-300 mt-1 font-medium">✓ Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-white mb-2 font-semibold text-sm">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <div>
              <label className="block text-white mb-3 font-semibold text-sm">I want to</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'user'})}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    formData.role === 'user'
                      ? 'border-[#5A43FF] bg-gradient-to-br from-[#5A43FF]/20 to-purple-500/20 shadow-lg shadow-[#5A43FF]/30'
                      : 'border-white/30 bg-white/5 hover:border-[#5A43FF]/50 hover:bg-white/10'
                  }`}
                >
                  <FaTicketAlt className={`text-3xl mx-auto mb-2 transition-all ${formData.role === 'user' ? 'text-[#5A43FF] animate-bounce' : 'text-gray-300'}`} />
                  <p className={`font-bold text-sm ${formData.role === 'user' ? 'text-white' : 'text-gray-300'}`}>
                    Book Events
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'organizer'})}
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    formData.role === 'organizer'
                      ? 'border-[#FF8F00] bg-gradient-to-br from-[#FF8F00]/20 to-yellow-500/20 shadow-lg shadow-[#FF8F00]/30'
                      : 'border-white/30 bg-white/5 hover:border-[#FF8F00]/50 hover:bg-white/10'
                  }`}
                >
                  <FaCalendarPlus className={`text-3xl mx-auto mb-2 transition-all ${formData.role === 'organizer' ? 'text-[#FF8F00] animate-bounce' : 'text-gray-300'}`} />
                  <p className={`font-bold text-sm ${formData.role === 'organizer' ? 'text-white' : 'text-gray-300'}`}>
                    Create Events
                  </p>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full gradient-secondary text-white py-3 rounded-xl font-semibold hover-lift shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : success ? (
                <>
                  ✓ Account Created!
                </>
              ) : (
                <>
                  <FaUserPlus />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-300 font-medium">Already have an account?</span>
              </div>
            </div>
            <Link 
              to="/login" 
              className="text-white bg-gradient-to-r from-[#5A43FF] to-purple-500 hover:from-[#FF8F00] hover:to-yellow-500 font-bold transition-all duration-300 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl hover:scale-105 shadow-lg"
            >
              <FaSignInAlt />
              Login here
            </Link>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 glass-card rounded-2xl p-4 text-center border border-white/20">
          <p className="text-sm text-white font-semibold flex items-center justify-center gap-2">
            <span className="text-xl">🔒</span>
            Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
