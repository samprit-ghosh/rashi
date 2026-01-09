
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white pt-10 pb-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-5">
      {/* Star background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-yellow-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-200 rounded-full opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Cosmic Guidance Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-200">Cosmic Guidance</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your daily celestial companion for navigating life's journey with the wisdom of the stars.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 shadow-lg flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 shadow-inner"></div>
              </div>
              <span className="text-sm text-amber-100">Waxing Crescent</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-200">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-200 transition-colors duration-300 text-sm">Daily Horoscope</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-200 transition-colors duration-300 text-sm">Weekly Forecast</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-200 transition-colors duration-300 text-sm">Monthly Overview</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-200 transition-colors duration-300 text-sm">Zodiac Compatibility</a></li>
            </ul>
          </div>
          
          {/* Zodiac Elements */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-200">Zodiac Elements</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-2 text-center text-xs font-medium">
                Fire ♈♌♐
              </div>
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg p-2 text-center text-xs font-medium">
                Earth ♉♍♑
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg p-2 text-center text-xs font-medium">
                Air ♊♎♒
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-2 text-center text-xs font-medium">
                Water ♋♏♓
              </div>
            </div>
          </div>
          
          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-200">Connect With Us</h3>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                🌙
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                ⭐
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-300 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                ☀️
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                ✨
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Subscribe for cosmic updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-2 text-amber-200">
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
            </div>
            <p className="text-gray-400 text-sm text-center">
              &copy; {new Date().getFullYear()} Choose Your Rashi. All celestial guidance provided by the stars.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-200 text-sm transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-amber-200 text-sm transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-amber-200 text-sm transition-colors duration-300">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;