import { createGlobalStyle } from 'styled-components';
import { color } from './helpers';

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: ${color('dark')};
    font-family: Helvetica, Arial, sans-serif;
    background-color: ${color('background')};
  }

  * {
    box-sizing: border-box;
  }
`;
