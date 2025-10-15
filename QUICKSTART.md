# Quick Start Guide

Get your Chess Coach Web App up and running in 5 minutes!

## Prerequisites

- **Node.js 18+** and npm installed
- **Anthropic API Key** - [Get one here](https://console.anthropic.com/)

## Installation

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

## Running the Application

### Option 1: Run Both Services Separately

#### Terminal 1 - Start the Backend:
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Chess Coach API running on http://localhost:3001
📝 API Documentation: http://localhost:3001
```

#### Terminal 2 - Start the Frontend:
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Option 2: Production Build

Build both applications:

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
npm run build
npm start
```

## Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## First Steps

1. **Explore the Dashboard** - View your performance metrics (currently empty)
2. **Play a Game** - Click "Play" in the sidebar to start your first chess game
3. **Move Pieces** - Drag and drop pieces to make your moves
4. **AI Opponent** - The AI will automatically respond to your moves
5. **Get Coaching** - After the game, visit the "Review" page for AI analysis

## Features to Try

### Playing Chess
- **New Game**: Start a fresh game with the "New Game" button
- **Undo Move**: Take back your last move
- **Hints**: Toggle hints to get subtle guidance (requires API integration)
- **Resign**: Give up the current game

### Performance Tracking
- **Dashboard**: See your win/loss record, accuracy, and trends
- **Charts**: Visualize your performance over time
- **Recent Games**: Review your game history

### AI Coaching
- **Post-Game Analysis**: Get detailed insights after each game
- **Coach Chat**: Ask questions about strategy, tactics, or your games
- **Pattern Recognition**: Identify recurring mistakes and strengths

## Troubleshooting

### Backend won't start
- **Check API Key**: Ensure your `ANTHROPIC_API_KEY` is set in `.env`
- **Port Conflict**: If port 3001 is in use, change `PORT` in `.env`

### Frontend won't connect to backend
- **CORS Issues**: Make sure backend is running on `http://localhost:3001`
- **Browser Console**: Check for error messages in browser developer tools

### Chess pieces won't move
- **Refresh the page**: Try a hard refresh (Cmd+Shift+R or Ctrl+Shift+F5)
- **Check console**: Look for JavaScript errors in browser dev tools

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- **Frontend**: Changes to React components automatically refresh
- **Backend**: Nodemon automatically restarts the server on file changes

### API Testing
Test the backend API directly:

```bash
# Health check
curl http://localhost:3001/api/health

# Test chat endpoint
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is a fork in chess?","conversationHistory":[]}'
```

### Browser Developer Tools
- **React DevTools**: Install for component inspection
- **Network Tab**: Monitor API requests
- **Console**: View application logs and errors

## Next Steps

1. **Play Multiple Games** - Build up your game history
2. **Explore the Coach Chat** - Ask questions about chess strategy
3. **Check Your Stats** - Watch your metrics improve over time
4. **Review Post-Game Analysis** - Learn from Claude's insights

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review API endpoints in the backend code
- Report issues on the project repository

---

Happy chess playing! ♟️
