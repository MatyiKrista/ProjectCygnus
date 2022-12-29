import styled from 'styled-components';
import { space } from './helpers';

export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
  wrap?: 'wrap' | 'nowrap';
  grow?: number;
  shrink?: number;
  basis?: string;
  padding?: number;
  margin?: number;
  gap?: number;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'flex-start'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  flex-grow: ${({ grow }) => grow || 0};
  flex-shrink: ${({ shrink }) => shrink || 1};
  flex-basis: ${({ basis }) => basis || 'auto'};
  padding: ${({ padding }) => space(padding || 0)};
  margin: ${({ margin }) => space(margin || 0)};
  gap: ${({ gap }) => space(gap || 0)};
`;
