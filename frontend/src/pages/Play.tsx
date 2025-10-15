import { ChessBoard } from '../components/ChessBoard';
import { GameControls } from '../components/GameControls';
import { MoveHistory } from '../components/MoveHistory';
import { useGameStore } from '../stores/gameStore';
import { AlertCircle } from 'lucide-react';

export const Play = () => {
  const { isGameOver, gameResult, currentTurn } = useGameStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Play Chess</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Challenge yourself against the AI
        </p>
      </div>

      {!isGameOver && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
          <AlertCircle className="text-blue-600 dark:text-blue-400" size={20} />
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold capitalize">{currentTurn}'s</span> turn to move
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChessBoard />
        </div>

        <div className="space-y-6">
          <GameControls />
          <MoveHistory />
        </div>
      </div>

      {isGameOver && gameResult && (
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <h3 className="text-xl font-bold mb-2">Game Over!</h3>
          <p className="text-purple-100 mb-4">
            {gameResult === 'win' && 'Congratulations on your victory! 🎉'}
            {gameResult === 'loss' && 'Better luck next time! Keep practicing. 💪'}
            {gameResult === 'draw' && 'Well played! A draw is still progress. 🤝'}
          </p>
          <button className="btn bg-white text-purple-600 hover:bg-purple-50">
            View Analysis with Claude Coach
          </button>
        </div>
      )}
    </div>
  );
};
