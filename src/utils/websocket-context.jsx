import React, { createContext, useContext, useState, useEffect } from 'react';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    return {
      socket: {
        emit: () => {},
        on: () => {},
        disconnect: () => {}
      },
      connected: false,
      notifications: [],
      clearNotifications: () => {},
      markNotificationAsRead: () => {},
      triggerMockMessage: () => {}
    };
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Initialize mock data in localStorage
  useEffect(() => {
    // Initialize mock clients if not exists
    if (!localStorage.getItem('admin_clients')) {
      const mockClients = [
        {
          id: 'user_1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91 9876543210',
          zodiac: 'Leo',
          status: 'active',
          documents: 3,
          lastActive: new Date().toISOString(),
          messages: 12,
          concern: 'Career Guidance',
          priority: 'high'
        },
        {
          id: 'user_2',
          name: 'Sarah Smith',
          email: 'sarah@example.com',
          phone: '+91 8765432109',
          zodiac: 'Cancer',
          status: 'active',
          documents: 2,
          lastActive: new Date(Date.now() - 3600000).toISOString(),
          messages: 8,
          concern: 'Marriage & Relationships',
          priority: 'medium'
        }
      ];
      localStorage.setItem('admin_clients', JSON.stringify(mockClients));
    }

    // Initialize mock messages
    if (!localStorage.getItem('admin_messages')) {
      const mockMessages = {
        'user_1': [
          { id: 1, sender: 'user', text: 'Hello, I need guidance on my career.', timestamp: new Date().toISOString() },
          { id: 2, sender: 'admin', text: 'Hello! I\'ve reviewed your Kundli. Your career prospects look promising this year.', timestamp: new Date().toISOString() }
        ]
      };
      localStorage.setItem('admin_messages', JSON.stringify(mockMessages));
    }

    // Initialize client documents
    if (!localStorage.getItem('client_documents')) {
      const mockDocuments = [
        { id: 1, name: 'Birth_Chart.pdf', size: 2456, type: 'pdf', uploadDate: new Date().toISOString(), status: 'submitted' }
      ];
      localStorage.setItem('client_documents', JSON.stringify(mockDocuments));
    }

    // Simulate WebSocket connection
    setTimeout(() => {
      setConnected(true);
      console.log('WebSocket Connected');
    }, 1000);
  }, []);

  // Create a mock socket
  const mockSocket = {
    connected: true,
    emit: (event, data) => {
      console.log(`[WebSocket] Emitting ${event}:`, data);
      
      // Handle different events
      switch(event) {
        case 'sendMessage':
          // Store message in localStorage
          const messages = JSON.parse(localStorage.getItem('admin_messages') || '{}');
          const clientMessages = messages[data.receiverId] || [];
          const newMessage = {
            id: Date.now(),
            sender: data.senderId.includes('admin') ? 'admin' : 'user',
            text: data.text,
            timestamp: new Date().toISOString(),
            clientId: data.senderId.includes('admin') ? data.receiverId : data.senderId
          };
          
          messages[data.receiverId] = [...clientMessages, newMessage];
          localStorage.setItem('admin_messages', JSON.stringify(messages));
          
          // Add notification for admin
          if (data.receiverId === 'admin_1') {
            setNotifications(prev => [...prev, {
              id: Date.now(),
              type: 'message',
              message: `New message from ${data.senderName}`,
              time: new Date().toISOString(),
              read: false
            }]);
          }
          break;
          
        default:
          console.log(`[WebSocket] Event ${event} not handled`);
      }
    },
    
    on: (event, callback) => {
      console.log(`[WebSocket] Listening for ${event}`);
    },
    
    disconnect: () => {
      setConnected(false);
      console.log('[WebSocket] Disconnected');
    }
  };

  const triggerMockMessage = (fromUserId, message) => {
    const mockMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      timestamp: new Date().toISOString(),
      clientId: fromUserId
    };
    
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'message',
      message: `New message from User ${fromUserId}`,
      time: new Date().toISOString(),
      read: false
    }]);
    
    // Store in localStorage
    const messages = JSON.parse(localStorage.getItem('admin_messages') || '{}');
    const clientMessages = messages[fromUserId] || [];
    messages[fromUserId] = [...clientMessages, mockMessage];
    localStorage.setItem('admin_messages', JSON.stringify(messages));
    
    return mockMessage;
  };

  const value = {
    socket: mockSocket,
    connected,
    notifications,
    clearNotifications: () => setNotifications([]),
    markNotificationAsRead: (id) => {
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    },
    triggerMockMessage
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};