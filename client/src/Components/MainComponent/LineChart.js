import React from 'react';
import clsx from 'clsx';
import styles from './MainComponent.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function Chart({
    temperature,
    humidityArr,
    currentForecast
}) {

    if (humidityArr.length === 0 && !temperature)
        return null

    const up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;
    const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

    const data = {
        labels: humidityArr,
        datasets: [
            {
                fill: true,
                backgroundColor: "rgba(151,187,205,0.2)",
                data: humidityArr,
                borderColor: "#039BE5",
                tension: 0.4,
                segment: {
                    borderColor: ctx => up(ctx, '#039BE5') || down(ctx, '#039BE5'),
                    backgroundColor: ctx => up(ctx, '#039BE5') || down(ctx, '#039BE5'),
                },
            }
        ]
    };

    const options = {
        showAllTooltips: true,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 0,
            }
        },
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    borderWidth: 0,
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                    borderWidth: 0,
                },
                ticks: {
                    display: false,
                },
                reverse: true,
                beginAtZero: true,
            }
        },
    };

    const tracker = {
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            text(`${temperature}°F`, currentForecast + 1, currentForecast + 1)
            circle(currentForecast + 1, currentForecast + 1);
            // text
            function text(text, x, y) {
                ctx.font = 'bolder 20px Roboto';
                ctx.fillStyle = '#039BE5';
                ctx.textBaseline = 'bottom';
                ctx.textAlign = 'center';
                ctx.fillText(
                    text,
                    chart.getDatasetMeta(0).data[x].x,
                    chart.getDatasetMeta(0).data[y].y - 20,
                );
            }
            // circle
            function circle(x, y) {
                ctx.beginPath();
                const angle = Math.PI / 180;
                ctx.lineWidth = 8;
                ctx.strokeStyle = '#039BE5';
                ctx.fillStyle = 'red';
                ctx.arc(
                    chart.getDatasetMeta(0).data[x].x,
                    chart.getDatasetMeta(0).data[y].y,
                    4,
                    angle * 0,
                    angle * 360,
                    false);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    return (
        <div className={clsx(
            styles.wrapper_chart
        )}>
            <Line
                key={Math.random()}
                plugins={[tracker]}
                options={options}
                data={data}
            />
        </div>
    )
}

export default Chart;
