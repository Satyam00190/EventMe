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
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">Admin Dashboard</h1>

      {/* Statistics Overview */}
      <div className="grid md:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Users</p>
              <p className="text-2xl font-bold">{stats?.totalUsers}</p>
            </div>
            <FaUsers className="text-3xl text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Organizers</p>
              <p className="text-2xl font-bold">{stats?.totalOrganizers}</p>
            </div>
            <FaUserTie className="text-3xl text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Events</p>
              <p className="text-2xl font-bold">{stats?.totalEvents}</p>
              <p className="text-xs text-green-600">{stats?.publishedEvents} published</p>
            </div>
            <FaCalendar className="text-3xl text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pending</p>
              <p className="text-2xl font-bold">{stats?.pendingEvents}</p>
            </div>
            <FaCalendar className="text-3xl text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Bookings</p>
              <p className="text-2xl font-bold">{stats?.totalBookings}</p>
              <p className="text-xs text-green-600">{stats?.confirmedBookings} confirmed</p>
            </div>
            <FaTicketAlt className="text-3xl text-pink-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Revenue</p>
              <p className="text-2xl font-bold">${stats?.totalRevenue}</p>
            </div>
            <FaDollarSign className="text-3xl text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 border-b">
          {['overview', 'users', 'organizers', 'events', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Top Events</h2>
            <div className="space-y-3">
              {stats?.topEvents?.map((event, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="font-semibold">{event._id?.title}</div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{event.bookings} bookings</span>
                    <span className="text-green-600 font-semibold">${event.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
            <div className="space-y-3">
              {stats?.recentUsers?.map((u) => (
                <div key={u._id} className="border-b pb-3">
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm text-gray-600">{u.email}</div>
                  <div className="text-xs text-gray-500 mt-1">
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{u.name}</td>
                    <td className="py-3 px-4">{u.email}</td>
                    <td className="py-3 px-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="px-2 py-1 border rounded"
                        disabled={u._id === user._id}
                      >
                        <option value="user">User</option>
                        <option value="organizer">Organizer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        u.suspended ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
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
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                            >
                              Unsuspend
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSuspendUser(u._id)}
                              className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 text-sm"
                            >
                              Suspend
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Organizer Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Events</th>
                  <th className="text-left py-3 px-4">Bookings</th>
                  <th className="text-left py-3 px-4">Revenue</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizers.map((org) => (
                  <tr key={org._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{org.name}</td>
                    <td className="py-3 px-4">{org.email}</td>
                    <td className="py-3 px-4">
                      {org.stats.totalEvents} ({org.stats.publishedEvents} published)
                    </td>
                    <td className="py-3 px-4">{org.stats.totalBookings}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      ${org.stats.totalRevenue}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {org.suspended ? (
                          <button
                            onClick={() => handleUnsuspendUser(org._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                          >
                            Unsuspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSuspendUser(org._id)}
                            className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 text-sm"
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Event Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Organizer</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Seats</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{event.title}</td>
                    <td className="py-3 px-4">
                      <div>{event.organizer.name}</div>
                      <div className="text-xs text-gray-600">{event.organizer.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        event.status === 'published' ? 'bg-green-100 text-green-600' :
                        event.status === 'draft' ? 'bg-yellow-100 text-yellow-600' :
                        event.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {event.availableSeats} / {event.totalSeats}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {event.status === 'draft' && (
                          <button
                            onClick={() => handleApproveEvent(event._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                          >
                            Approve
                          </button>
                        )}
                        {event.status !== 'cancelled' && (
                          <button
                            onClick={() => handleRejectEvent(event._id)}
                            className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 text-sm"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Review Management</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold">{review.user.name}</div>
                    <div className="text-sm text-gray-600">{review.event.title}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-xs text-gray-500 mt-2">
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
