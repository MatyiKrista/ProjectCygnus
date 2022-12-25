import { useMemo, useRef } from 'react';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';

type ReturnTypes = [
  boolean,
  {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
    onPointerLeave: (e: ThreeEvent<PointerEvent>) => void;
  }
];
export const useHovered = (): ReturnTypes => {
  const isHovered = useRef(false);

  const hoverHandlers = useMemo(
    () => ({
      onPointerOver: (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        isHovered.current = true;
      },
      onPointerLeave: (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        isHovered.current = false;
      },
    }),
    []
  );

  return [isHovered.current, hoverHandlers];
};
