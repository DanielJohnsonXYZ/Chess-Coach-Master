// API configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = {
  baseURL: API_URL,

  // Analyze a completed game
  async analyzeGame(pgn: string, playerColor: 'white' | 'black', result: 'win' | 'loss' | 'draw') {
    const response = await fetch(`${API_URL}/api/analyze-game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pgn, playerColor, result }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze game');
    }

    return response.json();
  },

  // Chat with the coach
  async chat(message: string, conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>) {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, conversationHistory }),
    });

    if (!response.ok) {
      throw new Error('Failed to send chat message');
    }

    return response.json();
  },

  // Get a hint for the current position
  async getHint(fen: string, playerColor: 'white' | 'black') {
    const response = await fetch(`${API_URL}/api/hint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fen, playerColor }),
    });

    if (!response.ok) {
      throw new Error('Failed to get hint');
    }

    return response.json();
  },

  // Health check
  async health() {
    const response = await fetch(`${API_URL}/api/health`);

    if (!response.ok) {
      throw new Error('API health check failed');
    }

    return response.json();
  },
};
