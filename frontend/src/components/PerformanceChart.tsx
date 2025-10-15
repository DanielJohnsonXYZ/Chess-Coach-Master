import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Game } from '../types';

interface PerformanceChartProps {
  games: Game[];
}

export const PerformanceChart = ({ games }: PerformanceChartProps) => {
  // Prepare data for the chart - show last 10 games
  const chartData = games
    .slice(0, 10)
    .reverse()
    .map((game, index) => ({
      game: `Game ${index + 1}`,
      accuracy: game.accuracy,
      date: new Date(game.date).toLocaleDateString(),
    }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
          <XAxis
            dataKey="game"
            className="text-xs"
            tick={{ fill: 'currentColor' }}
          />
          <YAxis
            domain={[0, 100]}
            className="text-xs"
            tick={{ fill: 'currentColor' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg)',
              border: '1px solid var(--tooltip-border)',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ fill: '#0ea5e9', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
