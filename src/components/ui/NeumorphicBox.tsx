import styled, { css } from 'styled-components';
import { Box } from './Box';
import { color, neumorphicShadow } from './helpers';
import { Size } from '../../types/ui';

export const NeumorphicBox = styled(Box)<{
  $elevation?: Size;
  $concave?: boolean;
  $withShadow?: boolean;
}>`
  background-color: ${color('background')};
  border: 5px solid ${color('background')};
  transition: box-shadow 0.3s ease-out;

  ${({ $withShadow = true, $elevation, $concave }) =>
    $withShadow
      ? css`
          box-shadow: ${neumorphicShadow($elevation)}
            ${$concave && ',' + neumorphicShadow($elevation, true)};
        `
      : css`
          box-shadow: 0 0 0 0 ${color('background')};
        `}
`;
