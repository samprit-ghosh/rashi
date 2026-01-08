import React, { useState, useEffect, useRef } from 'react';
import { generateHoroscopeAnalysis, generateDailyHoroscope, testGeminiConnection } from '../../utils/geminiClient';
import { rashiData } from '../../utils/astrologyCalculations';
import { Calendar, Heart, Briefcase, Activity, Target, Palette, Sparkles, RefreshCw, AlertCircle, Key, Users, Cpu, Zap, Timer, ChevronLeft, ChevronRight, Play, Pause, Star, Sparkle, Moon, Sun, TrendingUp, TrendingDown, PieChart, BarChart3 } from 'lucide-react';

const RashiWheelHoroscope = () => {
  const [selectedRashi, setSelectedRashi] = useState('');
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState('checking');
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [generationStatus, setGenerationStatus] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [generationTime, setGenerationTime] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [dailyInsight, setDailyInsight] = useState(null);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const autoRotateRef = useRef(null);
  const particleRef = useRef(null);
  const rightSectionRef = useRef(null);

  // Helper functions - defined first
  const getRashiColor = (rashiName) => {
    const colors = {
      'Aries': 'from-red-500 to-pink-600',
      'Taurus': 'from-emerald-500 to-green-600',
      'Gemini': 'from-yellow-500 to-amber-600',
      'Cancer': 'from-silver-500 to-gray-600',
      'Leo': 'from-orange-500 to-amber-600',
      'Virgo': 'from-lime-500 to-emerald-600',
      'Libra': 'from-blue-500 to-indigo-600',
      'Scorpio': 'from-purple-500 to-pink-600',
      'Sagittarius': 'from-purple-500 to-blue-600',
      'Capricorn': 'from-gray-600 to-gray-700',
      'Aquarius': 'from-cyan-500 to-blue-600',
      'Pisces': 'from-blue-400 to-purple-500'
    };
    return colors[rashiName] || 'from-orange-500 to-amber-600';
  };

  const getRashiElement = (rashiName) => {
    const elements = {
      'Aries': '🔥',
      'Taurus': '🌍',
      'Gemini': '💨',
      'Cancer': '💧',
      'Leo': '🔥',
      'Virgo': '🌍',
      'Libra': '💨',
      'Scorpio': '💧',
      'Sagittarius': '🔥',
      'Capricorn': '🌍',
      'Aquarius': '💨',
      'Pisces': '💧'
    };
    return elements[rashiName] || '⭐';
  };

  const getRashiPlanet = (rashiName) => {
    const planets = {
      'Aries': '♂ Mars',
      'Taurus': '♀ Venus',
      'Gemini': '☿ Mercury',
      'Cancer': '☽ Moon',
      'Leo': '☉ Sun',
      'Virgo': '☿ Mercury',
      'Libra': '♀ Venus',
      'Scorpio': '♂ Mars',
      'Sagittarius': '♃ Jupiter',
      'Capricorn': '♄ Saturn',
      'Aquarius': '♄ Saturn',
      'Pisces': '♃ Jupiter'
    };
    return planets[rashiName] || '⭐';
  };

  const getRashiIcon = (rashiName) => {
    const icons = {
      'Aries': '♈',
      'Taurus': '♉',
      'Gemini': '♊',
      'Cancer': '♋',
      'Leo': '♌',
      'Virgo': '♍',
      'Libra': '♎',
      'Scorpio': '♏',
      'Sagittarius': '♐',
      'Capricorn': '♑',
      'Aquarius': '♒',
      'Pisces': '♓'
    };
    return icons[rashiName] || '☆';
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    if (minutes > 0) {
      return `${minutes}m ${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}s`;
    } else if (seconds > 0) {
      return `${seconds}.${ms.toString().padStart(2, '0')}s`;
    } else {
      return `0.${ms.toString().padStart(2, '0')}s`;
    }
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-400' : 'text-red-400';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 inline mr-1" /> : 
      <TrendingDown className="w-4 h-4 inline mr-1" />;
  };

  // Now initialize wheelItems after helper functions are defined
  const wheelItems = rashiData.map((rashi, index) => ({
    ...rashi,
    angle: (index * 30) - 60,
    index,
    color: getRashiColor(rashi.en),
    element: getRashiElement(rashi.en)
  }));

  // Particle effect for background
  useEffect(() => {
    const generateParticles = () => {
      const particleCount = window.innerWidth < 768 ? 15 : 25;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.2 + 0.1,
      }));
      setParticles(newParticles);
    };

    generateParticles();

    particleRef.current = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100,
        opacity: Math.sin(Date.now() * 0.001 + p.id) * 0.15 + 0.1
      })));
    }, 100);

    return () => clearInterval(particleRef.current);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating) {
      autoRotateRef.current = setInterval(() => {
        setRotation(prev => (prev + 30) % 360);
        setCurrentIndex(prev => (prev + 1) % 12);
      }, 2500);
    } else {
      clearInterval(autoRotateRef.current);
    }

    return () => clearInterval(autoRotateRef.current);
  }, [isAutoRotating]);

  // Timer effect for generation
  useEffect(() => {
    if (isGenerating) {
      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Date.now() - startTimeRef.current;
          setGenerationTime(elapsed);
        }
      }, 10);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isGenerating]);

  const checkAPIStatus = async () => {
    setApiStatus('checking');

    try {
      const result = await testGeminiConnection();
      if (result.success) {
        setApiStatus('connected');
        setError('');
      } else {
        setApiStatus('error');
        setError('API Connection Failed');
      }
    } catch (err) {
      setApiStatus('error');
      setError('Failed to check API status');
    }
  };

  const rotateWheel = (direction) => {
    setIsAutoRotating(false);
    const newRotation = direction === 'next' ? rotation - 30 : rotation + 30;
    setRotation(newRotation);
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % 12;
      } else {
        return prev === 0 ? 11 : prev - 1;
      }
    });
  };

  const selectRashi = (rashiName, index) => {
    setIsAutoRotating(false);
    setSelectedRashi(rashiName);
    const targetRotation = - (index * 30) + 60;
    setRotation(targetRotation);
    setCurrentIndex(index);
    setAnalyticsData(null);
    setDailyInsight(null);
    setHoroscope('');

    // Add selection effect
    setParticles(prev => [
      ...prev,
      ...Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: 50,
        y: 50,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 1.5 + 1,
        opacity: 1,
        fade: true
      }))
    ]);
  };

  const updateGenerationStatus = (status, step, progressValue) => {
    setGenerationStatus(status);
    setCurrentStep(step);
    setProgress(progressValue);
  };

  const startTimer = () => {
    startTimeRef.current = Date.now();
    setGenerationTime(0);
    setIsGenerating(true);
  };

  const stopTimer = () => {
    setIsGenerating(false);
  };

  const fetchHoroscope = async () => {
    if (!selectedRashi) {
      setError('Please select your Rashi first');
      return;
    }

    setLoading(true);
    setError('');
    setHoroscope('');
    setAnalyticsData(null);
    setDailyInsight(null);
    startTimer();

    updateGenerationStatus('Starting AI generation...', 'Initializing', 10);

    try {
      updateGenerationStatus('Connecting to Gemini AI...', 'API Connection', 20);
      await new Promise(resolve => setTimeout(resolve, 300));

      updateGenerationStatus('Analyzing planetary positions...', 'Astrological Analysis', 40);
      
      // Generate both analytics and daily horoscope in parallel
      const [analytics, daily] = await Promise.all([
        generateHoroscopeAnalysis(selectedRashi),
        generateDailyHoroscope(selectedRashi)
      ]);

      updateGenerationStatus('Processing celestial insights...', 'Processing Data', 70);
      
      setAnalyticsData(analytics);
      setDailyInsight(daily);
      
      // Format the horoscope text
      const formattedHoroscope = `
GENERAL: ${analytics.insights || daily.horoscope}
${analytics.luckyElements ? `LUCKY_NUMBER: ${analytics.luckyElements.find(e => e.type === 'Lucky Number')?.value || 'N/A'}
LUCKY_COLOR: ${analytics.luckyElements.find(e => e.type === 'Lucky Color')?.value || 'N/A'}` : ''}
`;
      
      setHoroscope(formattedHoroscope);
      updateGenerationStatus('Cosmic insights generated!', 'Complete', 100);

      setTimeout(() => {
        stopTimer();
        setGenerationStatus('');
        setCurrentStep('');
        setProgress(0);
        
        if (rightSectionRef.current) {
          const contentContainer = rightSectionRef.current.querySelector('.content-container');
          if (contentContainer) {
            contentContainer.scrollTop = 0;
          }
        }
      }, 1500);

    } catch (err) {
      console.error('Horoscope fetch error:', err);
      setError('Failed to generate horoscope. Please try again.');
      updateGenerationStatus('Generation failed', 'Error', 0);

      setTimeout(() => {
        stopTimer();
        setGenerationStatus('');
        setCurrentStep('');
        setProgress(0);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const parseHoroscopeContent = (content) => {
    const sections = {
      general: '',
      love: '',
      career: '',
      health: '',
      luckyNumber: '',
      luckyColor: '',
      spiritual: ''
    };

    const lines = content.split('\n');

    lines.forEach(line => {
      const cleanLine = line.trim();
      if (cleanLine.startsWith('GENERAL:')) {
        sections.general = cleanLine.replace('GENERAL:', '').trim();
      } else if (cleanLine.startsWith('LOVE:')) {
        sections.love = cleanLine.replace('LOVE:', '').trim();
      } else if (cleanLine.startsWith('CAREER:')) {
        sections.career = cleanLine.replace('CAREER:', '').trim();
      } else if (cleanLine.startsWith('HEALTH:')) {
        sections.health = cleanLine.replace('HEALTH:', '').trim();
      } else if (cleanLine.startsWith('LUCKY_NUMBER:')) {
        sections.luckyNumber = cleanLine.replace('LUCKY_NUMBER:', '').trim();
      } else if (cleanLine.startsWith('LUCKY_COLOR:')) {
        sections.luckyColor = cleanLine.replace('LUCKY_COLOR:', '').trim();
      } else if (cleanLine.startsWith('SPIRITUAL:')) {
        sections.spiritual = cleanLine.replace('SPIRITUAL:', '').trim();
      }
    });

    return sections;
  };

  const renderAnalyticsCard = () => {
    if (!analyticsData) return null;

    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 rounded-2xl p-6 shadow-2xl backdrop-blur-lg">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-6 h-6 text-cyan-400 mr-3" />
          <h3 className="text-xl font-bold text-white">Celestial Analytics</h3>
          <div className="ml-auto flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTrendColor(analyticsData.trend)}`}>
              {getTrendIcon(analyticsData.trend)}
              {analyticsData.trend === 'up' ? 'Ascending' : 'Descending'}
            </span>
          </div>
        </div>

        {/* Overall Score */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80">Cosmic Score</span>
            <span className="text-2xl font-bold text-yellow-400">{analyticsData.score}/100</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${analyticsData.score}%` }}
            />
          </div>
        </div>

        {/* Aspect Scores */}
        {analyticsData.aspectData && (
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Life Aspects</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {analyticsData.aspectData.map((aspect, index) => (
                <div key={index} className="bg-black/30 rounded-xl p-3 border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white/80 text-sm">{aspect.aspect}</span>
                    <span className="text-white font-bold text-sm">{aspect.score}/100</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full"
                      style={{ width: `${aspect.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Element Distribution */}
        {analyticsData.elementDistribution && (
          <div>
            <h4 className="text-white font-medium mb-3 flex items-center">
              <PieChart className="w-4 h-4 mr-2" />
              Element Balance
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {analyticsData.elementDistribution.map((element, index) => (
                <div key={index} className="text-center">
                  <div className="rounded-lg p-3 mb-1" style={{ backgroundColor: element.color + '40' }}>
                    <div className="text-lg font-bold" style={{ color: element.color }}>
                      {element.value}%
                    </div>
                  </div>
                  <span className="text-white/80 text-xs">{element.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLuckyElements = () => {
    if (!analyticsData || !analyticsData.luckyElements) return null;

    return (
      <div className="grid grid-cols-2 gap-4 mb-6">
        {analyticsData.luckyElements.map((element, index) => (
          <div key={index} className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              {index === 0 && <Star className="w-4 h-4 text-yellow-400 mr-2" />}
              {index === 1 && <Palette className="w-4 h-4 text-orange-400 mr-2" />}
              {index === 2 && <Calendar className="w-4 h-4 text-green-400 mr-2" />}
              {index === 3 && <Timer className="w-4 h-4 text-cyan-400 mr-2" />}
              <span className="text-white/80 text-sm font-medium">{element.type}</span>
            </div>
            <p className="text-white font-bold text-lg">{element.value}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderHoroscopeSection = (title, content, icon, color = 'orange') => {
    if (!content) return null;

    const colorConfig = {
      orange: { bg: 'bg-gradient-to-r from-orange-50 to-amber-50', border: 'border-orange-300', iconBg: 'from-orange-500 to-amber-500' },
      pink: { bg: 'bg-gradient-to-r from-pink-50 to-rose-50', border: 'border-pink-300', iconBg: 'from-pink-500 to-rose-500' },
      blue: { bg: 'bg-gradient-to-r from-blue-50 to-cyan-50', border: 'border-blue-300', iconBg: 'from-blue-500 to-cyan-500' },
      green: { bg: 'bg-gradient-to-r from-green-50 to-emerald-50', border: 'border-green-300', iconBg: 'from-green-500 to-emerald-500' },
      purple: { bg: 'bg-gradient-to-r from-purple-50 to-violet-50', border: 'border-purple-300', iconBg: 'from-purple-500 to-violet-500' }
    };

    const config = colorConfig[color] || colorConfig.orange;

    return (
      <div className={`rounded-2xl p-4 sm:p-6 border-l-4 ${config.border} ${config.bg} shadow-lg backdrop-blur-sm`}>
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${config.iconBg} shadow-lg flex-shrink-0`}>
            {React.cloneElement(icon, { className: `w-4 h-4 sm:w-6 sm:h-6 text-white` })}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">{title}</h4>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    );
  };

  const horoscopeSections = horoscope ? parseHoroscopeContent(horoscope) : {};
  const currentRashi = wheelItems[currentIndex];

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-4 sm:py-8 px-3 sm:px-4 relative overflow-hidden pb-20">
      {/* Animated Background Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transition: particle.fade ? 'all 0.5s ease-out' : 'none'
          }}
        />
      ))}

      {/* Stars Background */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: window.innerWidth < 768 ? 25 : 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-300 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-8xl mx-auto relative z-10 h-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12 px-2">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
            <Sparkle className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400 animate-spin" />
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Cosmic Rashi Wheel
            </h1>
            <Sparkle className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400 animate-spin" />
          </div>
          <p className="text-sm sm:text-xl text-blue-200 font-light px-2">Spin the celestial wheel to unveil your cosmic destiny</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 h-full min-h-[110vh]">
          {/* Rashi Wheel - Left Side - Fixed Height */}
          <div className="lg:col-span-5 h-[110vh]">
            <div className="bg-black/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl relative overflow-hidden h-full flex flex-col min-h-[600px]">
              {/* Cosmic Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl sm:rounded-3xl" />

              {/* Wheel Controls */}
              <div className="flex justify-center items-center mb-4 sm:mb-6 lg:mb-8 space-x-4 sm:space-x-6">
                <button
                  onClick={() => rotateWheel('prev')}
                  className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl sm:rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-2xl transform hover:scale-110 border border-white/20"
                  aria-label="Previous Rashi"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>

                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-xl sm:rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-2xl transform hover:scale-110 border border-white/20"
                  aria-label={isAutoRotating ? "Pause Rotation" : "Play Rotation"}
                >
                  {isAutoRotating ?
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" /> :
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  }
                </button>

                <button
                  onClick={() => rotateWheel('next')}
                  className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl sm:rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-2xl transform hover:scale-110 border border-white/20"
                  aria-label="Next Rashi"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
              </div>

              {/* Rashi Wheel - Fixed Height Container */}
              <div className="relative flex-1 flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
                <div className="w-full h-full max-w-md max-h-md flex items-center justify-center">
                  {/* Outer Glow */}
                  <div className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />

                  {/* Wheel Container */}
                  <div
                    className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 transition-transform duration-1000 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Orbital Rings */}
                    <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
                    <div className="absolute inset-4 sm:inset-6 lg:inset-8 border border-white/5 rounded-full" />
                    <div className="absolute inset-8 sm:inset-12 lg:inset-16 border border-white/5 rounded-full" />

                    {/* Center Cosmic Circle */}
                    <div className={`absolute inset-12 sm:inset-16 lg:inset-20 bg-gradient-to-br ${currentRashi?.color} rounded-full shadow-2xl border-4 border-white/30 flex items-center justify-center backdrop-blur-sm`}>
                      <div className="text-center text-white">
                        <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 drop-shadow-lg">{getRashiIcon(currentRashi?.en)}</div>
                        <div className="text-xs sm:text-sm font-bold drop-shadow-md">{currentRashi?.en}</div>
                        <div className="text-xs opacity-80 mt-1">{currentRashi?.element}</div>
                      </div>
                    </div>

                    {/* Wheel Items */}
                    {wheelItems.map((item, index) => {
                      const isActive = currentIndex === index;
                      const angleRad = (item.angle * Math.PI) / 180;
                      const radius = window.innerWidth < 640 ? 90 : window.innerWidth < 1024 ? 110 : 140;
                      const x = radius * Math.cos(angleRad);
                      const y = radius * Math.sin(angleRad);

                      return (
                        <div
                          key={item.en}
                          className={`absolute transition-all duration-500 cursor-pointer ${isActive ? 'scale-125 z-10' : 'scale-100 opacity-80 hover:scale-110'
                            }`}
                          style={{
                            width: window.innerWidth < 640 ? '4rem' : window.innerWidth < 1024 ? '5rem' : '6rem',
                            height: window.innerWidth < 640 ? '4rem' : window.innerWidth < 1024 ? '5rem' : '6rem',
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          onClick={() => selectRashi(item.en, index)}
                        >
                          <div className={`w-full h-full rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 shadow-2xl ${isActive
                            ? `bg-gradient-to-br ${item.color} border-white/50 shadow-glow`
                            : 'bg-black/40 border-white/20 hover:border-white/40'
                            }`}>
                            <div className="flex flex-col items-center justify-center h-full p-1 sm:p-2">
                              <div className={`text-lg sm:text-xl lg:text-2xl ${isActive ? 'text-white drop-shadow-lg' : 'text-white/80'}`}>
                                {getRashiIcon(item.en)}
                              </div>
                              <div className={`text-xs font-bold mt-1 text-center ${isActive ? 'text-white drop-shadow-md' : 'text-white/70'}`}>
                                {item.en}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Current Rashi Info */}
              <div className="text-center bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 mt-auto">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">{currentRashi?.en}</h3>
                <p className="text-blue-200 text-sm mb-1">{currentRashi?.hi}</p>
                <p className="text-orange-300 text-xs sm:text-sm font-medium mb-2">{currentRashi?.dates}</p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-white/80 mb-3 sm:mb-4">
                  <span>Element: {currentRashi?.element}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Ruling: {getRashiPlanet(currentRashi?.en)}</span>
                </div>

                <button
                  onClick={() => selectRashi(currentRashi.en, currentIndex)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 hover:from-orange-600 hover:to-pink-600 shadow-2xl hover:shadow-glow transform hover:scale-105 border border-white/20 text-sm sm:text-base"
                >
                  🌟 Select {currentRashi?.en}
                </button>
              </div>
            </div>
          </div>

          {/* Horoscope Content - Right Side - Fixed Height with Scroll */}
          <div className="lg:col-span-7 h-[110vh]" ref={rightSectionRef}>
            <div className="bg-black/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden h-full flex flex-col min-h-[600px]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl sm:rounded-3xl" />
              </div>

              {/* Header - Fixed at Top */}
              <div className="text-center p-4 sm:p-6 lg:p-8 border-b border-white/20 relative z-10 bg-black/20 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-2xl border border-white/20">
                  <Calendar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  {selectedRashi ? `${selectedRashi} Daily Horoscope` : 'Cosmic Insights'}
                </h2>
                <p className="text-blue-200 text-sm sm:text-lg">Powered by Gemini AI • Real-time Analytics</p>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-hidden relative">
                {!selectedRashi ? (
                  <div className="content-container h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12 lg:py-16">
                      <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-float">🌌</div>
                      <p className="text-lg sm:text-xl lg:text-2xl text-white mb-3 sm:mb-4 text-center">Awaiting Your Cosmic Selection</p>
                      <p className="text-blue-200 text-sm sm:text-lg text-center">Spin the wheel and choose your celestial path</p>

                      <div className="mt-4 sm:mt-6 flex justify-center space-x-3 sm:space-x-4">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
                        <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 animate-pulse" />
                        <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="content-container h-full overflow-y-auto">
                    <div className="flex flex-col p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                      {/* Generate Button */}
                      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <button
                          onClick={fetchHoroscope}
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-glow transform hover:scale-[1.02] border border-white/20"
                        >
                          {loading ? (
                            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 border-b-2 border-white"></div>
                              <span className="text-xs sm:text-sm lg:text-base">Channeling Cosmic Energy...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                              <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                              <span className="text-xs sm:text-sm lg:text-base">Generate Celestial Horoscope</span>
                              <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                            </div>
                          )}
                        </button>

                        {horoscope && (
                          <button
                            onClick={fetchHoroscope}
                            disabled={loading}
                            className="px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl border border-white/20"
                            title="Reconnect with Cosmos"
                          >
                            <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${loading ? 'animate-spin' : ''}`} />
                          </button>
                        )}
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-300/50 rounded-xl p-4 backdrop-blur-lg">
                          <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                            <p className="text-white">{error}</p>
                          </div>
                        </div>
                      )}

                      {/* Generation Status */}
                      {loading && generationStatus && (
                        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-lg">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                            <div className="flex items-center">
                              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mr-2 sm:mr-3 animate-pulse" />
                              <span className="text-white font-bold text-sm sm:text-base lg:text-lg">Cosmic Computation</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                              <span className="text-cyan-300 text-sm sm:text-base lg:text-lg font-mono font-bold">
                                {formatTime(generationTime)}
                              </span>
                            </div>
                          </div>

                          <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
                            <div
                              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-300 ease-out shadow-glow"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0">
                            <p className="text-cyan-200 text-xs sm:text-sm font-medium">{generationStatus}</p>
                            <p className="text-white text-xs sm:text-sm">
                              <span className="font-mono font-bold">{progress}%</span> Complete
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Horoscope Display */}
                      {horoscope && (
                        <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                          {/* Daily Insight */}
                          {dailyInsight && (
                            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 rounded-2xl p-6 shadow-2xl backdrop-blur-lg">
                              <div className="flex items-center mb-4">
                                <Sparkles className="w-6 h-6 text-purple-400 mr-3" />
                                <h3 className="text-xl font-bold text-white">Daily Celestial Insight</h3>
                              </div>
                              <p className="text-white leading-relaxed text-lg">{dailyInsight.horoscope}</p>
                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                                <span className="text-white/60 text-sm">{dailyInsight.date}</span>
                                <span className="text-green-300 text-sm font-medium">
                                  {dailyInsight.source === 'gemini-api' ? '✨ AI-Generated' : '⭐ Cosmic Fallback'}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Analytics Section */}
                          {analyticsData && renderAnalyticsCard()}

                          {/* Lucky Elements */}
                          {renderLuckyElements()}

                          {/* Horoscope Sections */}
                          <div className="grid gap-4 sm:gap-6">
                            {renderHoroscopeSection('Cosmic Forecast', horoscopeSections.general, <Sparkles />, 'purple')}
                            {renderHoroscopeSection('Love & Relationships', horoscopeSections.love, <Heart />, 'pink')}
                            {renderHoroscopeSection('Career & Finance', horoscopeSections.career, <Briefcase />, 'blue')}
                            {renderHoroscopeSection('Health & Wellness', horoscopeSections.health, <Activity />, 'green')}
                            {renderHoroscopeSection('Spiritual Journey', horoscopeSections.spiritual, <Sparkles />, 'orange')}
                          </div>

                          <div className="text-center pt-4 sm:pt-6 border-t border-white/20 pb-8">
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
                              <p className="text-cyan-300 text-xs sm:text-sm font-medium">
                                ✨ Generated via Gemini 3 AI in {formatTime(generationTime)}
                              </p>
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${analyticsData?.source === 'gemini-api' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                                <span className="text-white/60 text-xs">
                                  {analyticsData?.source === 'gemini-api' ? 'Live AI Analysis' : 'Cosmic Fallback Data'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {!horoscope && !loading && (
                        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                          <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 animate-float">🔮</div>
                          <p className="text-lg sm:text-xl lg:text-2xl text-white mb-3 sm:mb-4 text-center">Ready for Celestial Revelations?</p>
                          <p className="text-blue-200 text-sm sm:text-lg text-center">
                            Unveil the cosmic secrets destined for {selectedRashi} today
                          </p>
                          <div className="mt-6 flex flex-col items-center">
                            <p className="text-white/60 text-sm mb-3">Powered by Gemini 3 AI</p>
                            <div className="flex space-x-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                              </div>
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Cpu className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations and scrollbar */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }
        
        /* Custom scrollbar for content container */
        .content-container {
          scroll-behavior: smooth;
        }
        
        .content-container::-webkit-scrollbar {
          width: 8px;
        }
        
        .content-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        
        .content-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #3b82f6);
          border-radius: 4px;
        }
        
        .content-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #2563eb);
        }
        
        /* Mobile-first responsive design */
        @media (max-width: 640px) {
          .shadow-glow {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
          }
          .content-container::-webkit-scrollbar {
            width: 6px;
          }
        }
        
        /* Ultra-small devices (280px and below) */
        @media (max-width: 280px) {
          .min-h-screen {
            min-height: 100vh;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RashiWheelHoroscope;