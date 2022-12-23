import { Color, Vector3 } from 'three';
import { BuildingType, TileType } from './config';

export type UUID = string;

export type PlayerData = {
  name: string;
  id: UUID;
};

export type TileData = {
  id: UUID;
  position: Vector3;
  scale: Vector3;
  originalHeight: number;
  height: number;
  type: TileType;
  color: Color;
  owner?: PlayerData;
  neighborIds: UUID[];
  building?: BuildingType | null;
};

export type GameData = {
  tiles: TileData[];
  players: PlayerData[];
  selectedTile: UUID | null;
  hoveredTile: UUID | null;
  highlightedTiles: UUID[];
};
