import { RotateCcw, Flag, Lightbulb, Settings } from 'lucide-react';
import { useGameStore } from '../stores/gameStore';
import { useUIStore } from '../stores/uiStore';

export const GameControls = () => {
  const { resetGame, undoMove, isGameOver, gameResult } = useGameStore();
  const { showHints, toggleHints } = useUIStore();

  const handleNewGame = () => {
    if (confirm('Start a new game?')) {
      resetGame();
    }
  };

  const handleResign = () => {
    if (confirm('Are you sure you want to resign?')) {
      // Handle resignation
      resetGame();
    }
  };

  return (
    <div className="card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Game Controls</h3>

        {isGameOver && (
          <div className="p-4 rounded-lg bg-primary-100 dark:bg-primary-900 border-2 border-primary-500">
            <p className="text-center font-bold text-lg">
              {gameResult === 'win' && '🎉 You Won!'}
              {gameResult === 'loss' && '😔 You Lost'}
              {gameResult === 'draw' && '🤝 Draw'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleNewGame}
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            New Game
          </button>

          <button
            onClick={undoMove}
            disabled={isGameOver}
            className="btn btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw size={18} />
            Undo
          </button>

          <button
            onClick={toggleHints}
            className={`btn flex items-center justify-center gap-2 ${
              showHints
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'btn-secondary'
            }`}
          >
            <Lightbulb size={18} />
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>

          <button
            onClick={handleResign}
            disabled={isGameOver}
            className="btn bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Flag size={18} />
            Resign
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="btn btn-secondary w-full flex items-center justify-center gap-2">
            <Settings size={18} />
            Game Settings
          </button>
        </div>
      </div>
    </div>
  );
};
