import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { CryptoState } from '../../Context/CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'Please fill all the Fields',
        type: 'error',
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful!`,
        type: 'success',
      });
      handleClose();
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        message: err.message,
        type: 'error',
      });
    }
  };

  return (
    <Box
      style={{
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant='outlined'
        type='password'
        label='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant='contained'
        size='large'
        style={{ backgroundColor: '#EEBC1D' }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
