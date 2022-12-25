import {
  useSelectedTileId,
  useTiles,
  useUnits,
  useHighlightedTiles,
  useHoveredTileId,
} from '../../hooks/useGameStore';
import Tile from './Tile';
import TileHighlight from './TileHighlight';
import Unit from '../unit/Unit';
import Arrow from './Arrow';

export const Board = () => {
  const tiles = useTiles();
  const units = useUnits();
  const selectedTileId = useSelectedTileId();
  const hoveredTileId = useHoveredTileId();
  const highlightedTileIds = useHighlightedTiles();

  const selectedTile = tiles.find((tile) => tile.id === selectedTileId);

  return (
    <group>
      {tiles.map((tile) => (
        <Tile
          tile={tile}
          isSelected={selectedTileId === tile.id}
          isHovered={hoveredTileId === tile.id}
          isHighlighted={highlightedTileIds.includes(tile.id)}
          key={tile.id}
        />
      ))}
      {units.map((unit) => (
        <Unit key={unit.id} unit={unit} />
      ))}
      <Arrow />
      {!!selectedTile && <TileHighlight tile={selectedTile} />}
    </group>
  );
};
