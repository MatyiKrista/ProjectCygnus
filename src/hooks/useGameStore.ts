import create from 'zustand';
import { GameData } from '../types/game';

export const useGameStore = create<GameData>(() => ({
  tiles: [],
  players: [],
}));

export const useTiles = () => useGameStore((state) => state.tiles);
