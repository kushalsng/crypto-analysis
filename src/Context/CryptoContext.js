import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CoinList } from '../config/api';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('inr');
  const [symbol, setSymbol] = useState('₹');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setLoading(false);
    setCoins(data);
  };

  useEffect(() => {
    currency === 'inr' ? setSymbol('₹') : setSymbol('$');
  }, [currency]);
  return (
    <Crypto.Provider
      value={{ currency, symbol, setCurrency, coins, loading, fetchCoins }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
