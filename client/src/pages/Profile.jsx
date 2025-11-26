import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave } from 'react-icons/fa';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('https://event-me-backend.vercel.app/api/auth/profile', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setFormData({  
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        bio: data.bio || '',
        avatar: data.avatar,
        password: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      const { data } = await axios.put(
        'https://event-me-backend.vercel.app/api/auth/profile',
        updateData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      setSuccess('Profile updated successfully!');
      setEditing(false);
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0f0f23]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20"></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#5A43FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FF8F00] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-[#5A43FF]/20 to-[#FF8F00]/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <span className="text-3xl">👤</span>
                  My Profile
                </h1>
                <p className="text-gray-300 text-sm">Manage your personal information and settings</p>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#5A43FF] via-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 font-bold whitespace-nowrap"
                >
                  <FaEdit className="text-lg" /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-red-500/30 border-2 border-red-500/50 text-white px-6 py-4 rounded-2xl mb-6 backdrop-blur-xl shadow-lg animate-slide-up">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <p className="font-bold text-lg">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-500/30 border-2 border-green-500/50 text-white px-6 py-4 rounded-2xl mb-6 backdrop-blur-xl shadow-lg animate-slide-up">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <p className="font-bold text-lg">{success}</p>
              </div>
            </div>
          )}

          {/* Profile Header Card */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#5A43FF] via-purple-500 to-[#FF8F00] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white/50 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">{formData.name}</h2>
                <p className="text-gray-300 mb-3 text-lg">{formData.email}</p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg ${
                    user.role === 'admin' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : user.role === 'organizer'
                      ? 'bg-gradient-to-r from-[#FF8F00] to-[#FFB800] text-white'
                      : 'bg-gradient-to-r from-[#5A43FF] to-purple-500 text-white'
                  }`}>
                    {user.role === 'admin' ? '👑 Admin' : user.role === 'organizer' ? '✨ Organizer' : '👤 User'}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white/20 text-white backdrop-blur-sm border border-white/30">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-xl">📋</span>
              Personal Information
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-white font-bold mb-3 flex items-center gap-2 text-sm">
                    <FaUser className="text-purple-400 text-lg" /> 
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={!editing}
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] disabled:bg-white/5 disabled:text-gray-400 disabled:cursor-not-allowed transition-all placeholder-gray-500 font-medium shadow-lg"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white font-bold mb-3 flex items-center gap-2 text-sm">
                    <FaEnvelope className="text-purple-400 text-lg" /> 
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!editing}
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] disabled:bg-white/5 disabled:text-gray-400 disabled:cursor-not-allowed transition-all placeholder-gray-500 font-medium shadow-lg"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white font-bold mb-3 flex items-center gap-2 text-sm">
                    <FaPhone className="text-purple-400 text-lg" /> 
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!editing}
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] disabled:bg-white/5 disabled:text-gray-400 disabled:cursor-not-allowed transition-all placeholder-gray-500 font-medium shadow-lg"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Avatar URL */}
                <div>
                  <label className="block text-white font-bold mb-3 flex items-center gap-2 text-sm">
                    <span className="text-lg">🖼️</span>
                    <span>Avatar URL</span>
                  </label>
                  <input
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                    disabled={!editing}
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] disabled:bg-white/5 disabled:text-gray-400 disabled:cursor-not-allowed transition-all placeholder-gray-500 font-medium shadow-lg"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </div>

              {/* Bio - Full Width */}
              <div className="mt-6">
                <label className="block text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <span className="text-lg">📝</span>
                  <span>Bio</span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  disabled={!editing}
                  rows="5"
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] disabled:bg-white/5 disabled:text-gray-400 disabled:cursor-not-allowed transition-all placeholder-gray-500 resize-none font-medium shadow-lg"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Password - Only when editing */}
              {editing && (
                <div className="mt-6">
                  <label className="block text-white font-bold mb-3 flex items-center gap-2 text-sm">
                    <span className="text-lg">🔒</span>
                    <span>New Password</span>
                    <span className="text-xs text-gray-400 font-normal ml-2">(leave blank to keep current)</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] transition-all placeholder-gray-500 font-medium shadow-lg"
                    placeholder="••••••••"
                    minLength={6}
                  />
                  <p className="text-xs text-gray-400 mt-2 ml-1">✓ Minimum 6 characters</p>
                </div>
              )}

              {/* Action Buttons */}
              {editing && (
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-white/20">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-[#5A43FF] via-purple-500 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <FaSave className="text-xl relative z-10" /> 
                    <span className="relative z-10">Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      fetchProfile();
                    }}
                    className="flex-1 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white py-5 rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💡</span>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Profile Tips</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Keep your profile information up to date</li>
                  <li>• Use a professional avatar image</li>
                  <li>• Add a bio to let others know about you</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
