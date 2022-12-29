import styled from 'styled-components';
import { Flex } from '../components/ui/Flex';
import LoginRegister from '../components/auth/LoginRegister';

const Container = styled(Flex)`
  height: 100vh;
  width: 100vw;
`;
const Login = () => {
  return (
    <Container $align='center' $justify='center'>
      <LoginRegister />
    </Container>
  );
};

export default Login;
