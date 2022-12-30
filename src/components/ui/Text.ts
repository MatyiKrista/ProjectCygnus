import styled from 'styled-components';
import { UIType } from '../../types/ui';
import { color, ColorHelperOptions, space } from './helpers';
import { BaseElementProps, BaseElementStyles } from './BaseElement';

type Props = {
  $weight?: 300 | 400 | 600 | 800;
  $size?: number;
  $color?: UIType | string;
  $colorHelperOptions?: ColorHelperOptions;
} & BaseElementProps;

const Text = styled.p<Props>`
  font-weight: ${({ $weight = 300 }) => $weight};
  font-size: ${({ $size = 4 }) => space($size)};
  color: ${({ $color = 'dark', $colorHelperOptions }) =>
    color($color, $colorHelperOptions)};
  margin: 0;
  ${BaseElementStyles}
`;

export default Text;
