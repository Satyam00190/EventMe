import { Link } from 'react-router-dom';
import { FaTicketAlt, FaCalendarPlus, FaUsers, FaCalendar, FaMapMarkerAlt, FaShieldAlt, FaBolt, FaStar, FaArrowRight, FaCheckCircle, FaRocket, FaFire, FaGem } from 'react-icons/fa';

const Home = () => {

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Ultra-Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dark Base Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20"></div>
        
        {/* Static Gradient Accents */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#5A43FF] to-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
        <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#FF8F00] to-yellow-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
        <div className="absolute -bottom-8 left-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-600 to-pink-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>

        {/* Radial Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(15,15,35,0.8)_100%)]"></div>
        
        {/* Grid Overlay - Subtle */}
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        
        {/* Noise Texture for Premium Feel */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'}}></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-16">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Headline with Gradient */}
            <h1 
              className="font-bold mb-6 sm:mb-8 animate-slide-up leading-tight"
              style={{
                fontSize: 'clamp(2rem, 8vw, 7rem)',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              <span className="gradient-text block mb-2 sm:mb-4">
                Discover Amazing
              </span>
              <span className="text-white block">
                Events Near You
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1 px-4">
              From intimate workshops to sold-out concerts, find and book tickets to experiences that 
              <span className="gradient-text font-semibold"> inspire, entertain, and connect</span>
            </p>

            {/* CTA Buttons with Glow */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-12 sm:mb-16 animate-slide-up stagger-2 px-4">
              <Link 
                to="/events" 
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 gradient-glow text-white rounded-xl font-bold shadow-2xl hover:-translate-y-2 transition-all duration-300 inline-flex items-center justify-center gap-2.5 overflow-hidden text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <FaRocket className="text-base sm:text-lg relative z-10" />
                <span className="relative z-10">Explore Events</span>
                <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-2 transition-transform relative z-10" />
              </Link>
              <Link 
                to="/create-event" 
                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 glass text-white rounded-xl font-bold border-2 border-white/20 hover:border-white/40 hover:-translate-y-2 transition-all duration-300 inline-flex items-center justify-center gap-2.5 neuro text-sm sm:text-base"
              >
                <FaCalendarPlus className="text-base sm:text-lg" />
                Create Event
              </Link>
            </div>

            {/* Trust Indicators with Neumorphism */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto animate-slide-up stagger-3 px-4">
              {[
                { value: '10K+', label: 'Active Events', icon: FaFire, gradient: 'gradient-neon' },
                { value: '50K+', label: 'Happy Users', icon: FaUsers, gradient: 'gradient-ocean' },
                { value: '100+', label: 'Cities', icon: FaMapMarkerAlt, gradient: 'gradient-royal' },
                { value: '4.9★', label: 'User Rating', icon: FaGem, gradient: 'gradient-sunset' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="neuro rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover-lift hover-glow group"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="text-white text-xl sm:text-2xl" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-xs sm:text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Ultra Modern Cards */}
      <section className="py-20 relative">
        {/* Dark Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]"></div>
        
        {/* Accent Gradients */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#5A43FF]/20 to-transparent rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#FF8F00]/20 to-transparent rounded-full filter blur-[100px]"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-5">
              <FaBolt className="text-yellow-400" />
              <span className="text-white font-semibold text-sm">Why Choose EventMe</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Everything You Need for
              <span className="gradient-text block mt-2">Amazing Experiences</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make event discovery and management effortless
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: FaBolt,
                title: 'Lightning-Fast Booking',
                description: 'Book tickets in under 60 seconds with our streamlined checkout. One-click purchase, instant confirmation, and digital tickets delivered immediately.',
                gradient: 'gradient-royal',
                features: ['One-click checkout', 'Instant confirmation', 'Digital tickets', 'Secure payments']
              },
              {
                icon: FaCalendarPlus,
                title: 'Powerful Event Tools',
                description: 'Create and manage events with professional-grade tools. Real-time analytics, attendee management, and automated notifications included.',
                gradient: 'gradient-ocean',
                features: ['Easy event setup', 'Real-time analytics', 'Attendee management', 'Auto notifications']
              },
              {
                icon: FaShieldAlt,
                title: 'Enterprise Security',
                description: 'Bank-level encryption protects your data and payments. PCI DSS compliant with 24/7 monitoring and fraud detection.',
                gradient: 'gradient-sunset',
                features: ['SSL encryption', 'PCI compliant', 'Fraud detection', '24/7 monitoring']
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative rounded-3xl p-8 hover-lift overflow-hidden border border-white/10"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Border Glow on Hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  background: 'linear-gradient(135deg, rgba(90,67,255,0.3), rgba(255,143,0,0.3))',
                  filter: 'blur(20px)',
                  zIndex: -1
                }}></div>
                
                <div className={`w-20 h-20 ${feature.gradient} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl relative z-10`}>
                  <feature.icon className="text-white text-3xl" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                  {feature.description}
                </p>
                
                <ul className="space-y-3 relative z-10">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className={`w-6 h-6 ${feature.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <FaCheckCircle className="text-white text-xs" />
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Timeline with Neumorphism */}
      <section className="py-20 relative overflow-hidden">
        {/* Dark Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3e] via-[#0f0f23] to-[#1a1a3e]"></div>
        
        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/20 to-transparent rounded-full filter blur-[120px]"></div>
        
        {/* Dots Pattern */}
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Get Started in
              <span className="gradient-text block mt-2">4 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From discovery to attendance, we've streamlined every step
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { num: 1, title: 'Browse & Discover', desc: 'Find events by category, location, or date with smart search', icon: FaCalendar, gradient: 'gradient-royal' },
              { num: 2, title: 'Select Tickets', desc: 'Choose ticket type and quantity with transparent pricing', icon: FaTicketAlt, gradient: 'gradient-ocean' },
              { num: 3, title: 'Secure Payment', desc: 'Complete purchase with encrypted checkout and instant confirmation', icon: FaShieldAlt, gradient: 'gradient-sunset' },
              { num: 4, title: 'Attend & Enjoy', desc: 'Show QR code at venue and create unforgettable memories', icon: FaStar, gradient: 'gradient-neon' },
            ].map((step, index) => (
              <div key={index} className="relative group">
                {/* Connecting Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-purple-500/50 to-transparent z-0"></div>
                )}
                
                <div className="relative text-center">
                  {/* Step Number Badge */}
                  <div className={`w-32 h-32 mx-auto mb-6 neuro rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 relative`}>
                    <div className={`absolute inset-2 ${step.gradient} rounded-3xl flex items-center justify-center`}>
                      <step.icon className="text-white text-4xl" />
                    </div>
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute top-0 right-1/4 w-10 h-10 glass rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-white/20">
                    {step.num}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Glass Cards */}
      <section className="py-20 relative">
        {/* Dark Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]"></div>
        
        {/* Side Glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#5A43FF]/20 to-transparent rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#FF8F00]/20 to-transparent rounded-full filter blur-[100px]"></div>
        
        {/* Pattern */}
        <div className="absolute inset-0 bg-pattern-hero opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Loved by
              <span className="gradient-text block mt-2">Thousands</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what our community has to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { name: 'Sarah Johnson', role: 'Workshop Organizer', text: 'EventMe transformed how I organize my monthly workshops. The analytics dashboard gives me insights I never had before!', rating: 5, avatar: 'S' },
              { name: 'Michael Chen', role: 'Music Enthusiast', text: 'I\'ve booked over 20 concerts through EventMe. The process is always smooth and tickets arrive instantly.', rating: 5, avatar: 'M' },
              { name: 'Emily Rodriguez', role: 'Event Planner', text: 'Managing 500+ attendees used to be stressful, but EventMe makes it effortless. Highly recommended!', rating: 5, avatar: 'E' },
            ].map((testimonial, index) => (
              <div key={index} className="relative rounded-3xl p-8 hover-lift group border border-white/10" style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)'
              }}>
                <div className="flex gap-2 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <p className="text-gray-200 mb-6 leading-relaxed italic text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 gradient-royal rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Gradient Background */}
      <section className="py-20 relative overflow-hidden">
        {/* Vibrant Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF] via-purple-600 to-[#FF8F00]"></div>
        
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        
        {/* Radial Gradient for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">Join 50,000+ Users Today</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Experience
              <span className="block mt-2">the Difference?</span>
            </h2>
            <p className="text-lg md:text-xl mb-10 text-white/90">
              Start discovering amazing events or create your own in minutes
            </p>
            
            <div className="flex gap-5 justify-center flex-wrap mb-10">
              <Link 
                to="/register" 
                className="group px-8 py-4 bg-white text-purple-600 rounded-xl font-bold shadow-2xl hover:shadow-white/20 hover:-translate-y-2 transition-all duration-300 inline-flex items-center gap-2.5"
              >
                <FaRocket className="text-lg" />
                Sign Up Free
                <FaArrowRight className="text-sm group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 glass text-white rounded-xl font-bold border-2 border-white/30 hover:border-white/50 hover:-translate-y-2 transition-all duration-300 inline-flex items-center gap-2.5"
              >
                <FaMapMarkerAlt className="text-lg" />
                Contact Sales
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-white/80 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
