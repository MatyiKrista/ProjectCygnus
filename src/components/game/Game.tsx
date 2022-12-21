import { OrbitControls, Environment } from '@react-three/drei';
import { Board } from '../board/Board';
import { generateTiles } from '../../utils/generateTiles';
import { useGameStore } from '../../hooks/useGameStore';
import { Perf } from 'r3f-perf';

const tiles = generateTiles();
useGameStore.setState({ tiles });

const Game = () => {
  return (
    <>
      <color args={['#fff']} attach='background' />
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
