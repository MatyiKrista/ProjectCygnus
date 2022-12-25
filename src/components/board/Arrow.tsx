import React, { useMemo } from 'react';
import {
  useHighlightedTiles,
  useHoveredTile,
  useSelectedUnit,
  useTiles,
} from '../../hooks/useGameStore';
import { Color, QuadraticBezierCurve3 } from 'three';
import arrowVertexShader from '../../shaders/arrow/vertex.glsl?raw';
import arrowFragmentShader from '../../shaders/arrow/fragment.glsl?raw';

const Arrow = () => {
  const selectedUnit = useSelectedUnit();
  const hoveredTile = useHoveredTile();
  const highlightedTiles = useHighlightedTiles();
  const tiles = useTiles();
  const unitTile = tiles.find((tile) => tile.id === selectedUnit?.tileId);

  const color = useMemo(() => {
    return new Color(
      hoveredTile?.id && highlightedTiles.includes(hoveredTile?.id)
        ? 'cyan'
        : 'red'
    );
  }, [hoveredTile?.id]);

  if (!selectedUnit || !hoveredTile || !unitTile) return null;

  const from = unitTile.position;
  const to = hoveredTile.position;
  const midPoint = from.clone().lerp(to, 0.5).setZ(2);

  const curve = new QuadraticBezierCurve3(from, midPoint, to);

  return (
    <mesh position-z={0.25}>
      <tubeGeometry args={[curve, 20, 0.01, 8]} />
      <shaderMaterial
        vertexShader={arrowVertexShader}
        fragmentShader={arrowFragmentShader}
        uniforms={{
          uColor: { value: color },
        }}
        transparent={true}
      />
    </mesh>
  );
};

export default Arrow;
