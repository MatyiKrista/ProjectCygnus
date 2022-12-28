import { gameStore } from '../../store/gameStore';
import { getTilesInRange } from '../../utils/getTilesInRange';
import { useMemo } from 'react';

export const useTiles = () => gameStore((state) => state.tiles);
export const useUnits = () => gameStore((state) => state.units);
export const useSelectedTileId = () => gameStore((state) => state.selectedTile);
export const useHoveredTileId = () => gameStore((state) => state.hoveredTile);
export const useSelectedUnitId = () => gameStore((state) => state.selectedUnit);
export const useSelectedTile = () =>
  gameStore((state) =>
    state.tiles.find((tile) => tile.id === state.selectedTile)
  );
export const useHoveredTile = () =>
  gameStore((state) =>
    state.tiles.find((tile) => tile.id === state.hoveredTile)
  );
export const useSelectedUnit = () =>
  gameStore((state) =>
    state.units.find((unit) => unit.id === state.selectedUnit)
  );
export const useHighlightedTiles = () => {
  const selectedTile = useSelectedTileId();
  const selectedUnit = useSelectedUnitId();

  return useMemo(() => {
    if (selectedTile && selectedUnit) {
      const state = gameStore.getState();
      const unit = state.units.find((u) => u.id === selectedUnit);
      const tile = state.tiles.find((t) => t.id === selectedTile);
      if (unit && tile) {
        return getTilesInRange(unit.stats.range.value, tile);
      }
    }

    return [];
  }, [selectedTile, selectedUnit]);
};
export const useSelectTile = () => gameStore((state) => state.selectTile);
export const useSelectUnit = () => gameStore((state) => state.selectUnit);
