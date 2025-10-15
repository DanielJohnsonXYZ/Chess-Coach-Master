import { useEffect, useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { StatsCards } from '../components/StatsCards';
import { PerformanceChart } from '../components/PerformanceChart';
import type { PerformanceMetrics } from '../types';
import { BookOpen, Brain } from 'lucide-react';

export const Dashboard = () => {
  const { games, loadGames } = useGameStore();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalGames: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    averageAccuracy: 0,
    openingSuccessRate: {},
    tacticalRating: 1200,
    positionalRating: 1200,
    endgameRating: 1200,
    recentTrend: 'stable',
  });

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  useEffect(() => {
    if (games.length > 0) {
      const wins = games.filter((g) => g.result === 'win').length;
      const losses = games.filter((g) => g.result === 'loss').length;
      const draws = games.filter((g) => g.result === 'draw').length;
      const avgAccuracy = games.reduce((acc, g) => acc + g.accuracy, 0) / games.length;

      // Calculate trend based on last 10 games
      let trend: 'improving' | 'stable' | 'declining' = 'stable';
      if (games.length >= 10) {
        const recent = games.slice(0, 5);
        const older = games.slice(5, 10);
        const recentAvg = recent.reduce((acc, g) => acc + g.accuracy, 0) / recent.length;
        const olderAvg = older.reduce((acc, g) => acc + g.accuracy, 0) / older.length;

        if (recentAvg > olderAvg + 5) trend = 'improving';
        else if (recentAvg < olderAvg - 5) trend = 'declining';
      }

      setMetrics({
        totalGames: games.length,
        wins,
        losses,
        draws,
        averageAccuracy: avgAccuracy,
        openingSuccessRate: {},
        tacticalRating: 1200 + wins * 10,
        positionalRating: 1200 + wins * 8,
        endgameRating: 1200 + wins * 12,
        recentTrend: trend,
      });
    }
  }, [games]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress and see how you're improving
        </p>
      </div>

      <StatsCards metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart games={games} />
        </div>

        <div className="space-y-4">
          <div className="card bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-400 bg-opacity-30 p-3 rounded-lg">
                <Brain size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">AI Insight</h3>
                <p className="text-sm text-indigo-100">
                  {games.length === 0
                    ? 'Play your first game to get personalized insights!'
                    : 'You\'re improving! Keep focusing on endgame positions.'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                <BookOpen size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Study Suggestion</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Practice tactical puzzles to sharpen your pattern recognition
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Games</h3>
        {games.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No games yet. Start playing to see your history!
          </p>
        ) : (
          <div className="space-y-2">
            {games.slice(0, 5).map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold text-white ${
                      game.result === 'win'
                        ? 'bg-green-500'
                        : game.result === 'loss'
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {game.result === 'win' ? '🎉' : game.result === 'loss' ? '😔' : '🤝'}
                  </div>
                  <div>
                    <p className="font-semibold capitalize">
                      {game.result} vs {game.opponent}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(game.date).toLocaleDateString()} • {game.moveCount} moves
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{game.accuracy}%</p>
                  <p className="text-sm text-gray-500">Accuracy</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
