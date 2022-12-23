import { Vector2, Vector3 } from 'three';
import { CoordinateConfig } from '../types/config';
import { v4 as uuid } from 'uuid';
import { GENERATION } from '../consts/generation';

const GAP = 0.2;
const { RADIUS, PLAYERS_NUM, NODES_PER_PLAYER, SEGMENTS } = GENERATION;

const getRingLength = (n: number): number => n * SEGMENTS - 1;

const getRandomNodes = (): Vector2[] => {
  const nodes: Vector2[] = [];
  const angle = (Math.PI * 2) / PLAYERS_NUM;
  const nodesNum = PLAYERS_NUM * NODES_PER_PLAYER;
  for (let i = 0; i < nodesNum; i++) {
    const radPlacement = Math.floor(Math.random() * RADIUS * 0.7 + 2);
    const sdPlacement = Math.floor(
      Math.abs(Math.sin(angle * i) * radPlacement * Math.random()) * nodesNum
    );
    nodes.push(new Vector2(radPlacement, sdPlacement));
  }
  return nodes;
};

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

  // Generate resource node positions
  const nodes = getRandomNodes();

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
          console.log(ringWidth, ringPosition);
          config.building = 'base';
        }

        if (nodes.some((node) => node.x === ax && node.y === ringPosition)) {
          config.building = 'mine';
        }

        points.push(config);
      }
    }
  }
  return points;
};
