import { OrbitControls, Environment } from '@react-three/drei';
import { Board } from '../board/Board';
import { generateTiles } from '../../utils/generateTiles';
import { Perf } from 'r3f-perf';
import { getMockedUnit, gameStore } from '../../store/gameStore';

const tiles = generateTiles();
gameStore.setState({ tiles });
const unit = getMockedUnit(tiles[0].id);
gameStore.setState({ units: [unit] });

const Game = () => {
  return (
    <>
      <color args={['#000']} attach='background' />
      <Perf position='top-left' />
      <OrbitControls maxDistance={10} minDistance={1.5} enablePan={false} />
      <Environment preset='sunset' />
      <group rotation-x={-Math.PI * 0.5}>
        <Board />
      </group>
    </>
  );
};

export default Game;
