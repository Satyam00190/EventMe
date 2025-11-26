import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import { AuthContext } from '../context/AuthContext';
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt, FaCheckCircle, FaTimesCircle, FaClock, FaStar, FaEdit, FaPaperPlane } from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({});
  const [showReviewForm, setShowReviewForm] = useState({});
  const { toasts, removeToast, success, error } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/my-bookings');
      console.log('Fetched bookings:', data);
      // Filter out bookings with null/undefined events
      const validBookings = data.filter(booking => booking.event && booking.event._id);
      setBookings(validBookings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.delete(`/bookings/${id}`);
        success('Booking cancelled successfully!');
        fetchBookings();
      } catch (err) {
        error('Failed to cancel booking. Please try again.');
      }
    }
  };

  const handleReviewSubmit = async (eventId, bookingId) => {
    const review = reviewData[bookingId];
    if (!review || !review.rating || !review.comment) {
      error('Please provide both rating and comment');
      return;
    }

    if (review.comment.length < 10) {
      error('Review comment must be at least 10 characters');
      return;
    }

    try {
      await api.post(`/events/${eventId}/reviews`, {
        rating: review.rating,
        comment: review.comment
      });
      success('Review submitted successfully!');
      setShowReviewForm({ ...showReviewForm, [bookingId]: false });
      setReviewData({ ...reviewData, [bookingId]: { rating: 0, comment: '' } });
      fetchBookings();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to submit review');
    }
  };

  const setRating = (bookingId, rating) => {
    setReviewData({
      ...reviewData,
      [bookingId]: { ...reviewData[bookingId], rating }
    });
  };

  const setComment = (bookingId, comment) => {
    setReviewData({
      ...reviewData,
      [bookingId]: { ...reviewData[bookingId], comment }
    });
  };

  const toggleReviewForm = (bookingId) => {
    setShowReviewForm({
      ...showReviewForm,
      [bookingId]: !showReviewForm[bookingId]
    });
  };

  const isPastEvent = (eventDate) => {
    return new Date(eventDate) < new Date();
  };

  const hasUserReviewed = (event) => {
    if (!event || !event.reviews) return false;
    return event.reviews.some(review => 
      review.user?._id === user.id || review.user === user.id
    );
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
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0f0f23]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20"></div>
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-[#5A43FF] via-purple-400 to-[#FF8F00] bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage and track all your event bookings</p>
        </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
          <div className="text-6xl sm:text-7xl mb-6">🎫</div>
          <p className="text-white text-xl sm:text-2xl mb-2 font-semibold">No Bookings Yet</p>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">Start exploring amazing events and book your tickets</p>
          <Link to="/events" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 transition-all duration-300">
            <FaCalendar />
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden">
              {/* Card Header with Status */}
              <div className="bg-gradient-to-r from-white/5 to-transparent p-4 sm:p-6 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2">{booking.event.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaTicketAlt className="text-purple-400" />
                      <span className="font-mono font-semibold">{booking.bookingReference}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 shadow-lg ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-500/20 text-green-300 border-green-500/60 shadow-green-500/30' 
                      : booking.status === 'pending' 
                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/60 shadow-yellow-500/30' 
                      : 'bg-red-500/20 text-red-300 border-red-500/60 shadow-red-500/30'
                  }`}>
                    {booking.status === 'confirmed' && <FaCheckCircle className="text-base" />}
                    {booking.status === 'pending' && <FaClock className="text-base" />}
                    {booking.status === 'cancelled' && <FaTimesCircle className="text-base" />}
                    <span className="uppercase tracking-wide">{booking.status}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {/* Event Details */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Event Details</h4>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-10 h-10 rounded-xl bg-[#5A43FF]/20 flex items-center justify-center flex-shrink-0">
                        <FaCalendar className="text-[#5A43FF]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="text-white font-semibold">{new Date(booking.event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-10 h-10 rounded-xl bg-[#FF8F00]/20 flex items-center justify-center flex-shrink-0">
                        <FaMapMarkerAlt className="text-[#FF8F00]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="text-white font-semibold">{booking.event.location.venue}</p>
                        <p className="text-sm text-gray-400">{booking.event.location.city}</p>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Tickets</h4>
                    <div className="space-y-2">
                      {booking.tickets.map((ticket, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/10">
                          <div>
                            <p className="text-white font-semibold">{ticket.ticketType}</p>
                            <p className="text-sm text-gray-400">Quantity: {ticket.quantity}</p>
                          </div>
                          <p className="text-[#FF8F00] font-bold">${ticket.price * ticket.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Payment</h4>
                    <div className="bg-gradient-to-br from-[#FF8F00]/20 to-[#5A43FF]/20 rounded-2xl p-4 border border-[#FF8F00]/30">
                      <p className="text-sm text-gray-300 mb-1">Total Amount</p>
                      <p className="text-3xl font-bold text-white">${booking.totalAmount}</p>
                      <p className="text-xs text-gray-400 mt-2">Payment Confirmed</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                  <Link
                    to={`/events/${booking.event._id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <FaCalendar />
                    View Event Details
                  </Link>
                  
                  {booking.status === 'confirmed' && !isPastEvent(booking.event.date) && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all duration-300 border border-red-500/50"
                    >
                      <FaTimesCircle />
                      Cancel Booking
                    </button>
                  )}

                  {booking.status === 'confirmed' && isPastEvent(booking.event.date) && !hasUserReviewed(booking.event) && (
                    <button
                      onClick={() => toggleReviewForm(booking._id)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-0.5 transition-all duration-300 border border-amber-400/50"
                    >
                      <FaStar />
                      {showReviewForm[booking._id] ? 'Hide Review' : 'Write Review'}
                    </button>
                  )}
                </div>

                {/* Review Section - Highly Visible */}
                {booking.status === 'confirmed' && isPastEvent(booking.event.date) && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    {hasUserReviewed(booking.event) ? (
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 rounded-2xl p-6 shadow-lg shadow-green-500/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center">
                            <FaCheckCircle className="text-green-400 text-xl" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">Review Submitted</h4>
                            <p className="text-sm text-green-300">Thank you for sharing your experience!</p>
                          </div>
                        </div>
                        {booking.event.reviews?.filter(r => r.user?._id === user.id || r.user === user.id).map((review, idx) => (
                          <div key={idx} className="mt-4 bg-white/5 rounded-xl p-4">
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`${i < review.rating ? 'text-amber-400' : 'text-gray-600'}`} />
                              ))}
                              <span className="ml-2 text-white font-semibold">{review.rating}/5</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : showReviewForm[booking._id] ? (
                      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl shadow-amber-500/20 animate-fadeIn">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                            <FaEdit className="text-white text-xl" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white">Share Your Experience</h4>
                            <p className="text-sm text-amber-300">Help others by reviewing this event</p>
                          </div>
                        </div>

                        {/* Star Rating */}
                        <div className="mb-6">
                          <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                            Rate Your Experience
                          </label>
                          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(booking._id, star)}
                                className="transform hover:scale-125 transition-all duration-200"
                              >
                                <FaStar
                                  className={`text-3xl ${
                                    (reviewData[booking._id]?.rating || 0) >= star
                                      ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                                      : 'text-gray-600 hover:text-amber-300'
                                  }`}
                                />
                              </button>
                            ))}
                            {reviewData[booking._id]?.rating > 0 && (
                              <span className="ml-3 text-2xl font-bold text-amber-400">
                                {reviewData[booking._id].rating}/5
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Comment */}
                        <div className="mb-6">
                          <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                            Your Review
                          </label>
                          <textarea
                            value={reviewData[booking._id]?.comment || ''}
                            onChange={(e) => setComment(booking._id, e.target.value)}
                            placeholder="Share your thoughts about the event, venue, organization, and overall experience..."
                            rows="5"
                            className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                          />
                          <p className="text-xs text-gray-400 mt-2">Minimum 10 characters</p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleReviewSubmit(booking.event._id, booking._id)}
                            disabled={!reviewData[booking._id]?.rating || !reviewData[booking._id]?.comment || reviewData[booking._id]?.comment.length < 10}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                          >
                            <FaPaperPlane />
                            Submit Review
                          </button>
                          <button
                            onClick={() => toggleReviewForm(booking._id)}
                            className="px-6 py-4 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl font-bold transition-all duration-300 border border-white/10"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-dashed border-amber-500/40 rounded-2xl p-6 text-center hover:border-amber-500/60 transition-all cursor-pointer group" onClick={() => toggleReviewForm(booking._id)}>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <FaStar className="text-amber-400 text-2xl" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Event Completed</h4>
                        <p className="text-sm text-gray-400 mb-4">Share your experience and help others discover great events</p>
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-amber-500/30 transition-all">
                          <FaStar />
                          Write a Review
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
    </>
  );
};

export default MyBookings;
