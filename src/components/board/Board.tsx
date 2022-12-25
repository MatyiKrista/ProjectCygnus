import {
  useSelectedTile,
  useTiles,
  useUnits,
  useHighlightedTiles,
} from '../../hooks/useGameStore';
import Tile from './Tile';
import TileHighlight from './TileHighlight';
import Unit from '../unit/Unit';

export const Board = () => {
  const tiles = useTiles();
  const units = useUnits();
  const selectedTileId = useSelectedTile();
  const highlightedTileIds = useHighlightedTiles();

  const selectedTile = tiles.find((tile) => tile.id === selectedTileId);

  return (
    <group>
      {tiles.map((tile) => (
        <Tile
          tile={tile}
          isSelected={selectedTileId === tile.id}
          isHighlighted={highlightedTileIds.includes(tile.id)}
          key={tile.id}
        />
      ))}
      {units.map((unit) => (
        <Unit key={unit.id} unit={unit} />
      ))}
      {!!selectedTile && <TileHighlight tile={selectedTile} />}
    </group>
  );
};
