export type TileType =
  | 'ocean'
  | 'sand'
  | 'beach'
  | 'grass'
  | 'forest'
  | 'rock'
  | 'ice';

export type TileConfig = {
  color: string;
  threshold: number;
  type: TileType;
};
