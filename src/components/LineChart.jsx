import React from 'react';
import { Line } from "react-chartjs-2";
import drawLineTooltip from './LineCanvas';
import externalTooltipHandler from './ExternalTooltip';

const LineChart = () => {
	const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
  	datasets: [
    	{
				label: 'realworld',
				data: [12, 19, 3, 5, 2, 3],
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
				tension: 0.2,
			},
			{
				label: 'simulation',
				data: [40, 10, 3, 15, 20, 9],
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