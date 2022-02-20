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
  const [algorithms, setAlgorithms] = useState([]);
  useEffect(() => {
    const getAlgorithms = () => {
      if (props.dqn) {
        getData("DQN")
      }
      if (props.a2c) {
        getData("A2C")
      }
      if (props.ddpg) {
        getData("DDPG");
      }
      if (props.her) {
        getData("HER");
      }
      if (props.ppo) {
        getData("PPO");
      }
      if (props.sac) {
        getData("SAC");
      }
    };

    const getData = async (alg) => {
      await fetch(
        "http://127.0.0.1:8000/reinforcement_learning/logs/" +
          props.code +
          "/" +
          alg +
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
              setChart((chart) => [...chart, data]);
              setAlgorithms((algorithms) => [...algorithms, alg]);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAlgorithms();
  }, []);

  function transformData(i) {
    const transformedData = chart[i]?.map((obj) => {
      return { x: obj.time_total_timesteps, y: obj[props.type] };
    });
    return transformedData;
  }

  const data = {
    datasets: [],
  };

  const options = {
    pointRadius: 0,
  }

  for (var i = 0; i < chart.length; i++) {
    const colours = [
      "#ffa600",
      "#00ff2f",
      "#0d00ff",
      "#ff03d1",
      "#ff0000",
      "#00eaff",
    ];

    data.datasets.push({
      label: algorithms[i],
      data: transformData(i),
      showLine: true,
      backgroundColor: colours[i],
      borderColor: colours[i],
    });
  }

  return <Scatter data={data} options={options} />;
};

export default LineChart;
