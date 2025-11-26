import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaUsers, FaCalendar, FaTicketAlt, FaDollarSign, FaUserTie, FaCheckCircle } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [events, setEvents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, organizersRes, eventsRes, reviewsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${user.token}` }
        }),
        axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${user.token}` }
        }),
        axios.get('http://localhost:5000/api/admin/organizers', {
          headers: { Authorization: `Bearer ${user.token}` }
        }),
        axios.get('http://localhost:5000/api/admin/events', {
          headers: { Authorization: `Bearer ${user.token}` }
        }),
        axios.get('http://localhost:5000/api/admin/reviews', {
          headers: { Authorization: `Bearer ${user.token}` }
        })
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setOrganizers(organizersRes.data);
      setEvents(eventsRes.data);
      setReviews(reviewsRes.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchData();
    } catch (error) {
      alert('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchData();
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/suspend`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchData();
    } catch (error) {
      alert('Failed to suspend user');
    }
  };

  const handleUnsuspendUser = async (userId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/unsuspend`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchData();
    } catch (error) {
      alert('Failed to unsuspend user');
    }
  };

  const handleApproveEvent = async (eventId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/events/${eventId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchData();
      alert('Event approved successfully');
    } catch (error) {
      alert('Failed to approve event');
    }
  };

  const handleRejectEvent = async (eventId) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      try {
        await axios.put(
          `http://localhost:5000/api/admin/events/${eventId}/reject`,
          { reason },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        fetchData();
        alert('Event rejected');
      } catch (error) {
        alert('Failed to reject event');
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/events/${eventId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchData();
      } catch (error) {
        alert('Failed to delete event');
      }
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/reviews/${reviewId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchData();
      } catch (error) {
        alert('Failed to delete review');
      }
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
        <p className="text-white font-medium text-lg">Loading admin dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0f0f23]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-white">👑 Admin Dashboard</h1>

      {/* Statistics Overview */}
      <div className="grid md:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-4 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1 font-semibold">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats?.totalUsers}</p>
            </div>
            <FaUsers className="text-3xl text-[#5A43FF]" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-4 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1 font-semibold">Organizers</p>
              <p className="text-2xl font-bold text-white">{stats?.totalOrganizers}</p>
            </div>
            <FaUserTie className="text-3xl text-purple-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-4 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1 font-semibold">Total Events</p>
              <p className="text-2xl font-bold text-white">{stats?.totalEvents}</p>
              <p className="text-xs text-green-400 font-semibold">{stats?.publishedEvents} published</p>
            </div>
            <FaCalendar className="text-3xl text-blue-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-4 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1 font-semibold">Pending</p>
              <p className="text-2xl font-bold text-white">{stats?.pendingEvents}</p>
            </div>
            <FaCalendar className="text-3xl text-yellow-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-4 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1 font-semibold">Bookings</p>
              <p className="text-2xl font-bold text-white">{stats?.totalBookings}</p>
              <p className="text-xs text-green-400 font-semibold">{stats?.confirmedBookings} confirmed</p>
            </div>
            <FaTicketAlt className="text-3xl text-pink-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-4 hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1 font-semibold">Revenue</p>
              <p className="text-2xl font-bold text-white">${stats?.totalRevenue}</p>
            </div>
            <FaDollarSign className="text-3xl text-green-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 border-b border-white/20 bg-white/5 backdrop-blur-sm rounded-t-2xl p-2">
          {['overview', 'users', 'organizers', 'events', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize rounded-xl transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">🏆 Top Events</h2>
            <div className="space-y-3">
              {stats?.topEvents?.map((event, index) => (
                <div key={index} className="border-b border-white/20 pb-3">
                  <div className="font-semibold text-white">{event._id?.title}</div>
                  <div className="flex justify-between text-sm text-gray-300 mt-1">
                    <span>{event.bookings} bookings</span>
                    <span className="text-green-400 font-semibold">${event.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">👥 Recent Users</h2>
            <div className="space-y-3">
              {stats?.recentUsers?.map((u) => (
                <div key={u._id} className="border-b border-white/20 pb-3">
                  <div className="font-semibold text-white">{u.name}</div>
                  <div className="text-sm text-gray-300">{u.email}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {u.role} • {new Date(u.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">👤 User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-bold">Name</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Email</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Role</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Status</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{u.name}</td>
                    <td className="py-3 px-4 text-gray-300">{u.email}</td>
                    <td className="py-3 px-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white"
                        disabled={u._id === user._id}
                      >
                        <option value="user">User</option>
                        <option value="organizer">Organizer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        u.suspended ? 'bg-red-500/30 text-red-200 border border-red-500/50' : 'bg-green-500/30 text-green-200 border border-green-500/50'
                      }`}>
                        {u.suspended ? 'Suspended' : 'Active'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {u._id !== user._id && (
                        <div className="flex gap-2">
                          {u.suspended ? (
                            <button
                              onClick={() => handleUnsuspendUser(u._id)}
                              className="bg-green-600 text-white px-3 py-1 rounded-xl hover:bg-green-700 hover:shadow-lg transition-all text-sm font-bold"
                            >
                              Unsuspend
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSuspendUser(u._id)}
                              className="bg-yellow-600 text-white px-3 py-1 rounded-xl hover:bg-yellow-700 hover:shadow-lg transition-all text-sm font-bold"
                            >
                              Suspend
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-xl hover:bg-red-700 hover:shadow-lg transition-all text-sm font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Organizers Tab */}
      {activeTab === 'organizers' && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">✨ Organizer Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-bold">Name</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Email</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Events</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Bookings</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Revenue</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizers.map((org) => (
                  <tr key={org._id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{org.name}</td>
                    <td className="py-3 px-4 text-gray-300">{org.email}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {org.stats.totalEvents} ({org.stats.publishedEvents} published)
                    </td>
                    <td className="py-3 px-4 text-gray-300">{org.stats.totalBookings}</td>
                    <td className="py-3 px-4 font-semibold text-green-400">
                      ${org.stats.totalRevenue}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {org.suspended ? (
                          <button
                            onClick={() => handleUnsuspendUser(org._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-xl hover:bg-green-700 hover:shadow-lg transition-all text-sm font-bold"
                          >
                            Unsuspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSuspendUser(org._id)}
                            className="bg-yellow-600 text-white px-3 py-1 rounded-xl hover:bg-yellow-700 hover:shadow-lg transition-all text-sm font-bold"
                          >
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">📅 Event Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-bold">Title</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Organizer</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Date</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Status</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Seats</th>
                  <th className="text-left py-3 px-4 text-white font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 font-semibold text-white">{event.title}</td>
                    <td className="py-3 px-4">
                      <div className="text-white">{event.organizer.name}</div>
                      <div className="text-xs text-gray-400">{event.organizer.email}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        event.status === 'published' ? 'bg-green-500/30 text-green-200 border border-green-500/50' :
                        event.status === 'draft' ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50' :
                        event.status === 'cancelled' ? 'bg-red-500/30 text-red-200 border border-red-500/50' :
                        'bg-gray-500/30 text-gray-200 border border-gray-500/50'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {event.availableSeats} / {event.totalSeats}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {event.status === 'draft' && (
                          <button
                            onClick={() => handleApproveEvent(event._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-xl hover:bg-green-700 hover:shadow-lg transition-all text-sm font-bold"
                          >
                            Approve
                          </button>
                        )}
                        {event.status !== 'cancelled' && (
                          <button
                            onClick={() => handleRejectEvent(event._id)}
                            className="bg-yellow-600 text-white px-3 py-1 rounded-xl hover:bg-yellow-700 hover:shadow-lg transition-all text-sm font-bold"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-xl hover:bg-red-700 hover:shadow-lg transition-all text-sm font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">⭐ Review Management</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border border-white/20 rounded-2xl p-4 bg-white/5 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-white">{review.user.name}</div>
                    <div className="text-sm text-gray-300">{review.event.title}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-xl hover:bg-red-700 hover:shadow-lg transition-all text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-300">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminDashboard;
