import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Chess Coach API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      analyzeGame: 'POST /api/analyze-game',
      chat: 'POST /api/chat',
      hint: 'POST /api/hint',
    },
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Chess Coach API running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}`);
});
