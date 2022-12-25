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
import { TileData } from '../../types/game';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';
import { gameStore } from '../../store/gameStore';
import { useSelectTile } from '../../hooks/useGameStore';

type Props = {
  tile: TileData;
  isSelected: boolean;
  isHovered: boolean;
  isHighlighted: boolean;
};

const isSelectedColor = new Color(2, 2, 2);
const isHighlightedColor = new Color(0xff6d00ff);

const Tile = memo((props: Props) => {
  const tileMesh = useRef<Mesh>(null);
  const { tile, isSelected, isHovered, isHighlighted } = props;
  const selectTile = useSelectTile();

  const color = useMemo(() => {
    if (isSelected || isHovered) {
      return isSelectedColor;
    } else if (isHighlighted) {
      return isHighlightedColor;
    } else {
      return tile.color;
    }
  }, [isSelected, tile.color, isHighlighted, isHovered]);

  const clickHandler = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      selectTile(tile.id);
    },
    [tile.id]
  );

  const hoverHandler = useCallback((event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    gameStore.setState({ hoveredTile: tile.id });
  }, []);

  return (
    <mesh
      ref={tileMesh}
      onClick={clickHandler}
      onPointerOver={hoverHandler}
      onPointerLeave={() =>
        isHovered && gameStore.setState({ hoveredTile: null })
      }
      material={[
        new MeshStandardMaterial({
          color,
          side: FrontSide,
          toneMapped: false,
          ...(isSelected && { emissive: 'white' }),
        }),
        new ShaderMaterial({
          vertexShader: tileVertexShader,
          fragmentShader: tileFragmentShader,
          transparent: true,
          toneMapped: false,
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
