import { MathUtils, Vector2, Vector3 } from 'three';
// @ts-ignore
import { FBM } from 'three-noise';
import { GENRATION_DEFAULT_SETTINGS } from '../consts/generation';

export const generateNoise = () => {
  const fbm = new FBM({
    seed: GENRATION_DEFAULT_SETTINGS.seed,
    lacunarity: GENRATION_DEFAULT_SETTINGS.detail * 2,
    persistance: GENRATION_DEFAULT_SETTINGS.fuzzyness * 8,
  });

  return (vec3: Vector3) =>
    Math.pow(
      MathUtils.mapLinear(fbm.get2(new Vector2(vec3.x, vec3.y)), -1, 1, 0, 1),
      1.75
    );
};
