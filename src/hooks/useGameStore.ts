import create from 'zustand';
import { GameData } from '../types/game';

export const useGameStore = create<GameData>(() => ({
  tiles: [],
  players: [],
  selectedTile: null,
  hoveredTile: null,
}));

export const useTiles = () => useGameStore((state) => state.tiles);
export const useSelectedTile = () =>
  useGameStore((state) => state.selectedTile);
export const useHoveredTile = () => useGameStore((state) => state.hoveredTile);
