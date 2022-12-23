import { Vector2, Vector3 } from 'three';
import { CoordinateConfig } from '../types/config';
import { v4 as uuid } from 'uuid';
import { GENRATION_DEFAULT_SETTINGS } from '../consts/generation';

const gap = 0.2;
const nodesPerSegment = 2;
const segments = 6;

const rowWidth = (n: number): number => n - 1 || 1;

const getRandomNodes = (): Vector2[] => {
  const { radius } = GENRATION_DEFAULT_SETTINGS;
  const nodes: Vector2[] = [];
  for (let i = 0; i < nodesPerSegment; i++) {
    const radPlacement = Math.floor(
      Math.random() * radius * 0.4 + (nodes[i - 1]?.x ?? radius * 0.2)
    );
    const sd = rowWidth(radPlacement);
    const sdPlacement = Math.floor(Math.random() * sd * 0.7 + sd * 0.15);
    nodes.push(new Vector2(radPlacement, sdPlacement));
  }
  return nodes;
};

export const generateHexagonScatter = () => {
  const { radius } = GENRATION_DEFAULT_SETTINGS;
  const points: CoordinateConfig[] = [];
  points.push({
    position: new Vector3(),
    id: uuid(),
  });
  const unit = gap;

  const angle = (Math.PI / segments) * 2;
  const axis = new Vector3(0, 0, 1);

  const axisVector = new Vector3(0, -unit, 0);
  const sideVector = new Vector3(0, unit, 0).applyAxisAngle(axis, -angle);
  const tempV3 = new Vector3();
  for (let seg = 0; seg < segments; seg++) {
    const nodes = getRandomNodes();
    1;
    for (let ax = 1; ax <= radius; ax++) {
      for (let sd = 0; sd < ax; sd++) {
        const ring = ax;
        // const ringPosition = sd + ax * seg + 1;

        tempV3
          .copy(axisVector)
          .multiplyScalar(ax)
          .addScaledVector(sideVector, sd)
          .applyAxisAngle(axis, angle * seg);

        const config: CoordinateConfig = {
          id: uuid(),
          position: new Vector3().copy(tempV3),
        };

        if (ring === Math.floor(radius * 0.9) && sd === Math.floor(ax * 0.5)) {
          config.building = 'base';
        }

        if (nodes.some((node) => node.x === ax && node.y === sd)) {
          config.building = 'mine';
        }

        points.push(config);
      }
    }
  }
  return points;
};
