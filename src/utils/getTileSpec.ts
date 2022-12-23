import { Color, MathUtils } from 'three';
import { TILES } from '../consts/tiles';

export const getTileSpec = (height: number) => {
  const { color, type } = (() => {
    if (height <= TILES.OCEAN.threshold) {
      return { color: new Color(TILES.OCEAN.color), type: TILES.OCEAN.type };
    } else if (height <= TILES.OCEAN.threshold + TILES.SHORE.threshold) {
      return { color: new Color(TILES.SHORE.color), type: TILES.SHORE.type };
    } else if (height <= TILES.OCEAN.threshold + TILES.SAND.threshold) {
      return { color: new Color(TILES.SAND.color), type: TILES.SAND.type };
    } else if (height <= TILES.OCEAN.threshold + TILES.GRASS.threshold) {
      return { color: new Color(TILES.GRASS.color), type: TILES.GRASS.type };
    } else if (height <= TILES.OCEAN.threshold + TILES.FOREST.threshold) {
      return { color: new Color(TILES.FOREST.color), type: TILES.FOREST.type };
    } else if (height <= TILES.OCEAN.threshold + TILES.ROCK.threshold) {
      return { color: new Color(TILES.ROCK.color), type: TILES.ROCK.type };
    } else {
      return { color: new Color(TILES.ICE.color), type: TILES.ICE.type };
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
      (height <= TILES.OCEAN.threshold
        ? MathUtils.mapLinear(
            Math.pow(1 - (TILES.OCEAN.threshold - height) * 1.3, 6),
            0,
            1,
            0,
            1.4
          )
        : 1)
  );

  return { color, type };
};
