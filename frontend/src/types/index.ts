export interface Game {
  id: string;
  pgn: string;
  result: 'win' | 'loss' | 'draw';
  accuracy: number;
  date: Date;
  opponent: 'ai' | 'human';
  playerColor: 'white' | 'black';
  moveCount: number;
  blunders: number;
  mistakes: number;
  goodMoves: number;
  brilliantMoves: number;
}

export interface GameAnalysis {
  gameId: string;
  summary: string;
  keyMoments: KeyMoment[];
  suggestions: string[];
  recurringPatterns: string[];
  strengthsAndWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
}

export interface KeyMoment {
  moveNumber: number;
  move: string;
  type: 'blunder' | 'mistake' | 'good' | 'brilliant';
  description: string;
  evaluation: number;
}

export interface PerformanceMetrics {
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  averageAccuracy: number;
  openingSuccessRate: Record<string, number>;
  tacticalRating: number;
  positionalRating: number;
  endgameRating: number;
  recentTrend: 'improving' | 'stable' | 'declining';
}

export interface UserProfile {
  id: string;
  username: string;
  games: Game[];
  performanceMetrics: PerformanceMetrics;
  preferredTheme: 'light' | 'dark';
  preferredDifficulty: 'easy' | 'medium' | 'hard';
}

export interface Move {
  from: string;
  to: string;
  promotion?: string;
}
