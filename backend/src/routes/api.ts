import express from 'express';
import { analyzeGame, chatWithCoach, generateHint } from '../services/claudeService';

const router = express.Router();

// Analyze a completed game
router.post('/analyze-game', async (req, res) => {
  try {
    const { pgn, playerColor, result } = req.body;

    if (!pgn || !playerColor || !result) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const analysis = await analyzeGame(pgn, playerColor, result);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing game:', error);
    res.status(500).json({ error: 'Failed to analyze game' });
  }
});

// Chat with the coach
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await chatWithCoach(message, conversationHistory || []);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Get a hint for the current position
router.post('/hint', async (req, res) => {
  try {
    const { fen, playerColor } = req.body;

    if (!fen || !playerColor) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hint = await generateHint(fen, playerColor);
    res.json({ hint });
  } catch (error) {
    console.error('Error generating hint:', error);
    res.status(500).json({ error: 'Failed to generate hint' });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
