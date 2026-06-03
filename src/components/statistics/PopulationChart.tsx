import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	type TooltipItem,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { POPULATION_HISTORY } from '../../data/mockData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const PopulationChart: React.FC = () => {
  const labels = POPULATION_HISTORY.map(item => item.year);
  
  // Data for the chart
  const actualData = POPULATION_HISTORY.map(item => item.year <= 2024 ? item.count : null);
  const projectedData = POPULATION_HISTORY.map(item => item.year >= 2024 ? item.count : null);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Actual PSA Census',
        data: actualData,
        borderColor: '#0045a0',
        backgroundColor: 'rgba(0, 69, 160, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#0045a0',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'LGU Projection',
        data: projectedData,
        borderColor: '#0045a0',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#0045a0',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 11,
            weight: 'bold' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
        cornerRadius: 0,
        displayColors: true,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const label = context.dataset.label || '';
            const value = (context.parsed.y as number) || 0;
            return `${label}: ${value.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: { size: 11 },
          callback: (value: any) => value.toLocaleString(),
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11, weight: 'bold' as const },
        },
      },
    },
  };

  return (
    <div className="h-[350px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};
