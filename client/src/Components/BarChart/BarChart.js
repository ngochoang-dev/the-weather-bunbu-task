import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['Temperature', 'Humidity', 'Wind speed'];

const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [10, 1, 2],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};


function BarChart() {
    return <Bar options={options} data={data} />;
}

export default BarChart