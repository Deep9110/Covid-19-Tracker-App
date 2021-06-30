import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {confirmed, deaths, recovered}, country}) =>{
    const [dailyData, setDailyData] = useState([]);
    
  useEffect(() =>{
    // const fetchAPI = async () => {
    //     setDailyData(await fetchDailyData());
    // }
    const fetchAPI = async () => {
        const initialDailyData = await fetchDailyData();
  
        setDailyData(initialDailyData);
      };

    fetchAPI();
  }, []);

//     const lineChart =(
//         dailyData.length 
//         ? (
//             <Line 
//             data={{
//                 lebels: dailyData.map(({date}) => date),
//                 datasets: [{
//                     data: dailyData.map(({confirmed}) => confirmed),
//                     lebel: 'Infected',
//                     borderColor: '#3333ff',
//                     fill: true,
//                 }, {
//                     data: dailyData.map(({deaths}) => deaths),
//                     lebel: 'Deaths',
//                     borderColor: 'red',
//                     backgroundColor: 'rgba(255, 0, 0, 0.5)',
//                     fill: true,
//                 }],  
//             }}
//         />) : null
         
//     );

//    // console.log(confirmed, recovered, deaths);

//     const barChart = (
//         confirmed
//         ? (
//             <Bar 
//                 data={{
//                     lebels: ['Infected', 'Recovered', 'Deaths'],
//                     datasets: [{
//                         lebel: 'People',
//                         backgroundColor:['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
//                         data:[confirmed.value, recovered.value, deaths.value],
//                     }]
//                 }}
//                 options={{
//                    legend: { display: false},
//                    title: { display: true, text: `Current State in ${country}`}
//                 }}
//             />
//         ): null
//     );
const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
           },{
            data: dailyData.map((data) => data.recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}
export default Chart;