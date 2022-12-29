import styled from 'styled-components';
import { Flex } from './Flex';
import { borderRadius, boxShadow, space } from './helpers';
import { Size } from '../../types/ui';

export const Box = styled(Flex)<{ size?: Size }>`
  flex-direction: column;
  padding: ${space(6)};
  border: 2px solid #c9c9c9;
  box-shadow: ${({ size = 'md' }) => boxShadow(size)};
  border-radius: ${({ size = 'md' }) => borderRadius(size)};
`;
