import { Vector3 } from 'three';

const gap = 0.2;

export const generateHexagonScatter = (radius = 5) => {
  const points = [];
  points.push(new Vector3());
  const unit = gap;

  const angle = Math.PI / 3;
  const axis = new Vector3(0, 0, 1);

  const axisVector = new Vector3(0, -unit, 0);
  const sideVector = new Vector3(0, unit, 0).applyAxisAngle(axis, -angle);
  const tempV3 = new Vector3();
  for (let seg = 0; seg < 6; seg++) {
    for (let ax = 1; ax <= radius; ax++) {
      for (let sd = 0; sd < ax; sd++) {
        tempV3
          .copy(axisVector)
          .multiplyScalar(ax)
          .addScaledVector(sideVector, sd)
          .applyAxisAngle(axis, angle * seg);

        points.push(new Vector3().copy(tempV3));
      }
    }
  }
  return points;
};
