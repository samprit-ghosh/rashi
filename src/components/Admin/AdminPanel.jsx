import React, { useState, useEffect, useRef } from 'react';
import { Search, MessageCircle, User, FileText, Download, Star, Filter, Bell, Mail, Phone, Calendar, Clock, MoreVertical, Send, X } from 'lucide-react';
import { useWebSocket } from '../../utils/websocket-context';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications, setNotifications] = useState([]);
  
  const { socket, connected, notifications: wsNotifications, clearNotifications } = useWebSocket();
  const chatContainerRef = useRef(null);

  // Load data from localStorage
  useEffect(() => {
    const savedClients = localStorage.getItem('admin_clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }

    const savedMessages = localStorage.getItem('admin_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Set first client as selected
    const clientsList = savedClients ? JSON.parse(savedClients) : [];
    if (clientsList.length > 0 && !selectedClient) {
      setSelectedClient(clientsList[0]);
    }
  }, []);

  useEffect(() => {
    // Combine WebSocket notifications with local notifications
    const allNotifications = [...notifications, ...wsNotifications];
    setNotifications(allNotifications);
  }, [wsNotifications]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedClient) return;

    const message = {
      id: Date.now(),
      sender: 'admin',
      text: newMessage,
      timestamp: new Date().toISOString(),
      clientId: selectedClient.id
    };

    const updatedMessages = {
      ...messages,
      [selectedClient.id]: [...(messages[selectedClient.id] || []), message]
    };

    setMessages(updatedMessages);
    localStorage.setItem('admin_messages', JSON.stringify(updatedMessages));

    // Send via WebSocket
    if (socket && connected) {
      socket.emit('sendMessage', {
        ...message,
        senderId: 'admin_1',
        senderName: 'Astro Guru',
        receiverId: selectedClient.id,
        text: newMessage
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

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getClientDocuments = () => {
    if (!selectedClient) return [];
    const savedDocs = localStorage.getItem('client_documents');
    if (savedDocs) {
      const allDocs = JSON.parse(savedDocs);
      // Filter documents for this client
      return allDocs.filter(doc => {
        // Check if document has clientId and matches selected client
        if (doc.clientId && selectedClient.id) {
          return doc.clientId === selectedClient.id;
        }
        // If no clientId in document, include it for demo purposes
        return true;
      });
    }
    return [];
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300';
      case 'inactive': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current && selectedClient) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, selectedClient]);

  // Update client messages count
  useEffect(() => {
    if (selectedClient && messages[selectedClient.id]) {
      const updatedClients = clients.map(client => {
        if (client.id === selectedClient.id) {
          return {
            ...client,
            messages: messages[client.id]?.length || 0
          };
        }
        return client;
      });
      setClients(updatedClients);
      localStorage.setItem('admin_clients', JSON.stringify(updatedClients));
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-pulse"
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

      <div className="relative z-10">
        {/* Admin Header */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Astro Admin Panel</h1>
                  <p className="text-purple-300">Manage clients and provide guidance</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Connection Status */}
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-white">
                    {connected ? 'WebSocket Connected' : 'Disconnected'}
                  </span>
                </div>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => {
                      clearNotifications();
                      setNotifications([]);
                    }}
                    className="relative p-2 text-white hover:text-purple-300 transition-colors"
                  >
                    <Bell className="w-6 h-6" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>
                </div>
                
                {/* Navigation */}
                <Link
                  to="/"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                >
                  ← Back to Site
                </Link>
                
                {/* Admin Info */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">Astro Guru</p>
                    <p className="text-xs text-purple-300">Senior Astrologer</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-lg">🪐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Client List */}
            <div className="lg:col-span-1">
              {/* Search and Filter */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                  />
                </div>
                
                <div className="flex space-x-2">
                  {['all', 'active', 'pending', 'inactive'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        filterStatus === status
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                          : 'bg-white/5 text-purple-300 hover:bg-white/10'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client List */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                <div className="p-4 border-b border-white/20">
                  <h3 className="text-lg font-semibold text-white">Clients ({filteredClients.length})</h3>
                </div>
                
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-300 ${
                        selectedClient?.id === client.id
                          ? 'bg-gradient-to-r from-purple-900/30 to-cyan-900/30'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{client.name}</h4>
                            <p className="text-xs text-purple-300">{client.zodiac}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-purple-300">
                            <FileText className="w-4 h-4 mr-1" />
                            {client.documents}
                          </span>
                          <span className="flex items-center text-purple-300">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {client.messages}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(client.priority)}`}>
                          {client.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {selectedClient ? (
                <div className="space-y-6">
                  {/* Client Header */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{selectedClient.name}</h2>
                          <p className="text-purple-300">{selectedClient.zodiac} • {selectedClient.concern}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="flex items-center text-sm text-purple-300">
                              <Mail className="w-4 h-4 mr-2" />
                              {selectedClient.email}
                            </span>
                            <span className="flex items-center text-sm text-purple-300">
                              <Phone className="w-4 h-4 mr-2" />
                              {selectedClient.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-purple-300">Last Active</p>
                          <p className="text-white">
                            {new Date(selectedClient.lastActive).toLocaleDateString()}
                          </p>
                        </div>
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors">
                          <MoreVertical className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-purple-900/30 to-transparent rounded-xl p-4 border border-purple-400/20">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-purple-400 mr-3" />
                          <div>
                            <p className="text-sm text-purple-300">Documents</p>
                            <p className="text-2xl font-bold text-white">{selectedClient.documents}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-900/30 to-transparent rounded-xl p-4 border border-cyan-400/20">
                        <div className="flex items-center">
                          <MessageCircle className="w-5 h-5 text-cyan-400 mr-3" />
                          <div>
                            <p className="text-sm text-purple-300">Messages</p>
                            <p className="text-2xl font-bold text-white">{selectedClient.messages}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-violet-900/30 to-transparent rounded-xl p-4 border border-violet-400/20">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 text-violet-400 mr-3" />
                          <div>
                            <p className="text-sm text-purple-300">Member Since</p>
                            <p className="text-2xl font-bold text-white">
                              {new Date(selectedClient.lastActive).toLocaleDateString('default', { month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents and Chat */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Documents Section */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Uploaded Documents</h3>
                        <button className="text-sm text-purple-300 hover:text-white transition-colors">
                          View All →
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {getClientDocuments().map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                doc.type === 'pdf' 
                                  ? 'bg-red-500/20' 
                                  : 'bg-blue-500/20'
                              }`}>
                                <FileText className={`w-5 h-5 ${
                                  doc.type === 'pdf' ? 'text-red-400' : 'text-blue-400'
                                }`} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">{doc.name}</p>
                                <p className="text-xs text-purple-300">
                                  {(doc.size / 1024).toFixed(1)} KB • {new Date(doc.uploadDate).toLocaleDateString()}
                                </p>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  doc.status === 'submitted' ? 'bg-green-500/20 text-green-300' :
                                  doc.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                  'bg-blue-500/20 text-blue-300'
                                }`}>
                                  {doc.status}
                                </span>
                              </div>
                            </div>
                            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors">
                              <Download className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ))}
                        
                        {getClientDocuments().length === 0 && (
                          <div className="text-center py-8">
                            <FileText className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-50" />
                            <p className="text-purple-300">No documents uploaded yet</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Chat Section */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Chat with {selectedClient.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          connected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {connected ? 'Live Chat' : 'Offline'}
                        </span>
                      </div>
                      
                      {/* Chat Messages */}
                      <div 
                        ref={chatContainerRef}
                        className="flex-1 space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2"
                      >
                        {(messages[selectedClient.id] || []).map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                msg.sender === 'admin'
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
                        
                        {(messages[selectedClient.id] || []).length === 0 && (
                          <div className="text-center py-8">
                            <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-50" />
                            <p className="text-purple-300">No messages yet. Start the conversation!</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Chat Input */}
                      <div className="mt-auto">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={`Message ${selectedClient.name}...`}
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
                          Press Enter to send • Shift+Enter for new line
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
                  <User className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Client</h3>
                  <p className="text-purple-300">Choose a client from the list to view details and chat</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #06b6d4);
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #0891b2);
        }
      `}</style>
    </div>
  );
}