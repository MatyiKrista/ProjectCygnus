import Tile from './Tile';
import { TileData } from '../../types/game';

type Props = {
  tiles: TileData[];
  selectedTileId: string | null;
  hoveredTileId: string | null;
  highlightedTileIds: string[];
};

export const Board = ({
  tiles,
  selectedTileId,
  hoveredTileId,
  highlightedTileIds,
}: Props) => {
  return (
    <group rotation-x={-Math.PI * 0.5}>
      {tiles.map((tile) => (
        <Tile
          tile={tile}
          isSelected={selectedTileId === tile.id}
          isHovered={hoveredTileId === tile.id}
          isHighlighted={highlightedTileIds.includes(tile.id)}
          key={tile.id}
        />
      ))}
    </group>
  );
};
