import styled, { css } from 'styled-components';
import { Box } from './Box';
import { color, neumorphicShadow } from './helpers';
import { Size } from '../../types/ui';
import { backgroundGradient, shineEffect } from './effects';

export const NeumorphicBox = styled(Box)<{
  $elevation?: Size;
  $concave?: boolean;
  $withShadow?: boolean;
  $rounded?: boolean;
  $glassEffect?: boolean;
}>`
  position: relative;
  background-color: ${color('background')};
  border: 5px solid ${color('background')};
  transition: box-shadow 0.3s ease-out;
  ${({ $rounded }) =>
    $rounded &&
    css`
      border-radius: 50%;
    `}

  ${({ $withShadow = true, $elevation, $concave }) =>
    $withShadow
      ? css`
          box-shadow: ${neumorphicShadow($elevation)}
            ${$concave && ',' + neumorphicShadow($elevation, true)};
        `
      : css`
          box-shadow: 0 0 0 0 ${color('background')};
        `}
  
  ${({ $glassEffect }) => $glassEffect && backgroundGradient}
  ${({ $glassEffect }) => $glassEffect && shineEffect}
`;
