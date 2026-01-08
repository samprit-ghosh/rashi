import { Link } from 'react-router-dom';
import { Home, Sparkles, Star, Telescope, Orbit, Moon, ChevronLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 overflow-hidden">
      {/* Animated Cosmic Background - Optimized for mobile */}
      <div className="absolute inset-0">
        {/* Stars - Reduced count for mobile */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle hidden xs:block"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}

        {/* Mobile-optimized stars */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`mobile-star-${i}`}
            className="absolute rounded-full bg-white/80 animate-twinkle xs:hidden"
            style={{
              width: '1px',
              height: '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}

        {/* Large Cosmic Orbs - Reduced size for mobile */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-xl md:blur-3xl animate-pulse"></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-xl md:blur-3xl animate-pulse" 
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-violet-500/10 rounded-full blur-xl md:blur-3xl animate-pulse" 
          style={{ animationDelay: '1s' }}
        ></div>

        {/* Zodiac Constellations - Optimized for mobile */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const radius = window.innerWidth < 400 ? 120 : 200;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            return (
              <div
                key={i}
                className="absolute w-1 h-1 md:w-2 md:h-2 bg-cyan-400/30 rounded-full animate-pulse"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {/* Main Content */}
        <div className="text-center w-full max-w-4xl mx-auto px-2">
          {/* Animated 404 - Mobile optimized */}
          <div className="relative mb-6 xs:mb-8 sm:mb-12">
            <div className="text-[100px] xs:text-[120px] sm:text-[150px] md:text-[180px] lg:text-[250px] font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent animate-float leading-none">
              404
            </div>
            
            {/* Orbiting Planets - Simplified for mobile */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-24 h-24 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                {/* Central Star */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)] animate-pulse"></div>
                
                {/* Orbiting Moon */}
                <div 
                  className="absolute w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full shadow-lg animate-orbit"
                  style={{ animationDuration: '8s' }}
                >
                  <Moon className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                
                {/* Orbiting Planet 1 */}
                <div 
                  className="absolute w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg animate-orbit"
                  style={{ animationDuration: '12s', animationDelay: '1s' }}
                >
                  <Orbit className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                
                {/* Orbiting Planet 2 */}
                <div 
                  className="absolute w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full shadow-lg animate-orbit"
                  style={{ animationDuration: '10s', animationDelay: '2s' }}
                >
                  <Sparkles className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* Message - Mobile optimized */}
          <div className="mb-6 xs:mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-400/30 mb-4 xs:mb-6">
              <Telescope className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-purple-400" />
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 xs:mb-4 px-2">
              Cosmic Connection Lost
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-purple-200 mx-auto leading-relaxed mb-4 xs:mb-6 sm:mb-8 px-2">
              The celestial path you're seeking seems to have drifted into another dimension.
            </p>
            
            {/* Zodiac Path - Mobile optimized */}
            <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-6 sm:mb-8 px-2">
              {['♈', '♉', '♊', '♋', '♌', '♍'].map((sign, i) => (
                <div
                  key={i}
                  className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:border-purple-400 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <span className="text-sm xs:text-base">{sign}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons - Stacked on mobile */}
          <div className="flex flex-col gap-4 xs:gap-6 justify-center items-center mb-8 xs:mb-12 sm:mb-16 w-full px-2">
            <Link
              to="/"
              className="group relative overflow-hidden w-full max-w-xs xs:max-w-sm sm:max-w-md px-4 xs:px-6 sm:px-8 py-3 xs:py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-full text-base xs:text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_10px_30px_rgba(147,51,234,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center space-x-2 xs:space-x-3 relative z-10">
                <Home className="w-4 h-4 xs:w-5 xs:h-5" />
                <span>Return Home</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group w-full max-w-xs xs:max-w-sm sm:max-w-md px-4 xs:px-6 sm:px-8 py-3 xs:py-4 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white font-bold rounded-full text-base xs:text-lg transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-purple-400/50"
            >
              <div className="flex items-center justify-center space-x-2 xs:space-x-3">
                <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5" />
                <span>Go Back</span>
              </div>
            </button>
          </div>

          {/* Astrological Guidance - Mobile optimized */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl xs:rounded-2xl border border-white/20 p-4 xs:p-6 sm:p-8 mx-auto w-full max-w-2xl">
            <div className="flex items-start xs:items-center mb-4 xs:mb-6">
              <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-purple-900/30 flex items-center justify-center mr-3 xs:mr-4 flex-shrink-0">
                <Sparkles className="w-5 h-5 xs:w-6 xs:h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg xs:text-xl font-bold text-white">Astrological Insight</h3>
                <p className="text-sm xs:text-base text-purple-300">What the stars suggest</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 xs:gap-6 mb-4 xs:mb-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-transparent rounded-lg xs:rounded-xl p-4 border border-purple-400/20">
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-400 mr-2 xs:mr-3" />
                  <h4 className="font-semibold text-white text-sm xs:text-base">Current Alignment</h4>
                </div>
                <p className="text-xs xs:text-sm text-purple-300">
                  Mercury is in retrograde, which may explain this temporary misalignment.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-900/30 to-transparent rounded-lg xs:rounded-xl p-4 border border-cyan-400/20">
                <div className="flex items-center mb-3">
                  <Orbit className="w-4 h-4 xs:w-5 xs:h-5 text-cyan-400 mr-2 xs:mr-3" />
                  <h4 className="font-semibold text-white text-sm xs:text-base">Suggested Path</h4>
                </div>
                <p className="text-xs xs:text-sm text-purple-300">
                  Return to familiar constellations or retrace your steps.
                </p>
              </div>
            </div>
            
            <div className="pt-4 xs:pt-6 border-t border-white/10">
              <div className="flex items-start">
                <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center mr-2 xs:mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-xs xs:text-sm font-bold">✦</span>
                </div>
                <p className="text-xs xs:text-sm text-purple-300">
                  Remember: Every wrong turn in the cosmos leads to new discoveries.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Zodiac Signs - Mobile optimized */}
          <div className="mt-8 xs:mt-12 px-2">
            <p className="text-xs xs:text-sm text-purple-400 mb-3 xs:mb-4">Explore our cosmic services:</p>
            <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
              {[
                { name: 'Horoscope', path: '/horoscope' },
                { name: 'Kundli', path: '/kundli' },
                { name: 'Compatibility', path: '/compatibility' },
                { name: 'Palm Reading', path: '/palmistry' },
                { name: 'Tarot', path: '/tarot' },
                { name: 'Numerology', path: '/numerology' },
              ].map((service) => (
                <Link
                  key={service.name}
                  to={service.path}
                  className="px-3 py-1.5 xs:px-4 xs:py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-purple-400/50 text-purple-300 hover:text-white transition-all duration-300 text-xs xs:text-sm"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Constellation - Mobile optimized */}
        <div className="absolute bottom-4 xs:bottom-8 left-0 right-0">
          <div className="flex justify-center space-x-4 xs:space-x-6 sm:space-x-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 h-0.5 xs:w-1 xs:h-1 bg-cyan-400/30 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations - Mobile optimized */}
      <style jsx global>{`
        /* Extra small breakpoint for 280px-320px */
        @media (min-width: 280px) {
          .xs\\:block { display: block !important; }
          .xs\\:hidden { display: none !important; }
          .xs\\:text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
          .xs\\:text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
          .xs\\:text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
          .xs\\:text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
          .xs\\:text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
          .xs\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
          .xs\\:px-6 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .xs\\:py-3 { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
          .xs\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
          .xs\\:mb-6 { margin-bottom: 1.5rem !important; }
          .xs\\:mb-8 { margin-bottom: 2rem !important; }
          .xs\\:mb-12 { margin-bottom: 3rem !important; }
          .xs\\:gap-3 { gap: 0.75rem !important; }
          .xs\\:gap-4 { gap: 1rem !important; }
          .xs\\:gap-6 { gap: 1.5rem !important; }
          .xs\\:space-x-2 > * + * { margin-left: 0.5rem !important; }
          .xs\\:space-x-3 > * + * { margin-left: 0.75rem !important; }
          .xs\\:w-5 { width: 1.25rem !important; }
          .xs\\:h-5 { height: 1.25rem !important; }
          .xs\\:w-6 { width: 1.5rem !important; }
          .xs\\:h-6 { height: 1.5rem !important; }
          .xs\\:w-8 { width: 2rem !important; }
          .xs\\:h-8 { height: 2rem !important; }
          .xs\\:w-9 { width: 2.25rem !important; }
          .xs\\:h-9 { height: 2.25rem !important; }
          .xs\\:w-10 { width: 2.5rem !important; }
          .xs\\:h-10 { height: 2.5rem !important; }
          .xs\\:w-12 { width: 3rem !important; }
          .xs\\:h-12 { height: 3rem !important; }
          .xs\\:w-14 { width: 3.5rem !important; }
          .xs\\:h-14 { height: 3.5rem !important; }
          .xs\\:w-16 { width: 4rem !important; }
          .xs\\:h-16 { height: 4rem !important; }
          .xs\\:max-w-sm { max-width: 24rem !important; }
          .xs\\:max-w-md { max-width: 28rem !important; }
          .xs\\:rounded-2xl { border-radius: 1rem !important; }
          .xs\\:rounded-xl { border-radius: 0.75rem !important; }
          .xs\\:text-\\[120px\\] { font-size: 120px !important; }
          .xs\\:w-32 { width: 8rem !important; }
          .xs\\:h-32 { height: 8rem !important; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(147, 51, 234, 0.3),
                       0 0 20px rgba(147, 51, 234, 0.1);
          }
          50% { 
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5),
                       0 0 40px rgba(147, 51, 234, 0.2);
          }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @media (min-width: 640px) {
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        }
        
        .animate-orbit {
          animation: orbit linear infinite;
          transform-origin: center;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        /* Ultra-small devices (280px and below) */
        @media (max-width: 280px) {
          .text-\[100px\] {
            font-size: 80px !important;
          }
          
          .px-3 {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          .gap-2 {
            gap: 0.5rem !important;
          }
          
          .w-8 {
            width: 2rem !important;
          }
          
          .h-8 {
            height: 2rem !important;
          }
          
          .text-2xl {
            font-size: 1.5rem !important;
            line-height: 2rem !important;
          }
          
          .text-base {
            font-size: 0.875rem !important;
            line-height: 1.25rem !important;
          }
        }

        /* Ensure touch targets are large enough */
        button, a, [role="button"] {
          min-height: 44px;
          min-width: 44px;
        }

        /* Prevent horizontal scroll */
        body {
          overflow-x: hidden;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #06b6d4);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #0891b2);
        }
      `}</style>
    </div>
  );
}