import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';

const ReviewSection = ({ eventId }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ rating: 5, comment: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [eventId]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/reviews/event/${eventId}`);
      setReviews(data.reviews);
      setAvgRating(data.avgRating);
      setTotalReviews(data.totalReviews);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Please login to leave a review');
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/reviews/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/reviews',
          { eventId, ...formData },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      }
      setFormData({ rating: 5, comment: '' });
      setShowForm(false);
      setEditingId(null);
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    }
  };

  const handleEdit = (review) => {
    setFormData({ rating: review.rating, comment: review.comment });
    setEditingId(review._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:5000/api/reviews/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchReviews();
      } catch (error) {
        alert('Failed to delete review');
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-dark-900">Reviews & Ratings</h2>
          {totalReviews > 0 && (
            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-1">{renderStars(Math.round(avgRating))}</div>
              <span className="text-2xl font-bold text-dark-900">{avgRating.toFixed(1)}</span>
              <span className="text-dark-600">({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})</span>
            </div>
          )}
        </div>
        {user && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Write a Review
          </button>
        )}
      </div>

      {showForm && (
        <div className="glass-card rounded-3xl p-8 mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-dark-900 mb-6">
            {editingId ? 'Edit Your Review' : 'Write a Review'}
          </h3>
          
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-3">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    className="text-4xl transition-transform hover:scale-110"
                  >
                    <FaStar
                      className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-900 mb-2">Your Review</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none resize-none"
                rows="4"
                placeholder="Share your experience with this event..."
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {editingId ? 'Update' : 'Submit'} Review
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ rating: 5, comment: '' });
                }}
                className="px-8 py-3 bg-white text-dark-700 rounded-2xl font-semibold border-2 border-gray-200 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="glass-card rounded-3xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-dark-900 text-lg">{review.user.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                    <span className="text-sm text-dark-500">
                      {new Date(review.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
              {user && review.user._id === user._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="w-9 h-9 rounded-xl bg-primary-50 text-primary-500 hover:bg-primary-100 flex items-center justify-center transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
            <p className="text-dark-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {reviews.length === 0 && !showForm && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-dark-900 mb-2">No Reviews Yet</h3>
          <p className="text-dark-600 mb-6">Be the first to share your experience!</p>
          {user && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Write First Review
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
