import React, { useEffect, useState } from 'react';
import { CryptoState } from '../Context/CryptoContext';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import {
  CircularProgress,
  ThemeProvider,
  createStyles,
  createTheme,
  makeStyles,
} from '@material-ui/core';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { chartDays } from '../config/constants';
import SelectButton from './SelectButton';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: '75%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  })
);

const CoinInfo = ({ coin }) => {
  const classes = useStyles();
  const [historicalData, setHistoricalData] = useState(null);
  const [days, setDays] = useState(1);
  const [labels, setLabels] = useState([]);
  const [datasets, setDataSets] = useState([]);
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricalData(data.prices);

    const labelList = data.prices.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
          : `${date.getHours()}: ${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    });
    setLabels(labelList);

    const dataSetArray = [
      {
        data: data.prices.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: '#EEBC1D',
      },
    ];
    setDataSets(dataSetArray);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress
            style={{ color: 'gold' }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Chart
              type='line'
              data={{ labels, datasets }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
