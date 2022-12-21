import { Canvas } from '@react-three/fiber';
import Game from './components/game/Game';
import { CAMERA_PROPS } from './consts/camera';
import { useGameStore } from './hooks/useGameStore';
import UserInterface from './components/ui/UserInterface';

const App = () => {
  return (
    <>
      <Canvas
        onPointerMissed={() => useGameStore.setState({ selectedTile: null })}
        shadows
        camera={CAMERA_PROPS}
      >
        <Game />
      </Canvas>
      <UserInterface />
    </>
  );
};

export default App;
