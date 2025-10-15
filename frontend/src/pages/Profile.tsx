import { User, Settings, Award } from 'lucide-react';
import { useGameStore } from '../stores/gameStore';

export const Profile = () => {
  const { games } = useGameStore();

  const totalMoves = games.reduce((acc, game) => acc + game.moveCount, 0);
  const totalBlunders = games.reduce((acc, game) => acc + game.blunders, 0);
  const totalBrilliantMoves = games.reduce((acc, game) => acc + game.brilliantMoves, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your chess journey and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="card lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
              <User size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">Chess Player</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Member since {new Date().toLocaleDateString()}
            </p>
            <button className="btn btn-primary w-full flex items-center justify-center gap-2">
              <Settings size={18} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Overall Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-3xl font-bold text-blue-500">{games.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Games</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-3xl font-bold text-green-500">{totalMoves}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Moves</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-3xl font-bold text-yellow-500">{totalBrilliantMoves}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Brilliant Moves</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-3xl font-bold text-red-500">{totalBlunders}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Blunders</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award size={20} />
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg text-white">
                <p className="text-4xl mb-2">🏆</p>
                <p className="font-semibold">First Victory</p>
                <p className="text-sm text-yellow-100">Win your first game</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg text-white opacity-50">
                <p className="text-4xl mb-2">🎯</p>
                <p className="font-semibold">Sharpshooter</p>
                <p className="text-sm text-blue-100">Achieve 90% accuracy</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg text-white opacity-50">
                <p className="text-4xl mb-2">⚡</p>
                <p className="font-semibold">Brilliant Mind</p>
                <p className="text-sm text-purple-100">Make 10 brilliant moves</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white opacity-50">
                <p className="text-4xl mb-2">📚</p>
                <p className="font-semibold">Dedicated Student</p>
                <p className="text-sm text-green-100">Play 50 games</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-semibold">Default AI Difficulty</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose your preferred challenge level
              </p>
            </div>
            <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <option>Easy</option>
              <option selected>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-semibold">Show Move Hints</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get suggestions during gameplay
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
