import React from 'react';
import { Flex } from '../ui/Flex';
import { NeumorphicBox } from '../ui/NeumorphicBox';
import { useUser } from '../../hooks/store/useFirebaseStore';
import Text from '../ui/Text';

const UserData = () => {
  const user = useUser();

  if (!user) return null;

  return (
    <Flex
      $direction='column'
      $grow={1}
      $fullWidth
      $gap={5}
      $justify='space-between'
    >
      <NeumorphicBox $fullWidth $align='center' $padding={2} $elevation='sm'>
        <Text $color='accent' $weight={300}>
          Logged in as: {user.displayName || user.email}
        </Text>
      </NeumorphicBox>
      <Flex $justify='space-between' $wrap='wrap' $fullWidth>
        <NeumorphicBox
          $align='center'
          $justify='center'
          $padding={2}
          $elevation='sm'
          $rounded
          $width={50}
          $height={50}
          $shrink={0}
          $concave
          $glassEffect
        >
          <Text
            $margin={2}
            $color='accent'
            $weight={600}
            $size={5}
            $colorHelperOptions={{ lightness: 35 }}
          >
            STATS
          </Text>
          <Text $color='accent'>WINS: 2</Text>
          <Text $color='accent'>LOSSES: 1</Text>
        </NeumorphicBox>
        <NeumorphicBox
          $align='center'
          $justify='center'
          $padding={2}
          $elevation='sm'
          $rounded
          $width={50}
          $height={50}
          $shrink={0}
          $concave
          $glassEffect
        >
          Played
        </NeumorphicBox>
        <NeumorphicBox
          $align='center'
          $justify='center'
          $padding={2}
          $elevation='sm'
          $rounded
          $width={50}
          $height={50}
          $shrink={0}
          $concave
          $glassEffect
        >
          Played
        </NeumorphicBox>
      </Flex>
    </Flex>
  );
};

export default UserData;
