import Unit from './Unit';
import { UnitData } from '../../types/game';

type Props = {
  units: UnitData[];
};

const Units = (props: Props) => {
  const { units } = props;
  return (
    <group>
      {units.map((unit) => (
        <Unit key={unit.id} unit={unit} />
      ))}
    </group>
  );
};

export default Units;
