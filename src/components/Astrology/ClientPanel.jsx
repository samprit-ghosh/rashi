import { useState, useEffect, useRef } from 'react';
import { Upload, Calendar, User, Mail, Phone, MapPin, FileText, Star, Clock, Shield, Sparkles, MessageCircle, Send, Paperclip, X, Download } from 'lucide-react';
import { useWebSocket } from './websocket-context';

// Mock user data (in real app, this would come from auth)
const mockUser = {
  id: 'user_' + Date.now(),
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  zodiac: 'Leo',
  status: 'active'
};

// Mock messages storage
const mockMessages = {
  'admin_1': [
    { id: 1, sender: 'user', text: 'Hello, I need guidance on my career.', timestamp: '2024-01-15T10:30:00Z' },
    { id: 2, sender: 'admin', text: 'Hello! I\'ve reviewed your Kundli. Your career prospects look promising this year.', timestamp: '2024-01-15T10:35:00Z' },
    { id: 3, sender: 'user', text: 'Thank you! When should I expect the detailed analysis?', timestamp: '2024-01-15T10:40:00Z' }
  ]
};

export default function ClientPanel() {
  const [uploadStep, setUploadStep] = useState(1);
  const [kundliFile, setKundliFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    email: '',
    phone: '',
    gender: '',
    concern: '',
    priority: 'medium',
    consent: false
  });
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState(mockMessages['admin_1'] || []);
  const [newMessage, setNewMessage] = useState('');
  const [activeAdmin, setActiveAdmin] = useState('admin_1');
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  
  const { socket, connected } = useWebSocket();
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock admin data
  const admins = [
    { id: 'admin_1', name: 'Astro Guru', role: 'Senior Astrologer', status: 'online', avatar: '🪐' },
    { id: 'admin_2', name: 'Cosmic Guide', role: 'Vedic Expert', status: 'online', avatar: '✨' },
    { id: 'admin_3', name: 'Star Reader', role: 'Numerology Specialist', status: 'offline', avatar: '⭐' }
  ];

  // Load documents from localStorage on mount
  useEffect(() => {
    const savedDocs = localStorage.getItem('client_documents');
    if (savedDocs) {
      setUploadedDocuments(JSON.parse(savedDocs));
    }

    // Load messages from localStorage
    const savedMessages = localStorage.getItem(`messages_${mockUser.id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem(`messages_${mockUser.id}`, JSON.stringify(messages));
  }, [messages]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDocument = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        status: 'pending',
        file: file
      };
      
      setKundliFile(file);
      setUploadedDocuments(prev => {
        const updated = [...prev, newDocument];
        localStorage.setItem('client_documents', JSON.stringify(updated));
        return updated;
      });
      setUploadStep(2);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ kundliFile, formData });
    setUploadStep(4);
    
    // Update document status
    if (kundliFile) {
      setUploadedDocuments(prev => 
        prev.map(doc => 
          doc.file === kundliFile ? { ...doc, status: 'submitted' } : doc
        )
      );
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
      adminId: activeAdmin
    };

    setMessages(prev => [...prev, message]);
    
    // Send via WebSocket
    if (socket && connected) {
      socket.emit('sendMessage', {
        ...message,
        senderId: mockUser.id,
        senderName: mockUser.name,
        receiverId: activeAdmin
      });
    }

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const zodiacSigns = [
    { name: 'Aries', icon: '♈', color: 'from-red-500 to-orange-500' },
    { name: 'Taurus', icon: '♉', color: 'from-green-500 to-emerald-500' },
    { name: 'Gemini', icon: '♊', color: 'from-yellow-500 to-amber-500' },
    { name: 'Cancer', icon: '♋', color: 'from-gray-500 to-slate-500' },
    { name: 'Leo', icon: '♌', color: 'from-orange-500 to-yellow-500' },
    { name: 'Virgo', icon: '♍', color: 'from-green-500 to-teal-500' },
    { name: 'Libra', icon: '♎', color: 'from-pink-500 to-rose-500' },
    { name: 'Scorpio', icon: '♏', color: 'from-red-500 to-pink-500' },
    { name: 'Sagittarius', icon: '♐', color: 'from-purple-500 to-indigo-500' },
    { name: 'Capricorn', icon: '♑', color: 'from-gray-700 to-gray-900' },
    { name: 'Aquarius', icon: '♒', color: 'from-blue-500 to-cyan-500' },
    { name: 'Pisces', icon: '♓', color: 'from-purple-500 to-violet-500' },
  ];

  const concernsList = [
    'Career Guidance',
    'Marriage & Relationships',
    'Financial Prosperity',
    'Health Issues',
    'Education & Studies',
    'Family Matters',
    'Business Decisions',
    'Spiritual Growth',
    'Travel & Migration',
    'Property Matters'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Chat Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Kundli Analysis & Guidance
            </h1>
            <p className="text-xl text-purple-200">
              Upload your birth chart for personalized astrological insights
            </p>
          </div>

          {/* Chat Toggle Button */}
          <button
            onClick={() => setShowChat(!showChat)}
            className="relative group px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat with Astrologer</span>
            {connected && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Section */}
          <div className="lg:col-span-2">
            {/* Client Info Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                    <span className="text-2xl">{zodiacSigns.find(z => z.name === mockUser.zodiac)?.icon || '⭐'}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{mockUser.name}</h3>
                    <p className="text-purple-300">{mockUser.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {mockUser.zodiac}
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-purple-300">Documents Uploaded</p>
                  <p className="text-3xl font-bold text-white">{uploadedDocuments.length}</p>
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
              {uploadStep === 1 && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mr-4">
                      <Upload className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Upload Your Kundli</h2>
                      <p className="text-purple-300">Supported formats: PDF, JPEG, PNG</p>
                    </div>
                  </div>

                  <div
                    className="border-3 border-dashed border-white/20 rounded-xl p-12 text-center transition-all duration-300 hover:border-purple-400 hover:bg-white/5 cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-900/30 to-cyan-900/30 flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Drop your Kundli file here</h3>
                    <p className="text-purple-300 mb-6">or click to browse files</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {uploadStep === 2 && (
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                      <p className="text-purple-300">Enter your birth details for accurate analysis</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Birth Date
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Birth Time
                      </label>
                      <input
                        type="time"
                        name="birthTime"
                        value={formData.birthTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Birth Place
                      </label>
                      <input
                        type="text"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setUploadStep(1)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setUploadStep(3)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {uploadStep === 3 && (
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-900/50 to-cyan-900/50 flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Guidance Request</h2>
                      <p className="text-purple-300">Tell us what guidance you're seeking</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-purple-300 mb-3">
                      What guidance are you seeking?
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {concernsList.map((concern) => (
                        <label
                          key={concern}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${formData.concern === concern ? 'bg-purple-900/30 border-purple-400' : 'bg-white/5 border-white/20 hover:border-purple-400/50'}`}
                        >
                          <input
                            type="radio"
                            name="concern"
                            value={concern}
                            checked={formData.concern === concern}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${formData.concern === concern ? 'border-purple-400' : 'border-white/30'}`}>
                            {formData.concern === concern && (
                              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"></div>
                            )}
                          </div>
                          <span className="text-white">{concern}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded border mr-3 mt-1 flex items-center justify-center transition-all duration-300 ${formData.consent ? 'bg-gradient-to-r from-purple-400 to-cyan-400 border-purple-400' : 'bg-white/5 border-white/30'}`}>
                        {formData.consent && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-purple-300">
                        I agree to share my birth details for astrological analysis and consent to receiving personalized guidance based on my Kundli.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setUploadStep(2)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.consent}
                      className={`px-8 py-3 rounded-lg transition-all duration-300 transform ${formData.consent ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 hover:scale-105 text-white' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}

              {uploadStep === 4 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <div className="w-12 h-12 text-white">✓</div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Request Submitted Successfully!</h2>
                  <p className="text-xl text-purple-300 mb-8">
                    Your Kundli analysis request has been received. Our expert astrologers will review your chart and provide personalized guidance within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setUploadStep(1)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Upload Another Kundli
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Uploaded Documents */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Documents</h3>
              <div className="space-y-4">
                {uploadedDocuments.length > 0 ? (
                  uploadedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-cyan-400" />
                        <div>
                          <p className="text-sm text-white font-medium truncate max-w-[150px]">
                            {doc.name}
                          </p>
                          <p className="text-xs text-purple-300">
                            {(doc.size / 1024).toFixed(1)} KB • {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        doc.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                        doc.status === 'submitted' ? 'bg-green-500/20 text-green-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-purple-300 text-center py-4">No documents uploaded yet</p>
                )}
              </div>
            </div>

            {/* Available Astrologers */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Available Astrologers</h3>
              <div className="space-y-3">
                {admins.map((admin) => (
                  <div
                    key={admin.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeAdmin === admin.id 
                        ? 'bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-400/50' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setActiveAdmin(admin.id);
                      setShowChat(true);
                    }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                        <span className="text-lg">{admin.avatar}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${
                        admin.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium text-white">{admin.name}</h4>
                      <p className="text-xs text-purple-300">{admin.role}</p>
                    </div>
                    {admin.status === 'online' && (
                      <span className="text-xs text-green-400">● Online</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-gray-800 via-purple-900/90 to-violet-900/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl z-50 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                  <span className="text-lg">{admins.find(a => a.id === activeAdmin)?.avatar || '⭐'}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">{admins.find(a => a.id === activeAdmin)?.name || 'Astrologer'}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${connected ? 'text-green-400' : 'text-red-400'}`}>
                      {connected ? '● Connected' : '● Disconnected'}
                    </span>
                    <span className="text-xs text-purple-300">{admins.find(a => a.id === activeAdmin)?.role}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:text-purple-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[400px]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-br-none'
                      : 'bg-white/10 text-white rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-full text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-purple-400 mt-2 text-center">
              Real-time chat with WebSocket connection
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .absolute.rounded-full.bg-white\\/10 {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}