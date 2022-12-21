import { Color, Vector3 } from 'three';

export type UUID = string;

export type PlayerData = {
  name: string;
  id: UUID;
};

export type TileData = {
  position: Vector3;
  scale: Vector3;
  height: number;
  type: string;
  color: Color;
  owner?: PlayerData;
};

export type GameData = {
  tiles: TileData[];
  players: PlayerData[];
};
