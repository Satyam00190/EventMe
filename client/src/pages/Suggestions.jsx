import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import { AuthContext } from '../context/AuthContext';
import {
  FaMapMarkerAlt, FaCalendar, FaClock, FaFire, FaStar, FaHeart,
  FaArrowRight, FaTicketAlt, FaUsers, FaTrophy, FaLightbulb, FaChartLine,
  FaShare, FaBookmark, FaFilter, FaRandom
} from 'react-icons/fa';

export default function Suggestions() {
  const { user } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState({
    trending: [],
    nearYou: [],
    basedOnInterests: [],
    upcoming: [],
    popular: []
  });
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [activeTab, setActiveTab] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fav = localStorage.getItem('favorites');
    if (fav) setFavorites(JSON.parse(fav));
    const bm = localStorage.getItem('bookmarks');
    if (bm) setBookmarked(JSON.parse(bm));
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const [trendingRes, upcomingRes, popularRes] = await Promise.all([
        api.get('/events', { params: { limit: 8, sortBy: 'trending' } }),
        api.get('/events', { params: { limit: 8, sortBy: 'date' } }),
        api.get('/events', { params: { limit: 8, sortBy: 'popular' } })
      ]);

      const processEvents = (events) => events.map(e => ({
        ...e,
        minPrice: e.minPrice || (Array.isArray(e.ticketTypes) && e.ticketTypes.length 
          ? Math.min(...e.ticketTypes.map(t => t.price)) 
          : 0)
      }));

      setSuggestions({
        trending: processEvents(trendingRes.data),
        nearYou: processEvents(upcomingRes.data.slice(0, 4)),
        basedOnInterests: processEvents(popularRes.data.slice(0, 4)),
        upcoming: processEvents(upcomingRes.data),
        popular: processEvents(popularRes.data)
      });
    } catch (err) {
      console.error('Error fetching suggestions', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarked(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const shareEvent = async (event) => {
    const url = `${window.location.origin}/events/${event._id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, text: event.description, url });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const SuggestionCard = ({ event, index }) => (
    <Link
      to={`/events/${event._id}`}
      className="group premium-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-xl animate-slide-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative h-80 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(event._id); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl transition-all ${
              favorites.includes(event._id) 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
            title="Add to favorites"
          >
            <FaHeart />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); toggleBookmark(event._id); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl transition-all ${
              bookmarked.includes(event._id) 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-yellow-500 hover:text-white'
            }`}
            title="Bookmark"
          >
            <FaBookmark />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); shareEvent(event); }}
            className="w-10 h-10 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all"
            title="Share"
          >
            <FaShare />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-white font-semibold text-xs border border-white/30">
            {event.category}
          </span>
        </div>

        {/* Trending Badge */}
        {event.soldPercentage >= 60 && (
          <div className="absolute top-14 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white font-bold text-xs flex items-center gap-1 animate-pulse">
              <FaFire /> Hot
            </span>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#FF8F00] transition-colors">
            {event.title}
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <FaCalendar className="text-[#5A43FF]" />
              <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <FaMapMarkerAlt className="text-[#FF8F00]" />
              <span className="line-clamp-1">{event.location?.city || 'TBA'}, {event.location?.country || ''}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/20">
            <div>
              <span className="text-white/70 text-xs">From</span>
              <div className="text-[#FF8F00] font-bold text-2xl">${event.minPrice}</div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              Book <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden h-80">
      <div className="skeleton h-full" />
    </div>
  );

  const tabs = [
    { id: 'trending', label: 'Trending', icon: <FaChartLine />, color: 'from-green-500 to-emerald-500' },
    { id: 'popular', label: 'Popular', icon: <FaTrophy />, color: 'from-yellow-500 to-orange-500' },
    { id: 'upcoming', label: 'Upcoming', icon: <FaFire />, color: 'from-red-500 to-pink-500' },
  ];

  const getCurrentEvents = () => {
    return suggestions[activeTab] || [];
  };

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1a3e] to-[#0f0f23]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20 animate-pulse"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-[#5A43FF] to-purple-600 rounded-full mix-blend-screen filter blur-[130px] opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-[550px] h-[550px] bg-gradient-to-br from-[#FF8F00] to-yellow-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-600 to-pink-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <FaLightbulb className="text-6xl text-[#FF8F00] animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-[#FF8F00] opacity-50 animate-pulse"></div>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              Event <span className="bg-gradient-to-r from-[#5A43FF] via-purple-400 to-[#FF8F00] bg-clip-text text-transparent">Suggestions</span>
            </h1>
          </div>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-6">
            Personalized recommendations powered by AI
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={fetchSuggestions}
              className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <FaRandom /> Refresh Suggestions
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
            >
              <FaFilter /> Filters
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-12 animate-slide-up">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 inline-flex gap-2 mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-[#5A43FF] mb-1">{suggestions.trending.length}</div>
              <div className="text-sm text-gray-300">Trending</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-[#FF8F00] mb-1">{suggestions.popular.length}</div>
              <div className="text-sm text-gray-300">Popular</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{suggestions.upcoming.length}</div>
              <div className="text-sm text-gray-300">Upcoming</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">{favorites.length}</div>
              <div className="text-sm text-gray-300">Favorites</div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="mb-16">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : getCurrentEvents().length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getCurrentEvents().map((event, i) => (
                <SuggestionCard key={event._id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Suggestions Available</h3>
              <p className="text-gray-300 mb-6">Try refreshing or check back later</p>
              <button
                onClick={fetchSuggestions}
                className="px-6 py-3 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Refresh Suggestions
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center animate-slide-up">
          <h3 className="text-3xl font-bold text-white mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-300 mb-8 text-lg">
            Browse all events or create your own amazing experience
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/events"
              className="px-8 py-4 bg-gradient-to-r from-[#5A43FF] to-purple-600 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              Browse All Events <FaArrowRight />
            </Link>
            {user && (
              <Link
                to="/create-event"
                className="px-8 py-4 bg-gradient-to-r from-[#FF8F00] to-[#FFB800] text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                ✨ Create Event
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
