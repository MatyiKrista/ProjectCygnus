export type TileType =
  | 'ocean'
  | 'shore'
  | 'beach'
  | 'grass'
  | 'forest'
  | 'stone'
  | 'ice';

export type TileConfig = {
  color: string;
  threshold: number;
  type: TileType;
};
