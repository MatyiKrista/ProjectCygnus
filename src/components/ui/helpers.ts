import { Color } from 'three';
import { Size, UIType } from '../../types/ui';

const SPACE_UNIT = 0.25;

const COLOR_MAP: Record<UIType, Color> = {
  success: new Color('#00b894'),
  error: new Color('#d63031'),
  warning: new Color('#fdcb6e'),
  info: new Color('#0984e3'),
  dark: new Color('#2d3436'),
  light: new Color('#dfe6e9'),
  background: new Color('#E4EBF5'),
  accent: new Color('#1a0f7a'),
};

export const space = (n: number) => `${n * SPACE_UNIT}rem`;
export const borderRadius = (size: Size) => {
  switch (size) {
    case 'sm':
      return space(1);
    case 'md':
      return space(2);
    case 'lg':
      return space(3);
    case 'xl':
      return space(4);
    default:
      return space(1);
  }
};

export const boxShadow = (size: Size, color = 'rgba(0, 0, 0, 0.2)') => {
  return {
    sm: `0 0 ${space(4)} 0 ${color}`,
    md: `0 0 ${space(6)} 0 ${color}`,
    lg: `0 0 ${space(8)} 0 ${color}`,
    xl: `0 0 ${space(10)} 0 ${color}`,
  }[size];
};

export const neumorphicShadow = (spread: Size = 'md', inner = false) => {
  const dark = 'rgba(0, 0, 0, 0.075)';
  const light = 'rgba(255, 255, 255, 0.6)';
  const shadowNumber = inner ? 1 : 1;
  const lightNumber = inner ? -1 : -1;
  const insetPrefix = inner ? 'inset ' : '';
  const shadowPlacement = `${insetPrefix} ${space(shadowNumber)} ${space(
    shadowNumber
  )}`;
  const lightPlacement = `${insetPrefix} ${space(lightNumber)} ${space(
    lightNumber
  )}`;

  return {
    sm: `${shadowPlacement} ${space(2)} ${dark}, ${lightPlacement} ${space(
      1.8
    )} ${light}`,
    md: `${shadowPlacement} ${space(4)} ${dark}, ${lightPlacement} ${space(
      3.6
    )} ${light}`,
    lg: `${shadowPlacement} ${space(6)} ${dark}, ${lightPlacement} ${space(
      5.8
    )} ${light}`,
    xl: `${shadowPlacement} ${space(12)} ${dark}, ${lightPlacement} ${space(
      10
    )} ${light}`,
  }[spread];
};

export type ColorHelperOptions = {
  lightness?: number;
  saturation?: number;
  alpha?: number;
};

export const colorObject = (
  type: UIType | string,
  options?: ColorHelperOptions
) => {
  const isUIType = type in COLOR_MAP;

  const colorObject = isUIType
    ? COLOR_MAP[type as UIType].clone()
    : new Color(type);

  const hslaRaw = colorObject.getHSL({ h: 0, s: 0, l: 0 });

  const { lightness, saturation, alpha = 1 } = options ?? {};

  return {
    h: hslaRaw.h * 360,
    s: saturation ?? hslaRaw.s * 100,
    l: lightness ?? hslaRaw.l * 100,
    a: alpha * 100,
  };
};

export const color = (type: UIType | string, options?: ColorHelperOptions) => {
  const hsla = colorObject(type, options);
  return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
};
