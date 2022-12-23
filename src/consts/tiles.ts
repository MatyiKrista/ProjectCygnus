import { TileConfig, TileType } from '../types/config';
import { COLORS } from './colors';

export const TILES: Record<TileType, TileConfig> = {
  OCEAN: {
    threshold: 0.21,
    color: COLORS.OCEAN,
    type: 'OCEAN',
  },
  SHORE: {
    threshold: 0.01,
    color: COLORS.SHORE,
    type: 'SHORE',
  },
  SAND: {
    threshold: 0.04,
    color: COLORS.SAND,
    type: 'SAND',
  },
  GRASS: {
    threshold: 0.1,
    color: COLORS.GRASS,
    type: 'GRASS',
  },
  FOREST: {
    threshold: 0.19,
    color: COLORS.FOREST,
    type: 'FOREST',
  },
  ROCK: {
    threshold: 0.24,
    color: COLORS.ROCK,
    type: 'ROCK',
  },
  ICE: {
    threshold: 0.6,
    color: COLORS.ICE,
    type: 'ICE',
  },
};
