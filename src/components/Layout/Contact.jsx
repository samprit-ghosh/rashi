// HoroscopeAnalytics.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, 
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { 
  Activity, TrendingUp, BarChart2, PieChart as PieChartIcon, 
  Target, Palette, Star, Zap, Heart, Briefcase, Users, 
  Calendar, Clock, RefreshCw, Download, Share2, Filter 
} from 'lucide-react';

const HoroscopeAnalytics = () => {
  const [selectedRashi, setSelectedRashi] = useState('Aries');
  const [timeRange, setTimeRange] = useState('weekly');
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample data for charts (in real app, this would come from API)
  const rashiOptions = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  // Pie Chart Data - Element Distribution
  const elementData = [
    { name: 'Fire', value: 35, color: '#FF6B6B' },
    { name: 'Earth', value: 25, color: '#4ECDC4' },
    { name: 'Air', value: 20, color: '#45B7D1' },
    { name: 'Water', value: 20, color: '#96CEB4' },
  ];

  // Bar Chart Data - Daily Trends
  const dailyTrendData = [
    { day: 'Mon', love: 75, career: 65, health: 80, finance: 70 },
    { day: 'Tue', love: 80, career: 70, health: 75, finance: 65 },
    { day: 'Wed', love: 65, career: 85, health: 70, finance: 80 },
    { day: 'Thu', love: 90, career: 75, health: 85, finance: 70 },
    { day: 'Fri', love: 85, career: 80, health: 75, finance: 90 },
    { day: 'Sat', love: 70, career: 90, health: 80, finance: 85 },
    { day: 'Sun', love: 95, career: 70, health: 90, finance: 75 },
  ];

  // Radar Chart Data - Aspect Analysis
  const radarData = [
    { aspect: 'Love', score: 85, fullMark: 100 },
    { aspect: 'Career', score: 78, fullMark: 100 },
    { aspect: 'Health', score: 90, fullMark: 100 },
    { aspect: 'Finance', score: 72, fullMark: 100 },
    { aspect: 'Spiritual', score: 88, fullMark: 100 },
    { aspect: 'Social', score: 82, fullMark: 100 },
  ];

  // Line Chart Data - Monthly Progress
  const monthlyProgressData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 68 },
    { month: 'Apr', score: 80 },
    { month: 'May', score: 78 },
    { month: 'Jun', score: 85 },
    { month: 'Jul', score: 82 },
    { month: 'Aug', score: 90 },
    { month: 'Sep', score: 88 },
    { month: 'Oct', score: 85 },
    { month: 'Nov', score: 92 },
    { month: 'Dec', score: 95 },
  ];

  // Stats Overview
  const stats = [
    { label: 'Overall Score', value: '88%', icon: <Star className="w-5 h-5" />, color: 'from-yellow-500 to-orange-500' },
    { label: 'Daily Change', value: '+5.2%', icon: <TrendingUp className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
    { label: 'Peak Aspect', value: 'Health', icon: <Activity className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Improvement', value: '12 days', icon: <Zap className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
  ];

  // Lucky Elements
  const luckyElements = [
    { type: 'Number', value: '7', icon: <Target className="w-6 h-6" />, color: 'bg-gradient-to-br from-yellow-500 to-orange-500' },
    { type: 'Color', value: 'Royal Blue', icon: <Palette className="w-6 h-6" />, color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { type: 'Day', value: 'Friday', icon: <Calendar className="w-6 h-6" />, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { type: 'Time', value: '2-4 PM', icon: <Clock className="w-6 h-6" />, color: 'bg-gradient-to-br from-green-500 to-emerald-500' },
  ];

  // Category Breakdown
  const categoryData = [
    { category: 'Love & Relationships', value: 85, color: '#FF6B6B', icon: <Heart className="w-4 h-4" /> },
    { category: 'Career & Finance', value: 78, color: '#4ECDC4', icon: <Briefcase className="w-4 h-4" /> },
    { category: 'Health & Wellness', value: 90, color: '#96CEB4', icon: <Activity className="w-4 h-4" /> },
    { category: 'Social Life', value: 82, color: '#FFD166', icon: <Users className="w-4 h-4" /> },
    { category: 'Spiritual Growth', value: 88, color: '#A882DD', icon: <Star className="w-4 h-4" /> },
  ];

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-xl">
          <p className="text-white font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}%</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleExport = () => {
    // Export functionality
    console.log('Exporting analytics data...');
  };

  const handleShare = () => {
    // Share functionality
    console.log('Sharing analytics...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-6 sm:py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20" />
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <BarChart2 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cosmic Analytics Dashboard
            </h1>
            <PieChartIcon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
          </div>
          <p className="text-sm sm:text-xl text-blue-200 font-light">Deep insights into your celestial journey</p>
        </div>

        {/* Controls Section */}
        <div className="mb-8 sm:mb-12 bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Rashi Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">Select Rashi</label>
              <select
                value={selectedRashi}
                onChange={(e) => setSelectedRashi(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                {rashiOptions.map((rashi) => (
                  <option key={rashi} value={rashi}>{rashi}</option>
                ))}
              </select>
            </div>

            {/* Time Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">Time Range</label>
              <div className="flex space-x-2">
                {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                        : 'bg-black/50 text-blue-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-2 flex items-end space-x-3">
              <button
                onClick={() => setIsLoading(!isLoading)}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold transition-all duration-300 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 shadow-lg flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Refreshing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    <span>Refresh Data</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleExport}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold transition-all duration-300 hover:from-blue-600 hover:to-purple-600 shadow-lg flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold transition-all duration-300 hover:from-pink-600 hover:to-rose-600 shadow-lg flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-white/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                  style={{ width: stat.value.includes('%') ? stat.value : '85%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Pie Chart - Element Distribution */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">Element Distribution</h3>
              <div className="p-2 bg-black/50 rounded-lg">
                <PieChartIcon className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={elementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {elementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart - Daily Trends */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">Weekly Trends</h3>
              <div className="p-2 bg-black/50 rounded-lg">
                <BarChart2 className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="love" fill="#FF6B6B" name="Love" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="career" fill="#4ECDC4" name="Career" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="health" fill="#96CEB4" name="Health" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="finance" fill="#FFD166" name="Finance" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart - Aspect Analysis */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">Aspect Analysis</h3>
              <div className="p-2 bg-black/50 rounded-lg">
                <Target className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="aspect" stroke="#9CA3AF" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" />
                  <Radar
                    name={selectedRashi}
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart - Monthly Progress */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white">Monthly Progress</h3>
              <div className="p-2 bg-black/50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Lucky Elements */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Today's Lucky Elements</h3>
            <div className="grid grid-cols-2 gap-4">
              {luckyElements.map((element, index) => (
                <div
                  key={index}
                  className="bg-black/50 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${element.color}`}>
                      <div className="text-white">
                        {element.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-200">{element.type}</div>
                      <div className="text-lg font-bold text-white">{element.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Category Breakdown</h3>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: category.color + '20' }}>
                        <div style={{ color: category.color }}>
                          {category.icon}
                        </div>
                      </div>
                      <span className="text-white font-medium">{category.category}</span>
                    </div>
                    <span className="text-white font-bold">{category.value}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${category.value}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-black/50 px-6 py-3 rounded-full border border-white/20">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-blue-200">Last Updated: Today at 14:30</span>
            <span className="text-white/40">•</span>
            <span className="text-green-400 font-medium">Data is live & updating</span>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #3b82f6);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default HoroscopeAnalytics;