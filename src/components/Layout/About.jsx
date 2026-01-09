
import React from "react";
import { useNavigate } from "react-router-dom";
const AboutSection = () => {


  const navigate = useNavigate();

  
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-purple-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden  pt-5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden mt-5">
        {/* Stars */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full opacity-50"></div>
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-yellow-200 rounded-full opacity-60"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-200 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-white rounded-full opacity-60"></div>
        
        {/* Zodiac Constellation */}
        <div className="absolute top-10 right-10 opacity-10">
          <div className="text-6xl">♋♌♍</div>
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <div className="text-6xl">♎♏♐</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 mt-5">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full mx-2"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-amber-400 rounded-full"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-purple-200 bg-clip-text text-transparent">
            About Choose Your Rashi
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover your cosmic path with AI-powered horoscopes that blend ancient wisdom with modern technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-500">
              <h2 className="text-2xl font-bold text-amber-200 mb-4">Our Cosmic Mission</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                At <span className="text-amber-200 font-semibold">Choose Your Rashi</span>, we believe that the stars hold the key to understanding our life's journey. 
                Our mission is to make celestial wisdom accessible to everyone through accurate, personalized horoscopes.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Using advanced AI technology combined with traditional Vedic astrology principles, 
                we provide real-time insights that help you navigate life's challenges and opportunities.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-800/20 rounded-xl p-6 border border-gray-700/30 hover:border-purple-400/30 transition-all duration-300">
                <div className="text-2xl mb-3">🌙</div>
                <h3 className="font-semibold text-amber-100 mb-2">Real-time AI Generation</h3>
                <p className="text-sm text-gray-400">Fresh horoscopes generated instantly with live countdown</p>
              </div>
              <div className="bg-gray-800/20 rounded-xl p-6 border border-gray-700/30 hover:border-blue-400/30 transition-all duration-300">
                <div className="text-2xl mb-3">⭐</div>
                <h3 className="font-semibold text-amber-100 mb-2">12 Zodiac Signs</h3>
                <p className="text-sm text-gray-400">Comprehensive coverage of all rashis with detailed insights</p>
              </div>
            </div>
          </div>

          {/* Right Content - Zodiac Wheel */}
          <div className="relative">
            <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-amber-200 mb-6 text-center">The 12 Rashi System</h2>
              
              {/* Zodiac Grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Aries", symbol: "♈", element: "Fire" },
                  { name: "Taurus", symbol: "♉", element: "Earth" },
                  { name: "Gemini", symbol: "♊", element: "Air" },
                  { name: "Cancer", symbol: "♋", element: "Water" },
                  { name: "Leo", symbol: "♌", element: "Fire" },
                  { name: "Virgo", symbol: "♍", element: "Earth" },
                  { name: "Libra", symbol: "♎", element: "Air" },
                  { name: "Scorpio", symbol: "♏", element: "Water" },
                  { name: "Sagittarius", symbol: "♐", element: "Fire" },
                  { name: "Capricorn", symbol: "♑", element: "Earth" },
                  { name: "Aquarius", symbol: "♒", element: "Air" },
                  { name: "Pisces", symbol: "♓", element: "Water" }
                ].map((sign, index) => (
                  <div 
                    key={sign.name}
                    className="bg-gray-800/40 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300 border border-gray-700/30 hover:border-amber-400/50"
                  >
                    <div className="text-2xl mb-2">{sign.symbol}</div>
                    <h4 className="font-semibold text-sm text-amber-100">{sign.name}</h4>
                    <span className={`text-xs ${
                      sign.element === 'Fire' ? 'text-orange-400' :
                      sign.element === 'Earth' ? 'text-green-400' :
                      sign.element === 'Air' ? 'text-blue-400' : 'text-purple-400'
                    }`}>
                      {sign.element}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-purple-900/30 to-amber-900/30 rounded-xl border border-amber-400/20">
                <p className="text-center text-amber-100 text-sm">
                  "The stars impel, they do not compel. Your Rashi guides, but you choose your path."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-2xl p-8 border border-amber-400/20">
            <h3 className="text-2xl font-bold text-amber-200 mb-4">Ready to Begin Your Cosmic Journey?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Select your Rashi from the 12 zodiac signs and unlock personalized daily insights powered by AI and celestial wisdom.
            </p>
            <button
              onClick={() => navigate("/RashiFinder")}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Choose Your Rashi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;