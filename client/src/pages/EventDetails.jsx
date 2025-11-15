import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaMapMarkerAlt, FaCalendar, FaClock, FaUser, FaTicketAlt, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import ReviewSection from '../components/ReviewSection';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const bookingTickets = Object.entries(tickets)
      .filter(([_, quantity]) => quantity > 0)
      .map(([ticketType, quantity]) => {
        const ticket = event.ticketTypes.find(t => t.name === ticketType);
        return {
          ticketType,
          quantity,
          price: ticket.price
        };
      });

    if (bookingTickets.length === 0) {
      setError('Please select at least one ticket');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/bookings',
        { eventId: event._id, tickets: bookingTickets },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSuccess('Booking successful! Redirecting to your bookings...');
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-50 via-white to-primary-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
            <FaTicketAlt className="text-white text-3xl" />
          </div>
          <p className="text-dark-600 font-medium text-lg">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-50 via-white to-primary-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl font-bold text-dark-900 mb-2">Event Not Found</h2>
          <p className="text-dark-600 mb-6">The event you're looking for doesn't exist or has been removed</p>
          <Link 
            to="/events" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <FaArrowLeft />
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = Object.entries(tickets).reduce((sum, [ticketType, quantity]) => {
    const ticket = event.ticketTypes.find(t => t.name === ticketType);
    return sum + (ticket?.price || 0) * quantity;
  }, 0);

  const totalTickets = Object.values(tickets).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link 
            to="/events"
            className="flex items-center gap-2 px-4 py-2 glass backdrop-blur-xl text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
          >
            <FaArrowLeft />
            Back to Events
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute top-6 right-6">
          <span className="glass backdrop-blur-xl px-6 py-3 rounded-full text-white font-semibold text-lg shadow-lg">
            {event.category}
          </span>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-secondary-400" />
                <span className="font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-secondary-400" />
                <span className="font-medium">{event.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Information */}
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-dark-900 mb-6">Event Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4 p-4 glass rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaCalendar className="text-white text-lg" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dark-500 mb-1">Date</div>
                    <div className="font-semibold text-dark-900">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 glass rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dark-500 mb-1">Time</div>
                    <div className="font-semibold text-dark-900">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 glass rounded-2xl md:col-span-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dark-500 mb-1">Location</div>
                    <div className="font-semibold text-dark-900">
                      {event.location.venue}<br/>
                      <span className="text-dark-600 font-normal">
                        {event.location.address}, {event.location.city}, {event.location.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 glass rounded-2xl md:col-span-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-white text-lg" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dark-500 mb-1">Organized By</div>
                    <div className="font-semibold text-dark-900">{event.organizer.name}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-dark-900 mb-4">About This Event</h3>
                <p className="text-dark-600 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="glass-card rounded-3xl p-8">
              <ReviewSection eventId={event._id} />
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-dark-900 mb-6">Book Your Tickets</h2>
              
              {/* Alerts */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3 animate-slide-down">
                  <FaExclamationCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">Error</h4>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-6 flex items-start gap-3 animate-slide-down">
                  <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Success!</h4>
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              )}

              {/* Ticket Types */}
              <div className="space-y-4 mb-6">
                {event.ticketTypes.map((ticket) => {
                  const available = ticket.quantity - ticket.sold;
                  const isAvailable = available > 0;
                  
                  return (
                    <div 
                      key={ticket.name} 
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        isAvailable 
                          ? 'border-gray-200 hover:border-primary-300 bg-white' 
                          : 'border-gray-100 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-bold text-dark-900 text-lg">{ticket.name}</div>
                          <div className="text-sm text-dark-600 mt-1">
                            {isAvailable ? (
                              <span className="text-green-600 font-medium">
                                ✓ {available} tickets available
                              </span>
                            ) : (
                              <span className="text-red-600 font-medium">
                                ✕ Sold Out
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-500">
                            ${ticket.price}
                          </div>
                        </div>
                      </div>
                      
                      {isAvailable && (
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-semibold text-dark-700">Quantity:</label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setTickets({
                                ...tickets, 
                                [ticket.name]: Math.max(0, (tickets[ticket.name] || 0) - 1)
                              })}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-dark-900 transition-colors"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="0"
                              max={available}
                              value={tickets[ticket.name] || 0}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 0;
                                setTickets({
                                  ...tickets, 
                                  [ticket.name]: Math.min(available, Math.max(0, value))
                                });
                              }}
                              className="w-16 px-3 py-2 border-2 border-gray-200 rounded-lg text-center font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
                            />
                            <button
                              onClick={() => setTickets({
                                ...tickets, 
                                [ticket.name]: Math.min(available, (tickets[ticket.name] || 0) + 1)
                              })}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-dark-900 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="border-t-2 border-gray-100 pt-6 mb-6">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-dark-600">
                    <span>Tickets ({totalTickets})</span>
                    <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-dark-600">
                    <span>Service Fee</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                </div>
                <div className="flex justify-between text-2xl font-bold text-dark-900 pt-3 border-t-2 border-gray-100">
                  <span>Total</span>
                  <span className="text-primary-500">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={totalTickets === 0}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-3"
              >
                <FaTicketAlt />
                {totalTickets === 0 ? 'Select Tickets' : `Book ${totalTickets} Ticket${totalTickets > 1 ? 's' : ''}`}
              </button>

              {!user && (
                <p className="text-sm text-dark-500 text-center mt-4">
                  You'll be redirected to login to complete your booking
                </p>
              )}

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm text-dark-600">
                  <FaCheckCircle className="text-green-500" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-dark-600">
                  <FaCheckCircle className="text-green-500" />
                  <span>Instant ticket delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-dark-600">
                  <FaCheckCircle className="text-green-500" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
