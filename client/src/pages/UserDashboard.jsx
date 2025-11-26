import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaTicketAlt, FaCalendar, FaStar, FaBell } from 'react-icons/fa';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    upcomingBookings: 0,
    pastBookings: 0,
    totalSpent: 0,
    unreadNotifications: 0
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, notificationsRes] = await Promise.all([
        axios.get('https://event-me-backend.vercel.app/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${user.token}` }
        }),
        axios.get('https://event-me-backend.vercel.app/api/notifications/unread-count', {
          headers: { Authorization: `Bearer ${user.token}` }
        })
      ]);

      const bookings = bookingsRes.data;
      const now = new Date();

      const upcoming = bookings.filter(b => 
        new Date(b.event.date) > now && b.status === 'confirmed'
      );
      const past = bookings.filter(b => 
        new Date(b.event.date) <= now && b.status === 'confirmed'
      );
      const totalSpent = bookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + b.totalAmount, 0);

      setStats({
        upcomingBookings: upcoming.length,
        pastBookings: past.length,
        totalSpent,
        unreadNotifications: notificationsRes.data.count
      });

      setUpcomingEvents(upcoming.slice(0, 5));
      setRecentBookings(bookings.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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
        <p className="text-white font-medium text-lg">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0f0f23]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20"></div>
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome back, <span className="bg-gradient-to-r from-[#5A43FF] via-purple-400 to-[#FF8F00] bg-clip-text text-transparent">{user.name}</span>!</h1>
          <p className="text-gray-300 mt-2 text-lg">Here's your event activity overview</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:-translate-y-1 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 mb-1 font-semibold">Upcoming Events</p>
                <p className="text-3xl font-bold text-white">{stats.upcomingBookings}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaCalendar className="text-white text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:-translate-y-1 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 mb-1 font-semibold">Past Events</p>
                <p className="text-3xl font-bold text-white">{stats.pastBookings}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaTicketAlt className="text-white text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:-translate-y-1 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 mb-1 font-semibold">Total Spent</p>
                <p className="text-3xl font-bold text-white">${stats.totalSpent}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaStar className="text-white text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:-translate-y-1 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 mb-1 font-semibold">Notifications</p>
                <p className="text-3xl font-bold text-white">{stats.unreadNotifications}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaBell className="text-white text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">📅 Upcoming Events</h2>
              <Link to="/my-bookings" className="text-[#FF8F00] hover:text-[#FFB800] font-semibold transition-colors">
                View All →
              </Link>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-300 mb-4 text-lg">No upcoming events</p>
                <Link to="/events" className="inline-block px-6 py-3 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((booking) => (
                  <Link
                    key={booking._id}
                    to={`/events/${booking.event._id}`}
                    className="block border border-white/20 rounded-2xl p-4 hover:shadow-lg hover:border-[#5A43FF]/50 transition-all duration-300 bg-white/5"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={booking.event.image}
                        alt={booking.event.title}
                        className="w-20 h-20 object-cover rounded-xl border-2 border-white/20"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-white">{booking.event.title}</h3>
                        <p className="text-sm text-gray-300 mt-1">
                          📅 {new Date(booking.event.date).toLocaleDateString()} at {booking.event.time}
                        </p>
                        <p className="text-sm text-gray-300">
                          📍 {booking.event.location.venue}, {booking.event.location.city}
                        </p>
                        <p className="text-sm font-semibold text-[#FF8F00] mt-2">
                          🎫 {booking.tickets.reduce((sum, t) => sum + t.quantity, 0)} ticket(s)
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">🎫 Recent Bookings</h2>
              <Link to="/my-bookings" className="text-[#FF8F00] hover:text-[#FFB800] font-semibold transition-colors">
                View All →
              </Link>
            </div>

            {recentBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎫</div>
                <p className="text-gray-300 mb-4 text-lg">No bookings yet</p>
                <Link to="/events" className="inline-block px-6 py-3 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
                  Book Your First Event
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking._id} className="border border-white/20 rounded-2xl p-4 hover:shadow-lg hover:border-[#5A43FF]/50 transition-all duration-300 bg-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-white">{booking.event.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Ref: {booking.bookingReference}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-500/30 text-green-200 border border-green-500/50' :
                        booking.status === 'pending' ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50' :
                        'bg-red-500/30 text-red-200 border border-red-500/50'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-3">
                      <span className="text-gray-300">
                        📅 {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                      <span className="font-bold text-[#FF8F00] text-lg">
                        ${booking.totalAmount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-[#5A43FF] via-purple-600 to-[#FF8F00] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">🎉 Discover More Events</h2>
            <p className="mb-6 text-white/90 text-lg">Find exciting events happening near you</p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-white text-[#5A43FF] px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Browse All Events →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
