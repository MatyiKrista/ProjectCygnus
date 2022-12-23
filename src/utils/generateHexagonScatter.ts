import { Vector2, Vector3 } from 'three';
import { CoordinateConfig } from '../types/config';
import { v4 as uuid } from 'uuid';
import { GENERATION } from '../consts/generation';

const GAP = 0.2;
const { PLAYERS_NUM, NODES_PER_PLAYER, SEGMENTS } = GENERATION;

const getRingLength = (n: number): number => n * SEGMENTS - 1;

export const generateHexagonScatter = () => {
  const { RADIUS } = GENERATION;
  const points: CoordinateConfig[] = [];
  // Center point
  points.push({
    position: new Vector3(),
    id: uuid(),
    coordinates: new Vector2(0, 0),
  });
  // Transformation tools
  const unit = GAP;
  const angle = (Math.PI / SEGMENTS) * 2;
  const axis = new Vector3(0, 0, 1);
  const axisVector = new Vector3(0, -unit, 0);
  const sideVector = new Vector3(0, unit, 0).applyAxisAngle(axis, -angle);
  const tempV3 = new Vector3();

  const nodePlacement = new Array(NODES_PER_PLAYER).fill(0).map((_, i) => {
    const ringUnit = RADIUS / (NODES_PER_PLAYER + 2);
    return {
      ring: Math.floor(Math.random() * ringUnit + i * ringUnit + ringUnit),
      placement: Math.floor(Math.random() * 3),
    };
  });

  for (let seg = 0; seg < SEGMENTS; seg++) {
    for (let ax = 1; ax <= RADIUS; ax++) {
      for (let sd = 0; sd < ax; sd++) {
        const ring = ax;
        const ringPosition = sd + ax * seg;
        const ringWidth = getRingLength(ring);
        const ringUnit = Math.floor(ringWidth / PLAYERS_NUM + 1);

        tempV3
          .copy(axisVector)
          .multiplyScalar(ax)
          .addScaledVector(sideVector, sd)
          .applyAxisAngle(axis, angle * seg);

        const config: CoordinateConfig = {
          id: uuid(),
          position: new Vector3().copy(tempV3),
          coordinates: new Vector2(ring, ringPosition),
        };

        if (
          ring === Math.floor(RADIUS * 0.99) &&
          ringPosition % ringUnit === 0
        ) {
          config.building = 'base';
        }

        const matchedNP = nodePlacement.find((np) => np.ring === ring);

        if (matchedNP && ringPosition % ringUnit === matchedNP.placement) {
          config.building = 'mine';
        }

        points.push(config);
      }
    }
  }
  return points;
};
