import React, { useCallback, useMemo } from 'react';
import { GENERATION } from '../../consts/generation';
import { UnitData } from '../../types/game';
import {
  useSelectedUnit,
  useSelectUnit,
  useTiles,
} from '../../hooks/useGameStore';
import { Vector3 } from 'three';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';
import { useHovered } from '../../hooks/useHovered';

const { SCALE } = GENERATION;

type Props = {
  unit: UnitData;
  position?: Vector3 | null;
};

const UNIT_SCALE = SCALE * 0.5;

const Unit = (props: Props) => {
  const { unit, position } = props;

  const tiles = useTiles();
  const selectedUnitId = useSelectedUnit();
  const selectUnit = useSelectUnit();
  const [isHovered, hoverHandlers] = useHovered();
  const isSelected = selectedUnitId === unit.id;
  const tile = tiles.find((tile) => tile.id === unit.tileId);

  const clickHandler = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      selectUnit(unit.id);
    },
    [unit.id]
  );

  const color = useMemo(() => {
    if (isHovered || isSelected) {
      return 'white';
    }
    return 'red';
  }, [isHovered, isSelected]);

  if (!tile) return null;

  const computedPosition = new Vector3(
    position?.x ?? tile.position.x,
    position?.y ?? tile.position.y,
    position?.z ?? tile.position.z + tile.height + UNIT_SCALE * 0.5
  );

  return (
    <mesh onClick={clickHandler} {...hoverHandlers} position={computedPosition}>
      <boxGeometry args={[UNIT_SCALE, UNIT_SCALE, UNIT_SCALE]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Unit;
