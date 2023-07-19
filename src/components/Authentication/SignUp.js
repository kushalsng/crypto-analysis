import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { CryptoState } from '../../Context/CryptoContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Passwords do not match!',
        type: 'error',
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      setAlert({
        open: true,
        message: `Sign Up Successful!`,
        type: 'success',
      });
      handleClose();
    } catch (err) {
      console.log(err);
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
      <TextField
        variant='outlined'
        type='password'
        label='Confirm Password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant='contained'
        size='large'
        style={{ backgroundColor: '#EEBC1D' }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
