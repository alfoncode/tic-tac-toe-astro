export enum PlayerMark {
  X = 'X',
  O = 'O'
}

export class Player {
  constructor(public readonly mark: PlayerMark) {}
}
