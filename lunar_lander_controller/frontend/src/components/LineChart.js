import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props) => {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await fetch(
        "http://127.0.0.1:8000/reinforcement_learning/logs/" +
          props.code +
          "/progress.json"
      )
        .then((response) => {
          if (response.ok) {
            response.text().then((text) => {
              let filtered = text.replaceAll("/", "_").split('\n').filter(function (s) { return s.match(props.type) }).join('\n')
              let data = filtered.match(/.+/g).map(JSON.parse);
              setChart(data)
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  var data = {
    labels: chart?.map((x) => x.time_total_timesteps),
    datasets: [
      {
        label: props.type,
        data: chart?.map((x) => x[props.type]),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} />;
};

export default LineChart;
