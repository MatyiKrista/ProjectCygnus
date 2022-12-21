import { Canvas } from '@react-three/fiber';
import Game from './components/game/Game';
import { CAMERA_PROPS } from './consts/camera';

const App = () => {
  return (
    <Canvas shadows camera={CAMERA_PROPS}>
      <Game />
    </Canvas>
  );
};

export default App;
