import { Color, Vector3 } from 'three';
import { CoordinateConfig, TileType } from './config';

export type UUID = string;

export type PlayerData = {
  name: string;
  id: UUID;
};

export type TileData = {
  scale: Vector3;
  originalHeight: number;
  height: number;
  type: TileType;
  color: Color;
  owner?: PlayerData;
  neighborIds: UUID[];
} & CoordinateConfig;

export type GameData = {
  tiles: TileData[];
  players: PlayerData[];
  selectedTile: UUID | null;
  hoveredTile: UUID | null;
  highlightedTiles: UUID[];
};
