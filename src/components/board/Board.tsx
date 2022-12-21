import {
  useSelectedTile,
  useHoveredTile,
  useTiles,
} from '../../hooks/useGameStore';
import Tile from './Tile';

export const Board = () => {
  const tiles = useTiles();
  const selectedTile = useSelectedTile();
  const hoveredTile = useHoveredTile();

  return (
    <group>
      {tiles.map((tile) => (
        <Tile
          tile={tile}
          isSelected={selectedTile === tile.id}
          isHovered={hoveredTile === tile.id}
          key={tile.id}
        />
      ))}
    </group>
  );
};
