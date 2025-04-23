import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');

      // Reset height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end border-t border-cozy-tan/30 p-5 bg-cozy-cream/90 dark:bg-cozy-sand/90 transition-all duration-300 relative"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-sunset-gradient opacity-20"></div>
      <div className="relative flex-grow">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What kind of movie are you in the mood for?"
          className="w-full resize-none border border-cozy-tan/50
                    rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-1
                    focus:ring-cozy-caramel focus:border-cozy-caramel bg-cozy-soft-white/90 dark:bg-cozy-cream/90
                    text-cozy-coffee dark:text-cozy-coffee transition-all duration-300
                    min-h-[44px] max-h-[150px] font-cozy shadow-cozy placeholder-cozy-warm-gray/60"
          rows={1}
          disabled={isLoading}
        />
        <div className="absolute inset-0 pointer-events-none border border-transparent rounded-xl animate-gentle-pulse opacity-30"></div>
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`absolute right-3 bottom-[10px] p-2 rounded-full
                     ${message.trim() && !isLoading ?
                       'bg-cozy-coral text-white hover:bg-cozy-orange shadow-cozy animate-gentle-pulse' :
                       'bg-cozy-warm-gray/30 text-cozy-warm-gray/50 cursor-not-allowed'
                     }
                     transition-all duration-300 border border-cozy-tan/20`}
        >
          <Send size={18} className="animate-soft-bounce" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
