import React, { useState } from 'react';
import { calculateRashi } from '../../utils/astrologyCalculations';
import { generateRashiAnalysis } from '../../utils/geminiClient';
import { User, Clock, MapPin, Calendar, Star, Sparkles, Moon, Sun, Zap, Target, Heart, Crown, Shield, Eye, Cpu, Orbit, Satellite } from 'lucide-react';

const RashiFinder = () => {
  const [formData, setFormData] = useState({
    name: '',
    day: '',
    month: '',
    year: '',
    time: '',
    place: ''
  });
  const [calculatedRashi, setCalculatedRashi] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingProgress(0);
    setAiAnalysis(null);
    
    // Step 1: Calculate basic Rashi
    setCurrentStep('Calculating planetary positions...');
    setLoadingProgress(20);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const rashi = calculateRashi(parseInt(formData.month), parseInt(formData.day));
    setCalculatedRashi(rashi);
    
    // Step 2: Generate AI analysis
    setCurrentStep('Consulting cosmic intelligence...');
    setLoadingProgress(50);
    
    try {
      const analysis = await generateRashiAnalysis(rashi.en, formData);
      setAiAnalysis(parseAiAnalysis(analysis));
      setLoadingProgress(100);
      
      // Final success state
      setCurrentStep('Cosmic analysis complete!');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('AI analysis failed:', error);
      setCurrentStep('Cosmic connection failed - using traditional wisdom');
      setLoadingProgress(100);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsLoading(false);
    setLoadingProgress(0);
    setCurrentStep('');
  };

  const parseAiAnalysis = (analysisText) => {
    const sections = {
      strengths: '',
      challenges: '',
      careerPaths: '',
      relationshipStyle: '',
      spiritualGuidance: ''
    };

    // Split by markdown headers and bold text patterns
    const lines = analysisText.split('\n');
    let currentSection = '';

    lines.forEach(line => {
      const cleanLine = line.trim();
      
      // Check for markdown headers (##, ###) and bold text patterns
      if (cleanLine.match(/^##?\s+(STRENGTHS|STRENGTH)/i)) {
        currentSection = 'strengths';
        sections.strengths = cleanLine.replace(/^##?\s+(STRENGTHS|STRENGTH)[:\s]*/i, '').trim();
      } else if (cleanLine.match(/^##?\s+(CHALLENGES|WEAKNESSES|GROWTH)/i)) {
        currentSection = 'challenges';
        sections.challenges = cleanLine.replace(/^##?\s+(CHALLENGES|WEAKNESSES|GROWTH)[:\s]*/i, '').trim();
      } else if (cleanLine.match(/^##?\s+(CAREER|CAREER_PATHS|DHARMA|PROFESSION)/i)) {
        currentSection = 'careerPaths';
        sections.careerPaths = cleanLine.replace(/^##?\s+(CAREER|CAREER_PATHS|DHARMA|PROFESSION)[:\s]*/i, '').trim();
      } else if (cleanLine.match(/^##?\s+(RELATIONSHIP|LOVE|PARTNERSHIP)/i)) {
        currentSection = 'relationshipStyle';
        sections.relationshipStyle = cleanLine.replace(/^##?\s+(RELATIONSHIP|LOVE|PARTNERSHIP)[:\s]*/i, '').trim();
      } else if (cleanLine.match(/^##?\s+(SPIRITUAL|GUIDANCE|SPIRITUAL_GUIDANCE)/i)) {
        currentSection = 'spiritualGuidance';
        sections.spiritualGuidance = cleanLine.replace(/^##?\s+(SPIRITUAL|GUIDANCE|SPIRITUAL_GUIDANCE)[:\s]*/i, '').trim();
      } 
      // Check for bold text patterns (**text**)
      else if (cleanLine.match(/\*\*(STRENGTHS|STRENGTH)\*\*/i)) {
        currentSection = 'strengths';
        sections.strengths = cleanLine.replace(/\*\*(STRENGTHS|STRENGTH)\*\*[:\s]*/i, '').trim();
      } else if (cleanLine.match(/\*\*(CHALLENGES|WEAKNESSES|GROWTH)\*\*/i)) {
        currentSection = 'challenges';
        sections.challenges = cleanLine.replace(/\*\*(CHALLENGES|WEAKNESSES|GROWTH)\*\*[:\s]*/i, '').trim();
      } else if (cleanLine.match(/\*\*(CAREER|CAREER_PATHS|DHARMA|PROFESSION)\*\*/i)) {
        currentSection = 'careerPaths';
        sections.careerPaths = cleanLine.replace(/\*\*(CAREER|CAREER_PATHS|DHARMA|PROFESSION)\*\*[:\s]*/i, '').trim();
      } else if (cleanLine.match(/\*\*(RELATIONSHIP|LOVE|PARTNERSHIP)\*\*/i)) {
        currentSection = 'relationshipStyle';
        sections.relationshipStyle = cleanLine.replace(/\*\*(RELATIONSHIP|LOVE|PARTNERSHIP)\*\*[:\s]*/i, '').trim();
      } else if (cleanLine.match(/\*\*(SPIRITUAL|GUIDANCE|SPIRITUAL_GUIDANCE)\*\*/i)) {
        currentSection = 'spiritualGuidance';
        sections.spiritualGuidance = cleanLine.replace(/\*\*(SPIRITUAL|GUIDANCE|SPIRITUAL_GUIDANCE)\*\*[:\s]*/i, '').trim();
      }
      // Handle content lines
      else if (currentSection && cleanLine && !cleanLine.match(/^[#*\-]/)) {
        // Append to current section with proper spacing
        if (sections[currentSection]) {
          sections[currentSection] += ' ' + cleanLine;
        } else {
          sections[currentSection] = cleanLine;
        }
      }
    });

    // Clean up each section - remove extra spaces and markdown formatting
    Object.keys(sections).forEach(key => {
      sections[key] = sections[key]
        .replace(/\*\*/g, '') // Remove bold markers
        .replace(/\*/g, '')   // Remove italic markers
        .replace(/#/g, '')    // Remove header markers
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
      
      // Capitalize first letter
      if (sections[key]) {
        sections[key] = sections[key].charAt(0).toUpperCase() + sections[key].slice(1);
      }
    });

    return sections;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  const getRashiTraits = (rashiName) => {
    const traits = {
      'Aries': { 
        element: '🔥 Fire', 
        quality: 'Cardinal', 
        planet: 'Mars', 
        traits: ['Courageous', 'Energetic', 'Pioneering', 'Adventurous', 'Confident'] 
      },
      'Taurus': { 
        element: '🌍 Earth', 
        quality: 'Fixed', 
        planet: 'Venus', 
        traits: ['Reliable', 'Patient', 'Sensual', 'Practical', 'Artistic'] 
      },
      'Gemini': { 
        element: '💨 Air', 
        quality: 'Mutable', 
        planet: 'Mercury', 
        traits: ['Adaptable', 'Curious', 'Communicative', 'Witty', 'Versatile'] 
      },
      'Cancer': { 
        element: '💧 Water', 
        quality: 'Cardinal', 
        planet: 'Moon', 
        traits: ['Nurturing', 'Intuitive', 'Protective', 'Emotional', 'Compassionate'] 
      },
      'Leo': { 
        element: '🔥 Fire', 
        quality: 'Fixed', 
        planet: 'Sun', 
        traits: ['Confident', 'Generous', 'Creative', 'Passionate', 'Leadership'] 
      },
      'Virgo': { 
        element: '🌍 Earth', 
        quality: 'Mutable', 
        planet: 'Mercury', 
        traits: ['Analytical', 'Practical', 'Helpful', 'Organized', 'Detail-oriented'] 
      },
      'Libra': { 
        element: '💨 Air', 
        quality: 'Cardinal', 
        planet: 'Venus', 
        traits: ['Diplomatic', 'Harmonious', 'Social', 'Fair-minded', 'Artistic'] 
      },
      'Scorpio': { 
        element: '💧 Water', 
        quality: 'Fixed', 
        planet: 'Mars/Pluto', 
        traits: ['Passionate', 'Intense', 'Transformative', 'Loyal', 'Perceptive'] 
      },
      'Sagittarius': { 
        element: '🔥 Fire', 
        quality: 'Mutable', 
        planet: 'Jupiter', 
        traits: ['Optimistic', 'Adventurous', 'Philosophical', 'Honest', 'Freedom-loving'] 
      },
      'Capricorn': { 
        element: '🌍 Earth', 
        quality: 'Cardinal', 
        planet: 'Saturn', 
        traits: ['Ambitious', 'Disciplined', 'Responsible', 'Patient', 'Strategic'] 
      },
      'Aquarius': { 
        element: '💨 Air', 
        quality: 'Fixed', 
        planet: 'Saturn/Uranus', 
        traits: ['Innovative', 'Humanitarian', 'Independent', 'Intellectual', 'Visionary'] 
      },
      'Pisces': { 
        element: '💧 Water', 
        quality: 'Mutable', 
        planet: 'Jupiter/Neptune', 
        traits: ['Compassionate', 'Imaginative', 'Spiritual', 'Artistic', 'Empathetic'] 
      }
    };
    return traits[rashiName] || { element: '⭐', quality: 'Unknown', planet: 'Unknown', traits: [] };
  };

  const resetForm = () => {
    setFormData({
      name: '',
      day: '',
      month: '',
      year: '',
      time: '',
      place: ''
    });
    setCalculatedRashi(null);
    setAiAnalysis(null);
  };

  const rashiTraits = calculatedRashi ? getRashiTraits(calculatedRashi.en) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="w-full mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Cosmic Rashi Finder
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
          <p className="text-xl text-blue-200 font-light">AI-Powered Vedic Astrology Analysis</p>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-100 flex items-center justify-center">
            <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-2xl text-center max-w-md mx-4">
              {/* Animated Orbital System */}
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin">
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute inset-4 rounded-full border-2 border-blue-500/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute inset-8 rounded-full border-2 border-green-500/30 animate-spin" style={{ animationDuration: '4s' }}>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-yellow-400 animate-pulse" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Cosmic Analysis in Progress</h3>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out shadow-glow"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              
              <p className="text-cyan-200 text-lg mb-2">{currentStep}</p>
              <p className="text-white/70 text-sm">Consulting planetary positions and cosmic intelligence</p>
              
              <div className="flex justify-center space-x-3 mt-6">
                <Satellite className="w-5 h-5 text-blue-400 animate-bounce" />
                <Orbit className="w-5 h-5 text-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <Sparkles className="w-5 h-5 text-yellow-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        <div className="grid  gap-8">
          {/* Form Section */}
          <div className="lg:col-span-7">
            <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl" />
              
              <div className="text-center mb-8 relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl mb-4 shadow-2xl border border-white/20">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Discover Your Rashi</h2>
                <p className="text-blue-200">Enter your birth details for AI-powered cosmic analysis</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label className="block text-white mb-3 font-semibold text-lg">
                      <User className="w-5 h-5 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-white mb-3 font-semibold text-lg">
                      <Calendar className="w-5 h-5 inline mr-2" />
                      Birth Date
                    </label>
                    <input
                      type="number"
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                      min="1"
                      max="31"
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="Day"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-3 font-semibold text-lg">
                      <Calendar className="w-5 h-5 inline mr-2" />
                      Birth Month
                    </label>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    >
                      <option value="" className="bg-gray-800">Select Month</option>
                      <option value="1" className="bg-gray-800">January</option>
                      <option value="2" className="bg-gray-800">February</option>
                      <option value="3" className="bg-gray-800">March</option>
                      <option value="4" className="bg-gray-800">April</option>
                      <option value="5" className="bg-gray-800">May</option>
                      <option value="6" className="bg-gray-800">June</option>
                      <option value="7" className="bg-gray-800">July</option>
                      <option value="8" className="bg-gray-800">August</option>
                      <option value="9" className="bg-gray-800">September</option>
                      <option value="10" className="bg-gray-800">October</option>
                      <option value="11" className="bg-gray-800">November</option>
                      <option value="12" className="bg-gray-800">December</option>
                    </select>
                  </div>

                  {/* Birth Time */}
                  <div>
                    <label className="block text-white mb-3 font-semibold text-lg">
                      <Clock className="w-5 h-5 inline mr-2" />
                      Birth Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    />
                  </div>

                  {/* Birth Year */}
                  <div>
                    <label className="block text-white mb-3 font-semibold text-lg">
                      <Calendar className="w-5 h-5 inline mr-2" />
                      Birth Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      min="1900"
                      max="2024"
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="Year"
                    />
                  </div>

                  {/* Birth Place */}
                  <div className="md:col-span-2">
                    <label className="block text-white mb-3 font-semibold text-lg">
                      <MapPin className="w-5 h-5 inline mr-2" />
                      Birth Place
                    </label>
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.day || !formData.month}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-glow transform hover:scale-[1.02] border border-white/20"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Cosmic Analysis...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Sparkles className="w-6 h-6" />
                      <span>Analyze My Cosmic Blueprint</span>
                      <Sparkles className="w-6 h-6" />
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-7">
            {calculatedRashi ? (
              <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl" />
                
                <div className="text-center relative z-10">
                  {/* Rashi Icon */}
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl mb-6 shadow-2xl border border-white/20">
                    <div className="text-5xl text-white drop-shadow-lg">
                      {getRashiIcon(calculatedRashi.en)}
                    </div>
                  </div>

                  {/* Rashi Name */}
                  <h3 className="text-4xl font-bold text-white mb-2">
                    {calculatedRashi.en}
                  </h3>
                  <p className="text-blue-200 text-xl mb-1 font-medium">{calculatedRashi.hi}</p>
                  <p className="text-orange-300 text-lg mb-6">{calculatedRashi.dates}</p>

                  {/* AI Analysis Badge */}
                  {aiAnalysis && (
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-3 mb-6 border border-purple-400/30">
                      <div className="flex items-center justify-center space-x-2">
                        <Cpu className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-200 text-sm font-semibold">AI-Powered Cosmic Analysis</span>
                      </div>
                    </div>
                  )}

                  {/* Astrological Info */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
                    <h4 className="text-white text-lg font-bold mb-4 flex items-center justify-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-400" />
                      Astrological Profile
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-yellow-400 font-semibold">Element</div>
                        <div className="text-white">{rashiTraits.element}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 font-semibold">Quality</div>
                        <div className="text-white">{rashiTraits.quality}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 font-semibold">Ruling Planet</div>
                        <div className="text-white">{rashiTraits.planet}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 font-semibold">Symbol</div>
                        <div className="text-white">{calculatedRashi.symbol}</div>
                      </div>
                    </div>
                  </div>

                  {/* AI Personality Analysis */}
                  {aiAnalysis && (
                    <div className="space-y-4 mb-6">
                      {aiAnalysis.strengths && (
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-400/20">
                          <h4 className="text-green-300 font-bold mb-2 flex items-center">
                            <Crown className="w-4 h-4 mr-2" />
                            Cosmic Strengths
                          </h4>
                          <p className="text-white text-sm leading-relaxed">{aiAnalysis.strengths}</p>
                        </div>
                      )}
                      
                      {aiAnalysis.challenges && (
                        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-4 border border-orange-400/20">
                          <h4 className="text-orange-300 font-bold mb-2 flex items-center">
                            <Shield className="w-4 h-4 mr-2" />
                            Growth Opportunities
                          </h4>
                          <p className="text-white text-sm leading-relaxed">{aiAnalysis.challenges}</p>
                        </div>
                      )}
                      
                      {aiAnalysis.careerPaths && (
                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-400/20">
                          <h4 className="text-blue-300 font-bold mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2" />
                            Dharma Path
                          </h4>
                          <p className="text-white text-sm leading-relaxed">{aiAnalysis.careerPaths}</p>
                        </div>
                      )}
                      
                      {aiAnalysis.relationshipStyle && (
                        <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-4 border border-pink-400/20">
                          <h4 className="text-pink-300 font-bold mb-2 flex items-center">
                            <Heart className="w-4 h-4 mr-2" />
                            Relationship Style
                          </h4>
                          <p className="text-white text-sm leading-relaxed">{aiAnalysis.relationshipStyle}</p>
                        </div>
                      )}
                      
                      {aiAnalysis.spiritualGuidance && (
                        <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl p-4 border border-purple-400/20">
                          <h4 className="text-purple-300 font-bold mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Spiritual Guidance
                          </h4>
                          <p className="text-white text-sm leading-relaxed">{aiAnalysis.spiritualGuidance}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Personality Traits */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
                    <h4 className="text-white text-lg font-bold mb-4 flex items-center justify-center">
                      <Heart className="w-5 h-5 mr-2 text-pink-400" />
                      Key Traits
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {rashiTraits.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white px-3 py-2 rounded-xl text-sm border border-white/10 backdrop-blur-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold transition-all duration-300 hover:from-blue-600 hover:to-purple-600 shadow-lg border border-white/20"
                    >
                      Find Another
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-bold transition-all duration-300 hover:from-orange-600 hover:to-pink-600 shadow-lg border border-white/20">
                      Get Horoscope
                    </button>
                  </div>

                  {/* Disclaimer */}
                  <div className="mt-6 bg-yellow-500/20 backdrop-blur-lg rounded-xl p-4 border border-yellow-400/30">
                    <p className="text-yellow-200 text-sm text-center">
                      <Eye className="w-4 h-4 inline mr-1" />
                      {aiAnalysis ? 
                        'AI-powered insights based on Vedic astrology. For precise moon sign calculation, consult a professional astrologer.' :
                        'This is a simplified sun sign calculation. For accurate moon sign (Rashi), consult a professional Vedic astrologer.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center h-full flex items-center justify-center">
                <div>
                  <div className="text-6xl mb-4 animate-float">🌌</div>
                  <h3 className="text-2xl text-white mb-2">Awaiting Your Stars</h3>
                  <p className="text-blue-200">Enter your birth details for AI-powered cosmic analysis</p>
                  <div className="mt-4 flex justify-center space-x-3">
                    <Moon className="w-6 h-6 text-blue-400 animate-pulse" />
                    <Sun className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <Star className="w-6 h-6 text-white animate-pulse" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .shadow-glow {
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  );
};

export default RashiFinder;