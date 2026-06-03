import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BarChart3, Users, TrendingDown, Info } from 'lucide-react';
import { POPULATION_HISTORY, BARANGAY_HISTORY } from '../data/mockData';

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

export const Statistics: React.FC = () => {
  const labels = POPULATION_HISTORY.map(item => item.year);
  const dataPoints = POPULATION_HISTORY.map(item => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Population',
        data: dataPoints,
        borderColor: '#0045a0',
        backgroundColor: 'rgba(0, 69, 160, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#0045a0',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
        cornerRadius: 0,
        displayColors: false,
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

  const totalPopulation2020 = POPULATION_HISTORY[POPULATION_HISTORY.length - 1].count;
  const totalPopulation2015 = POPULATION_HISTORY[0].count;
  const percentChange = (((totalPopulation2020 - totalPopulation2015) / totalPopulation2015) * 100).toFixed(2);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="bg-app-primary text-white p-8 sm:p-12 rounded-none shadow-lg theme-transition">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">
            <BarChart3 className="h-4 w-4" />
            Demographic Insights
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight">
            Municipal Statistics
          </h1>
          <p className="text-lg text-white/80 max-w-2xl font-light leading-relaxed">
            Visualizing the growth and demographic trends of San Pascual. Data based on PSA historical censuses and local registries.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-app-card p-6 border border-app-border shadow-sm theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-50 text-app-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">Latest Census (2020)</p>
              <p className="text-2xl font-bold text-app-text">{totalPopulation2020.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-app-card p-6 border border-app-border shadow-sm theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent-50 text-app-primary">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">5-Year Trend</p>
              <p className="text-2xl font-bold text-app-primary">{percentChange}%</p>
            </div>
          </div>
        </div>
        <div className="bg-app-card p-6 border border-app-border shadow-sm theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold-50 text-gold-600">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">Growth Type</p>
              <p className="text-2xl font-bold text-app-text">Consolidating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Population Chart */}
      <div className="bg-app-card border border-app-border p-6 sm:p-8 shadow-sm theme-transition">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-app-text">Population Trend (2015-2020)</h2>
            <p className="text-xs text-app-text-muted mt-1">Total residents across all 22 barangays</p>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] font-bold text-app-text-dim uppercase tracking-widest bg-app-muted px-2 py-1 border border-app-border">
              Source: PSA Census
            </span>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <Line data={chartData} options={options} />
        </div>
      </div>

      {/* Barangay Breakdown */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-app-text">Population by Barangay (2020)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BARANGAY_HISTORY.sort((a, b) => parseInt(b.population.replace(/,/g, '')) - parseInt(a.population.replace(/,/g, ''))).map((brgy) => (
            <div key={brgy.id} className="bg-app-card border border-app-border p-4 flex items-center justify-between hover:border-app-primary transition-colors">
              <div className="space-y-1">
                <p className="font-bold text-app-text leading-none">{brgy.name}</p>
                <p className="text-[10px] font-semibold text-app-text-muted uppercase tracking-wider">
                  {brgy.coastal ? 'Coastal' : 'Upland'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-app-primary">{parseInt(brgy.population.replace(/,/g, '')).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-app-muted border border-app-border p-6 space-y-2">
        <h4 className="text-sm font-bold text-app-primary flex items-center gap-2">
          <Info className="h-4 w-4" />
          Data Integrity Note
        </h4>
        <p className="text-xs text-app-text-dim leading-relaxed">
          The population data presented here is sourced from the Philippine Statistics Authority (PSA) 2015 and 2020 Censuses of Population and Housing. 
          The trend line reflects the official count of residents registered during these periods. Demographic shifts may be influenced by local migration, economic changes, and geographical factors.
        </p>
      </div>
    </div>
  );
};
