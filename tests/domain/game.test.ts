import { describe, it, expect } from 'vitest';
import { Game } from '../../src/domain/entities/Game';

describe('Game', () => {
  it('should start with empty board and X as first player', () => {
    const game = new Game();
    const state = game.getState();
    expect(state.currentPlayer).toBe('X');
    expect(state.winner).toBeNull();
    expect(state.isDraw).toBe(false);
  });

  it('should make a valid move', () => {
    const game = new Game();
    expect(game.makeMove(0, 0)).toBe(true);
    const state = game.getState();
    expect(state.board[0][0]).toBe('X');
    expect(state.currentPlayer).toBe('O');
  });

  it('should not make invalid move on occupied cell', () => {
    const game = new Game();
    game.makeMove(0, 0);
    expect(game.makeMove(0, 0)).toBe(false);
  });

  it('should detect winner correctly', () => {
    const game = new Game();
    // X makes three in a row
    game.makeMove(0, 0); // X
    game.makeMove(1, 0); // O
    game.makeMove(0, 1); // X
    game.makeMove(1, 1); // O
    game.makeMove(0, 2); // X wins
    const state = game.getState();
    expect(state.winner).toBe('X');
    expect(state.isFinished).toBe(true);
  });

  it('should detect draw', () => {
    const game = new Game();
    // Fill the board without a winner
    const moves = [
      [0,0], [0,1], [0,2],
      [1,1], [1,0], [1,2],
      [2,2], [2,0], [2,1]
    ];
    moves.forEach(([row, col]) => game.makeMove(row as number, col as number));
    const state = game.getState();
    expect(state.isDraw).toBe(true);
    expect(state.winner).toBeNull();
    expect(state.isFinished).toBe(true);
  });

  it('should reset the game', () => {
    const game = new Game();
    game.makeMove(0, 0);
    game.reset();
    const state = game.getState();
    expect(state.board[0][0]).toBeNull();
    expect(state.currentPlayer).toBe('X');
    expect(state.winner).toBeNull();
    expect(state.isDraw).toBe(false);
  });
});
