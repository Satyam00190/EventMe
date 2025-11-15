import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaUser, FaSignOutAlt, FaBell, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background change
      setScrolled(currentScrollY > 20);
      
      // Hide/Show navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show navbar
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setVisible(false);
        // Close menus when hiding
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, mobile = false }) => (
    <Link
      to={to}
      onClick={() => mobile && setMobileMenuOpen(false)}
      className={`
        relative font-semibold transition-all duration-300 group
        ${isActive(to) 
          ? 'text-primary-500' 
          : 'text-dark-700 hover:text-primary-500'
        }
        ${mobile ? 'block py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50' : 'hover:scale-105'}
      `}
    >
      {children}
      {/* Animated underline */}
      {!mobile && (
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-300 ${
          isActive(to) ? 'w-full' : 'w-0 group-hover:w-full'
        }`}></span>
      )}
    </Link>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
      visible ? 'top-0' : '-top-24'
    } ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200' 
        : 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 bg-gradient-to-br from-primary-500 via-purple-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 overflow-hidden">
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <FaCalendarAlt className="text-white text-xl relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-display text-2xl font-bold gradient-text hidden sm:block group-hover:scale-105 transition-transform duration-300">
              EventMe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/events">Browse Events</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            
            {user ? (
              <>
                {(user.role === 'organizer' || user.role === 'admin') && (
                  <>
                    <NavLink to="/create-event">Create Event</NavLink>
                    <NavLink to="/my-events">My Events</NavLink>
                  </>
                )}
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/my-bookings">My Bookings</NavLink>
                
                {/* Notifications */}
                <Link 
                  to="/notifications" 
                  className="relative p-2.5 hover:bg-gradient-to-br hover:from-primary-50 hover:to-purple-50 rounded-xl transition-all duration-300 group hover:scale-110"
                >
                  <FaBell className={`text-xl transition-all duration-300 ${
                    isActive('/notifications') 
                      ? 'text-primary-500 animate-wiggle' 
                      : 'text-dark-700 group-hover:text-primary-500 group-hover:rotate-12'
                  }`} />
                  {/* Notification Badge with pulse */}
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></span>
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 transition-all duration-300 hover:shadow-md group"
                  >
                    <div className="relative w-10 h-10 bg-gradient-to-br from-primary-400 via-purple-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 overflow-hidden">
                      {/* Animated ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <span className="relative z-10">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="font-semibold text-dark-900 group-hover:text-primary-500 transition-colors duration-300">{user.name}</span>
                    <FaChevronDown className={`text-sm text-dark-600 transition-all duration-300 ${userMenuOpen ? 'rotate-180 text-primary-500' : 'group-hover:text-primary-500'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 py-2 animate-scale-in overflow-hidden">
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-purple-50/50 opacity-50"></div>
                      
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="relative flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-purple-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FaUser className="text-white text-sm" />
                        </div>
                        <span className="font-semibold text-dark-900 group-hover:text-primary-500 transition-colors">Profile</span>
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="relative flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 transition-all duration-300 group"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FaUser className="text-white text-sm" />
                          </div>
                          <span className="font-semibold text-dark-900 group-hover:text-purple-500 transition-colors">Admin Panel</span>
                        </Link>
                      )}
                      
                      <hr className="my-2 border-gray-200" />
                      
                      <button
                        onClick={handleLogout}
                        className="relative w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 text-red-600 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-pink-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FaSignOutAlt className="text-white text-sm" />
                        </div>
                        <span className="font-semibold group-hover:text-red-700 transition-colors">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="relative px-6 py-2.5 text-primary-500 font-bold rounded-xl transition-all duration-300 group overflow-hidden hover:scale-105"
                >
                  {/* Animated background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-50 to-purple-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></span>
                  <span className="relative z-10 group-hover:text-primary-600 transition-colors">Login</span>
                </Link>
                
                <Link 
                  to="/register" 
                  className="relative px-6 py-2.5 bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                >
                  {/* Animated shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  
                  {/* Animated border glow */}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400 via-purple-400 to-secondary-400 blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></span>
                  
                  <span className="relative z-10 flex items-center gap-2">
                    Sign Up
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 hover:bg-gradient-to-br hover:from-primary-50 hover:to-purple-50 rounded-xl transition-all duration-300 group hover:scale-110"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-2xl text-dark-900 group-hover:text-red-500 group-hover:rotate-90 transition-all duration-300" />
            ) : (
              <FaBars className="text-2xl text-dark-900 group-hover:text-primary-500 transition-all duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-slide-down">
            <div className="space-y-1">
              <NavLink to="/events" mobile>Browse Events</NavLink>
              <NavLink to="/contact" mobile>Contact</NavLink>
              
              {user ? (
                <>
                  {(user.role === 'organizer' || user.role === 'admin') && (
                    <>
                      <NavLink to="/create-event" mobile>Create Event</NavLink>
                      <NavLink to="/my-events" mobile>My Events</NavLink>
                    </>
                  )}
                  <NavLink to="/dashboard" mobile>Dashboard</NavLink>
                  <NavLink to="/my-bookings" mobile>My Bookings</NavLink>
                  <NavLink to="/notifications" mobile>Notifications</NavLink>
                  <NavLink to="/profile" mobile>Profile</NavLink>
                  {user.role === 'admin' && (
                    <NavLink to="/admin" mobile>Admin Panel</NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-3 px-4 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="relative block py-3 px-4 text-center rounded-xl text-primary-500 font-bold hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 transition-all duration-300 overflow-hidden group"
                  >
                    <span className="relative z-10">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="relative block py-3 px-4 text-center rounded-xl bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Animated shine */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Sign Up
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
