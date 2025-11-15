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
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">We're Here to Help</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Have questions? Need support? Want to partner with us? Our team is ready to assist you.
          </p>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="container mx-auto px-4 -mt-12 mb-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Email Support */}
          <div className="glass-card rounded-3xl p-8 text-center hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-dark-900 mb-3">Send Us a Message</h3>
            <p className="text-dark-600 mb-4 leading-relaxed">
              Get detailed answers to your questions. We typically respond within 24 hours.
            </p>
            <a 
              href="mailto:support@eventme.com" 
              className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
            >
              support@eventme.com
            </a>
          </div>

          {/* Live Chat */}
          <div className="glass-card rounded-3xl p-8 text-center hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaComments className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-dark-900 mb-3">Chat With Us</h3>
            <p className="text-dark-600 mb-4 leading-relaxed">
              Need immediate help? Our support team is available Monday-Friday, 9 AM - 6 PM EST.
            </p>
            <button className="text-primary-500 font-semibold hover:text-primary-600 transition-colors">
              Start Chat
            </button>
          </div>

          {/* Phone Support */}
          <div className="glass-card rounded-3xl p-8 text-center hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaPhone className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-dark-900 mb-3">Call Us Directly</h3>
            <p className="text-dark-600 mb-4 leading-relaxed">
              Speak with a real person. Available for Pro and Enterprise customers.
            </p>
            <a 
              href="tel:+12345678900" 
              className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
            >
              +1 (234) 567-8900
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-dark-900 mb-6">Get in Touch</h2>
            <p className="text-dark-600 mb-8 leading-relaxed">
              Whether you're an event enthusiast looking for support or an organizer ready to create something amazing, we're here to help you succeed.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-primary-500 text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-900 mb-1">Email Support</h3>
                  <p className="text-dark-600 text-sm mb-1">support@eventme.com</p>
                  <p className="text-dark-600 text-sm">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-secondary-500 text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-900 mb-1">Phone Support</h3>
                  <p className="text-dark-600 text-sm mb-1">+1 (234) 567-8900</p>
                  <p className="text-dark-600 text-sm">Mon-Fri, 9 AM - 6 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-accent-purple text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-900 mb-1">Office Location</h3>
                  <p className="text-dark-600 text-sm mb-1">123 Event Street</p>
                  <p className="text-dark-600 text-sm">New York, NY 10001, USA</p>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaQuestionCircle className="text-primary-500 text-2xl" />
                <h3 className="font-bold text-lg text-dark-900">Quick Answers</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-dark-600 hover:text-primary-500 transition-colors flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                    How do I book tickets?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark-600 hover:text-primary-500 transition-colors flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                    Can I cancel my booking?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark-600 hover:text-primary-500 transition-colors flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                    How do I create an event?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-dark-600 hover:text-primary-500 transition-colors flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                    What payment methods are accepted?
                  </a>
                </li>
              </ul>
              <a 
                href="#" 
                className="mt-4 inline-block text-primary-500 font-semibold hover:text-primary-600 transition-colors text-sm"
              >
                Visit Help Center →
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-dark-900 mb-2">Send Us a Message</h2>
              <p className="text-dark-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

              {submitted && (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Message Sent Successfully!</h4>
                    <p className="text-sm text-green-700">Thank you for reaching out. We'll respond within 24 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
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
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none resize-none"
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FaPaperPlane />
                  Send Message
                </button>

                <p className="text-sm text-dark-500 text-center">
                  We respect your privacy. Your information will never be shared with third parties.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our support team is standing by to help you with any questions or concerns
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-primary-500 rounded-2xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Start Live Chat
            </button>
            <a 
              href="tel:+12345678900"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
