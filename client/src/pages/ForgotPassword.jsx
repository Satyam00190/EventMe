import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5A43FF] to-[#FF8F00] p-4">
      <div className="glass rounded-3xl p-8 md:p-12 max-w-md w-full animate-fade-in">
        {!success ? (
          <>
            <div className="text-center mb-8">
              <div className="gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-white text-3xl" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
              <p className="text-white/80">Enter your email to reset your password</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-white mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 glass-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/50"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-[#5A43FF] py-3 rounded-xl font-semibold hover-lift disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-white hover:text-white/80 transition-colors">
                ← Back to Login
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-6 animate-scale" />
            <h2 className="text-3xl font-bold text-white mb-4">Check Your Email!</h2>
            <p className="text-white/90 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-white/80 mb-6">
              Please check your inbox and click the link to reset your password.
            </p>
            <Link 
              to="/login" 
              className="inline-block bg-white text-[#5A43FF] px-8 py-3 rounded-xl font-semibold hover-lift"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
