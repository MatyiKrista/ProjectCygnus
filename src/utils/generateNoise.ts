import { MathUtils, Vector2, Vector3 } from 'three';
// @ts-ignore
import { FBM } from 'three-noise';
import { GENERATION } from '../consts/generation';

const { SEED, FUZZY, DETAIL } = GENERATION;

export const generateNoise = () => {
  const fbm = new FBM({
    seed: SEED,
    lacunarity: DETAIL * 2,
    persistance: FUZZY * 8,
  });

  return (vec3: Vector3) =>
    Math.pow(
      MathUtils.mapLinear(fbm.get2(new Vector2(vec3.x, vec3.y)), -1, 1, 0, 1),
      1.75
    );
};
