import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaCalendar, FaClock } from 'react-icons/fa';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEvents();
  }, [category, search]);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/events', {
        params: { category, search }
      });
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
            <FaCalendar className="text-white text-3xl" />
          </div>
          <p className="text-white font-medium text-lg">Loading amazing events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-hero opacity-40 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Discover Amazing <span className="gradient-text">Events</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            From concerts to conferences, find experiences that inspire and entertain
          </p>
        </div>

        <div className="mb-12 max-w-5xl mx-auto animate-slide-up stagger-1">
          <div className="glass-card rounded-3xl p-4 shadow-2xl border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="🔍 Search events by name, location, or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-300 text-dark-900 placeholder-gray-500 font-medium border-2 border-transparent focus:border-primary-500 transition-all shadow-sm"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-300 text-dark-900 font-semibold cursor-pointer border-2 border-transparent focus:border-primary-500 transition-all shadow-sm"
              >
                <option value="">All Categories</option>
                <option value="Music">🎵 Music & Concerts</option>
                <option value="Sports">⚽ Sports & Fitness</option>
                <option value="Conference">💼 Business & Networking</option>
                <option value="Workshop">🎓 Education & Workshops</option>
                <option value="Festival">🎉 Festivals & Celebrations</option>
                <option value="Theater">🎭 Arts & Culture</option>
                <option value="Other">📌 Other Events</option>
              </select>
              <button 
                onClick={fetchEvents}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
              >
                Search Events
              </button>
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="flex gap-3 mt-6 flex-wrap justify-center">
            {[
              { name: 'Music', icon: '🎵' },
              { name: 'Sports', icon: '⚽' },
              { name: 'Conference', icon: '💼' },
              { name: 'Workshop', icon: '🎓' },
              { name: 'Festival', icon: '🎉' },
              { name: 'Theater', icon: '🎭' }
            ].map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategory(category === cat.name ? '' : cat.name)}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                  category === cat.name
                    ? 'bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 text-white shadow-lg shadow-primary-500/50'
                    : 'glass-card text-gray-900 hover:shadow-lg border border-white/30'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
            {(category || search) && (
              <button
                onClick={() => {
                  setCategory('');
                  setSearch('');
                }}
                className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                ✕ Clear All
              </button>
            )}
          </div>
        </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {events.map((event, index) => (
          <Link 
            key={event._id} 
            to={`/events/${event._id}`} 
            className="glass-card rounded-3xl overflow-hidden hover-lift animate-slide-up group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative overflow-hidden h-56">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4">
                <span className="glass px-4 py-2 rounded-full text-white font-semibold text-sm backdrop-blur-md">
                  {event.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white text-sm">
                  <FaCalendar className="text-secondary-400" />
                  <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-dark-900 group-hover:text-primary-500 transition-colors line-clamp-2">
                {event.title}
              </h3>
              <div className="text-dark-600 space-y-2.5 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-white text-xs" />
                  </div>
                  <span className="text-sm font-medium">{event.time}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-secondary-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-xs" />
                  </div>
                  <span className="text-sm font-medium line-clamp-1">{event.location.city}, {event.location.country}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-dark-500">
                    {event.availableSeats > 0 ? (
                      <>🎫 {event.availableSeats} seats left</>
                    ) : (
                      <span className="text-red-500">Sold Out</span>
                    )}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-dark-500 mb-0.5">From</div>
                  <div className="text-primary-500 font-bold text-xl">
                    ${Math.min(...event.ticketTypes.map(t => t.price))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

        {events.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-dark-900 mb-2">No Events Found</h3>
              <p className="text-dark-600 mb-6">
                {search || category 
                  ? "Try adjusting your search or filters to find more events" 
                  : "No events are currently available. Check back soon!"}
              </p>
              {(search || category) && (
                <button
                  onClick={() => {
                    setSearch('');
                    setCategory('');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
