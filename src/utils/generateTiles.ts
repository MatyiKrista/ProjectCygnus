import { generateHexagonScatter } from './generateHexagonScatter';
import { generateNoise } from './generateNoise';
import { TileData } from '../types/game';
import { getTileSpec } from './getTileSpec';

export const generateTiles = (): TileData[] => {
  const noise = generateNoise();
  const hexagonScatter = generateHexagonScatter(20);
  const tiles = hexagonScatter.map((position) => {
    const height = noise(position);
    return {
      position,
      height,
    };
  });
  return tiles.map((tile) => ({
    ...tile,
    ...getTileSpec(tile.height),
  }));
};
