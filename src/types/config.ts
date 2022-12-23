import { Vector2, Vector3 } from 'three';
import { UUID } from './game';

export type TileType =
  | 'ocean'
  | 'shore'
  | 'sand'
  | 'grass'
  | 'forest'
  | 'rock'
  | 'ice';

export type BuildingType = 'base' | 'factory' | 'mine';

export type TileConfig = {
  color: string;
  threshold: number;
  type: TileType;
};

export type CoordinateConfig = {
  id: UUID;
  position: Vector3;
  coordinates: Vector2;
  building?: BuildingType;
};
