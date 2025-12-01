// Header.jsx
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'daily', path: '/DailyHoroscope', label: 'Daily Horoscope' },
    { id: 'zodiac', path: '/RashiFinder', label: 'Rashi Finder' },
    { id: 'compatibility', path: '/Contact', label: 'Contact' },
    { id: 'astrology', path: '/astrology', label: 'Astrology' }

  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-900 backdrop-blur-lg bg-opacity-90 border-b border-purple-500 border-opacity-30 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Link */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <div className="text-3xl text-purple-400 animate-pulse">☯</div>
              <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Cosmic Horoscope
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.path}
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive || (link.path === '/' && location.pathname === '/')
                        ? 'text-white bg-purple-700 bg-opacity-50 shadow-lg'
                        : 'text-purple-200 hover:text-white hover:bg-purple-600 hover:bg-opacity-30'
                    }`
                  }
                  end={link.path === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
              
              {/* Live Timer */}
              <div className="flex items-center space-x-2 bg-black bg-opacity-30 px-4 py-2 rounded-lg border border-purple-500 border-opacity-30">
                <div className="text-cyan-400">⏱</div>
                <div className="text-purple-200 text-sm">Live Updates</div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-purple-200 hover:text-white p-2 rounded-lg bg-purple-800 bg-opacity-50 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-500 border-opacity-30">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 ${
                        isActive || (link.path === '/' && location.pathname === '/')
                          ? 'text-white bg-purple-700 bg-opacity-50'
                          : 'text-purple-200 hover:text-white hover:bg-purple-600 hover:bg-opacity-30'
                      }`
                    }
                    end={link.path === '/'}
                  >
                    {link.label}
                  </NavLink>
                ))}
                
                {/* Mobile Live Timer */}
                <div className="flex items-center space-x-2 bg-black bg-opacity-30 px-4 py-3 rounded-lg border border-purple-500 border-opacity-30 mt-2">
                  <div className="text-cyan-400">⏱</div>
                  <div className="text-purple-200">Live Updates</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;