import { create } from 'zustand';
import { Chess } from 'chess.js';
import type { Game, GameAnalysis, Move } from '../types';

interface GameState {
  // Current game state
  chess: Chess;
  gameHistory: string[];
  isGameOver: boolean;
  gameResult: 'win' | 'loss' | 'draw' | null;
  playerColor: 'white' | 'black';
  currentTurn: 'white' | 'black';

  // AI settings
  aiDifficulty: 'easy' | 'medium' | 'hard';
  isAiThinking: boolean;

  // Game history
  games: Game[];
  currentGameAnalysis: GameAnalysis | null;

  // Actions
  makeMove: (move: Move) => boolean;
  resetGame: () => void;
  setAiDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  setPlayerColor: (color: 'white' | 'black') => void;
  undoMove: () => void;
  saveGame: (game: Game) => void;
  loadGames: () => void;
  setGameAnalysis: (analysis: GameAnalysis) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  chess: new Chess(),
  gameHistory: [],
  isGameOver: false,
  gameResult: null,
  playerColor: 'white',
  currentTurn: 'white',
  aiDifficulty: 'medium',
  isAiThinking: false,
  games: [],
  currentGameAnalysis: null,

  makeMove: (move: Move) => {
    const { chess } = get();
    try {
      const result = chess.move(move);
      if (result) {
        const newHistory = chess.history();
        const isOver = chess.isGameOver();

        let gameResult = null;
        if (isOver) {
          if (chess.isCheckmate()) {
            gameResult = chess.turn() === 'w' ? 'loss' : 'win';
          } else {
            gameResult = 'draw';
          }
        }

        set({
          gameHistory: newHistory,
          isGameOver: isOver,
          gameResult: gameResult as 'win' | 'loss' | 'draw' | null,
          currentTurn: chess.turn() === 'w' ? 'white' : 'black',
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Invalid move:', error);
      return false;
    }
  },

  resetGame: () => {
    const chess = new Chess();
    set({
      chess,
      gameHistory: [],
      isGameOver: false,
      gameResult: null,
      currentTurn: 'white',
      currentGameAnalysis: null,
    });
  },

  setAiDifficulty: (difficulty) => {
    set({ aiDifficulty: difficulty });
  },

  setPlayerColor: (color) => {
    set({ playerColor: color });
  },

  undoMove: () => {
    const { chess } = get();
    chess.undo();
    const newHistory = chess.history();
    set({
      gameHistory: newHistory,
      isGameOver: false,
      gameResult: null,
      currentTurn: chess.turn() === 'w' ? 'white' : 'black',
    });
  },

  saveGame: (game) => {
    const { games } = get();
    const updatedGames = [game, ...games];
    localStorage.setItem('chess-games', JSON.stringify(updatedGames));
    set({ games: updatedGames });
  },

  loadGames: () => {
    const stored = localStorage.getItem('chess-games');
    if (stored) {
      const games = JSON.parse(stored);
      set({ games });
    }
  },

  setGameAnalysis: (analysis) => {
    set({ currentGameAnalysis: analysis });
  },
}));
