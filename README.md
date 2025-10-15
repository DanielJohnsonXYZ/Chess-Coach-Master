# Chess Coach Web App

> Play, learn, and improve — a chess experience that understands you.

A beautiful, interactive web-based chess game focused on self-improvement with AI-powered coaching insights from Claude.

## Features

### Core Gameplay
- Interactive chess board with drag-and-drop piece movement
- Play against adaptive AI opponents
- Automatic game history tracking
- Real-time move validation

### Progress Tracking
- Win/loss/draw statistics
- Game accuracy scoring
- Performance trend visualization
- Tactical, positional, and endgame ratings
- Recent games history

### AI Coaching (Claude-Powered)
- **Post-game analysis**: Detailed insights into blunders, missed tactics, and strong moves
- **Personalized learning**: Identify recurring patterns and weaknesses
- **Coach chat**: Ask questions and get expert advice
- **Smart hints**: Optional contextual guidance during gameplay
- **Weekly reflections**: Summarized learning reports based on recent games

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Zustand** for state management
- **chess.js** for game logic
- **react-chessboard** for the chess UI
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Anthropic Claude API** for AI coaching
- **CORS** enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- An Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chess-coach-app
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
```bash
cd backend
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The API will run on `http://localhost:3001`

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```
The app will run on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
chess-coach-app/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main page components
│   │   ├── stores/         # Zustand state management
│   │   ├── types/          # TypeScript type definitions
│   │   ├── services/       # API services
│   │   └── App.tsx         # Main app component
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── services/       # Business logic services
│   │   ├── prompts/        # Claude prompt templates
│   │   └── index.ts        # Server entry point
│   └── package.json
│
└── README.md
```

## API Endpoints

### POST `/api/analyze-game`
Analyze a completed chess game
```json
{
  "pgn": "1. e4 e5 2. Nf3...",
  "playerColor": "white",
  "result": "win"
}
```

### POST `/api/chat`
Chat with the AI coach
```json
{
  "message": "Why did I lose that rook endgame?",
  "conversationHistory": []
}
```

### POST `/api/hint`
Get a hint for the current position
```json
{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "playerColor": "white"
}
```

### GET `/api/health`
Health check endpoint

## Features Roadmap

### Current (MVP)
- [x] Interactive chess board
- [x] AI opponent
- [x] Game history tracking
- [x] Performance metrics
- [x] Dashboard with charts
- [x] Dark/light theme
- [x] Claude API integration
- [x] Post-game analysis
- [x] Coach chat interface

### Future Enhancements
- [ ] Stockfish.js integration for stronger AI
- [ ] User authentication
- [ ] Database for persistent storage
- [ ] Multiplayer support
- [ ] ELO rating system
- [ ] Opening repertoire trainer
- [ ] Tactical puzzle mode
- [ ] Weekly email reports
- [ ] Mobile app
- [ ] Voice-based coaching

## UI Design

The app features a clean, minimalist design with:
- Typography-driven interface (Inter font family)
- Dark/light theme toggle
- Responsive layout for mobile and desktop
- Soft animations and transitions
- Card-based component layout
- Gradient accents for visual hierarchy

## Development

### Frontend Development
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev      # Start with hot reload
npm run build    # Compile TypeScript
npm start        # Run compiled code
```

## Environment Variables

### Backend `.env`
```bash
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

### Frontend `.env.production` (for deployment)
```bash
VITE_API_URL=https://your-backend-url.railway.app
```

## Deployment

### Quick Deploy to Netlify

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create chess-coach-app --public --source=. --push
   ```

2. **Deploy on Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
   - Add environment variable: `VITE_API_URL` = your backend URL

3. **Deploy Backend** (Railway):
   - Go to [railway.app](https://railway.app)
   - "New Project" → "Deploy from GitHub repo"
   - Root directory: `backend`
   - Add environment variable: `ANTHROPIC_API_KEY`

📖 **See [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md) for detailed Netlify deployment guide**

📖 **See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment documentation**

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Acknowledgments

- Built with [Claude](https://www.anthropic.com/claude) by Anthropic
- Chess engine powered by [chess.js](https://github.com/jhlywa/chess.js)
- UI components inspired by modern web design principles

---

Made with love and AI assistance
