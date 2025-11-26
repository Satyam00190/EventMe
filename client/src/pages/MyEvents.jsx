import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendar, FaMapMarkerAlt, FaEdit, FaTrash, FaChartBar } from 'react-icons/fa';

const MyEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const { data } = await axios.get('https://event-me-backend.vercel.app/api/events/my-events', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`https://event-me-backend.vercel.app/api/events/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchMyEvents();
      } catch (error) {
        alert('Failed to delete event');
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
        <p className="text-white font-medium text-lg">Loading your events...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0f0f23]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20"></div>
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Events</h1>
        <Link to="/create-event" className="bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all font-bold">
          ✨ Create New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
          <div className="text-6xl mb-4">📅</div>
          <p className="mb-4 text-white text-xl">You haven't created any events yet</p>
          <Link to="/create-event" className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF8F00] to-[#FFB800] text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
            Create your first event
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:-translate-y-1 transition-all">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                  event.status === 'published' ? 'bg-green-500/30 text-green-200 border border-green-500/50' :
                  event.status === 'draft' ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50' :
                  'bg-red-500/30 text-red-200 border border-red-500/50'
                }`}>
                  {event.status}
                </span>
                <h3 className="text-xl font-bold mt-3 mb-3 text-white">{event.title}</h3>
                <div className="text-gray-300 text-sm space-y-2 mb-4">
                  <div className="flex items-center">
                    <FaCalendar className="mr-2 text-[#5A43FF]" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-[#FF8F00]" />
                    {event.location.city}
                  </div>
                </div>
                <div className="text-sm text-gray-300 mb-4 font-semibold">
                  {event.availableSeats} / {event.totalSeats} seats available
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/event-dashboard/${event._id}`}
                    className="flex-1 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white py-2 rounded-xl text-center hover:shadow-lg transition-all font-bold"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={`/edit-event/${event._id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 hover:shadow-lg transition-all"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 hover:shadow-lg transition-all"
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
  );
};

export default MyEvents;
