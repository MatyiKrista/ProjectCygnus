import { useMemo } from 'react';
import { Shape } from 'three';

export const Tile = ({ size: width = 10, ...rest }) => {
  const shape = useMemo(() => {
    const shape = new Shape();
    const sides = 6;
    const center = 0;

    shape.moveTo(center + width * Math.cos(0), center + width * Math.sin(0));

    for (let i = 1; i <= sides; i += 1) {
      shape.lineTo(
        center + width * Math.cos((i * 2 * Math.PI) / sides),
        center + width * Math.sin((i * 2 * Math.PI) / sides)
      );
    }
    return shape;
  }, [width]);

  const settings = useMemo(
    () => ({
      steps: 2,
      depth: 10,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 2,
    }),
    []
  );

  return <extrudeGeometry args={[shape, settings]} {...rest} />;
};
