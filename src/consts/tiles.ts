import { TileConfig, TileType } from '../types/config';

export const TILES: Record<TileType, TileConfig> = {
  ocean: {
    threshold: 0.21,
    color: '#b2c5c1',
    type: 'ocean',
  },
  shore: {
    threshold: 0.01,
    color: '#98a6a1',
    type: 'shore',
  },
  beach: {
    threshold: 0.04,
    color: '#695c79',
    type: 'beach',
  },
  grass: {
    threshold: 0.1,
    color: '#7c616f',
    type: 'grass',
  },
  forest: {
    threshold: 0.29,
    color: '#7e4163',
    type: 'forest',
  },
  stone: {
    threshold: 0.36,
    color: '#333232',
    type: 'stone',
  },
  ice: {
    threshold: 0.6,
    color: '#9aa7ad',
    type: 'ice',
  },
};
