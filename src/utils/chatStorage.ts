import { Message } from '../types';

const STORAGE_KEY = 'movie-buddy-chat-history';

// Function to save messages to localStorage
export const saveMessages = (messages: Message[]): void => {
  try {
    // Convert Date objects to strings for storage
    const messagesToStore = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToStore));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

// Function to load messages from localStorage
export const loadMessages = (): Message[] => {
  try {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (!storedMessages) {
      return [
        {
          id: '1',
          text: "Hey! I'm your movie buddy 🍿. Tell me what kind of movie you're in the mood for!",
          sender: 'assistant',
          timestamp: new Date()
        }
      ];
    }

    // Convert string timestamps back to Date objects
    return JSON.parse(storedMessages).map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [
      {
        id: '1',
        text: "Hey! I'm your movie buddy 🍿. Tell me what kind of movie you're in the mood for!",
        sender: 'assistant',
        timestamp: new Date()
      }
    ];
  }
};

// Function to clear chat history
export const clearChatHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
};
