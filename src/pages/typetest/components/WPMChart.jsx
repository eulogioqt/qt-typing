import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler // Importar Filler plugin
} from 'chart.js';
import { useIsLarge } from '../../../hooks/useIsLarge';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler // Registrar Filler plugin
);

const WPMChart = ({ data }) => {
    const isLarge = useIsLarge();

    const labels = Object.keys(data);  // Los segundos
    const values = Object.values(data);  // Las WPM

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Palabras por minuto',
                data: values,
                fill: 'origin', // Configuración del relleno
                backgroundColor: 'rgba(255, 255, 255, 0.2)',  // Área azul con transparencia
                borderColor: 'rgba(255, 255, 255, 1)',  // Línea azul
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        tension: 0.3,  // Ajusta la curvatura de la línea si es necesario
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'nearest',  // Muestra el tooltip del punto más cercano
                intersect: false,  // No requiere estar exactamente sobre el punto
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,  // Quita la cuadrícula en el eje X
                },
                title: {
                    display: true,
                    text: 'Segundos',
                    color: '#444444',
                    font: {
                        weight: 'bold',  // Texto en negrita
                        size: "14"
                    },
                },
                ticks: {
                    color: '#444444',  // Texto negro
                    font: {
                        weight: 'bold',  // Números en negrita
                        size: "14"
                    },
                },
            },
            y: {
                grid: {
                    display: false,  // Quita la cuadrícula en el eje Y
                },
                title: {
                    display: isLarge,
                    text: 'Palabras por minuto',
                    color: '#444444',  // Texto negro
                    font: {
                        weight: 'bold',  // Texto en negrita
                        size: "14"
                    },
                },
                ticks: {
                    color: '#444444',  // Texto negro
                    font: {
                        weight: 'bold',  // Números en negrita
                        size: "14"
                    },
                },
                beginAtZero: true,
            },
        },
        borderColor: 'rgba(0, 0, 0, 1)',  // Borde exterior negro
        borderWidth: 3,  // Grosor del borde
    };

    return <Line data={chartData} options={options} />;
};

export default WPMChart;
