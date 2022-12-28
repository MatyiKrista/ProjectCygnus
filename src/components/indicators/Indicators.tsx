import Arrow from './Arrow';
import TileHighlight from './TileHighlight';
import { TileData } from '../../types/game';

type Props = {
  selectedTile?: TileData;
};

const Indicators = (props: Props) => {
  const { selectedTile } = props;

  return (
    <group>
      <Arrow />
      {!!selectedTile && <TileHighlight tile={selectedTile} />}
    </group>
  );
};

export default Indicators;
