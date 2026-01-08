import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Astrology/Home';
import DailyHoroscope from './components/Astrology/DailyHoroscope';
import RashiFinder from './components/Astrology/RashiFinder';
import HoroscopeAnalytics from './components/Layout/Contact';
import ContactPage from './components/Layout/Contact';
import NotFoundPage from './components/Layout/Notfound';
import KundliUploadPage from './components/Astrology/KundliUploadPage';
import AdminPanel from './components/Admin/AdminPanel';
import { WebSocketProvider } from './utils/websocket-context';
import { Shield, LogOut } from 'lucide-react';

function App() {
  const [selectedRashi, setSelectedRashi] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    setIsAdmin(false);
    setShowLogin(false);
  };

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          <div className="text-center p-8 max-w-md">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Access Required</h2>
            <p className="text-gray-600 mb-6">Please login as admin to access this page.</p>
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Admin Login
            </button>
          </div>
        </div>
      );
    }
    return children;
  };

  return (
    <WebSocketProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          {/* Background Pattern */}
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-200/20 via-transparent to-transparent"></div>
          
          <div className="relative z-10">
            {/* Admin Login/Logout Panel */}
            <div className="fixed top-4 right-4 z-50">
              {!isAdmin ? (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3"
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin Login</span>
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-white bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 rounded-full text-sm font-medium">
                    Admin Mode
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Login Modal */}
            {showLogin && !isAdmin && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-gradient-to-br from-gray-800 via-purple-900/90 to-violet-900/90 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-md w-full">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
                    <p className="text-purple-300">Enter admin credentials</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="admin"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      />
                    </div>

                    <div className="text-xs text-purple-400 text-center">
                      Demo: Use any credentials to login
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        onClick={() => setShowLogin(false)}
                        className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setIsAdmin(true);
                          setShowLogin(false);
                        }}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Only show Header/Footer in normal mode, not in admin mode */}
            {!isAdmin && <Header />}
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/RashiFinder" element={<RashiFinder />} />
              <Route path="/DailyHoroscope" element={<DailyHoroscope />} />
              <Route path="/HoroscopeAnalytics" element={<HoroscopeAnalytics />} />
              <Route path="/Contact" element={<ContactPage />} />
              <Route path="/KundliUpload" element={<KundliUploadPage />} />
              
              {/* Protected Admin Route */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            
            {/* Only show Footer in normal mode, not in admin mode */}
            {!isAdmin && <Footer />}

            {/* Mode Indicator */}
            {isAdmin && (
              <div className="fixed bottom-4 left-4 z-50">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
                  <span className="text-sm text-white">Admin Panel</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App;