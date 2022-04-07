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




function BarChart({
    labels,
    temperature,
    humidity,
    windSpeed, }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperature',
                data: temperature,
                backgroundColor: '#039BE5',
            },
            {
                label: 'Humidity',
                data: humidity,
                backgroundColor: 'pink',
            },
            {
                label: 'Wind speed',
                data: windSpeed,
                backgroundColor: 'gray',
            },
        ],
    };


    return <Bar options={options} data={data} />;
}

export default BarChart