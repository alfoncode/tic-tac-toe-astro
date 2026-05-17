import { describe, it, expect } from 'vitest';
import { Board } from '../../src/domain/entities/Board';
import type { CellValue } from '../../src/domain/entities/CellValue';

describe('Board', () => {
  it('should initialize with empty cells', () => {
    const board = new Board();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        expect(board.getCell(row, col)).toBeNull();
      }
    }
  });

  it('should place a mark on valid position', () => {
    const board = new Board();
    expect(board.placeMark(0, 0, 'X' as CellValue)).toBe(true);
    expect(board.getCell(0, 0)).toBe('X');
  });

  it('should not place a mark on occupied position', () => {
    const board = new Board();
    board.placeMark(0, 0, 'X' as CellValue);
    expect(board.placeMark(0, 0, 'O' as CellValue)).toBe(false);
    expect(board.getCell(0, 0)).toBe('X');
  });

  it('should detect a row winner', () => {
    const board = new Board();
    board.placeMark(0, 0, 'X' as CellValue);
    board.placeMark(0, 1, 'X' as CellValue);
    board.placeMark(0, 2, 'X' as CellValue);
    expect(board.checkWinner()).toBe('X');
  });

  it('should detect a column winner', () => {
    const board = new Board();
    board.placeMark(0, 0, 'O' as CellValue);
    board.placeMark(1, 0, 'O' as CellValue);
    board.placeMark(2, 0, 'O' as CellValue);
    expect(board.checkWinner()).toBe('O');
  });

  it('should detect a diagonal winner', () => {
    const board = new Board();
    board.placeMark(0, 0, 'X' as CellValue);
    board.placeMark(1, 1, 'X' as CellValue);
    board.placeMark(2, 2, 'X' as CellValue);
    expect(board.checkWinner()).toBe('X');
  });

  it('should detect when board is full', () => {
    const board = new Board();
    const marks: CellValue[] = ['X', 'O', 'X', 'O', 'X', 'X', 'X', 'O', 'O'];
    let idx = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        board.placeMark(row, col, marks[idx++]);
      }
    }
    expect(board.isFull()).toBe(true);
  });

  it('should reset the board', () => {
    const board = new Board();
    board.placeMark(0, 0, 'X' as CellValue);
    board.reset();
    expect(board.getCell(0, 0)).toBeNull();
  });
});
