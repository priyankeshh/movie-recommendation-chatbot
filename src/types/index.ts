export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface MovieSuggestion {
  title: string;
  description: string;
  genre: string;
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}