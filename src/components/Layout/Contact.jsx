// ContactPage.jsx
import React, { useState } from 'react';
import { 
  MessageCircle, Mail, Phone, MapPin, Send, CheckCircle, 
  Clock, User, MessageSquare, Heart, Star
} from 'lucide-react';

// If WhatsApp icon is not available, use MessageCircle or import from react-icons
// You can also install react-icons and use: import { FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Contact details
  const whatsappNumber = '9123353984';
  const emailAddress = 'sampritghosh310@gmail.com';
  const phoneNumber = '+91 91233 53984';

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Create mailto link
      const subject = formData.subject || `Contact from ${formData.name}`;
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${subject}

Message:
${formData.message}

---
Sent from Cosmic Horoscope Contact Form
      `.trim();
      
      // Open mail client
      window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const openWhatsApp = () => {
    const message = `Hello! I'm interested in learning more about Cosmic Horoscope.`;
    const url = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const openPhone = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const openEmail = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  const quickMessages = [
    "I need help with my horoscope reading",
    "I have a question about astrology",
    "Can you provide more information about zodiac signs?",
    "I'd like to schedule a consultation",
    "Technical issue with the website"
  ];

  const contactInfo = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      value: `+91 ${whatsappNumber}`,
      action: openWhatsApp,
      color: 'from-green-500 to-emerald-500',
      buttonText: 'Chat Now'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: emailAddress,
      action: openEmail,
      color: 'from-blue-500 to-cyan-500',
      buttonText: 'Send Email'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: phoneNumber,
      action: openPhone,
      color: 'from-purple-500 to-pink-500',
      buttonText: 'Call Now'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Kolkata, West Bengal, India',
      action: () => window.open('https://maps.app.goo.gl/G173DLZFouStxP377', '_blank'),
      color: 'from-orange-500 to-amber-500',
      buttonText: 'View Map'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.5,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 animate-spin" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Contact Cosmic Horoscope
            </h1>
            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 animate-spin" />
          </div>
          <p className="text-lg sm:text-xl text-blue-200 font-light max-w-3xl mx-auto">
            Reach out for celestial guidance, cosmic consultations, or technical support. We're here to illuminate your astrological journey.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Message Ready to Send! ✨</h3>
                  <p className="text-green-200">
                    Your email client will open with your message. Click send to complete the process.
                  </p>
                  <p className="text-green-300 text-sm mt-2">
                    If your email client doesn't open, please send manually to: {emailAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:border-white/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} shadow-lg`}>
                    <div className="text-white">
                      {info.icon}
                    </div>
                  </div>
                  {info.action && (
                    <button
                      onClick={info.action}
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r ${info.color} text-white text-sm font-bold transition-all hover:opacity-90 shadow-lg`}
                    >
                      {info.buttonText}
                    </button>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{info.title}</h3>
                <p className="text-blue-200">{info.value}</p>
              </div>
            ))}

            {/* Quick Response Info */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Response Times</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-white">WhatsApp</span>
                  </div>
                  <span className="text-green-400 font-bold">5-15 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-white">Email</span>
                  </div>
                  <span className="text-blue-400 font-bold">2-6 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-white">Phone</span>
                  </div>
                  <span className="text-purple-400 font-bold">Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl h-full">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-7 h-7 text-cyan-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Send Your Message</h2>
                  <p className="text-blue-200">Fill out the form below and we'll get back to you</p>
                </div>
              </div>

              {/* Quick Message Templates */}
              <div className="mb-8">
                <p className="text-blue-200 mb-3 font-medium">Quick templates:</p>
                <div className="flex flex-wrap gap-2">
                  {quickMessages.map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => setFormData(prev => ({ ...prev, message: msg }))}
                      className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-blue-200 hover:text-white hover:border-white/20 transition-all text-sm hover:bg-white/5"
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">
                      <span className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">Your Name *</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-black/50 border ${errors.name ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-white mb-2">
                      <span className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span className="font-medium">Email Address *</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-black/50 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">
                      <span className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">Phone Number</span>
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">
                      <span className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-medium">Subject</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="What is this regarding?"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white mb-2">
                    <span className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-medium">Your Message *</span>
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full bg-black/50 border ${errors.message ? 'border-red-500' : 'border-white/20'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none`}
                    placeholder="Please share your thoughts, questions, or cosmic inquiries..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/10">
                  <div className="mb-4 sm:mb-0">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold transition-all duration-300 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 shadow-2xl flex items-center space-x-3 hover:transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Preparing Email...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Open Email to Send</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="text-sm text-blue-200">
                    <span className="text-red-400">*</span> Required fields
                    <br />
                    <span className="text-cyan-300">Email will open in your default mail client</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Star className="w-6 h-6 text-yellow-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-black/50 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="text-lg font-bold text-white mb-2">How does the contact form work?</h4>
                <p className="text-blue-200">
                  When you submit the form, it opens your default email client with your message pre-filled. 
                  Just click "Send" to complete the process.
                </p>
              </div>
              <div className="bg-black/50 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="text-lg font-bold text-white mb-2">Can I get personal astrology consultation?</h4>
                <p className="text-blue-200">
                  Yes! Message us on WhatsApp for personalized consultations. We offer detailed 
                  birth chart analysis and future predictions.
                </p>
              </div>
              <div className="bg-black/50 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="text-lg font-bold text-white mb-2">Are the horoscopes free?</h4>
                <p className="text-blue-200">
                  Yes! Our daily horoscopes are completely free. For detailed readings and consultations, 
                  we offer premium services.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-black/50 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="text-lg font-bold text-white mb-2">What information do I need for consultation?</h4>
                <p className="text-blue-200">
                  For accurate readings, we need your birth details: date, time, and place of birth. 
                  This helps create your precise birth chart.
                </p>
              </div>
              <div className="bg-black/50 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="text-lg font-bold text-white mb-2">Do you offer business astrology?</h4>
                <p className="text-blue-200">
                  Yes! We provide corporate astrology services for business decisions, 
                  auspicious timing, and financial planning.
                </p>
              </div>
              <div className="bg-black/50 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="text-lg font-bold text-white mb-2">How accurate are your predictions?</h4>
                <p className="text-blue-200">
                  We combine ancient Vedic astrology with modern AI analysis for accurate insights. 
                  Accuracy varies based on birth data precision.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Contact Buttons */}
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl mb-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Direct Contact Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={openWhatsApp}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold transition-all hover:from-green-600 hover:to-emerald-600 shadow-lg flex items-center justify-center space-x-3"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Chat on WhatsApp</span>
            </button>
            
            <button
              onClick={openEmail}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold transition-all hover:from-blue-600 hover:to-cyan-600 shadow-lg flex items-center justify-center space-x-3"
            >
              <Mail className="w-6 h-6" />
              <span>Send Direct Email</span>
            </button>
            
            <button
              onClick={openPhone}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold transition-all hover:from-purple-600 hover:to-pink-600 shadow-lg flex items-center justify-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>Call Now</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-black/50 px-8 py-4 rounded-full border border-white/20 mb-6">
            <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
            <span className="text-blue-200">Made with cosmic energy and stellar vibes ✨</span>
            <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <p className="text-blue-200">
              Email: <a href={`mailto:${emailAddress}`} className="text-cyan-300 hover:text-cyan-200">{emailAddress}</a>
            </p>
            <p className="text-blue-200">
              Phone: <a href={`tel:${phoneNumber}`} className="text-cyan-300 hover:text-cyan-200">{phoneNumber}</a>
            </p>
            <p className="text-blue-200 text-sm">
              © {new Date().getFullYear()} Cosmic Horoscope. All rights reserved. | Vedic Astrology & Modern Insights
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;