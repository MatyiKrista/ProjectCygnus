import { Box } from '../ui/Box';
import { Input, InputHint, InputLabel } from '../ui/Input';
import { Button } from '../ui/Button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Flex } from '../ui/Flex';
import { auth } from '../../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

const emailPattern =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const LoginRegister = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    const { email, password } = data;
    if (mode === 'login') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/home');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <Box gap={2} style={{ width: '20rem', maxWidth: '90vw' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Flex align='stretch' direction='column' gap={2}>
          <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>
          <div>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input
              id='email'
              {...register('email', {
                required: true,
                pattern: emailPattern,
              })}
              placeholder='Email'
            />
            {errors.email && (
              <InputHint color='red'>Please enter a valid email</InputHint>
            )}
          </div>
          <div>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              id='password'
              {...register('password', { required: true, minLength: 8 })}
              placeholder='Password'
              type='password'
            />
            {errors.password && (
              <InputHint color='red'>
                Please enter a password with at least 8 characters
              </InputHint>
            )}
          </div>
          <Button expanded type='submit'>
            {mode === 'login' ? 'Login' : 'Register'}
          </Button>
        </Flex>
      </form>
      <Button expanded outlined type='button' onClick={onGoogleLogin}>
        {mode === 'login' ? 'Login' : 'Register'} with Google
      </Button>
      <Button
        expanded
        outlined
        type='button'
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
      >
        {mode === 'login'
          ? 'No account yet? Register'
          : 'Already have an account? Login'}
      </Button>
    </Box>
  );
};

export default LoginRegister;
