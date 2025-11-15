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
      const { data } = await axios.get('http://localhost:5000/api/events/my-events', {
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
        await axios.delete(`http://localhost:5000/api/events/${id}`, {
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
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Events</h1>
        <Link to="/create-event" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
          Create New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          <p className="mb-4">You haven't created any events yet</p>
          <Link to="/create-event" className="text-indigo-600 hover:underline">
            Create your first event
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  event.status === 'published' ? 'bg-green-100 text-green-600' :
                  event.status === 'draft' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {event.status}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-2">{event.title}</h3>
                <div className="text-gray-600 text-sm space-y-1 mb-4">
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    {event.location.city}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {event.availableSeats} / {event.totalSeats} seats available
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/event-dashboard/${event._id}`}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded text-center hover:bg-indigo-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={`/edit-event/${event._id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
