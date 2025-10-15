import { useGameStore } from '../stores/gameStore';

export const MoveHistory = () => {
  const { gameHistory } = useGameStore();

  // Group moves into pairs (white and black)
  const movePairs = [];
  for (let i = 0; i < gameHistory.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: gameHistory[i],
      black: gameHistory[i + 1] || '',
    });
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Move History</h3>
      <div className="max-h-96 overflow-y-auto">
        {movePairs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No moves yet</p>
        ) : (
          <table className="w-full text-sm font-mono">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-2 w-12">#</th>
                <th className="text-left p-2">White</th>
                <th className="text-left p-2">Black</th>
              </tr>
            </thead>
            <tbody>
              {movePairs.map((pair) => (
                <tr
                  key={pair.number}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-2 text-gray-500">{pair.number}</td>
                  <td className="p-2">{pair.white}</td>
                  <td className="p-2">{pair.black}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
