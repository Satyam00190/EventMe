import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots opacity-10"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
              <span className="font-display text-2xl font-bold">EventMe</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover and book amazing events near you. Create unforgettable experiences with EventMe.
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <FaTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/events" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <FaEnvelope className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Email</div>
                  <a href="mailto:support@eventme.com" className="hover:text-primary-400 transition-colors">
                    support@eventme.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <FaPhone className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Phone</div>
                  <a href="tel:+1234567890" className="hover:text-primary-400 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Address</div>
                  <span>123 Event Street, City, Country</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Subscribe to our newsletter for the latest events and exclusive offers</p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} EventMe. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <FaHeart className="text-red-500 animate-pulse" /> by EventMe Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
