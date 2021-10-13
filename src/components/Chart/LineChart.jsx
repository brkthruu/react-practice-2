import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import drawLineTooltip from './LineCanvas';
import externalTooltipHandler from './ExternalTooltip';
import axios from 'axios';

const LineChart = () => {
	const [labels, setLabels] = useState([]);
	const [realData, setRealData] = useState([]);
	const [simulData, setSimulData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(process.env.REACT_APP_SERVER_ADDRESS_IP + '/simulation/rack');
				setLabels(Array.from(response.data[0].real, x => x.time));
				setRealData(Array.from(response.data[0].real, y => y.value));
				setSimulData(Array.from(response.data[0].simulation, y => y.value));
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

	const data = {
    labels: labels,
  	datasets: [
    	{
				label: 'realworld',
				data: realData,
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
				tension: 0.2,
			},
			{
				label: 'simulation',
				data: simulData,
				fill: false,
				backgroundColor: 'rgb(0, 99, 132)',
				borderColor: 'rgba(0,80, 132, 0.2)',				
				tension: 0.2,
			}
		],
	};

	const lineTooltip = {
    id: 'lineTooltip',
    afterDraw: (chart) => drawLineTooltip(chart)
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	
		plugins: {
			tooltip: {
				enabled: false,
				external: externalTooltipHandler,
				mode: 'index',
				intersect: false,
				callbacks: {
					title: function () {
						return 'Gap';
					},
					label: function () {
						return '';
					},
				}
			},
		},
		interaction: {
      intersect: false,
      mode: 'index',
    },
	};



	return (
		<div>
			<Line data={data} options={options} plugins={[lineTooltip]}/>
		</div>
	);
};

export default LineChart;