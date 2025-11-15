import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchBookings();
      } catch (error) {
        alert('Failed to cancel booking');
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
        <p className="text-white font-medium text-lg">Loading your bookings...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          You haven't booked any events yet
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bold">{booking.event.title}</h3>
                    <span className={`px-3 py-1 rounded text-sm ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="text-gray-600 space-y-2">
                      <div className="flex items-center">
                        <FaCalendar className="mr-2" />
                        {new Date(booking.event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        {booking.event.location.venue}, {booking.event.location.city}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold mb-2">Tickets:</div>
                      {booking.tickets.map((ticket, idx) => (
                        <div key={idx} className="text-gray-600">
                          {ticket.quantity}x {ticket.ticketType} - ${ticket.price * ticket.quantity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-gray-600">
                      <FaTicketAlt className="inline mr-2" />
                      Booking Ref: <span className="font-mono font-semibold">{booking.bookingReference}</span>
                    </div>
                    <div className="text-xl font-bold text-indigo-600">
                      Total: ${booking.totalAmount}
                    </div>
                  </div>
                </div>

                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default MyBookings;
