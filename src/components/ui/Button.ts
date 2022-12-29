import {
  borderRadius,
  color,
  colorObject,
  neumorphicShadow,
  space,
} from './helpers';
import styled, { css } from 'styled-components';
import { Size, UIType } from '../../types/ui';

export const Button = styled.button<{
  $size?: Size;
  $color?: UIType;
  outlined?: boolean;
  expanded?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ $size = 'md' }) => borderRadius($size)};
  padding: ${({ $size = 'md' }) => space($size === 'sm' ? 2 : 3)}
    ${({ $size = 'sm' }) => space($size === 'sm' ? 3 : 6)};
  width: ${({ expanded }) => (expanded ? '100%' : 'auto')};
  cursor: pointer;
  transition-property: background-color, border-color, color;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
  box-shadow: ${neumorphicShadow('sm')};

  ${({ outlined, $color = 'background' }) => {
    const colorObj = colorObject($color);
    const baseColor = color($color);
    const isLight = colorObj.l > 65;
    const hoverColor = color($color, {
      lightness: isLight ? colorObj.l - 20 : colorObj.l + 20,
    });
    const overLayColor = isLight ? 'black' : 'white';

    return outlined
      ? css`
          background-color: transparent;
          border: 1px solid ${baseColor};
          color: ${baseColor};

          &:hover {
            border-color: 1px solid ${hoverColor};
            color: ${hoverColor};
          }
        `
      : css`
          background-color: ${baseColor};
          color: ${overLayColor};

          &:hover {
            background-color: ${hoverColor};
          }
        `;
  }}
`;
