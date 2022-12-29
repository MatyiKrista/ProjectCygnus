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
  background: new Color('#d2d2d2'),
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

export const neumorphicShadow = (size: Size = 'md', inner = false) => {
  const dark = 'rgba(0, 0, 0, 0.1)';
  const light = 'rgba(255, 255, 255, 0.4)';

  return {
    sm: `${inner ? 'inset' : ''} -${space(3)} -${space(3)} ${space(
      10
    )} ${dark}, ${inner ? 'inset' : ''} ${space(3)} ${space(3)} ${space(
      10
    )} ${light}`,
    md: `${inner ? 'inset' : ''} -${space(3)} -${space(3)} ${space(
      14
    )} ${dark}, ${inner ? 'inset' : ''} ${space(3)} ${space(3)} ${space(
      14
    )} ${light}`,
    lg: `${inner ? 'inset' : ''} -${space(3)} -${space(3)} ${space(
      16
    )} ${dark}, ${inner ? 'inset' : ''} ${space(3)} ${space(3)} ${space(
      16
    )} ${light}`,
    xl: `${inner ? 'inset' : ''} -${space(3)} -${space(3)} ${space(
      118
    )} ${dark}, ${inner ? 'inset' : ''} ${space(3)} ${space(3)} ${space(
      18
    )} ${light}`,
  }[size];
};

type ColorHelperOptions = {
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
