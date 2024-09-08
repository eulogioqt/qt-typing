import React from 'react';

import { Line } from 'react-chartjs-2';

import { useIsLarge } from '../../../hooks/useIsLarge';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
);

const WPMChart = ({ data }) => {
    const isLarge = useIsLarge();

    const labels = Object.keys(data);  // Los segundos
    const wpmValues = Object.values(data).map(item => item.wpm);  // Valores de WPM
    const rawValues = Object.values(data).map(item => item.raw);  // Valores de Raw

    const chartData = {
        labels,
        datasets: [
            {
                label: 'PPM',
                data: wpmValues,
                fill: 'origin',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',  // Área blanca con transparencia
                borderColor: 'rgba(255, 255, 255, 1)',  // Línea blanca
                borderWidth: 3,
                pointRadius: 2,  // Tamaño de los puntos más pequeño
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',  // Color de los puntos
            },
            {
                label: 'PPM con fallos',
                data: rawValues,
                fill: 'origin',
                backgroundColor: 'rgba(168, 168, 168, 0.2)',  // Área gris con transparencia
                borderColor: 'rgba(128, 128, 128, 1)',  // Línea gris
                borderWidth: 3,
                pointRadius: 2,  // Tamaño de los puntos más pequeño
                pointBackgroundColor: 'rgba(128, 128, 128, 1)',  // Color de los puntos
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        tension: 0.3,  // Ajusta la curvatura de la línea
        plugins: {
            legend: {
                display: false,  // Oculta la leyenda
            },
            tooltip: {
                mode: 'index',  // Tooltip compartido
                intersect: false,  // Tooltip compartido aunque los puntos no estén alineados
                callbacks: {
                    // Muestra tanto WPM como Raw en el mismo tooltip
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw || '';
                        return `${label}: ${value}`;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: "rgba(255,255,255,0.2)"
                },
                title: {
                    display: true,
                    text: 'Segundos',
                    color: '#444444',
                    font: {
                        weight: 'bold',
                        size: "14"
                    },
                },
                ticks: {
                    color: '#444444',
                    font: {
                        weight: 'bold',
                        size: "14"
                    },
                },
            },
            y: {
                grid: {
                    display: true,
                    color: "rgba(255,255,255,0.2)"
                },
                title: {
                    display: isLarge,
                    text: 'Palabras por minuto',
                    color: '#444444',
                    font: {
                        weight: 'bold',
                        size: "14"
                    },
                },
                ticks: {
                    color: '#444444',
                    font: {
                        weight: 'bold',
                        size: "14"
                    },
                },
                beginAtZero: true,
            },
        },
        interaction: {
            mode: 'index',  // Tooltip compartido
            intersect: false,  // Tooltip compartido aunque los puntos no se intersecten
        },
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 3,
    };

    return <Line data={chartData} options={options} />;
};

export default WPMChart;
