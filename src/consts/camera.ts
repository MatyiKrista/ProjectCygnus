import { ComponentProps } from 'react';
import { Canvas } from '@react-three/fiber';

export const CAMERA_PROPS: ComponentProps<typeof Canvas>['camera'] = {
  fov: 50,
  near: 0.1,
  far: 200,
  position: [-2, 3, 6],
};
