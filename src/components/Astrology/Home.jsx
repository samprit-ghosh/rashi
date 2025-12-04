import React from 'react'
import AboutSection from './../Layout/About';
import { useNavigate } from "react-router-dom";
import KundliUploadPage from "./KundliUploadPage"

function Home() {
  const navigate = useNavigate();

  const zodiacSigns = [
    { name: 'Aries', icon: '♈', dates: 'Mar 21 - Apr 19' },
    { name: 'Taurus', icon: '♉', dates: 'Apr 20 - May 20' },
    { name: 'Gemini', icon: '♊', dates: 'May 21 - Jun 20' },
    { name: 'Cancer', icon: '♋', dates: 'Jun 21 - Jul 22' },
    { name: 'Leo', icon: '♌', dates: 'Jul 23 - Aug 22' },
    { name: 'Virgo', icon: '♍', dates: 'Aug 23 - Sep 22' },
    { name: 'Libra', icon: '♎', dates: 'Sep 23 - Oct 22' },
    { name: 'Scorpio', icon: '♏', dates: 'Oct 23 - Nov 21' },
    { name: 'Sagittarius', icon: '♐', dates: 'Nov 22 - Dec 21' },
    { name: 'Capricorn', icon: '♑', dates: 'Dec 22 - Jan 19' },
    { name: 'Aquarius', icon: '♒', dates: 'Jan 20 - Feb 18' },
    { name: 'Pisces', icon: '♓', dates: 'Feb 19 - Mar 20' }
  ];

  return (
    <div>


      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Choose Your Rashi
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Select your zodiac sign to begin your cosmic journey and discover what the stars have in store for you today.
              Real-time AI Generation with Live Timer.
            </p>
          </div>

          {/* Zodiac Signs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {zodiacSigns.map((sign, index) => (
              <div
                key={sign.name}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:border-purple-400 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
              >
                <div className="text-4xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {sign.icon}
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-2">
                  {sign.name}
                </h3>
                <p className="text-purple-300 text-center text-sm">
                  {sign.dates}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button
              onClick={() => navigate("/DailyHoroscope")}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
               style={{ position: 'relative', zIndex: 10 }}>
              Get Your Daily Horoscope
            </button>

          </div>
        </div>
      </div>






      <KundliUploadPage />
      <AboutSection />

    </div>
  )
}

export default Home