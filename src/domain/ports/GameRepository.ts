import { Game } from '../../domain/entities/Game';

export interface GameRepository {
  getGame(): Game;
  saveGame(game: Game): void;
}
