import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaBell, FaCheck, FaTrash, FaCheckDouble } from 'react-icons/fa';

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get('https://event-me-backend.vercel.app/api/notifications', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `https://event-me-backend.vercel.app/api/notifications/${id}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        'https://event-me-backend.vercel.app/api/notifications/mark-all-read',
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`https://event-me-backend.vercel.app/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      booking: '🎫',
      event_update: '📅',
      event_reminder: '⏰',
      cancellation: '❌',
      review: '⭐'
    };
    return icons[type] || '🔔';
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
          <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-white font-medium text-lg">Loading notifications...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0f0f23]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20"></div>
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Notifications</h1>
          {notifications.some(n => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all font-bold"
            >
              <FaCheckDouble /> Mark All Read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
            <FaBell className="text-6xl mx-auto mb-4 text-gray-400" />
            <p className="text-white text-xl">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-5 ${
                  !notification.read ? 'border-l-4 border-[#5A43FF]' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      <div>
                        <h3 className="font-bold text-lg text-white">{notification.title}</h3>
                        <p className="text-gray-400 text-sm">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 ml-11">{notification.message}</p>
                    {notification.relatedEvent && (
                      <Link
                        to={`/events/${notification.relatedEvent._id}`}
                        className="text-[#FF8F00] hover:text-[#FFB800] font-semibold text-sm ml-11 inline-block mt-2"
                      >
                        View Event →
                      </Link>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="text-green-400 hover:text-green-300 p-2 hover:bg-green-500/20 rounded-lg transition-all"
                        title="Mark as read"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification._id)}
                      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-all"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Notifications;
