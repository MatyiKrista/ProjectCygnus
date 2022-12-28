import React, { useCallback, useEffect, useMemo } from 'react';
import { GENERATION } from '../../consts/generation';
import { UnitData } from '../../types/game';
import {
  useSelectedUnitId,
  useSelectUnit,
  useTiles,
} from '../../hooks/useGameStore';
import { Vector3 } from 'three';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';
import { useSpring, animated } from '@react-spring/three';

const { SCALE } = GENERATION;

type Props = {
  unit: UnitData;
};

const UNIT_SCALE = SCALE * 0.5;

const Unit = (props: Props) => {
  const { unit } = props;

  const tiles = useTiles();
  const selectedUnitId = useSelectedUnitId();
  const selectUnit = useSelectUnit();
  const isSelected = selectedUnitId === unit.id;

  const tile = useMemo(
    () => tiles.find((tile) => tile.id === unit.tileId),
    [unit.tileId, tiles]
  );

  const tilePosition = useMemo(
    () => tile?.position ?? new Vector3(),
    [tile?.position]
  );

  const tileHeight = useMemo(() => tile?.height ?? 0, [tile?.height]);

  const [springs, api] = useSpring(() => ({
    from: {
      x: tilePosition.x,
      y: tilePosition.y,
      z: tilePosition.z + tileHeight + UNIT_SCALE * 0.5,
    },
    config: {
      mass: 1,
      friction: 20,
      tension: 200,
    },
  }));

  useEffect(() => {
    api.start({
      to: [
        {
          x: tilePosition.x,
          y: tilePosition.y,
          z: 1,
        },
        {
          x: tilePosition.x,
          y: tilePosition.y,
          z: tilePosition.z + tileHeight + UNIT_SCALE * 0.5,
        },
      ],
    });
  }, [tilePosition, tileHeight]);

  const clickHandler = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      selectUnit(unit.id);
    },
    [unit.id]
  );

  const color = useMemo(() => {
    if (isSelected) {
      return 'white';
    }
    return 'red';
  }, [isSelected]);

  if (!tile) return null;

  return (
    <animated.mesh
      onClick={clickHandler}
      position-x={springs.x}
      position-y={springs.y}
      position-z={springs.z}
    >
      <boxGeometry args={[UNIT_SCALE, UNIT_SCALE, UNIT_SCALE]} />
      <meshStandardMaterial color={color} />
    </animated.mesh>
  );
};

export default Unit;
