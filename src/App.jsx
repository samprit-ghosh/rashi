
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import DailyHoroscope from './components/Astrology/DailyHoroscope';
import RashiFinder from './components/Astrology/RashiFinder'; 
import Home from './components/Astrology/Home';
import HoroscopeAnalytics from './components/Layout/Contact';
import ContactPage from './components/Layout/Contact';

function App() {
  const [selectedRashi, setSelectedRashi] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-200/20 via-transparent to-transparent]"></div>
        
        <div className="relative z-10">
          <Header />
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/RashiFinder" element={<RashiFinder />} />
            <Route path="/DailyHoroscope" element={<DailyHoroscope />} />
            <Route path="/HoroscopeAnalytics" element={<HoroscopeAnalytics />} />
            <Route path="/Contact" element={<ContactPage />} />
            {/* Add more routes as needed */}
          </Routes>
      
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;