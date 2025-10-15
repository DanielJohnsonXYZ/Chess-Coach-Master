import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { useGameStore } from '../stores/gameStore';
import type { Move } from '../types';

export const ChessBoard = () => {
  const { chess, makeMove, playerColor, currentTurn, isGameOver } = useGameStore();
  const [boardPosition, setBoardPosition] = useState(chess.fen());

  useEffect(() => {
    setBoardPosition(chess.fen());
  }, [chess]);

  const onDrop = ({ sourceSquare, targetSquare }: { piece: any; sourceSquare: string; targetSquare: string | null }) => {
    if (isGameOver || !targetSquare) return false;

    // Check if it's the player's turn
    const turn = chess.turn();
    const isPlayerTurn = (turn === 'w' && playerColor === 'white') || (turn === 'b' && playerColor === 'black');

    if (!isPlayerTurn) return false;

    const move: Move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Always promote to queen for simplicity
    };

    const moveResult = makeMove(move);

    if (moveResult) {
      setBoardPosition(chess.fen());

      // Trigger AI move after a short delay
      if (!chess.isGameOver() && playerColor !== currentTurn) {
        setTimeout(() => {
          makeAiMove();
        }, 500);
      }
    }

    return moveResult;
  };

  const makeAiMove = () => {
    const possibleMoves = chess.moves({ verbose: true });
    if (possibleMoves.length === 0) return;

    // Simple random move for now (we'll enhance this with Stockfish later)
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    const move: Move = {
      from: randomMove.from,
      to: randomMove.to,
      promotion: randomMove.promotion,
    };

    makeMove(move);
    setBoardPosition(chess.fen());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Chessboard
        options={{
          position: boardPosition,
          onPieceDrop: onDrop,
          boardOrientation: playerColor,
          boardStyle: {
            borderRadius: '8px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          },
          darkSquareStyle: { backgroundColor: '#779952' },
          lightSquareStyle: { backgroundColor: '#edeed1' },
        }}
      />
    </div>
  );
};
