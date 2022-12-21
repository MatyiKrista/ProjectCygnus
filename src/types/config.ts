export type TileType =
  | 'ocean'
  | 'shore'
  | 'sand'
  | 'grass'
  | 'forest'
  | 'rock'
  | 'ice';

export type TileConfig = {
  color: string;
  threshold: number;
  type: TileType;
};
