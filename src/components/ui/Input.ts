import styled from 'styled-components';
import { borderRadius, space } from './helpers';

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: ${borderRadius('sm')};
  padding: ${space(3)} ${space(4)};
  font-size: 1rem;
  outline: none;
  width: 100%;

  &:focus,
  &:hover {
    border-color: #333;
  }
`;

export const InputLabel = styled.label`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: ${space(2)};
  text-transform: uppercase;
  font-weight: bold;
`;

export const InputHint = styled.span<{ color?: string }>`
  font-size: 0.75rem;
  color: ${({ color }) => color || '#333'};
  margin-top: ${space(2)};
`;
