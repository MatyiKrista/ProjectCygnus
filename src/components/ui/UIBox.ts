import styled from 'styled-components';
import { borderRadius, boxShadow } from '../../consts/ui';

export const UIBox = styled.div`
  border-radius: ${borderRadius};
  background-color: rgba(244, 244, 244, 0.5);
  box-shadow: ${boxShadow}, inset 1px 1px 5px rgba(0, 0, 0, 0.2);
  flex: none;
  border: 5px solid transparent;
  backdrop-filter: blur(10px);
`;
