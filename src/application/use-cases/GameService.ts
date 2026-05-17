import { Game } from '../../domain/entities/Game';
import type { GameRepository } from '../../domain/ports/GameRepository';

export class GameService {
  constructor(private gameRepository: GameRepository) {}

  startGame(): void {
    const game = new Game();
    this.gameRepository.saveGame(game);
  }

  makeMove(row: number, col: number): boolean {
    const game = this.gameRepository.getGame();
    const result = game.makeMove(row, col);
    if (result) {
      this.gameRepository.saveGame(game);
    }
    return result;
  }

  getGameState() {
    const game = this.gameRepository.getGame();
    return game.getState();
  }

  resetGame(): void {
    const game = this.gameRepository.getGame();
    game.reset();
    this.gameRepository.saveGame(game);
  }
}
