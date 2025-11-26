import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaComments, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Professional Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]"></div>
      
      {/* Subtle Gradient Accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#5A43FF]/15 to-transparent rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#FF8F00]/15 to-transparent rounded-full filter blur-[100px]"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
      }}></div>

      {/* Hero Section - Compact & Professional */}
      <div className="relative text-white pt-24 sm:pt-28 pb-10 sm:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 via-transparent to-[#FF8F00]/20"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 animate-slide-down">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-semibold text-xs sm:text-sm">We're Online - Ready to Help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 animate-slide-up px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto animate-slide-up stagger-1 px-4">
            Have questions about EventMe? We're here to help you succeed.
          </p>
        </div>
      </div>

      {/* Contact Methods - Professional Cards */}
      <div className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 relative z-10 max-w-6xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Email Support */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF]/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative neuro rounded-2xl p-6 text-center hover-lift">
              <div className="w-16 h-16 gradient-royal rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaEnvelope className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
              <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                Get detailed answers within 24 hours
              </p>
              <a 
                href="mailto:support@eventme.com" 
                className="inline-block text-[#5A43FF] font-semibold hover:text-[#7B63FF] transition-colors text-sm"
              >
                support@eventme.com
              </a>
            </div>
          </div>

          {/* Live Chat */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8F00]/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative neuro rounded-2xl p-6 text-center hover-lift">
              <div className="w-16 h-16 gradient-sunset rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaComments className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Live Chat</h3>
              <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                Instant help Mon-Fri, 9 AM - 6 PM EST
              </p>
              <button className="inline-block px-4 py-2 bg-gradient-to-r from-[#FF8F00] to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                Start Chat
              </button>
            </div>
          </div>

          {/* Phone Support */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative neuro rounded-2xl p-6 text-center hover-lift">
              <div className="w-16 h-16 gradient-ocean rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaPhone className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
              <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                Speak with our support team directly
              </p>
              <a 
                href="tel:+12345678900" 
                className="inline-block text-[#5A43FF] font-semibold hover:text-[#7B63FF] transition-colors text-sm"
              >
                +1 (234) 567-8900
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Form & Info */}
      <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">Fill out the form and we'll get back to you within 24 hours.</p>
              </div>
              <p className="text-gray-700 mb-4 text-sm">Fill out the form and we'll respond soon.</p>

              {submitted && (
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3 mb-4 flex items-start gap-2 shadow-md">
                  <FaCheckCircle className="text-green-600 text-lg flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-green-900 text-sm mb-0.5">Message Sent!</h4>
                    <p className="text-xs text-green-800">We'll respond within 24 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">
                    👤 Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:border-[#5A43FF] focus:ring-2 focus:ring-[#5A43FF]/20 transition-all outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">
                    ✉️ Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:border-[#5A43FF] focus:ring-2 focus:ring-[#5A43FF]/20 transition-all outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">
                    📋 Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:border-[#5A43FF] focus:ring-2 focus:ring-[#5A43FF]/20 transition-all outline-none"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">
                    💬 Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:border-[#5A43FF] focus:ring-2 focus:ring-[#5A43FF]/20 transition-all outline-none resize-none"
                    rows="4"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-3 bg-gradient-to-r from-[#5A43FF] via-purple-600 to-[#FF8F00] text-white rounded-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <FaPaperPlane className="text-xs" />
                  Send Message
                </button>

                <p className="text-xs text-gray-600 text-center pt-1">
                  🔒 Your information will never be shared.
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar - Contact Info & FAQ */}
          <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
            
            {/* Contact Information Card */}
            <div className="neuro rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#5A43FF]" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 gradient-royal rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1">Email</h4>
                    <p className="text-gray-300 text-xs">support@eventme.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 gradient-sunset rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1">Phone</h4>
                    <p className="text-gray-300 text-xs">+1 (234) 567-8900</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 gradient-ocean rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1">Office</h4>
                    <p className="text-gray-300 text-xs">New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links Card */}
            <div className="neuro rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-[#FF8F00]" />
                Quick Answers
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#5A43FF] transition-colors flex items-center gap-2 text-sm group">
                    <span className="w-1.5 h-1.5 bg-[#5A43FF] rounded-full group-hover:scale-125 transition-transform"></span>
                    How do I book tickets?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#5A43FF] transition-colors flex items-center gap-2 text-sm group">
                    <span className="w-1.5 h-1.5 bg-[#5A43FF] rounded-full group-hover:scale-125 transition-transform"></span>
                    Can I cancel my booking?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#5A43FF] transition-colors flex items-center gap-2 text-sm group">
                    <span className="w-1.5 h-1.5 bg-[#5A43FF] rounded-full group-hover:scale-125 transition-transform"></span>
                    How do I create an event?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#5A43FF] transition-colors flex items-center gap-2 text-sm group">
                    <span className="w-1.5 h-1.5 bg-[#5A43FF] rounded-full group-hover:scale-125 transition-transform"></span>
                    Payment methods accepted?
                  </a>
                </li>
              </ul>
              <a 
                href="#" 
                className="mt-4 inline-flex items-center gap-2 text-[#FF8F00] font-semibold hover:text-[#FFB020] transition-colors text-sm group"
              >
                Visit Help Center
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Business Hours Card */}
            <div className="neuro rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaComments className="text-green-400" />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday</span>
                  <span className="text-white font-semibold">9 AM - 6 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-white font-semibold">10 AM - 4 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">We're Online Now</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom CTA Section - Professional */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5A43FF] via-purple-600 to-[#FF8F00]"></div>
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>
        
        <div className="container mx-auto px-4 text-center text-white relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-5">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-semibold text-sm">Available 24/7</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Need Immediate Assistance?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Our support team is standing by to help you succeed
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group px-8 py-4 bg-white text-[#5A43FF] rounded-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2">
              <FaComments className="text-lg" />
              Start Live Chat
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <a 
              href="tel:+12345678900"
              className="px-8 py-4 glass text-white rounded-xl font-bold border-2 border-white/30 hover:border-white/50 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
            >
              <FaPhone className="text-lg" />
              Call Now
            </a>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-white/80 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>Fast Response</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>Expert Support</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>No Wait Time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
