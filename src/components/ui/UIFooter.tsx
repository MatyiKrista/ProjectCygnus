import styled from 'styled-components';
import { UIBox } from './UIBox';
import FOREST from '../../assets/images/forest.png?url';
import ROCK from '../../assets/images/rock.png?url';
import { TileData } from '../../types/game';
import { TileType } from '../../types/config';
import { borderRadius } from '../../consts/ui';

const IMAGE_MAP: Record<TileType, string> = {
  OCEAN: '',
  SHORE: '',
  SAND: '',
  GRASS: '',
  FOREST,
  ROCK,
  ICE: '',
};

type Props = {
  selectedTile?: TileData;
};

const FooterStyled = styled.footer`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  height: 0;
  display: flex;
  justify-content: space-between;
  pointer-events: none;

  > * {
    pointer-events: all;
  }
`;

const FooterSideStyled = styled(UIBox)<{ open?: boolean }>`
  width: 33%;
  height: 200px;
  background-size: cover;
  background-position: 50% 75%;
  filter: saturate(0.3);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transform: translateY(${(props) => (props.open ? '-100%' : '1rem')});
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const UiFooter = (props: Props) => {
  const { selectedTile } = props;

  return (
    <FooterStyled>
      <FooterSideStyled open={!!selectedTile}>
        <div>
          <h2>Selected Tile</h2>
          <p>Type: {selectedTile?.type}</p>
          <p>Elevation: {((selectedTile?.height ?? 0) * 200).toFixed(2)} m</p>
        </div>
        <figure
          style={{
            width: '20vh',
            height: '15vh',
            position: 'relative',
            overflow: 'hidden',
            margin: 0,
            borderRadius,
            border: '2px solid #fff',
            flexGrow: 0,
          }}
        >
          <img
            style={{
              position: 'absolute',
              width: '100%',
              left: 0,
              top: 0,
            }}
            src={selectedTile && IMAGE_MAP[selectedTile.type]}
            alt='image of selected tile'
          />
        </figure>
      </FooterSideStyled>
    </FooterStyled>
  );
};

export default UiFooter;
