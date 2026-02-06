import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  Bell, Search, Home, User, MessageSquare, 
  PlusCircle, LogOut, Users, Activity, X,
  UserPlus, Mail, Check, Clock, Send
} from 'lucide-react';
import '../styles/Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const aiChatRef = useRef(null);

  // Mock data (replace with API calls)
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', city: 'New York', mutualFriends: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'London', mutualFriends: 12 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', city: 'Tokyo', mutualFriends: 3 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', city: 'Paris', mutualFriends: 8 },
  ];

  const mockNotifications = [
    { id: 1, type: 'friend_request', message: 'John Doe sent you a friend request', time: '2 min ago', read: false },
    { id: 2, type: 'like', message: 'Jane Smith liked your post', time: '1 hour ago', read: false },
    { id: 3, type: 'comment', message: 'Bob Johnson commented on your photo', time: '3 hours ago', read: true },
    { id: 4, type: 'mention', message: 'Alice Brown mentioned you in a post', time: '1 day ago', read: true },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (aiChatRef.current && !aiChatRef.current.contains(event.target) && 
          !event.target.closest('.ai-chat-header')) {
        // Don't close AI chat when clicking inside or on header
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Load notifications
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
    
    // Initialize AI chat with welcome message
    setAiMessages([
      { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'ai' }
    ]);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Filter mock users (replace with API call)
      const results = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSendFriendRequest = (userId) => {
    alert(`Friend request sent to user ${userId}`);
    // API call to send friend request
  };

  const handleViewProfile = (userId) => {
    setShowSearchResults(false);
    setSearchQuery('');
    navigate(`/profile/${userId}`);
  };

  const handleNotificationClick = (notificationId) => {
    // Mark as read
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    
    // Handle notification action based on type
    const notification = notifications.find(n => n.id === notificationId);
    if (notification.type === 'friend_request') {
      // Open friend requests modal or navigate
      console.log('Friend request clicked');
    }
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  const handleSendAIMessage = () => {
    if (aiInput.trim()) {
      // Add user message
      const newUserMessage = {
        id: aiMessages.length + 1,
        text: aiInput,
        sender: 'user'
      };
      
      // Add AI response
      const aiResponses = [
        "That's interesting! Tell me more.",
        "I can help you with that. What specifically would you like to know?",
        "Great question! Here's what I think...",
        "I understand. Let me provide some suggestions."
      ];
      
      const aiResponse = {
        id: aiMessages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai'
      };
      
      setAiMessages([...aiMessages, newUserMessage, aiResponse]);
      setAiInput('');
      
      // Auto-scroll to bottom
      setTimeout(() => {
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }, 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendAIMessage();
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo" onClick={() => navigate('/feed')}>
            <span className="logo-icon">🌐</span>
            <h1 className="logo-text">ConnectSphere</h1>
          </div>
        </div>

        <div className="nav-center">
          <form onSubmit={handleSearch} className="search-container" ref={searchRef}>
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search users, posts, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            {/* Search Results Floating Window */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="search-results-dropdown">
                <div className="search-results-header">
                  <h3>Search Results</h3>
                  <span className="results-count">{searchResults.length} found</span>
                </div>
                <div className="search-results-list">
                  {searchResults.map(user => (
                    <div key={user.id} className="search-result-item">
                      <div className="search-result-avatar">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
                          alt={user.name}
                        />
                      </div>
                      <div className="search-result-info">
                        <h4 onClick={() => handleViewProfile(user.id)} style={{ cursor: 'pointer' }}>
                          {user.name}
                        </h4>
                        <p className="result-email">{user.email}</p>
                        <div className="result-details">
                          <span className="city-badge">{user.city}</span>
                          {user.mutualFriends > 0 && (
                            <span className="mutual-friends">
                              {user.mutualFriends} mutual friends
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="search-result-actions">
                        <button 
                          className="btn-view-profile"
                          onClick={() => handleViewProfile(user.id)}
                        >
                          <User size={14} />
                          View Profile
                        </button>
                        <button 
                          className="btn-add-friend"
                          onClick={() => handleSendFriendRequest(user.id)}
                        >
                          <UserPlus size={14} />
                          Add Friend
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate('/feed')}>
            <Home size={24} />
            <span>Feed</span>
          </button>

          <button 
            className="nav-btn" 
            onClick={() => {
              const userId = localStorage.getItem('userId'); // Get current user ID
              if (userId) {
                navigate(`/profile/${userId}`);
              } else {
                navigate('/login');
              }
            }}
          >
            <User size={24} />
            <span>Profile</span>
          </button>

          <div className="notification-container" ref={notificationRef}>
            <button 
              className={`nav-btn ${unreadCount > 0 ? 'has-notifications' : ''}`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
              <span>Notifications</span>
            </button>
            
            {/* Notifications Floating Window */}
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <div className="notification-actions">
                    <button 
                      className="mark-all-read"
                      onClick={handleMarkAllAsRead}
                    >
                      Mark all as read
                    </button>
                    <button 
                      className="notification-close"
                      onClick={() => setShowNotifications(false)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="notifications-list">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="notification-icon">
                          {notification.type === 'friend_request' && <UserPlus size={16} />}
                          {notification.type === 'like' && <Activity size={16} />}
                          {notification.type === 'comment' && <MessageSquare size={16} />}
                          {notification.type === 'mention' && <User size={16} />}
                        </div>
                        <div className="notification-content">
                          <p className="notification-text">{notification.message}</p>
                          <div className="notification-footer">
                            <span className="notification-time">
                              <Clock size={12} />
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <span className="unread-indicator">New</span>
                            )}
                          </div>
                        </div>
                        {notification.type === 'friend_request' && !notification.read && (
                          <div className="notification-actions">
                            <button className="btn-accept" title="Accept">
                              <Check size={16} />
                            </button>
                            <button className="btn-decline" title="Decline">
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="no-notifications">
                      <Bell size={32} />
                      <p>No notifications yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="nav-btn btn-logout" onClick={() => {
            localStorage.clear();
            navigate('/');
          }}>
            <LogOut size={24} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Create Post Button */}
      <button className="create-post-btn" onClick={() => navigate('/create-post')}>
        <PlusCircle size={28} />
        <span>Create Post</span>
      </button>

      {/* AI Chat Bot - Floating Bottom Right */}
      <div className={`ai-chat-container ${showAIChat ? 'open' : ''}`} ref={aiChatRef}>
        <div className="ai-chat-header" onClick={() => setShowAIChat(!showAIChat)}>
          <MessageSquare size={20} />
          <span>AI Assistant</span>
          <div className="ai-status">
            <span className="status-dot"></span>
            <span>Online</span>
          </div>
        </div>
        
        {showAIChat && (
          <div className="ai-chat-window">
            <div className="chat-header">
              <div className="chat-header-info">
                <h3>AI Assistant</h3>
                <div className="chat-status">
                  <span className="status-dot"></span>
                  <span>Online</span>
                </div>
              </div>
              <button 
                className="chat-close-btn"
                onClick={() => setShowAIChat(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="chat-messages">
              {aiMessages.map(message => (
                <div 
                  key={message.id} 
                  className={`chat-message ${message.sender === 'ai' ? 'ai-message' : 'user-message'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="message-avatar">
                      <MessageSquare size={16} />
                    </div>
                  )}
                  <div className="message-content">
                    <p>{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="message-avatar user-avatar">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="chat-input-container">
              <textarea
                className="chat-input"
                placeholder="Type your message..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={handleKeyPress}
                rows="1"
              />
              <button 
                className="chat-send-btn"
                onClick={handleSendAIMessage}
                disabled={!aiInput.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;