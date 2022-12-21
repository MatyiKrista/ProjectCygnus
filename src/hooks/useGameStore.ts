import create from 'zustand';
import { GameData } from '../types/game';

const useGameStore = create<GameData>((set) => ({
  tiles: [],
  players: [],
}));
