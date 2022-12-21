import { TileConfig, TileType } from '../types/config';
import { COLORS } from './colors';

export const TILES: Record<TileType, TileConfig> = {
  ocean: {
    threshold: 0.21,
    color: COLORS.ocean,
    type: 'ocean',
  },
  shore: {
    threshold: 0.01,
    color: COLORS.shore,
    type: 'shore',
  },
  sand: {
    threshold: 0.04,
    color: COLORS.sand,
    type: 'sand',
  },
  grass: {
    threshold: 0.1,
    color: COLORS.grass,
    type: 'grass',
  },
  forest: {
    threshold: 0.19,
    color: COLORS.forest,
    type: 'forest',
  },
  rock: {
    threshold: 0.24,
    color: COLORS.rock,
    type: 'rock',
  },
  ice: {
    threshold: 0.6,
    color: COLORS.ice,
    type: 'ice',
  },
};
