import { Canvas } from '@react-three/fiber';
import Game from '../components/game/Game';
import { CAMERA_PROPS } from '../consts/camera';
import UserInterface from '../components/interface/UserInterface';
import { gameStore } from '../store/gameStore';
import { useGame } from '../hooks/game/useGame';
import { Navigate, useParams } from 'react-router-dom';

const GameCanvas = () => {
  const { id } = useParams();
  const [game, isLoading] = useGame(id);

  if (isLoading) return <div>Loading</div>;

  if (!game && !isLoading) return <Navigate to='/' replace />;

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
