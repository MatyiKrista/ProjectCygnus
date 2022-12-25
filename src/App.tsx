import { Canvas } from '@react-three/fiber';
import Game from './components/game/Game';
import { CAMERA_PROPS } from './consts/camera';
import UserInterface from './components/ui/UserInterface';
import { gameStore } from './store/gameStore';

const App = () => {
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

export default App;
