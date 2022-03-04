import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,

} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    BarElement
);

const BarChart = (props) => {
  const [chart, setChart] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      await fetch(
          "http://127.0.0.1:8000"+
          props.url+"/eval.txt"
      )
        .then((response) => {
          if (response.ok) {
            response.text().then((text) => {
                const array = text.split(',')
                setChart(array)
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [props.url]);

  const data = {
    labels: [1,2,3,4,5,6,7,8,9,10],
    datasets: [{
      label: props.url.split('/')[4],
      data: chart,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 0.5,
      barPercentage: 1,
      categoryPercentage: 1,
    }]
  };
  
  return <Bar data={data}/>;
};

export default BarChart;
