# Project Structure

```
chess-coach-app/
│
├── frontend/                          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── ChessBoard.tsx       # Interactive chess board with drag-and-drop
│   │   │   ├── GameControls.tsx     # New game, undo, hints, resign buttons
│   │   │   ├── MoveHistory.tsx      # Display of game moves
│   │   │   ├── PerformanceChart.tsx # Line chart for accuracy trends
│   │   │   ├── StatsCards.tsx       # Dashboard metric cards
│   │   │   └── Sidebar.tsx          # Navigation sidebar
│   │   │
│   │   ├── pages/                   # Main application pages
│   │   │   ├── Dashboard.tsx        # Overview and performance metrics
│   │   │   ├── Play.tsx             # Chess game interface
│   │   │   ├── Review.tsx           # Post-game analysis and coach chat
│   │   │   └── Profile.tsx          # User stats and preferences
│   │   │
│   │   ├── stores/                  # Zustand state management
│   │   │   ├── gameStore.ts         # Chess game state and logic
│   │   │   └── uiStore.ts           # UI state (theme, navigation)
│   │   │
│   │   ├── types/                   # TypeScript type definitions
│   │   │   └── index.ts             # Game, Player, Metrics types
│   │   │
│   │   ├── App.tsx                  # Main application component
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles with Tailwind
│   │
│   ├── public/                       # Static assets
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Frontend dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── vite.config.ts               # Vite build configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── postcss.config.js            # PostCSS configuration
│
├── backend/                          # Node.js + Express backend
│   ├── src/
│   │   ├── routes/                  # API route handlers
│   │   │   └── api.ts               # /analyze-game, /chat, /hint endpoints
│   │   │
│   │   ├── services/                # Business logic
│   │   │   └── claudeService.ts     # Claude API integration
│   │   │
│   │   ├── prompts/                 # Claude prompt templates
│   │   │   └── chess_coach.json     # Structured prompts for analysis
│   │   │
│   │   └── index.ts                 # Express server entry point
│   │
│   ├── dist/                        # Compiled JavaScript (generated)
│   ├── package.json                 # Backend dependencies
│   ├── tsconfig.json                # TypeScript configuration
│   ├── .env.example                 # Environment variable template
│   └── .env                         # Your API keys (not in git)
│
├── README.md                         # Comprehensive project documentation
├── QUICKSTART.md                    # 5-minute setup guide
├── PROJECT_STRUCTURE.md             # This file
├── package.json                     # Root package scripts
└── .gitignore                       # Git ignore rules
```

## Key Files Explained

### Frontend

#### `src/stores/gameStore.ts`
Central game state management using Zustand:
- Chess engine instance (chess.js)
- Current game state (board position, turn, result)
- Move history and validation
- Game history persistence (localStorage)
- AI move generation (basic random for MVP)

#### `src/stores/uiStore.ts`
UI state management:
- Theme (light/dark mode)
- Current page navigation
- Sidebar visibility
- Hint toggle

#### `src/components/ChessBoard.tsx`
The heart of the chess interface:
- Uses react-chessboard library
- Handles drag-and-drop piece movement
- Validates legal moves via chess.js
- Triggers AI responses after player moves
- Custom styling for board appearance

#### `src/pages/Dashboard.tsx`
Performance overview:
- Aggregates game statistics
- Calculates win/loss/draw ratios
- Computes trends (improving/stable/declining)
- Displays performance charts
- Shows recent game history

#### `src/pages/Play.tsx`
Active gameplay interface:
- Embeds ChessBoard component
- Shows GameControls and MoveHistory
- Displays turn indicator
- Post-game result screen

#### `src/pages/Review.tsx`
Analysis and coaching hub:
- Displays last game analysis from Claude
- Shows key moments (blunders, brilliant moves)
- Interactive coach chat interface
- Suggestions for improvement

### Backend

#### `src/services/claudeService.ts`
Claude API integration:
- `analyzeGame()` - Post-game analysis with structured prompts
- `chatWithCoach()` - Conversational Q&A with context
- `generateHint()` - Position-based guidance
- `generateWeeklyReflection()` - Periodic progress summaries

#### `src/prompts/chess_coach.json`
Structured prompt templates:
- Game analysis format (JSON output)
- Chat system message (coaching persona)
- Hint generation (subtle guidance)
- Weekly reflection (progress summary)

#### `src/routes/api.ts`
REST API endpoints:
- `POST /api/analyze-game` - Analyze completed game
- `POST /api/chat` - Send message to coach
- `POST /api/hint` - Get hint for current position
- `GET /api/health` - Health check

## Data Flow

### Playing a Game
1. User drags piece on ChessBoard
2. `onPieceDrop` validates move via chess.js
3. `gameStore.makeMove()` updates state
4. Board re-renders with new position
5. AI generates response move (if applicable)

### Getting Analysis
1. Game ends (checkmate/draw/resign)
2. Frontend sends PGN to `POST /api/analyze-game`
3. Backend calls Claude API with game data
4. Claude returns structured analysis
5. Frontend displays insights on Review page

### Coach Chat
1. User types question in Review page
2. Message sent to `POST /api/chat` with history
3. Backend calls Claude with conversation context
4. Claude responds with coaching advice
5. Response added to chat UI

## State Management

### Frontend State (Zustand)

**gameStore**:
- Chess instance and board position
- Game history (all moves)
- Result tracking (win/loss/draw)
- Player settings (color, difficulty)
- Saved games (localStorage)

**uiStore**:
- Theme preference
- Current page
- UI toggles (hints, sidebar)

### Backend State
- Stateless REST API
- No persistent storage (MVP)
- Future: Add database for:
  - User accounts
  - Game history
  - Performance analytics

## Technologies Used

### Frontend Stack
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Zustand**: Lightweight state management
- **Tailwind CSS**: Utility-first styling
- **chess.js**: Chess logic engine
- **react-chessboard**: Chess UI component
- **Recharts**: Data visualization
- **Lucide React**: Icon library

### Backend Stack
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **TypeScript**: Type safety
- **Anthropic SDK**: Claude API client
- **CORS**: Cross-origin requests
- **dotenv**: Environment variables

## Future Architecture Improvements

### Planned Enhancements
1. **Database Integration**: PostgreSQL or MongoDB for persistence
2. **Authentication**: User accounts with JWT/OAuth
3. **Stockfish.js**: Stronger AI opponent
4. **WebSocket**: Real-time multiplayer games
5. **Redis**: Caching for API responses
6. **Docker**: Containerized deployment
7. **CI/CD**: Automated testing and deployment

### Scalability Considerations
- Move game analysis to background jobs (Bull/Redis)
- Implement rate limiting for API endpoints
- Add CDN for static asset delivery
- Database connection pooling
- Horizontal scaling for API servers

---

This structure prioritizes:
- **Separation of concerns** (components, pages, stores)
- **Type safety** (TypeScript throughout)
- **Maintainability** (clear naming, logical grouping)
- **Extensibility** (easy to add features)
