import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a friendly and knowledgeable movie recommendation assistant. Your task is to recommend movies based on user preferences.

Guidelines for recommendations:
1. Provide exactly 5 movie recommendations
2. For each movie include:
   - Title
   - Genre
   - A brief, engaging description (1-2 sentences)
3. Consider various factors like:
   - Genre preferences
   - Mood/themes mentioned
   - Similar movies they enjoyed
   - Level of complexity/depth they want
4. Keep responses concise but informative
5. Format the response as:
   "Based on your preferences, here are 5 movie recommendations:

   1. [Movie Title] ([Genre])
      [Description]

   2. [Movie Title] ([Genre])
      [Description]"
   etc.

End every response with:
"You can search for these movies and find where to watch them on https://cinema.7xtream.com/search"`;

export const getMovieSuggestions = async (userMessage: string, previousMessages: Message[] = []): Promise<Message> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Convert previous messages to the format expected by Gemini API
    const chatHistory = [
      {
        role: "user",
        parts: [SYSTEM_PROMPT],
      },
      {
        role: "model",
        parts: ["I understand. I'll provide movie recommendations following these guidelines."],
      },
    ];

    // Add previous conversation messages if they exist
    // Skip the first message which is the welcome message
    if (previousMessages.length > 1) {
      const conversationMessages = previousMessages.slice(1);

      conversationMessages.forEach(msg => {
        chatHistory.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [msg.text]
        });
      });
    }

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const text = response.text();

    return {
      id: Date.now().toString(),
      text,
      sender: 'assistant',
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error getting movie suggestions:', error);
    throw error;
  }
};