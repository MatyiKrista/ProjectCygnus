import { TileData } from '../../types/game';
import styled from 'styled-components';
import { UIBox } from './UIBox';

type Props = {
  hoveredTile?: TileData;
};

const HeaderStyled = styled(UIBox)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  height: 50px;
`;

const UiHeader = (props: Props) => {
  return <HeaderStyled as='header'></HeaderStyled>;
};

export default UiHeader;
