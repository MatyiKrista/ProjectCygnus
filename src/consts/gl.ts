import { PCFSoftShadowMap, sRGBEncoding } from 'three';

export const GL_CONFIG = {
  antialias: true,
  toneMappingExposure: 0.5,
  shadowMap: {
    enabled: true,
    type: PCFSoftShadowMap,
  },
  outputEncoding: sRGBEncoding,
};
