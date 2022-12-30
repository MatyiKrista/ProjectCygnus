import { css } from 'styled-components';
import { color } from './helpers';
import { UIType } from '../../types/ui';

export const backgroundGradient = css<{ backgroundColor?: UIType | string }>`
  ${({ backgroundColor = 'background' }) => css`
    background-image: linear-gradient(
      ${color(backgroundColor, { lightness: 96, alpha: 30 })},
      ${color(backgroundColor, { lightness: 96, alpha: 0 })} 50%,
      ${color(backgroundColor, { lightness: 92, alpha: 20 })} 50%,
      ${color(backgroundColor, { lightness: 96, alpha: 10 })}
    );
  `}
`;

export const shineEffect = css`
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 80%;
    height: 60%;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: inherit;
    background: linear-gradient(hsla(0, 0%, 100%, 0.8), hsla(0, 0%, 100%, 0));
  }
`;
