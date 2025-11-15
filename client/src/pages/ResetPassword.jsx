import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaCheckCircle } from 'react-icons/fa';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password
      });
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
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
                <FaLock className="text-white text-3xl" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
              <p className="text-white/80">Enter your new password</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white mb-2 font-medium">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 glass-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/50"
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>

              <div className="mb-6">
                <label className="block text-white mb-2 font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 glass-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/50"
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-[#5A43FF] py-3 rounded-xl font-semibold hover-lift disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
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
            <h2 className="text-3xl font-bold text-white mb-4">Password Reset!</h2>
            <p className="text-white/90 mb-6">
              Your password has been reset successfully.
            </p>
            <p className="text-white/80 mb-6">
              Redirecting to login...
            </p>
            <Link 
              to="/login" 
              className="inline-block bg-white text-[#5A43FF] px-8 py-3 rounded-xl font-semibold hover-lift"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
