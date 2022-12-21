import React, { useMemo } from 'react';
import {
  useHoveredTile,
  useSelectedTile,
  useTiles,
} from '../../hooks/useGameStore';
import styled from 'styled-components';
import UIHeader from './UIHeader';
import UIAside from './UIAside';
import UIFooter from './UIFooter';

const UserInterfaceWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  > * {
    pointer-events: all;
  }
`;

type Props = {};

const UserInterface = (props: Props) => {
  const tiles = useTiles();
  const selectedTileId = useSelectedTile();
  const hoveredTileId = useHoveredTile();

  const selectedTile = useMemo(
    () => tiles.find((tile) => tile.id === selectedTileId),
    [tiles, selectedTileId]
  );
  const hoveredTile = useMemo(
    () => tiles.find((tile) => tile.id === hoveredTileId),
    [tiles, hoveredTileId]
  );

  return (
    <UserInterfaceWrapper>
      <UIHeader hoveredTile={hoveredTile} />
      <UIAside />
      <UIFooter selectedTile={selectedTile} />
    </UserInterfaceWrapper>
  );
};

export default UserInterface;
