import { Flex } from '../components/ui/Flex';
import { space } from '../components/ui/helpers';
import { NeumorphicBox } from '../components/ui/NeumorphicBox';

const Home = () => {
  return (
    <Flex
      $background='background'
      $direction='column'
      $fullWidth
      $fullHeight
      $gap={20}
    >
      <Flex $fullWidth $fullHeight $gap={20} $padding={20}>
        <Flex
          $grow={1}
          $justify={'center'}
          $fullHeight
          $direction='column'
          $gap={20}
        >
          <NeumorphicBox $height={'50%'} $fullWidth></NeumorphicBox>
          <NeumorphicBox $height={'50%'} $fullWidth></NeumorphicBox>
        </Flex>
        <Flex $grow={1} $justify={'center'} $fullHeight $direction='column'>
          <NeumorphicBox
            $height={`calc(100% + ${space(10)})`}
            $fullWidth
          ></NeumorphicBox>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
