import { Game } from '../domain/entities/Game';
import type { GameRepository } from '../domain/ports/GameRepository';

export class InMemoryGameRepository implements GameRepository {
  private game: Game | null = null;

  getGame(): Game {
    if (!this.game) {
      this.game = new Game();
    }
    return this.game;
  }

  saveGame(game: Game): void {
    this.game = game;
  }
}
