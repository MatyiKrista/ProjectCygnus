import {
  useSelectedTile,
  useHoveredTile,
  useTiles,
} from '../../hooks/useGameStore';
import Tile from './Tile';
import TileHighlight from './TileHighlight';

export const Board = () => {
  const tiles = useTiles();
  const selectedTileId = useSelectedTile();
  const hoveredTileId = useHoveredTile();

  const selectedTile = tiles.find((tile) => tile.id === selectedTileId);

  return (
    <group>
      {tiles.map((tile) => (
        <Tile
          tile={tile}
          isSelected={selectedTileId === tile.id}
          isHovered={hoveredTileId === tile.id}
          key={tile.id}
        />
      ))}
      {!!selectedTile && <TileHighlight tile={selectedTile} />}
    </group>
  );
};
