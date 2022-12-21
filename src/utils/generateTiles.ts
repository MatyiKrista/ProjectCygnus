import { generateHexagonScatter } from './generateHexagonScatter';
import { generateNoise } from './generateNoise';
import { TileData } from '../types/game';
import { getTileSpec } from './getTileSpec';
import { Vector3 } from 'three';
import { TILES } from '../consts/tiles';
import { v4 as uuid } from 'uuid';

const radius = 20;
const baseScale = 0.01;

export const generateTiles = (): TileData[] => {
  const noise = generateNoise();
  const hexagonScatter = generateHexagonScatter(radius);
  const tiles = hexagonScatter.map((position) => {
    const height = noise(position);
    const calculatedHeight =
      (height <= TILES.ocean.threshold ? TILES.ocean.threshold : height) *
      baseScale *
      10;
    const scale = new Vector3(baseScale, baseScale, calculatedHeight);
    return {
      id: uuid(),
      position,
      height,
      scale,
    };
  });
  return tiles.map((tile) => ({
    ...tile,
    ...getTileSpec(tile.height),
  }));
};
