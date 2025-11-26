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
          ? 'text-[#5A43FF]' 
          : 'text-gray-800 hover:text-[#5A43FF]'
        }
        ${mobile ? 'block py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50' : ''}
      `}
    >
      {children}
      {/* Animated underline */}
      {!mobile && (
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#5A43FF] to-[#FF8F00] transition-all duration-300 ${
          isActive(to) ? 'w-full' : 'w-0 group-hover:w-full'
        }`}></span>
      )}
    </Link>
  );

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${
      visible ? 'top-0' : '-top-24'
    } ${
      scrolled 
        ? 'bg-gradient-to-r from-slate-50 via-white to-slate-50 shadow-2xl' 
        : 'bg-gradient-to-r from-white via-purple-50/30 to-white shadow-xl'
    } backdrop-blur-md border-b border-purple-100/50`}>
      {/* Gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5A43FF] via-purple-500 to-[#FF8F00] shadow-lg shadow-purple-500/30"></div>
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200/50 to-transparent"></div>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative shrink-0">
            <div className="relative w-11 h-11 bg-gradient-to-br from-[#5A43FF] via-purple-600 to-[#FF8F00] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300 overflow-hidden">
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {/* Rotating border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:rotate-180 transition-transform duration-700"></div>
              <FaCalendarAlt className="text-white text-lg relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold bg-gradient-to-r from-[#5A43FF] via-purple-600 to-[#FF8F00] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 block">
                EventMe
              </span>
              <span className="text-xs text-gray-600 font-medium">Discover Amazing Events</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 justify-end flex-1 ml-4">
            {/* Primary Navigation - Always visible */}
            <NavLink to="/events">
              <span className="flex items-center gap-1 text-sm px-2.5 xl:px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md transition-all duration-300 hover:scale-105 whitespace-nowrap">
                🎫 <span className="font-semibold">Events</span>
              </span>
            </NavLink>
            <NavLink to="/suggestions">
              <span className="flex items-center gap-1 text-sm px-2.5 xl:px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md transition-all duration-300 hover:scale-105 whitespace-nowrap">
                💡 <span className="font-semibold">Suggestions</span>
              </span>
            </NavLink>
            
            {user ? (
              <>
                {/* Admin-specific menu */}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="relative px-2.5 xl:px-3 py-2 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-purple-500/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center gap-1 text-sm whitespace-nowrap overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <span className="relative z-10">👑</span>
                    <span className="relative z-10">Admin</span>
                  </Link>
                )}
                
                {/* Organizer/Admin create event */}
                {(user.role === 'organizer' || user.role === 'admin') && (
                  <>
                    <Link
                      to="/create-event"
                      className="relative px-2.5 xl:px-3 py-2 bg-gradient-to-r from-[#FF8F00] via-[#FFA500] to-[#FFB800] text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center gap-1 text-sm whitespace-nowrap overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                      <span className="relative z-10">✨</span>
                      <span className="relative z-10">Create</span>
                    </Link>
                    <NavLink to="/my-events">
                      <span className="flex items-center gap-1 text-sm px-2.5 xl:px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md transition-all duration-300 hover:scale-105 whitespace-nowrap">
                        📋 <span className="font-semibold">My Events</span>
                      </span>
                    </NavLink>
                  </>
                )}
                
                {/* Regular user menu items - Only for non-organizer, non-admin */}
                {user.role === 'user' && (
                  <>
                    <NavLink to="/dashboard">
                      <span className="flex items-center gap-1 text-sm px-2.5 xl:px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md transition-all duration-300 hover:scale-105 whitespace-nowrap">
                        📊 <span className="font-semibold">Dashboard</span>
                      </span>
                    </NavLink>
                    <NavLink to="/my-bookings">
                      <span className="flex items-center gap-1 text-sm px-2.5 xl:px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md transition-all duration-300 hover:scale-105 whitespace-nowrap">
                        🎟️ <span className="font-semibold">Bookings</span>
                      </span>
                    </NavLink>
                  </>
                )}
                
                {/* Organizer-specific menu items (not admin) */}
                {user.role === 'organizer' && (
                  <>
                    <NavLink to="/dashboard">
                      <span className="flex items-center gap-1 text-sm px-2.5 xl:px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 hover:shadow-md transition-all duration-300 hover:scale-105 whitespace-nowrap">
                        📊 <span className="font-semibold">Dashboard</span>
                      </span>
                    </NavLink>
                    <NavLink to="/my-bookings">
                      <span className="flex items-center gap-1 text-sm px-2.5 xl:px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 hover:shadow-md transition-all duration-300 hover:scale-105 whitespace-nowrap">
                        🎟️ <span className="font-semibold">Bookings</span>
                      </span>
                    </NavLink>
                  </>
                )}
                
                {/* Contact - Always last before notifications */}
                <NavLink to="/contact">
                  <span className="flex items-center gap-1 text-sm px-2.5 xl:px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md transition-all duration-300 hover:scale-105 whitespace-nowrap">
                    📧 <span className="font-semibold">Contact</span>
                  </span>
                </NavLink>
                
                {/* Notifications */}
                <Link 
                  to="/notifications" 
                  className="relative p-2.5 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300 group ml-1 hover:shadow-md hover:scale-110"
                >
                  <FaBell className={`text-lg transition-all duration-300 ${
                    isActive('/notifications') 
                      ? 'text-[#5A43FF] animate-wiggle' 
                      : 'text-gray-800 group-hover:text-[#5A43FF] group-hover:rotate-12'
                  }`} />
                  {/* Notification Badge with pulse and count */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-red-500/50 animate-pulse">
                    3
                  </span>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75"></span>
                </Link>

                {/* User Menu */}
                <div className="relative ml-2">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md transition-all duration-300 group hover:scale-105"
                  >
                    <div className={`relative w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden ${
                      user.role === 'admin' 
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                        : user.role === 'organizer'
                        ? 'bg-gradient-to-br from-[#FF8F00] to-[#FFB800]'
                        : 'bg-gradient-to-br from-[#5A43FF] to-purple-600'
                    }`}>
                      {/* Animated ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <span className="text-sm relative z-10">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="hidden xl:flex flex-col items-start">
                      <span className="font-semibold text-gray-900 group-hover:text-[#5A43FF] transition-colors text-sm leading-tight">{user.name}</span>
                      <span className="text-xs text-gray-600 capitalize">{user.role}</span>
                    </div>
                    <FaChevronDown className={`text-xs text-gray-700 transition-all duration-300 ${userMenuOpen ? 'rotate-180 text-[#5A43FF]' : 'group-hover:text-[#5A43FF]'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 animate-scale-in overflow-hidden z-[110]">
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50"></div>
                      
                      {/* User Info Header */}
                      <div className="relative px-4 py-3 border-b border-gray-200/50 mb-1">
                        <p className="text-xs text-gray-500 font-medium mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                        <span className={`inline-block mt-1.5 px-2.5 py-0.5 text-white text-xs font-bold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                            : user.role === 'organizer'
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                            : 'bg-gradient-to-r from-primary-500 to-purple-500'
                        }`}>
                          {user.role === 'admin' ? '👑 Admin' : user.role === 'organizer' ? '✨ Organizer' : '👤 User'}
                        </span>
                      </div>
                      
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="relative flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#5A43FF] to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FaUser className="text-white text-sm" />
                        </div>
                        <span className="font-semibold text-gray-900 group-hover:text-[#5A43FF] transition-colors">Profile</span>
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="relative flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FaUser className="text-white text-sm" />
                          </div>
                          <span className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Admin Panel</span>
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
                {/* Contact for non-logged-in users */}
                <NavLink to="/contact">
                  <span className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md transition-all duration-300 hover:scale-105">
                    📧 <span className="font-semibold">Contact</span>
                  </span>
                </NavLink>
                
                <Link 
                  to="/login" 
                  className="relative px-5 py-2 text-[#5A43FF] font-bold rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-[#5A43FF] hover:border-purple-600 hover:shadow-md hover:scale-105 overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <span className="text-sm relative z-10">Login</span>
                </Link>
                
                <Link 
                  to="/register" 
                  className="relative px-5 py-2 bg-gradient-to-r from-[#5A43FF] via-purple-500 to-[#FF8F00] text-white rounded-xl font-bold shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden group"
                >  
                  {/* Animated shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  {/* Glow effect */}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#5A43FF] to-[#FF8F00] blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300"></span>
                  <span className="flex items-center gap-1.5 text-sm relative z-10">
                    <span>🚀</span>
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
            className="lg:hidden p-2.5 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-110 group"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-2xl text-gray-900 group-hover:text-red-500 group-hover:rotate-90 transition-all duration-300" />
            ) : (
              <FaBars className="text-2xl text-gray-900 group-hover:text-[#5A43FF] transition-all duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-purple-100 bg-gradient-to-b from-white to-purple-50/30 animate-slide-down shadow-inner">
            <div className="space-y-1">
              <NavLink to="/events" mobile>Browse Events</NavLink>
              <NavLink to="/suggestions" mobile>Suggestions</NavLink>
              <NavLink to="/contact" mobile>Contact</NavLink>
              
              {user ? (
                <>
                  {/* Admin Menu */}
                  {user.role === 'admin' && (
                    <>
                      <div className="px-4 py-2 text-xs font-bold text-purple-600 uppercase tracking-wider">Admin Menu</div>
                      <NavLink to="/admin" mobile>👑 Admin Panel</NavLink>
                      <NavLink to="/create-event" mobile>✨ Create Event</NavLink>
                      <NavLink to="/my-events" mobile>📋 My Events</NavLink>
                      <NavLink to="/notifications" mobile>🔔 Notifications</NavLink>
                      <NavLink to="/profile" mobile>👤 Profile</NavLink>
                    </>
                  )}
                  
                  {/* Organizer Menu */}
                  {user.role === 'organizer' && (
                    <>
                      <div className="px-4 py-2 text-xs font-bold text-orange-600 uppercase tracking-wider">Organizer Menu</div>
                      <NavLink to="/create-event" mobile>✨ Create Event</NavLink>
                      <NavLink to="/my-events" mobile>📋 My Events</NavLink>
                      <NavLink to="/dashboard" mobile>📊 Dashboard</NavLink>
                      <NavLink to="/my-bookings" mobile>🎟️ My Bookings</NavLink>
                      <NavLink to="/notifications" mobile>🔔 Notifications</NavLink>
                      <NavLink to="/profile" mobile>👤 Profile</NavLink>
                    </>
                  )}
                  
                  {/* Regular User Menu */}
                  {user.role === 'user' && (
                    <>
                      <div className="px-4 py-2 text-xs font-bold text-purple-600 uppercase tracking-wider">My Account</div>
                      <NavLink to="/dashboard" mobile>📊 Dashboard</NavLink>
                      <NavLink to="/my-bookings" mobile>🎟️ My Bookings</NavLink>
                      <NavLink to="/notifications" mobile>🔔 Notifications</NavLink>
                      <NavLink to="/profile" mobile>👤 Profile</NavLink>
                    </>
                  )}
                  
                  <hr className="my-2 border-gray-200" />
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
                    className="relative block py-3 px-4 text-center rounded-xl text-[#5A43FF] font-bold hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all border-2 border-[#5A43FF] hover:shadow-md overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    <span className="relative z-10">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="relative block py-3 px-4 text-center rounded-xl bg-gradient-to-r from-[#5A43FF] via-purple-500 to-[#FF8F00] text-white font-bold shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
                  >
                    {/* Animated shine */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      🚀 Sign Up
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
