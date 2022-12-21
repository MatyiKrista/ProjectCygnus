import React from 'react';
import tileHighlightVertexShader from '../../shaders/tileHighlight/vertex.glsl?raw';
import tileHighlightFragmentShader from '../../shaders/tileHighlight/fragment.glsl?raw';
import { TileGeometry } from './TileGeometry';
import { TileData } from '../../types/game';
import { Color } from 'three';
import { COLORS } from '../../consts/colors';

type Props = {
  tile: TileData;
};

const TileHighlight = (props: Props) => {
  const { tile } = props;

  return (
    <mesh
      position={[
        tile.position.x,
        tile.position.y,
        tile.position.z + tile.height + 0.5,
      ]}
      scale={[tile.scale.x, tile.scale.y, 0.5]}
      rotation-x={-Math.PI}
    >
      <TileGeometry />
      <shaderMaterial
        vertexShader={tileHighlightVertexShader}
        fragmentShader={tileHighlightFragmentShader}
        transparent={true}
        uniforms={{
          uColor: { value: new Color(COLORS.highlight) },
        }}
      />
    </mesh>
  );
};

export default TileHighlight;
