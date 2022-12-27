import React, { useEffect, useRef } from 'react';
import {
  useHighlightedTiles,
  useHoveredTile,
  useSelectedUnit,
  useTiles,
} from '../../hooks/useGameStore';
import { QuadraticBezierCurve3, ShaderMaterial } from 'three';
import arrowVertexShader from '../../shaders/arrow/vertex.glsl?raw';
import arrowFragmentShader from '../../shaders/arrow/fragment.glsl?raw';

const Arrow = () => {
  const selectedUnit = useSelectedUnit();
  const hoveredTile = useHoveredTile();
  const highlightedTiles = useHighlightedTiles();
  const tiles = useTiles();
  const unitTile = tiles.find((tile) => tile.id === selectedUnit?.tileId);
  const material = useRef<ShaderMaterial>(null);

  const isHoveredInHighlightedTiles =
    hoveredTile && highlightedTiles.includes(hoveredTile?.id);
  const isValid =
    isHoveredInHighlightedTiles && hoveredTile.id !== unitTile?.id;

  useEffect(() => {}, [hoveredTile?.id]);

  if (!selectedUnit || !hoveredTile || !unitTile || !isValid) return null;

  const from = unitTile.position;
  const to = hoveredTile.position;
  const midPoint = from.clone().lerp(to, 0.5).setZ(1);

  const curve = new QuadraticBezierCurve3(from, midPoint, to);

  return (
    <mesh position-z={0.25}>
      <tubeGeometry args={[curve, 40, 0.01, 8]} />
      <shaderMaterial
        ref={material}
        vertexShader={arrowVertexShader}
        fragmentShader={arrowFragmentShader}
        transparent={true}
      />
    </mesh>
  );
};

export default Arrow;
