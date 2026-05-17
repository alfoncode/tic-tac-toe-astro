import type { CellValue } from './CellValue';

export class Board {
  private cells: CellValue[][];

  constructor() {
    this.cells = Array(3).fill(null).map(() => Array(3).fill(null));
  }

  placeMark(row: number, col: number, mark: CellValue): boolean {
    if (row < 0 || row > 2 || col < 0 || col > 2) return false;
    if (this.cells[row][col] !== null) return false;
    
    this.cells[row][col] = mark;
    return true;
  }

  getCell(row: number, col: number): CellValue {
    return this.cells[row][col];
  }

  checkWinner(): CellValue {
    const lines = [
      // Rows
      [this.cells[0][0], this.cells[0][1], this.cells[0][2]],
      [this.cells[1][0], this.cells[1][1], this.cells[1][2]],
      [this.cells[2][0], this.cells[2][1], this.cells[2][2]],
      // Columns
      [this.cells[0][0], this.cells[1][0], this.cells[2][0]],
      [this.cells[0][1], this.cells[1][1], this.cells[2][1]],
      [this.cells[0][2], this.cells[1][2], this.cells[2][2]],
      // Diagonals
      [this.cells[0][0], this.cells[1][1], this.cells[2][2]],
      [this.cells[0][2], this.cells[1][1], this.cells[2][0]]
    ];

    for (const line of lines) {
      if (line[0] && line[0] === line[1] && line[0] === line[2]) {
        return line[0];
      }
    }
    return null;
  }

  isFull(): boolean {
    return this.cells.every(row => row.every(cell => cell !== null));
  }

  reset(): void {
    this.cells = Array(3).fill(null).map(() => Array(3).fill(null));
  }
}
