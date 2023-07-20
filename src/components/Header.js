import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  makeStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../Context/CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSideBar from './Authentication/UserSideBar';
import { calogo } from '../assets';

const useStyles = makeStyles({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              onClick={() => navigate('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <img
                src={calogo}
                alt='crypto analysis'
                style={{ height: 40, width: 40, marginRight: 10 }}
              />
              <Typography className={classes.title} variant='h6'>
                Crypto Analysis
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select
                variant='outlined'
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value='usd'>USD</MenuItem>
                <MenuItem value='inr'>INR</MenuItem>
              </Select>
              {user ? <UserSideBar /> : <AuthModal />}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
