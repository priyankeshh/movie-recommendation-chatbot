import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import LoadingDots from './LoadingDots';
import { Message } from '../types';
import { getMovieSuggestions } from '../utils/getMovieSuggestions';
import { saveMessages, loadMessages } from '../utils/chatStorage';
import { MessageSquare, Trash2 } from 'lucide-react';

const Chat: React.FC = () => {
  // Load messages from localStorage on initial render
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    saveMessages(messages);
    scrollToBottom();
  }, [messages]);

  // Function to clear chat history
  const handleClearChat = () => {
    const newMessages = [
      {
        id: Date.now().toString(),
        text: "Hey! I'm your movie buddy 🍿. Tell me what kind of movie you're in the mood for!",
        sender: 'assistant' as 'assistant', // Type assertion to fix TypeScript error
        timestamp: new Date()
      }
    ];
    setMessages(newMessages);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get movie suggestions with previous messages for context
      const response = await getMovieSuggestions(text, messages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="p-5 border-b border-cozy-tan/30 bg-cozy-cream/90 dark:bg-cozy-sand/90 transition-all duration-300 relative">
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-sunset-gradient opacity-20"></div>
        <div className="flex items-center">
          <MessageSquare className="text-cozy-coral dark:text-cozy-caramel mr-3 animate-soft-bounce" size={22} />
          <h1 className="text-xl font-handwritten text-cozy-coffee dark:text-cozy-brown tracking-wide">Movie Recommendations</h1>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={handleClearChat}
              className="text-cozy-coffee/70 hover:text-cozy-red transition-colors duration-200 p-2 rounded-full hover:bg-cozy-cream/50"
              title="Clear chat history"
            >
              <Trash2 size={18} />
            </button>
            <div className="text-sm text-cozy-coffee/70 font-handwritten px-3 py-1 bg-cozy-cream/50 rounded-full shadow-inner-cozy">
              <span>Cozy Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-5 overflow-y-auto bg-cozy-soft-white dark:bg-cozy-cream transition-all duration-300 relative">
        {/* Soft texture overlay */}
        <div className="absolute inset-0 bg-soft-texture opacity-10 pointer-events-none"></div>

        <div className="space-y-5 relative">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))}

          {isLoading && (
            <div className="flex mb-4">
              <div className="bg-cozy-cream/90 dark:bg-cozy-sand/90 p-4 rounded-xl border border-cozy-tan/30 shadow-cozy">
                <LoadingDots />
              </div>
            </div>
          )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Chat;
