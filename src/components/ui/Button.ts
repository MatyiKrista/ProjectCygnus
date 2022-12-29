import { borderRadius, space } from './helpers';
import styled, { css } from 'styled-components';
import { Color } from 'three';

export const Button = styled.button<{
  color?: string;
  outlined?: boolean;
  expanded?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${borderRadius('sm')};
  padding: ${space(4)} ${space(6)};
  width: ${({ expanded }) => (expanded ? '100%' : 'auto')};
  cursor: pointer;
  transition-property: background-color, border-color, color, box-shadow;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;

  ${({ outlined, color = 'black' }) => {
    const colorObj = new Color(color);
    const baseColor = '#' + colorObj.getHexString();
    const isLight = colorObj.getHSL({ h: 0, s: 0, l: 0 }).l > 0.65;
    const hoverColor =
      '#' + colorObj.offsetHSL(0, 0, 0.25 * (isLight ? -1 : 1)).getHexString();
    const shadowColor =
      '#' + colorObj.offsetHSL(0, 0, 0.5 * (isLight ? -1 : 1)).getHexString();
    const overLayColor = isLight ? 'black' : 'white';

    return outlined
      ? css`
          background-color: transparent;
          border: 1px solid ${baseColor};
          color: ${baseColor};

          &:hover {
            border-color: 1px solid ${hoverColor};
            color: ${hoverColor};
            box-shadow: 0 0 0 ${space(1)} ${shadowColor};
          }
        `
      : css`
          background-color: ${baseColor};
          color: ${overLayColor};

          &:hover {
            background-color: ${hoverColor};
            box-shadow: 0 0 0 ${space(1)} ${shadowColor};
          }
        `;
  }}
`;
