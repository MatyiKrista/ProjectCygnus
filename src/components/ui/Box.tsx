import styled from 'styled-components';
import { Flex } from './Flex';
import { borderRadius, boxShadow, space } from './helpers';

export const Box = styled(Flex)`
  flex-direction: column;
  padding: ${space(6)};
  box-shadow: ${boxShadow('md')};
  border-radius: ${borderRadius('md')};
`;
