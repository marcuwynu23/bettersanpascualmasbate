import { Calendar, CheckCircle2, Clock, Construction, ExternalLink, HardHat, Info, MapPin, ShieldAlert } from 'lucide-react';
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

interface DPWHResponse {
  code: string;
  message?: string;
  data: {
    data: Project[];
  };
}

export const Infrastructure: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean | 'checking'>( 'checking');

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Attempting live fetch via proxy...');
      const response = await fetch('/api-dpwh/projects?page=1&limit=50&search=San+Pascual%2C+Masbate&region=Region+V&province=MASBATE');
      
      // 1. Check if the response is okay
      if (!response.ok) {
        throw new Error(`Connection Refused (Status: ${response.status}). Cloudflare protection is likely active.`);
      }

      // 2. Check content type carefully
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        if (text.includes('<!DOCTYPE') || text.includes('<html')) {
          throw new Error('Cloudflare "Just a moment" challenge detected (HTML returned instead of JSON).');
        }
        throw new Error(`Unexpected content type: ${contentType}`);
      }

      // 3. Try parsing JSON safely
      const text = await response.text();
      try {
        const result = JSON.parse(text) as DPWHResponse;
        
        if (result && result.code === 'SUCCESS') {
          setProjects(result.data.data);
          setIsLive(true);
        } else {
          throw new Error(result?.message || 'API returned failure code');
        }
      } catch (parseErr) {
        console.error('JSON Parse Error. Raw response:', text.substring(0, 100));
        throw new Error('Failed to parse transparency data. The source may be sending invalid format.', { cause: parseErr });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.warn('Live fetch failed:', errorMessage);
      try {
        console.log('Falling back to local community mirror...');
        const fallbackResponse = await fetch('/data/dpwh_cache.json');
        if (!fallbackResponse.ok) throw new Error('Mirror file not found or inaccessible', { cause: err });
        
        const fallbackData = await fallbackResponse.json() as DPWHResponse;
        setProjects(fallbackData.data.data);
        setIsLive(false);
      } catch (fallbackErr: unknown) {
        const fallbackMessage = fallbackErr instanceof Error ? fallbackErr.message : 'Unknown fallback error';
        console.error('Mirror fallback failed:', fallbackMessage);
        setError('Both live data and community mirror are currently unavailable. Please try again later.');
        setIsLive(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchProjects();
    };
    init();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-app-primary bg-primary-50 border-app-border';
      case 'on-going':
        return 'text-gold-700 bg-gold-50 border-gold-100';
      case 'for procurement':
        return 'text-app-text-dim bg-app-muted border-app-border-muted';
      default:
        return 'text-app-text-muted bg-app-muted border-app-border-muted';
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
      <div className="bg-app-primary text-white p-8 sm:p-12 rounded-none shadow-lg theme-transition">
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
        <div className="bg-app-card p-6 border border-app-border shadow-sm theme-transition relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            {isLive === true ? (
              <span className="flex items-center gap-1 text-[9px] font-bold text-app-primary bg-primary-50 px-1.5 py-0.5 border border-app-border uppercase tracking-tighter">
                <span className="w-1.5 h-1.5 rounded-full bg-app-primary animate-pulse" />
                Live
              </span>
            ) : isLive === false ? (
              <span className="flex items-center gap-1 text-[9px] font-bold text-gold-700 bg-gold-50 px-1.5 py-0.5 border border-gold-100 uppercase tracking-tighter">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Mirror
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[9px] font-bold text-app-text-dim bg-app-muted px-1.5 py-0.5 border border-app-border uppercase tracking-tighter">
                Checking...
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-50 text-app-primary">
              <Construction className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">Total Projects</p>
              <p className="text-2xl font-bold text-app-text">{loading ? '...' : projects.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-app-card p-6 border border-app-border shadow-sm theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-50 text-app-primary">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">Completed</p>
              <p className="text-2xl font-bold text-app-text">
                {loading ? '...' : projects.filter(p => p.status.toLowerCase() === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-app-card p-6 border border-app-border shadow-sm theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold-50 text-gold-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">In Progress</p>
              <p className="text-2xl font-bold text-app-text">
                {loading ? '...' : projects.filter(p => p.status.toLowerCase() === 'on-going').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-2xl font-bold text-app-text">Project Registry</h2>
          <div className="flex items-center gap-2 text-xs text-app-text-muted italic">
            <Info className="h-3 w-3" />
            Source: DPWH Region V - Masbate 1st DEO
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-app-card border border-app-border p-6 space-y-4 animate-pulse">
                <div className="h-4 bg-app-muted w-1/4"></div>
                <div className="h-8 bg-app-muted w-full"></div>
                <div className="h-4 bg-app-muted w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-accent-50 border border-accent-100 p-8 text-center rounded-none">
            <p className="text-app-primary font-bold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.contractId} className="group bg-app-card border border-app-border hover:border-app-primary hover:shadow-md transition-all duration-300 rounded-none flex flex-col">
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] font-bold text-app-primary bg-primary-50 px-2 py-0.5 border border-app-border tracking-wider">
                      {project.contractId}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-app-text leading-snug group-hover:text-app-primary transition-colors">
                    {project.description}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-app-text-dim uppercase tracking-widest">Year</p>
                      <p className="font-semibold text-app-text-muted">{project.infraYear}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-app-text-dim uppercase tracking-widest">Budget</p>
                      <p className="font-bold text-app-primary">{project.budget > 0 ? formatCurrency(project.budget) : 'TBA'}</p>
                    </div>
                  </div>

                  {project.status.toLowerCase() === 'on-going' && (
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-app-text-muted">Physical Progress</span>
                        <span className="text-app-primary">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-app-muted rounded-none overflow-hidden">
                        <div 
                          className="h-full bg-app-primary transition-all duration-500" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-app-border space-y-3">
                    <div className="flex items-center gap-2 text-xs text-app-text-muted">
                      <MapPin className="h-3.5 w-3.5 text-app-text-dim shrink-0" />
                      <span className="font-medium truncate">{project.location.province}, {project.location.region}</span>
                    </div>
                    {project.contractor && (
                      <div className="flex items-center gap-2 text-xs text-app-text-muted">
                        <Construction className="h-3.5 w-3.5 text-app-text-dim shrink-0" />
                        <span className="font-medium truncate uppercase">{project.contractor}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-app-muted/30 px-6 py-3 border-t border-app-border flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {project.startDate && (
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-app-text-dim uppercase tracking-tighter">
                        <Calendar className="h-3 w-3" />
                        Starts: {project.startDate}
                      </div>
                    )}
                  </div>
                  <a 
                    href={`https://transparency.dpwh.gov.ph/projects/${project.contractId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[9px] font-bold text-app-primary hover:text-app-primary-hover flex items-center gap-1 uppercase tracking-wider"
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

      {/* Connection Notice - Moved below the Registry */}
      {!loading && isLive === false && !error && (
        <div className="bg-gold-50 border border-gold-100 p-5 rounded-none flex items-start gap-4 shadow-sm">
          <div className="p-2 bg-gold-100 rounded-none text-gold-600">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-app-text flex items-center gap-2">
              Security Protocol Active
              <span className="px-1.5 py-0.5 bg-gold-200 text-[9px] uppercase tracking-widest rounded-none">Cloudflare Managed</span>
            </p>
            <p className="text-xs text-app-text-muted leading-relaxed">
              The DPWH API has triggered a "Just a moment" security challenge which prevents automated live updates. 
              To maintain transparency, we are serving data from our <strong>Community Mirror</strong>.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <button 
                onClick={() => fetchProjects()}
                className="text-[10px] font-bold uppercase tracking-widest text-white bg-app-primary hover:bg-app-primary-hover px-3 py-1.5 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Clock className="h-3 w-3" />
                Retry Live Fetch
              </button>
              <a 
                href="https://api.transparency.dpwh.gov.ph/projects?page=1&limit=50&search=San+Pascual%2C+Masbate&region=Region+V&province=MASBATE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-widest text-app-primary hover:text-app-primary-hover border border-app-border px-3 py-1.5 transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="h-3 w-3" />
                Open Live Portal
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-app-muted border border-app-border p-6 space-y-2">
        <h4 className="text-sm font-bold text-app-primary flex items-center gap-2">
          <Info className="h-4 w-4" />
          Data Integrity Note
        </h4>
        <p className="text-xs text-app-text-dim leading-relaxed">
          The information presented here is fetched directly from the Department of Public Works and Highways (DPWH) Infrastructure Monitoring System. 
          This portal does not store this data; it acts as a secondary transparency mirror for the citizens of San Pascual, Masbate to easily access national government project statuses in their locality.
        </p>
      </div>
    </div>
  );
};
