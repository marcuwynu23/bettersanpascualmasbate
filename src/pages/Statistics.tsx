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
} from 'chart.js';
import { Info, TrendingDown, Users } from 'lucide-react';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { BARANGAY_HISTORY, POPULATION_HISTORY } from '../data/mockData';

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
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
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

  const totalPopulationActual = POPULATION_HISTORY.find(p => p.year === 2024)?.count || 0;
  const totalPopulationPrevActual = POPULATION_HISTORY.find(p => p.year === 2020)?.count || 0;
  const percentChangeActual = (((totalPopulationActual - totalPopulationPrevActual) / totalPopulationPrevActual) * 100).toFixed(2);

  return (
    <div className="space-y-12 py-4 theme-transition">
      {/* Header Section */}
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-app-primary theme-transition block">
          Demographic Insights
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-app-text theme-transition">
          Municipal Statistics
        </h1>
        <p className="text-sm sm:text-base text-app-text-muted leading-relaxed max-w-2xl mx-auto theme-transition">
          Accurate population trends from PSA historical data and current LGU growth projections.
        </p>
      </section>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-app-card/65 p-6 border-b-2 border-app-primary shadow-xs theme-transition relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-app-muted/50 text-app-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">Latest Actual (2024)</p>
              <p className="text-2xl font-bold text-app-text">{totalPopulationActual.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-app-card/65 p-6 border-b-2 border-app-primary shadow-xs theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-app-muted/50 text-app-primary">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">Actual Growth (20-24)</p>
              <p className="text-2xl font-bold text-app-primary">+{percentChangeActual}%</p>
            </div>
          </div>
        </div>
        <div className="bg-app-card/65 p-6 border-b-2 border-gold-500 shadow-xs theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-app-muted/50 text-gold-600">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">Current Year</p>
              <p className="text-2xl font-bold text-app-text">2026 (Est.)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Population Chart */}
      <div className="bg-app-card/65 shadow-xs p-6 sm:p-10 rounded-none theme-transition">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-app-text">Population Trend Analysis</h2>
            <p className="text-xs text-app-text-muted mt-1">Comparing official census data with recent projections (2020-2026)</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-bold text-app-text-dim uppercase tracking-widest bg-app-muted/50 px-3 py-1">
              Source: PSA & LGU Registry
            </span>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <Line data={chartData} options={options} />
        </div>
      </div>

      {/* Barangay Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap px-1">
          <h2 className="text-xl font-bold text-app-text">Population by Barangay (Official 2020)</h2>
          <div className="flex items-center gap-2 text-[10px] text-app-text-muted italic uppercase tracking-wider">
            <Info className="h-3 w-3" />
            Latest PSA Verified Data
          </div>
        </div>

        <div className="bg-app-card shadow-xs rounded-none overflow-hidden theme-transition divide-y divide-app-border/40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-app-border/40">
            {BARANGAY_HISTORY.sort((a, b) => parseInt(b.population.replace(/,/g, '')) - parseInt(a.population.replace(/,/g, ''))).map((brgy) => (
              <div key={brgy.id} className="p-6 flex items-center justify-between hover:bg-app-card-hover transition-all group">
                <div className="space-y-1.5">
                  <p className="font-bold text-app-text group-hover:text-app-primary transition-colors leading-none">{brgy.name}</p>
                  <span className={`inline-block text-[8px] font-extrabold uppercase px-2 py-0.5 border border-current ${brgy.coastal ? 'text-app-primary' : 'text-app-text-dim'}`}>
                    {brgy.coastal ? 'Coastal' : 'Upland'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-app-text">{parseInt(brgy.population.replace(/,/g, '')).toLocaleString()}</p>
                  <p className="text-[9px] font-bold text-app-text-dim uppercase tracking-tighter">Residents</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <section className="bg-app-muted/65 p-6 sm:p-8 rounded-none flex flex-col sm:flex-row items-center gap-5 theme-transition">
        <Info className="h-8 w-8 text-app-primary shrink-0 theme-transition" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-app-text theme-transition">Data Integrity Note</h4>
          <p className="text-xs text-app-text-muted leading-relaxed theme-transition">
            The population trend from 2021 to 2026 is based on LGU projections and local registries. 
            Official barangay-level breakdowns reflect the latest verified counts from the Philippine Statistics Authority (PSA) 2020 Census. 
            Demographic shifts are influenced by regional migration and economic developments.
          </p>
        </div>
      </section>
    </div>
  );
};
