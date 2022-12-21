import React, { memo, useCallback, useMemo, useRef } from 'react';
import {
  Color,
  FrontSide,
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
} from 'three';
import tileVertexShader from '../../shaders/tile/vertex.glsl?raw';
import tileFragmentShader from '../../shaders/tile/fragment.glsl?raw';
import { TileGeometry } from './TileGeometry';
import { useGameStore } from '../../hooks/useGameStore';
import { TileData } from '../../types/game';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';

type Props = {
  tile: TileData;
  isSelected: boolean;
  isHovered: boolean;
};

const isSelectedColor = new Color('white');

const Tile = memo((props: Props) => {
  const tileMesh = useRef<Mesh>(null);
  const { tile, isSelected, isHovered } = props;

  const color = useMemo(
    () => (isSelected || isHovered ? isSelectedColor : tile.color),
    [isSelected, tile.color, isHovered]
  );

  const clickHandler = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      useGameStore.setState({ selectedTile: isSelected ? null : tile.id });
    },
    [tile.id]
  );

  // const hoverHandler = useCallback((event: ThreeEvent<MouseEvent>) => {
  //   event.stopPropagation();
  //   useGameStore.setState({ hoveredTile: tile.id });
  // }, []);

  return (
    <mesh
      ref={tileMesh}
      onClick={clickHandler}
      // TODO ADD BACK IF PERFORMANCE IS STABLE
      // onPointerOver={hoverHandler}
      // onPointerLeave={() =>
      //   isHovered && useGameStore.setState({ hoveredTile: null })
      // }
      material={[
        new MeshStandardMaterial({
          color,
          side: FrontSide,
          ...(isSelected && { emissive: 'white' }),
        }),
        new ShaderMaterial({
          vertexShader: tileVertexShader,
          fragmentShader: tileFragmentShader,
          transparent: true,
          uniforms: {
            uColor: { value: color },
          },
        }),
      ]}
      position={tile.position}
      scale={tile.scale}
    >
      <TileGeometry />
    </mesh>
  );
});

export default Tile;
