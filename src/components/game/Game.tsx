import { OrbitControls, Environment } from '@react-three/drei';
import { Board } from '../board/Board';
import { generateTiles } from '../../utils/generateTiles';
import { Perf } from 'r3f-perf';
import { getMockedUnit, gameStore } from '../../store/gameStore';
import {
  useHighlightedTiles,
  useHoveredTileId,
  useSelectedTileId,
  useTiles,
  useUnits,
} from '../../hooks/store/useGameStore';
import Units from '../units/Units';
import Indicators from '../indicators/Indicators';

const tiles = generateTiles();
gameStore.setState({ tiles });
const unit = getMockedUnit(tiles[0].id);
gameStore.setState({ units: [unit] });

const Game = () => {
  const tiles = useTiles();
  const units = useUnits();
  const selectedTileId = useSelectedTileId();
  const hoveredTileId = useHoveredTileId();
  const highlightedTileIds = useHighlightedTiles();

  const selectedTile = tiles.find((tile) => tile.id === selectedTileId);

  return (
    <>
      <color args={['#000']} attach='background' />
      <Perf position='top-left' />
      <OrbitControls maxDistance={10} minDistance={1.5} enablePan={false} />
      <Environment preset='sunset' />
      <group rotation-x={-Math.PI * 0.5}>
        <Board
          tiles={tiles}
          highlightedTileIds={highlightedTileIds}
          hoveredTileId={hoveredTileId}
          selectedTileId={selectedTileId}
        />
        <Units units={units} />
        <Indicators selectedTile={selectedTile} />
      </group>
    </>
  );
};

export default Game;
