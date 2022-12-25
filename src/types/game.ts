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

export type Stat = {
  name: string;
  value: number;
  max: number;
  min: number;
  level: number;
};

export type Experience = {
  level: number;
  current: number;
  next: number;
  threshold: number;
};

export type UnitData = {
  id: UUID;
  tileId: UUID;
  owner: UUID;
  type: string;
  stats: {
    health: Stat;
    range: Stat;
    attack: Stat;
    defense: Stat;
    experience: Experience;
  };
};

export type GameData = {
  tiles: TileData[];
  units: UnitData[];
  players: PlayerData[];
  selectedTile: UUID | null;
  selectedUnit: UUID | null;
  hoveredTile: UUID | null;
};
