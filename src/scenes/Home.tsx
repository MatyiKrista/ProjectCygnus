import { Flex } from '../components/ui/Flex';
import { space } from '../components/ui/helpers';
import { NeumorphicBox } from '../components/ui/NeumorphicBox';
import UserData from '../components/home/UserData';

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
          <NeumorphicBox $height={'50%'} $padding={8} $fullWidth>
            <UserData />
          </NeumorphicBox>
          <NeumorphicBox
            $height={'50%'}
            $padding={8}
            $fullWidth
          ></NeumorphicBox>
        </Flex>
        <Flex $grow={1} $justify={'center'} $fullHeight $direction='column'>
          <NeumorphicBox
            $padding={8}
            $height={`calc(100% + ${space(10)})`}
            $fullWidth
          ></NeumorphicBox>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
