import React from 'react';
import { Message } from '../types';
import { Sofa } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  // Format timestamp
  const formatTime = (date: Date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Parse markdown for bold, italic, etc. and make URLs clickable
  const parseMarkdown = (text: string) => {
    // First, escape any HTML to prevent injection
    let parsedText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Simple replacements for markdown
    // Bold: **text**
    parsedText = parsedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic: *text*
    parsedText = parsedText.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Code: `text`
    parsedText = parsedText.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Special handling for the cinema.7xtream.com URL
    // This regex looks for the URL pattern with optional punctuation at the end
    const cinemaUrlPattern = /(https?:\/\/cinema\.7xtream\.com\/search)([.,;:!?])?/g;
    parsedText = parsedText.replace(cinemaUrlPattern, (_match, url, punctuation) => {
      // If there's punctuation, keep it outside the link
      if (punctuation) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="cinema-link">${url}</a>${punctuation}`;
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="cinema-link">${url}</a>`;
    });

    // Handle the case where the URL might be embedded in text without spaces
    // Look for text like "...on https://cinema.7xtream.com/search" or similar patterns
    parsedText = parsedText.replace(/(\w)(https?:\/\/cinema\.7xtream\.com\/search)/g, (_match, prefix, url) => {
      return `${prefix} <a href="${url}" target="_blank" rel="noopener noreferrer" class="cinema-link">${url}</a>`;
    });

    // Then handle other URLs
    const urlRegex = /https?:\/\/(?!cinema\.7xtream\.com\/search)[^\s]+/g;
    parsedText = parsedText.replace(urlRegex, (url) => {
      // Check if the URL ends with punctuation
      const punctuationMatch = url.match(/([.,;:!?])$/);
      if (punctuationMatch) {
        const cleanUrl = url.slice(0, -1);
        return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="message-link">${cleanUrl}</a>${punctuationMatch[0]}`;
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="message-link">${url}</a>`;
    });

    return parsedText;
  };

  return (
    <div className={`mb-5 ${isUser ? 'flex justify-end' : 'flex justify-start'}`}>
      <div
        className={`
          flex max-w-[80%] sm:max-w-[70%] relative
          ${isUser ?
            'bg-cozy-cream text-cozy-coffee font-cozy rounded-2xl rounded-tr-none border border-cozy-coral/30 shadow-cozy' :
            'bg-cozy-cream dark:bg-cozy-sand text-cozy-coffee dark:text-cozy-coffee font-cozy rounded-2xl rounded-tl-none border border-cozy-tan/30 shadow-cozy'
          }
          p-4 transition-all duration-300 hover:shadow-cozy-lg
        `}
      >
        {/* Warm overlay */}
        <div className={`absolute inset-0 rounded-2xl ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} bg-warm-overlay opacity-10 pointer-events-none`}></div>

        <div className="flex">
          {!isUser && (
            <div className="mr-3 mt-0.5">
              <Sofa size={18} className="text-cozy-caramel dark:text-cozy-amber animate-soft-bounce" />
            </div>
          )}
          <div>
            <div
              className="whitespace-pre-wrap tracking-normal text-base font-medium"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
            ></div>
            <div className="text-xs mt-2 opacity-70 text-cozy-warm-gray">
              <span className="inline-block px-2 py-0.5 bg-cozy-soft-white/50 rounded-full">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
