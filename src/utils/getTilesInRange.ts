import { TileData, UUID } from '../types/game';
import { gameStore } from '../store/gameStore';

export const getTilesInRange = (range: number, tile: TileData): UUID[] => {
  const tilesInRange: Set<UUID> = new Set();
  if (range === 0) {
    return [tile.id];
  }
  const { tiles } = gameStore.getState();
  const neighbourData = tiles.filter((t) => tile.neighborIds.includes(t.id));
  neighbourData.forEach((t) => {
    const foundTiles = getTilesInRange(range - 1, t);
    foundTiles.forEach((id) => tilesInRange.add(id));
  });
  return Array.from(tilesInRange);
};
