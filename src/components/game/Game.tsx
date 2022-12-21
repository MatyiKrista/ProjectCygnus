import { OrbitControls, Environment } from '@react-three/drei';
import { Board } from '../board/Board';
import { generateTiles } from '../../utils/generateTiles';

const tiles = generateTiles();

const Game = () => {
  return (
    <>
      <OrbitControls />
      <Environment preset='sunset' />
      <group rotation-x={-Math.PI / 2}>
        <Board tiles={tiles} />
      </group>
    </>
  );
};

export default Game;
