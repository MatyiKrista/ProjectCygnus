import { Canvas } from '@react-three/fiber';
import Game from '../components/game/Game';
import { CAMERA_PROPS } from '../consts/camera';
import UserInterface from '../components/interface/UserInterface';
import { gameStore } from '../store/gameStore';

const GameCanvas = () => {
  return (
    <>
      <Canvas
        onPointerMissed={() => gameStore.setState({ selectedTile: null })}
        shadows
        camera={CAMERA_PROPS}
      >
        <Game />
      </Canvas>
      <UserInterface />
    </>
  );
};

export default GameCanvas;
