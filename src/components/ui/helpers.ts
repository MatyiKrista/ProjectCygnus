type Size = 'sm' | 'md' | 'lg';

const SPACE_UNIT = 0.25;
export const space = (n: number) => `${n * SPACE_UNIT}rem`;
export const borderRadius = (size: Size) => {
  switch (size) {
    case 'sm':
      return space(1);
    case 'md':
      return space(2);
    case 'lg':
      return space(3);
    default:
      return space(1);
  }
};

export const boxShadow = (size: Size, color = 'rgba(0, 0, 0, 0.2)') => {
  return {
    sm: `0 0 ${space(4)} 0 ${color}`,
    md: `0 0 ${space(6)} 0 ${color}`,
    lg: `0 0 ${space(8)} 0 ${color}`,
  }[size];
};
