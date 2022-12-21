import { useCallback, useEffect, useRef } from 'react';
import { FrontSide, InstancedMesh, Object3D } from 'three';
import { Tile } from './Tile';
import { TILES } from '../../consts/colors';
import { GENRATION_DEFAULT_SETTINGS } from '../../consts/generation';
import { TileData } from '../../types/game';

const tempV4 = new Object3D();

type Props = {
  tiles: TileData[];
};

export const Board = ({ tiles }: Props) => {
  const ref = useRef<InstancedMesh>(null);

  const generate = useCallback(
    (scale: number = 1) => {
      if (ref.current) {
        const mesh = ref.current;

        tiles.forEach((tile, i) => {
          tempV4.position.copy(tile.position);
          tempV4.scale.setScalar(0.01);

          if (scale) {
            tempV4.scale.multiplyScalar(scale);
          }

          tempV4.updateMatrix();

          let noisePosition = tile.height * GENRATION_DEFAULT_SETTINGS.height;
          const noiseColor = tile.color;

          if (noisePosition <= TILES.ocean.threshold)
            noisePosition = TILES.ocean.threshold;

          tempV4.scale.z *= 20 * noisePosition;

          tempV4.updateMatrix();
          mesh.setMatrixAt(i, tempV4.matrix);

          mesh.setColorAt(i, noiseColor);
        });
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      }
    },
    [tiles]
  );

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <group>
      <instancedMesh
        castShadow={true}
        receiveShadow={true}
        ref={ref}
        args={[undefined, undefined, tiles.length]}
      >
        <Tile />
        <meshStandardMaterial shadowSide={FrontSide} side={FrontSide} />
      </instancedMesh>
    </group>
  );
};
