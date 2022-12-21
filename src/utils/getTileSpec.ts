import { Color, MathUtils } from 'three';
import { TILES } from '../consts/tiles';

export const getTileSpec = (height: number) => {
  const { color, type } = (() => {
    if (height <= TILES.ocean.threshold) {
      return { color: new Color(TILES.ocean.color), type: TILES.ocean.type };
    } else if (height <= TILES.ocean.threshold + TILES.shore.threshold) {
      return { color: new Color(TILES.shore.color), type: TILES.shore.type };
    } else if (height <= TILES.ocean.threshold + TILES.beach.threshold) {
      return { color: new Color(TILES.beach.color), type: TILES.beach.type };
    } else if (height <= TILES.ocean.threshold + TILES.grass.threshold) {
      return { color: new Color(TILES.grass.color), type: TILES.grass.type };
    } else if (height <= TILES.ocean.threshold + TILES.forest.threshold) {
      return { color: new Color(TILES.forest.color), type: TILES.forest.type };
    } else if (height <= TILES.ocean.threshold + TILES.stone.threshold) {
      return { color: new Color(TILES.stone.color), type: TILES.stone.type };
    } else {
      return { color: new Color(TILES.ice.color), type: TILES.ice.type };
    }
  })();

  let a = {
    h: 0,
    s: 1,
    l: 1,
  };
  const hsl = color.getHSL(a);
  color.setHSL(
    hsl.h,
    hsl.s * 1.7,
    hsl.l *
      (height <= TILES.ocean.threshold
        ? MathUtils.mapLinear(
            Math.pow(1 - (TILES.ocean.threshold - height) * 1.3, 6),
            0,
            1,
            0,
            1.4
          )
        : 1)
  );

  return { color, type };
};
