import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import { AuthContext } from '../context/AuthContext';
import {
  FaMapMarkerAlt,
  FaCalendar,
  FaClock,
  FaFire,
  FaStar,
  FaThLarge,
  FaList,
  FaSort,
  FaArrowRight,
  FaTicketAlt,
  FaUsers,
  FaFilter,
  FaDollarSign,
  FaHeart,
  FaShare,
  FaSearch
} from 'react-icons/fa';

export default function Events() {
  const { user } = useContext(AuthContext);

  // State Management
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // User Interactions
  const [favorites, setFavorites] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewEvent, setQuickViewEvent] = useState(null);

  // Categories Configuration
  const categories = [
    { name: 'Music', icon: '🎵', color: 'from-pink-500 to-rose-500' },
    { name: 'Sports', icon: '⚽', color: 'from-green-500 to-emerald-500' },
    { name: 'Conference', icon: '💼', color: 'from-blue-500 to-cyan-500' },
    { name: 'Workshop', icon: '🎓', color: 'from-purple-500 to-violet-500' },
    { name: 'Festival', icon: '🎉', color: 'from-yellow-500 to-orange-500' },
    { name: 'Theater', icon: '🎭', color: 'from-indigo-500 to-purple-500' }
  ];

  // Load favorites and bookmarks from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      setBookmarked(JSON.parse(savedBookmarks));
    }
  }, []);

  // Fetch Events
  useEffect(() => {
    fetchEvents();
    fetchFeaturedEvents();
    fetchSuggestedEvents();
  }, [selectedCategory]);

  // Extract unique cities from events
  useEffect(() => {
    if (events.length > 0) {
      const cities = [...new Set(events.map(e => e.location?.city).filter(Boolean))];
      setAvailableCities(cities.sort());
    }
  }, [events]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      
      const { data } = await api.get('/events', { params });
      
      // Use minPrice from backend if available, otherwise calculate
      const processedEvents = data.map(event => ({
        ...event,
        minPrice: event.minPrice || (event.ticketTypes?.length 
          ? Math.min(...event.ticketTypes.map(t => t.price)) 
          : 0)
      }));
      
      setEvents(processedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedEvents = async () => {
    try {
      const { data } = await api.get('/events', { params: { featured: true, limit: 3 } });
      const processedEvents = data.map(event => ({
        ...event,
        minPrice: event.minPrice || (event.ticketTypes?.length 
          ? Math.min(...event.ticketTypes.map(t => t.price)) 
          : 0)
      }));
      setFeaturedEvents(processedEvents);
    } catch (error) {
      console.error('Error fetching featured events:', error);
    }
  };

  const fetchSuggestedEvents = async () => {
    try {
      // Fetch different events than the main list for variety
      const { data } = await api.get('/events', { 
        params: { 
          limit: 12,
          sortBy: 'popular'
        } 
      });
      const processedEvents = data.map(event => ({
        ...event,
        minPrice: event.minPrice || (event.ticketTypes?.length 
          ? Math.min(...event.ticketTypes.map(t => t.price)) 
          : 0)
      }));
      setSuggestedEvents(processedEvents);
    } catch (error) {
      console.error('Error fetching suggested events:', error);
    }
  };

  // Filter and Sort Logic
  const getFilteredAndSortedEvents = () => {
    let filtered = [...events];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.venue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // City filter
    if (selectedCity) {
      filtered = filtered.filter(event => event.location?.city === selectedCity);
    }

    // Price filter
    filtered = filtered.filter(event => event.minPrice <= priceRange);

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        const diffDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
        
        if (dateFilter === 'today') return diffDays === 0;
        if (dateFilter === 'week') return diffDays >= 0 && diffDays <= 7;
        if (dateFilter === 'month') return diffDays >= 0 && diffDays <= 30;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'price-low':
          return a.minPrice - b.minPrice;
        case 'price-high':
          return b.minPrice - a.minPrice;
        case 'popular':
          return (b.totalSeats - b.availableSeats) - (a.totalSeats - a.availableSeats);
        default:
          return 0;
      }
    });

    return filtered;
  };

  // User Actions
  const toggleFavorite = (eventId) => {
    const newFavorites = favorites.includes(eventId)
      ? favorites.filter(id => id !== eventId)
      : [...favorites, eventId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const shareEvent = async (event) => {
    const url = `${window.location.origin}/events/${event._id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: url
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const toggleBookmark = (eventId) => {
    const newBookmarks = bookmarked.includes(eventId)
      ? bookmarked.filter(id => id !== eventId)
      : [...bookmarked, eventId];
    
    setBookmarked(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const openQuickView = (event) => {
    setQuickViewEvent(event);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setQuickViewEvent(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCity('');
    setPriceRange(1000);
    setDateFilter('all');
  };

  const filteredEvents = getFilteredAndSortedEvents();

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Professional Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]"></div>
      
      {/* Subtle Gradient Accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#5A43FF]/15 to-transparent rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#FF8F00]/15 to-transparent rounded-full filter blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/10 to-transparent rounded-full filter blur-[120px]"></div>

      {/* Radial Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(15,15,35,0.8)_100%)]"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      
      {/* Noise Texture for Premium Feel */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
      }}></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 pt-4 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#5A43FF] via-purple-400 to-[#FF8F00] bg-clip-text text-transparent drop-shadow-lg px-4">
            Discover Amazing Events
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
            Find and book the perfect experience for you
          </p>
          
          {user && (
            <Link
              to="/create-event"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FF8F00] to-[#FF6B00] text-white rounded-lg sm:rounded-xl font-bold shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/70 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              <span className="text-base sm:text-lg">✨</span>
              <span className="hidden sm:inline">Create Your Event</span>
              <span className="sm:hidden">Create Event</span>
              <FaArrowRight className="text-xs sm:text-sm" />
            </Link>
          )}
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-16 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <FaFire className="text-3xl text-[#FF8F00] animate-pulse" />
              <h2 className="text-3xl font-bold text-white">Featured Events</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <Link
                  key={event._id}
                  to={`/events/${event._id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-80">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-bold">
                        <FaStar /> Featured
                      </span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm mb-3">
                        <FaCalendar />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#FF8F00]">
                          ${event.minPrice}
                        </span>
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-semibold">
                          {event.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 animate-slide-up">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:border-[#5A43FF] focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                  showFilters
                    ? 'bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30'
                }`}
              >
                <FaFilter /> Filters
              </button>
              
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/30">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <FaList />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t border-white/20 pt-6 animate-slide-down">
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  
                  {/* City Filter */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                      <FaMapMarkerAlt className="text-red-400" />
                      City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:border-[#5A43FF] focus:outline-none text-gray-900"
                    >
                      <option value="">All Cities</option>
                      {availableCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                      <FaDollarSign className="text-green-400" />
                      Max Price: ${priceRange}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full accent-[#5A43FF]"
                    />
                  </div>

                  {/* Date Filter */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                      <FaCalendar className="text-blue-400" />
                      Date Range
                    </label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:border-[#5A43FF] focus:outline-none text-gray-900"
                    >
                      <option value="all">All Dates</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                      <FaSort className="text-purple-400" />
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:border-[#5A43FF] focus:outline-none text-gray-900"
                    >
                      <option value="date">Date (Earliest)</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>
                </div>

                {/* Filter Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCity && (
                    <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full text-sm flex items-center gap-2">
                      📍 {selectedCity}
                      <button onClick={() => setSelectedCity('')} className="hover:text-white">✕</button>
                    </span>
                  )}
                  {priceRange < 1000 && (
                    <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-300 rounded-full text-sm flex items-center gap-2">
                      💰 Under ${priceRange}
                      <button onClick={() => setPriceRange(1000)} className="hover:text-white">✕</button>
                    </span>
                  )}
                  {dateFilter !== 'all' && (
                    <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-full text-sm flex items-center gap-2">
                      📅 {dateFilter === 'today' ? 'Today' : dateFilter === 'week' ? 'This Week' : 'This Month'}
                      <button onClick={() => setDateFilter('all')} className="hover:text-white">✕</button>
                    </span>
                  )}
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory || selectedCity || priceRange < 1000 || dateFilter !== 'all') && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all text-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
              
              <Link
                to="/suggestions"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-[#FF8F00] to-[#FF6B00] text-white hover:shadow-lg hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all text-sm"
              >
                💡 Suggestions
              </Link>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-300 font-medium">
              Found <span className="text-[#FF8F00] font-bold">{filteredEvents.length}</span> events
              {events.length > 0 && filteredEvents.length === 0 && (
                <span className="ml-2 text-yellow-400">(filtered from {events.length} total)</span>
              )}
            </p>
            {events.length === 0 && (
              <p className="text-yellow-400 text-sm mt-2">
                ⚠️ No events found in database. Please create some events or check your database connection.
              </p>
            )}
          </div>
        )}

        {/* Events Grid/List */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 bg-gray-300" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Events Found</h3>
            <p className="text-gray-300 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-6'
          }>
            {filteredEvents.map((event, index) => (
              <div
                key={event._id}
                className="group premium-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link to={`/events/${event._id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                        {event.category}
                      </span>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(event._id);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
                          favorites.includes(event._id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                        }`}
                        title="Add to favorites"
                      >
                        <FaHeart />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(event._id);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
                          bookmarked.includes(event._id)
                            ? 'bg-yellow-500 text-white'
                            : 'bg-white/90 text-gray-700 hover:bg-yellow-500 hover:text-white'
                        }`}
                        title="Bookmark event"
                      >
                        🔖
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          shareEvent(event);
                        }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all"
                        title="Share event"
                      >
                        <FaShare />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          openQuickView(event);
                        }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-purple-500 hover:text-white transition-all"
                        title="Quick view"
                      >
                        👁️
                      </button>
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <Link to={`/events/${event._id}`}>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF8F00] transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                  </Link>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <FaCalendar className="text-[#5A43FF]" />
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <FaClock className="text-[#FF8F00]" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <FaMapMarkerAlt className="text-green-400" />
                      <span className="text-sm line-clamp-1">
                        {event.location?.city}, {event.location?.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <FaUsers className="text-purple-400" />
                      <span className="text-sm">
                        {event.availableSeats > 0 
                          ? `${event.availableSeats} seats left` 
                          : 'Sold Out'
                        }
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div>
                      <p className="text-xs text-gray-400">Starting from</p>
                      <p className="text-2xl font-bold text-[#FF8F00]">
                        ${event.minPrice}
                      </p>
                    </div>
                    <Link
                      to={`/events/${event._id}`}
                      className="px-4 py-2 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm"
                    >
                      <FaTicketAlt className="text-xs" />
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Suggested Events Section */}
        {!loading && suggestedEvents.length > 0 && (
          <div className="mt-20 animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="text-3xl">💡</div>
                <h2 className="text-3xl font-bold text-white">You Might Also Like</h2>
              </div>
              <p className="text-gray-400">
                {suggestedEvents.length} recommendations
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {suggestedEvents.map((event, index) => (
                <Link
                  key={event._id}
                  to={`/events/${event._id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-80">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(event._id);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
                          favorites.includes(event._id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <FaHeart />
                      </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-white font-semibold text-xs">
                        {event.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#FF8F00] transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm mb-3">
                        <FaMapMarkerAlt className="text-[#FF8F00]" />
                        <span className="line-clamp-1">{event.location?.city || 'TBA'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <FaCalendar className="text-[#5A43FF]" />
                          <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/70 text-xs">From</span>
                          <div className="text-[#FF8F00] font-bold text-xl">${event.minPrice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        {!loading && filteredEvents.length > 0 && (
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all">
              <div className="text-3xl font-bold text-[#5A43FF] mb-2">
                {filteredEvents.length}
              </div>
              <div className="text-sm text-gray-300 font-medium">Total Events</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {filteredEvents.filter(e => e.availableSeats > 0).length}
              </div>
              <div className="text-sm text-gray-300 font-medium">Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all">
              <div className="text-3xl font-bold text-[#FF8F00] mb-2">
                {categories.length}
              </div>
              <div className="text-sm text-gray-300 font-medium">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {favorites.length}
              </div>
              <div className="text-sm text-gray-300 font-medium">Favorites</div>
            </div>
          </div>
        )}

        {/* Quick View Modal */}
        {showQuickView && quickViewEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={closeQuickView}>
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <img src={quickViewEvent.image} alt={quickViewEvent.title} className="w-full h-64 object-cover rounded-t-3xl" />
                <button
                  onClick={closeQuickView}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-red-500 hover:text-white transition-all"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-white font-semibold">
                    {quickViewEvent.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">{quickViewEvent.title}</h2>
                <p className="text-gray-300 mb-6">{quickViewEvent.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaCalendar className="text-[#5A43FF]" />
                    <span>{new Date(quickViewEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaClock className="text-[#FF8F00]" />
                    <span>{quickViewEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaMapMarkerAlt className="text-green-400" />
                    <span>{quickViewEvent.location?.venue}, {quickViewEvent.location?.city}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaUsers className="text-purple-400" />
                    <span>{quickViewEvent.availableSeats} seats available</span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <h3 className="text-xl font-bold text-white mb-4">Ticket Types</h3>
                  <div className="space-y-3">
                    {quickViewEvent.ticketTypes?.map((ticket, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <p className="font-semibold text-white">{ticket.name}</p>
                          <p className="text-sm text-gray-400">{ticket.quantity - ticket.sold} available</p>
                        </div>
                        <p className="text-2xl font-bold text-[#FF8F00]">${ticket.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Link
                    to={`/events/${quickViewEvent._id}`}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-xl font-bold text-center hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    View Full Details
                  </Link>
                  <button
                    onClick={() => {
                      toggleFavorite(quickViewEvent._id);
                    }}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      favorites.includes(quickViewEvent._id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                    }`}
                  >
                    <FaHeart className="inline mr-2" />
                    {favorites.includes(quickViewEvent._id) ? 'Favorited' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
