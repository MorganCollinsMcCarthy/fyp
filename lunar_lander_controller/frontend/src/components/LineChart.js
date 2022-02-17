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

import { Scatter } from "react-chartjs-2";

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
              let filtered = text
                .replaceAll("/", "_")
                .split("\n")
                .filter(function (s) {
                  return s.match(props.type);
                })
                .join("\n");
              let data = filtered.match(/.+/g).map(JSON.parse);
              setChart(data);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  const transformedData = chart.map((obj) => {
    return {
      x: obj.time_total_timesteps,
      y: obj[props.type],
    };
  });

  const data = {
    datasets: [
      {
        label: props.type,
        showLine: true,
        data: transformedData,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return <Scatter data={data} />;
};

export default LineChart;
