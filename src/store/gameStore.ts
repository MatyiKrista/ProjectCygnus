import create from 'zustand';
import { GameData, UnitData, UUID } from '../types/game';

export const getMockedUnit = (tileId: UUID): UnitData => ({
  id: '1',
  tileId,
  owner: '1',
  type: 'soldier',
  stats: {
    health: {
      name: 'Health',
      value: 100,
      max: 100,
      min: 0,
      level: 1,
    },
    range: {
      name: 'Range',
      value: 4,
      max: 100,
      min: 0,
      level: 1,
    },
    attack: {
      name: 'Attack',
      value: 100,
      max: 100,
      min: 0,
      level: 1,
    },
    defense: {
      name: 'Defense',
      value: 100,
      max: 100,
      min: 0,
      level: 1,
    },
    experience: {
      level: 1,
      current: 0,
      next: 100,
      threshold: 100,
    },
  },
});

type GameStore = GameData & {
  selectTile: (id: UUID) => void;
  selectUnit: (id: UUID) => void;
};

export const gameStore = create<GameStore>((set) => ({
  tiles: [],
  units: [],
  players: [],
  selectedTile: null,
  selectedUnit: null,
  hoveredTile: null,
  selectTile: (tileId: UUID) => {
    set((state) => {
      const { units } = state;

      if (state.selectedTile === tileId) {
        return {
          ...state,
          selectedTile: null,
          selectedUnit: null,
        };
      }

      const unit = units.find((u) => u.tileId === tileId);

      return {
        selectedTile: tileId,
        selectedUnit: unit ? unit.id : null,
      };
    });
  },
  selectUnit: (unitId: UUID) => {
    set((state) => {
      if (state.selectedUnit === unitId) {
        return {
          ...state,
          selectedUnit: null,
          selectedTile: null,
        };
      }

      const unit = state.units.find((u) => u.id === unitId);

      return {
        selectedUnit: unitId,
        selectedTile: unit ? unit.tileId : null,
      };
    });
  },
}));
