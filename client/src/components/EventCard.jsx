import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendar, FaTicketAlt, FaClock } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const minPrice = event.ticketTypes && event.ticketTypes.length > 0 
    ? Math.min(...event.ticketTypes.map(t => t.price))
    : event.price || 0;

  return (
    <Link to={`/events/${event._id}`} className="block group">
      <div className="glass-card rounded-3xl overflow-hidden hover-lift transition-all duration-500 border border-gray-100">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          {event.image ? (
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <FaCalendar className="text-white text-6xl opacity-50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="glass px-4 py-2 rounded-full text-white font-semibold text-sm backdrop-blur-xl">
              {event.category}
            </span>
          </div>
          
          {/* Date Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="glass px-4 py-2 rounded-xl text-white font-bold text-sm backdrop-blur-xl">
              {formatDate(event.date)}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-dark-900 mb-3 line-clamp-2 group-hover:text-primary-500 transition-colors">
            {event.title}
          </h3>
          
          <p className="text-dark-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
          
          {/* Meta Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-dark-600 text-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaClock className="text-white text-xs" />
              </div>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-dark-600 text-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-secondary-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-white text-xs" />
              </div>
              <span className="line-clamp-1">{event.location?.city || 'Location'}, {event.location?.country || 'Country'}</span>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <FaTicketAlt className="text-dark-400 text-sm" />
              <span className="text-xs font-medium text-dark-500">
                {event.availableSeats > 0 ? (
                  <>{event.availableSeats} seats left</>
                ) : (
                  <span className="text-red-500">Sold Out</span>
                )}
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs text-dark-500 mb-0.5">From</div>
              <div className="text-primary-500 font-bold text-xl">
                {event.isFree ? 'Free' : `$${minPrice}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
