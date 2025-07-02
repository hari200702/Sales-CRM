import React ,{useState}from 'react'
import '../App.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



export const ChartBar = ({ data:salesAnalytics =[] }) => {

    
    const [selectedBarIndex, setSelectedBarIndex] = useState(null);

    const labels = salesAnalytics.map((item) => item.date);
    const salesData = salesAnalytics.map((item) => item.count); 


    const chartData = {
        labels: labels,
        datasets: [
            {
                data: salesData,
                backgroundColor: salesData.map((_, index) => 
                    index === selectedBarIndex ? '#6c6e7a' : '#d4d6db'
                ),
                borderRadius: {
                    topLeft: 8,
                    topRight: 8,
                    bottomLeft: 0,
                    bottomRight: 0
                },
                barThickness: 13,
                maxBarThickness: 20,
            }
        ]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => `${context.parsed.y}`
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: '#888',
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                beginAtZero: true,
                max: 60,
                ticks: {
                    callback: (value) => `${value}`,
                    stepSize: 10,
                    color: '#888',
                    font: {
                        size: 11
                    }
                },
                grid: {
                    color: '#f0f0f0',
                    drawBorder: false
                }
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                setSelectedBarIndex(elements[0].index);
            } else {
                setSelectedBarIndex(null);
            }
        },
        onHover: (event, elements) => {
            event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
        }
    };


  return (
    <div className="analyticsBox">
        <h4>Sale Analytics</h4>
            <div className="chartContainer">
                <Bar data={chartData} options={options} />
            </div>
    </div>

  )
}

export default ChartBar;