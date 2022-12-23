import { Vector2, Vector3 } from 'three';
import { CoordinateConfig } from '../types/config';
import { v4 as uuid } from 'uuid';
import { GENRATION_DEFAULT_SETTINGS } from '../consts/generation';

const gap = 0.2;
const segments = 6;

const getRingLength = (n: number): number => (n - 1 || 1) * 6;

const getRandomNodes = (): Vector2[] => {
  const { radius, playersNum, nodesPerPlayer } = GENRATION_DEFAULT_SETTINGS;
  const nodes: Vector2[] = [];
  const angle = (Math.PI * 2) / playersNum;
  const nodesNum = playersNum * nodesPerPlayer;
  for (let i = 0; i < nodesNum; i++) {
    const radPlacement = Math.floor(Math.random() * radius * 0.7 + 2);
    const sdPlacement = Math.floor(
      Math.abs(Math.sin(angle * i) * radPlacement * Math.random()) * nodesNum
    );
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
  const nodes = getRandomNodes();
  let playerBaseSet = 0;
  for (let seg = 0; seg < segments; seg++) {
    for (let ax = 1; ax <= radius; ax++) {
      for (let sd = 0; sd < ax; sd++) {
        const ring = ax;
        const ringPosition = sd + ax * seg + 1;
        const ringWidth = getRingLength(ring);
        const unit = Math.floor(
          ringWidth / GENRATION_DEFAULT_SETTINGS.playersNum
        );

        tempV3
          .copy(axisVector)
          .multiplyScalar(ax)
          .addScaledVector(sideVector, sd)
          .applyAxisAngle(axis, angle * seg);

        const config: CoordinateConfig = {
          id: uuid(),
          position: new Vector3().copy(tempV3),
        };

        if (
          playerBaseSet < GENRATION_DEFAULT_SETTINGS.playersNum &&
          ring === Math.floor(radius * 0.9) &&
          ringPosition === Math.floor(unit * playerBaseSet + 1)
        ) {
          config.building = 'base';
          playerBaseSet++;
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
