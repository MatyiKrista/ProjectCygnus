import React, { useMemo } from 'react';
import {
  useHoveredTileId,
  useSelectedTileId,
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

const UserInterface = () => {
  const tiles = useTiles();
  const selectedTileId = useSelectedTileId();
  const hoveredTileId = useHoveredTileId();

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
