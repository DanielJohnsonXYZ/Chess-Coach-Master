import { Trophy, Target, TrendingUp, Zap } from 'lucide-react';
import type { PerformanceMetrics } from '../types';

interface StatsCardsProps {
  metrics: PerformanceMetrics;
}

export const StatsCards = ({ metrics }: StatsCardsProps) => {
  const winRate = metrics.totalGames > 0
    ? ((metrics.wins / metrics.totalGames) * 100).toFixed(1)
    : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Games</p>
            <p className="text-3xl font-bold mt-2">{metrics.totalGames}</p>
          </div>
          <div className="bg-blue-400 bg-opacity-30 p-3 rounded-lg">
            <Trophy size={24} />
          </div>
        </div>
        <div className="mt-4 text-sm text-blue-100">
          {metrics.wins}W / {metrics.losses}L / {metrics.draws}D
        </div>
      </div>

      <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Win Rate</p>
            <p className="text-3xl font-bold mt-2">{winRate}%</p>
          </div>
          <div className="bg-green-400 bg-opacity-30 p-3 rounded-lg">
            <Target size={24} />
          </div>
        </div>
        <div className="mt-4 text-sm text-green-100">
          {metrics.wins} victories
        </div>
      </div>

      <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Avg Accuracy</p>
            <p className="text-3xl font-bold mt-2">{metrics.averageAccuracy.toFixed(1)}%</p>
          </div>
          <div className="bg-purple-400 bg-opacity-30 p-3 rounded-lg">
            <Zap size={24} />
          </div>
        </div>
        <div className="mt-4 text-sm text-purple-100">
          Keep it above 80%
        </div>
      </div>

      <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium">Trend</p>
            <p className="text-2xl font-bold mt-2 capitalize">{metrics.recentTrend}</p>
          </div>
          <div className="bg-orange-400 bg-opacity-30 p-3 rounded-lg">
            <TrendingUp size={24} />
          </div>
        </div>
        <div className="mt-4 text-sm text-orange-100">
          Based on last 10 games
        </div>
      </div>
    </div>
  );
};
