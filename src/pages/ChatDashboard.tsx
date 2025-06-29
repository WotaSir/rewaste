import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, LogOut, Plus, Copy, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hey ${user?.name || 'there'}! 👋 I'm Nexa AI, your intelligent assistant. I'm here to help you with anything you need - from answering questions to having meaningful conversations. What would you like to talk about today?`,
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's a great question! Let me think about that for a moment. Based on what you're asking, I'd say that understanding this topic requires looking at it from multiple perspectives. What specific aspect would you like me to elaborate on?",
      "I find that really interesting! From my perspective, this touches on several important concepts that are worth exploring further. Would you like me to break this down into more manageable parts?",
      "Absolutely! This is something I can definitely help you with. Let me provide you with a comprehensive answer that covers all the key points you should know about this topic.",
      "That's a fascinating topic to explore! There are several layers to consider here, and I think you'll find the answer quite enlightening. Let me walk you through the main concepts step by step.",
      "Great question! This is actually more nuanced than it might initially appear. Let me share some insights that should help clarify things for you and provide a deeper understanding.",
      "I'm excited to help you with this! This topic has some really interesting dimensions that I think you'll appreciate. Let me give you a thorough response that addresses all aspects of your question."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        text: `Welcome back, ${user?.name || 'there'}! 🚀 Ready for another conversation? I'm here to help with whatever you need. What's on your mind today?`,
        isUser: false,
        timestamp: new Date(),
      }
    ]);
    toast.success('New chat started!');
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Message copied to clipboard!');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-20 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Nexa AI</h1>
                <p className="text-sm text-white/70">Your Intelligent Assistant</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-white/70">{user?.email}</p>
              </div>
              
              <motion.button
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                onClick={handleNewChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="New Chat"
              >
                <Plus className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </GlassCard>
      </motion.header>

      {/* Chat Area */}
      <div className="flex-1 px-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="h-[calc(100vh-200px)] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${message.isUser ? 'flex-row-reverse' : 'flex-row'} space-x-3`}>
                      {/* Avatar */}
                      <div className={`flex-shrink-0 ${message.isUser ? 'ml-3' : 'mr-3'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.isUser 
                            ? 'bg-gradient-to-br from-primary-500 to-secondary-500' 
                            : 'bg-gradient-to-br from-purple-500 to-pink-500'
                        }`}>
                          {message.isUser ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`relative group rounded-2xl px-4 py-3 max-w-full ${
                            message.isUser
                              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                              : 'bg-white/10 text-white border border-white/20'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.text}
                          </p>
                          
                          {/* Copy Button */}
                          <button
                            onClick={() => copyMessage(message.text)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/20 rounded"
                            title="Copy message"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <span className="text-xs text-white/50 mt-1">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      disabled={isTyping}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <MessageSquare className="w-5 h-5 text-white/30" />
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: !inputText.trim() || isTyping ? 1 : 1.05 }}
                  whileTap={{ scale: !inputText.trim() || isTyping ? 1 : 0.95 }}
                >
                  {isTyping ? (
                    <LoadingSpinner size="sm" color="text-white" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </div>

              <p className="text-xs text-white/50 mt-2 text-center">
                Nexa AI can make mistakes. Consider checking important information.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Floating New Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-20"
        onClick={handleNewChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default ChatDashboard;