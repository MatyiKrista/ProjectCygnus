import { generateHexagonScatter } from './generateHexagonScatter';
import { generateNoise } from './generateNoise';
import { TileData } from '../types/game';
import { getTileSpec } from './getTileSpec';
import { Vector3 } from 'three';
import { TILES } from '../consts/tiles';
import { CoordinateConfig } from '../types/config';

const baseScale = 0.05;

const distance = (a: Vector3, b: Vector3): number => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const getNeighbors = (
  position: Vector3,
  coordinateMap: Map<Vector3, CoordinateConfig>
): CoordinateConfig[] => {
  const neighbors: CoordinateConfig[] = [];
  coordinateMap.forEach((config, pos) => {
    if (distance(position, pos) < 0.22) {
      neighbors.push(config);
    }
  });
  return neighbors;
};

export const generateTiles = (): TileData[] => {
  const noise = generateNoise();
  const hexagonScatter = generateHexagonScatter();

  const positionMap = new Map<Vector3, CoordinateConfig>();

  hexagonScatter.forEach((config) => {
    positionMap.set(config.position, config);
  });

  const tiles = hexagonScatter.map((config) => {
    const noiseHeight = noise(config.position);
    const neighbors = getNeighbors(config.position, positionMap);
    const buildingHeight = TILES.grass.threshold + TILES.ocean.threshold;

    const height =
      config.building || neighbors.some((neighbor) => neighbor.building)
        ? buildingHeight
        : noiseHeight;

    const calculatedHeight =
      (height <= TILES.ocean.threshold ? TILES.ocean.threshold : height) *
      baseScale *
      10;

    const scale = new Vector3(baseScale, baseScale, calculatedHeight);

    return {
      id: config.id,
      position: config.position,
      originalHeight: height,
      height: calculatedHeight,
      neighborIds: neighbors.map((neighbor) => neighbor.id),
      scale,
    };
  });

  return tiles.map((tile) => ({
    ...tile,
    ...getTileSpec(tile.originalHeight),
  }));
};
