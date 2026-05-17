import { Board } from './Board';
import { Player, PlayerMark } from './Player';
import type { CellValue } from './CellValue';

export class Game {
  private board: Board;
  private currentPlayer: Player;
  private winner: CellValue;
  private isDraw: boolean;

  constructor() {
    this.board = new Board();
    this.currentPlayer = new Player(PlayerMark.X);
    this.winner = null;
    this.isDraw = false;
  }

  makeMove(row: number, col: number): boolean {
    if (this.winner || this.isDraw) return false;
    
    const success = this.board.placeMark(row, col, this.currentPlayer.mark);
    if (!success) return false;

    const winner = this.board.checkWinner();
    if (winner) {
      this.winner = winner;
    } else if (this.board.isFull()) {
      this.isDraw = true;
    } else {
      this.currentPlayer = new Player(
        this.currentPlayer.mark === PlayerMark.X ? PlayerMark.O : PlayerMark.X
      );
    }
    return true;
  }

  getState() {
    return {
      board: Array(3).fill(null).map((_, row) => 
        Array(3).fill(null).map((_, col) => this.board.getCell(row, col))
      ),
      currentPlayer: this.currentPlayer.mark,
      winner: this.winner,
      isDraw: this.isDraw,
      isFinished: !!this.winner || this.isDraw
    };
  }

  reset(): void {
    this.board.reset();
    this.currentPlayer = new Player(PlayerMark.X);
    this.winner = null;
    this.isDraw = false;
  }
}
