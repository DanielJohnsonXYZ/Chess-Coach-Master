import Anthropic from '@anthropic-ai/sdk';
import prompts from '../prompts/chess_coach.json';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GameAnalysisResult {
  summary: string;
  keyMoments: Array<{
    moveNumber: number;
    move: string;
    type: 'blunder' | 'mistake' | 'good' | 'brilliant';
    description: string;
    evaluation: number;
  }>;
  suggestions: string[];
  recurringPatterns: string[];
  strengthsAndWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
}

export const analyzeGame = async (
  pgn: string,
  playerColor: 'white' | 'black',
  result: 'win' | 'loss' | 'draw'
): Promise<GameAnalysisResult> => {
  const userPrompt = prompts.game_analysis.user_template
    .replace('{pgn}', pgn)
    .replace('{player_color}', playerColor)
    .replace('{result}', result);

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    system: prompts.game_analysis.system,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    try {
      return JSON.parse(content.text);
    } catch (error) {
      // If JSON parsing fails, create a structured response from text
      return {
        summary: content.text.substring(0, 200),
        keyMoments: [],
        suggestions: ['Review the full analysis for detailed feedback'],
        recurringPatterns: [],
        strengthsAndWeaknesses: {
          strengths: [],
          weaknesses: [],
        },
      };
    }
  }

  throw new Error('Unexpected response format from Claude');
};

export const chatWithCoach = async (
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> => {
  const messages = [
    ...conversationHistory.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    {
      role: 'user' as const,
      content: userMessage,
    },
  ];

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: prompts.coach_chat.system,
    messages,
  });

  const content = message.content[0];
  if (content.type === 'text') {
    return content.text;
  }

  throw new Error('Unexpected response format from Claude');
};

export const generateWeeklyReflection = async (
  gamesSummary: string
): Promise<string> => {
  const userPrompt = prompts.weekly_reflection.user_template.replace(
    '{games_summary}',
    gamesSummary
  );

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: prompts.weekly_reflection.system,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    return content.text;
  }

  throw new Error('Unexpected response format from Claude');
};

export const generateHint = async (
  fen: string,
  playerColor: 'white' | 'black'
): Promise<string> => {
  const userPrompt = prompts.hint_generation.user_template
    .replace('{fen}', fen)
    .replace('{player_color}', playerColor);

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 256,
    system: prompts.hint_generation.system,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    return content.text;
  }

  throw new Error('Unexpected response format from Claude');
};
