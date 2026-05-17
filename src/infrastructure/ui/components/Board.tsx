import { createSignal, onMount } from 'solid-js';
import { InMemoryGameRepository } from '../../InMemoryGameRepository';
import { GameService } from '../../../application/use-cases/GameService';
import Cell from './Cell';

const gameRepository = new InMemoryGameRepository();
const gameService = new GameService(gameRepository);

export default function TicTacToeBoard() {
  const [state, setState] = createSignal(gameService.getGameState());

  const handleClick = (row: number, col: number) => {
    if (state().isFinished) return;
    gameService.makeMove(row, col);
    setState(gameService.getGameState());
  };

  const handleReset = () => {
    gameService.resetGame();
    setState(gameService.getGameState());
  };

  return (
    <div class="flex flex-col items-center gap-4 p-8">
      <h1 class="text-3xl font-bold text-gray-800">Tic Tac Toe</h1>
      
      <div class="grid grid-cols-3 gap-2 bg-gray-200 p-2 rounded-lg">
        {state().board.map((row: any, rowIdx: number) => 
          row.map((cell: any, colIdx: number) => (
            <Cell 
              value={cell} 
              onClick={() => handleClick(rowIdx, colIdx)} 
              disabled={state().isFinished || !!cell}
            />
          ))
        )}
      </div>

      <div class="text-xl font-semibold">
        {state().winner ? `Ganador: ${state().winner}` : 
         state().isDraw ? 'Empate' : 
         `Turno: ${state().currentPlayer}`}
      </div>

      {state().isFinished && (
        <button 
          onClick={handleReset}
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Reiniciar Juego
        </button>
      )}
    </div>
  );
}
