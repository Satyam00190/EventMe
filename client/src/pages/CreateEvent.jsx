import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import { AuthContext } from '../context/AuthContext';
import ImageUpload from '../components/ImageUpload';

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Music',
    date: '', 
    time: '',
    venue: '',
    address: '',
    city: '',
    country: '',
    image: '',
    totalSeats: 0
  });
  const [ticketTypes, setTicketTypes] = useState([{ name: 'General', price: 0, quantity: 0 }]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', {
          ...formData,
          location: {
            venue: formData.venue,
            address: formData.address,
            city: formData.city,
            country: formData.country
          },
          ticketTypes
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate('/my-events');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    }
  };

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: 0, quantity: 0 }]);
  };

  const updateTicketType = (index, field, value) => {
    const updated = [...ticketTypes];
    updated[index][field] = value;
    setTicketTypes(updated);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Background similar to Events page */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0f0f23]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20 animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-white">Create New Event</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white font-semibold mb-2">Event Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
              >
                <option value="Music">🎵 Music</option>
                <option value="Sports">⚽ Sports</option>
                <option value="Conference">💼 Conference</option>
                <option value="Workshop">🎓 Workshop</option>
                <option value="Festival">🎉 Festival</option>
                <option value="Theater">🎭 Theater</option>
                <option value="Other">📌 Other</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
              rows="4"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white font-semibold mb-2">📅 Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">🕐 Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white font-semibold mb-2">🏛️ Venue</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">📍 Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white font-semibold mb-2">🌆 City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">🌍 Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                required
              />
            </div>
          </div>

          <ImageUpload
            onImageUpload={(url) => setFormData({...formData, image: url})}
            currentImage={formData.image}
            label="Event Image"
          />

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">🎫 Total Seats</label>
            <input
              type="number"
              value={formData.totalSeats}
              onChange={(e) => setFormData({...formData, totalSeats: parseInt(e.target.value)})}
              className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
              required
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-white">🎟️ Ticket Types</h3>
            {ticketTypes.map((ticket, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Ticket Name"
                  value={ticket.name}
                  onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                  className="px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={ticket.price}
                  onChange={(e) => updateTicketType(index, 'price', parseFloat(e.target.value))}
                  className="px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={ticket.quantity}
                  onChange={(e) => updateTicketType(index, 'quantity', parseInt(e.target.value))}
                  className="px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5A43FF] focus:border-[#5A43FF] text-gray-900"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addTicketType}
              className="text-[#FF8F00] hover:text-[#FFB800] font-semibold flex items-center gap-2"
            >
              <span className="text-xl">+</span> Add Ticket Type
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 font-bold text-lg transition-all hover:-translate-y-1"
          >
            ✨ Create Event
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default CreateEvent;
