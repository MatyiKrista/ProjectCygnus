import styled from 'styled-components';
import { borderRadius, color, neumorphicShadow, space } from './helpers';
import { UIType } from '../../types/ui';

export const Input = styled.input`
  background-color: ${color('background')};
  border-radius: ${borderRadius('sm')};
  padding: ${space(3)} ${space(4)};
  font-size: 1rem;
  outline: none;
  width: 100%;
  box-shadow: ${neumorphicShadow('sm')}, ${neumorphicShadow('sm', true)};
  border: 2px solid ${color('background')};
  margin: ${space(2)} 0;
  color: ${color('dark')};

  &:focus,
  &:hover {
    border-color: ${color('light')};
  }

  &::placeholder {
    color: #888;
  }
`;

export const InputLabel = styled.label`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: ${space(2)};
  text-transform: uppercase;
  font-weight: bold;
`;

export const InputHint = styled.span<{ $type?: UIType }>`
  font-size: 0.75rem;
  color: ${({ $type = 'dark' }) => color($type)};
  margin-top: ${space(2)};
`;
