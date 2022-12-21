import { FrontSide, MeshStandardMaterial, ShaderMaterial } from 'three';
import { Tile } from './Tile';
import { useTiles } from '../../hooks/useGameStore';
import tileVertexShader from '../../shaders/tile/vertex.glsl?raw';
import tileFragmentShader from '../../shaders/tile/fragment.glsl?raw';

export const Board = () => {
  const tiles = useTiles();

  return (
    <group>
      {tiles.map((tile) => (
        <mesh
          material={[
            new MeshStandardMaterial({ color: tile.color, side: FrontSide }),
            new ShaderMaterial({
              vertexShader: tileVertexShader,
              fragmentShader: tileFragmentShader,
              transparent: true,
              uniforms: {
                uColor: { value: tile.color },
              },
            }),
          ]}
          position={tile.position}
          scale={tile.scale}
        >
          <Tile />
        </mesh>
      ))}
    </group>
  );
};
