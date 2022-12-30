import styled, { css } from 'styled-components';
import { color, space } from './helpers';

export type BaseElementProps = {
  $width?: number | string;
  $height?: number | string;
  $padding?: number | string;
  $margin?: number | string;
  $fullWidth?: boolean;
  $fullHeight?: boolean;
  $background?: string;
};

export const BaseElementStyles = css<BaseElementProps>`
  ${({
    $width,
    $height,
    $padding,
    $margin,
    $fullWidth,
    $fullHeight,
    $background,
  }) => {
    const styles = {
      width: $fullWidth
        ? '100%'
        : typeof $width === 'number'
        ? space($width)
        : $width,
      height: $fullHeight
        ? '100%'
        : typeof $height === 'number'
        ? space($height)
        : $height,
      padding: typeof $padding === 'number' ? space($padding) : $padding,
      margin: typeof $margin === 'number' ? space($margin) : $margin,
      background: $background ? color($background) : $background,
    };

    return Object.entries(styles)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}: ${value};`)
      .join('');
  }}
`;

export const BaseElement = styled.div`
  ${BaseElementStyles}
`;
