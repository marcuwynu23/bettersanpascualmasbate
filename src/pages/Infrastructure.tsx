import { Calendar, CheckCircle2, Clock, Construction, ExternalLink, HardHat, Info, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Project {
  contractId: string;
  description: string;
  category: string;
  status: string;
  budget: number;
  progress: number;
  contractor: string;
  startDate: string | null;
  completionDate: string | null;
  infraYear: string;
  location: {
    province: string;
    region: string;
  };
}

export const Infrastructure: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.transparency.dpwh.gov.ph/projects?page=1&limit=50&search=San+Pascual%2C+Masbate&region=Region+V&province=MASBATE');
        const result = await response.json();
        if (result.code === 'SUCCESS') {
          setProjects(result.data.data);
        } else {
          setError('Failed to fetch infrastructure data');
        }
      } catch (_err) {
				console.log(_err)
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-100';
      case 'on-going':
        return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'for procurement':
        return 'text-amber-600 bg-amber-50 border-amber-100';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="bg-[#0045a0] text-white p-8 sm:p-12 rounded-none shadow-lg theme-transition">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">
            <HardHat className="h-4 w-4" />
            DPWH Transparency Data
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight">
            Infrastructure Projects
          </h1>
          <p className="text-lg text-white/80 max-w-2xl font-light leading-relaxed">
            Real-time monitoring of national infrastructure developments in San Pascual, Masbate. Data directly sourced from the DPWH Transparency Portal.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-app-border shadow-sm theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600">
              <Construction className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Projects</p>
              <p className="text-2xl font-bold text-slate-900">{loading ? '...' : projects.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 border border-app-border shadow-sm theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed</p>
              <p className="text-2xl font-bold text-slate-900">
                {loading ? '...' : projects.filter(p => p.status.toLowerCase() === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 border border-app-border shadow-sm theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">In Progress</p>
              <p className="text-2xl font-bold text-slate-900">
                {loading ? '...' : projects.filter(p => p.status.toLowerCase() === 'on-going').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-2xl font-bold text-slate-900">Project Registry</h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 italic">
            <Info className="h-3 w-3" />
            Source: DPWH Region V - Masbate 1st DEO
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white border border-app-border p-6 space-y-4 animate-pulse">
                <div className="h-4 bg-slate-200 w-1/4"></div>
                <div className="h-8 bg-slate-200 w-full"></div>
                <div className="h-4 bg-slate-200 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-8 text-center rounded-none">
            <p className="text-red-600 font-bold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.contractId} className="group bg-white border border-app-border hover:border-blue-200 hover:shadow-md transition-all duration-300 rounded-none flex flex-col">
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 border border-blue-100 tracking-wider">
                      {project.contractId}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 leading-snug group-hover:text-[#0045a0] transition-colors">
                    {project.description}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year</p>
                      <p className="font-semibold text-slate-700">{project.infraYear}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Budget</p>
                      <p className="font-bold text-[#0045a0]">{project.budget > 0 ? formatCurrency(project.budget) : 'TBA'}</p>
                    </div>
                  </div>

                  {project.status.toLowerCase() === 'on-going' && (
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-slate-500">Physical Progress</span>
                        <span className="text-blue-600">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-none overflow-hidden">
                        <div 
                          className="h-full bg-[#0045a0] transition-all duration-500" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium truncate">{project.location.province}, {project.location.region}</span>
                    </div>
                    {project.contractor && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Construction className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium truncate uppercase">{project.contractor}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {project.startDate && (
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                        <Calendar className="h-3 w-3" />
                        Starts: {project.startDate}
                      </div>
                    )}
                  </div>
                  <a 
                    href={`https://transparency.dpwh.gov.ph/projects/${project.contractId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[9px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase tracking-wider"
                  >
                    View Details
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-100 p-6 space-y-2">
        <h4 className="text-sm font-bold text-[#0045a0] flex items-center gap-2">
          <Info className="h-4 w-4" />
          Data Integrity Note
        </h4>
        <p className="text-xs text-blue-800/80 leading-relaxed">
          The information presented here is fetched directly from the Department of Public Works and Highways (DPWH) Infrastructure Monitoring System. 
          This portal does not store this data; it acts as a secondary transparency mirror for the citizens of San Pascual, Masbate to easily access national government project statuses in their locality.
        </p>
      </div>
    </div>
  );
};
