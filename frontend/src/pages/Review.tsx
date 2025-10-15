import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export const Review = () => {
  const { currentGameAnalysis } = useGameStore();
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Claude, your chess coach. Ask me anything about your games, openings, tactics, or general chess strategy!',
    },
  ]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput;
    setChatHistory([...chatHistory, { role: 'user', content: userMessage }]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await api.chat(userMessage, chatHistory);
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.response,
        },
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting to the coaching service. Please make sure the backend is running and your API key is configured.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Review & Coach</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze your games and chat with your AI coach
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Analysis Section */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare size={20} />
            Last Game Analysis
          </h3>

          {currentGameAnalysis ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Summary
                </h4>
                <p className="text-sm">{currentGameAnalysis.summary}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Key Moments
                </h4>
                <div className="space-y-2">
                  {currentGameAnalysis.keyMoments.map((moment, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        moment.type === 'blunder'
                          ? 'bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800'
                          : moment.type === 'brilliant'
                          ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800'
                          : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <p className="font-mono text-sm font-semibold">
                        Move {moment.moveNumber}: {moment.move}
                      </p>
                      <p className="text-sm mt-1">{moment.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Suggestions
                </h4>
                <ul className="space-y-2">
                  {currentGameAnalysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary-500">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No game analysis yet. Play a game to see detailed analysis!
              </p>
            </div>
          )}
        </div>

        {/* Chat with Coach */}
        <div className="card flex flex-col h-[600px]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare size={20} />
            Chat with Coach
          </h3>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {chatHistory.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Ask your coach anything..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
