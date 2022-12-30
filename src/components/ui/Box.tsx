import styled from 'styled-components';
import { Flex } from './Flex';
import { borderRadius, boxShadow } from './helpers';
import { Size } from '../../types/ui';

export const Box = styled(Flex)<{ size?: Size }>`
  flex-direction: column;
  border: 2px solid #c9c9c9;
  box-shadow: ${({ size = 'md' }) => boxShadow(size)};
  border-radius: ${({ size = 'md' }) => borderRadius(size)};
`;
