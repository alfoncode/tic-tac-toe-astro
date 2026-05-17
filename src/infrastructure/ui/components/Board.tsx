import { createSignal } from 'solid-js';
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

  const getStatusMessage = () => {
    if (state().winner) return `¡${state().winner} gana! 🎉`;
    if (state().isDraw) return '¡Empate! 🤝';
    return `Turno: ${state().currentPlayer}`;
  };

  const getStatusColor = () => {
    if (state().winner === 'X') return 'text-blue-600';
    if (state().winner === 'O') return 'text-red-600';
    if (state().isDraw) return 'text-gray-600';
    return 'text-gray-800';
  };

  return (
    <div class="flex flex-col items-center gap-6 p-8 max-w-md mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 tracking-tight">Tic Tac Toe</h1>
      
      <div class={`text-2xl font-semibold ${getStatusColor()} transition-colors duration-300`}>
        {getStatusMessage()}
      </div>
      
      <div class="grid grid-cols-3 gap-3 bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl shadow-lg">
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

      {state().isFinished && (
        <button 
          onClick={handleReset}
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Jugar de nuevo
        </button>
      )}
      
      <div class="text-sm text-gray-500 mt-4">
        Los 'X' son azules • Las 'O' son rojas
      </div>
    </div>
  );
}
