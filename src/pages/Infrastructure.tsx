import { Calendar, CheckCircle2, Clock, Construction, ExternalLink, Info, MapPin, Search, ShieldAlert } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomSelect } from '../components/common/CustomSelect';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const statuses = ['All', 'Completed', 'On-Going', 'For Procurement'];

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

  // Filter projects based on search and status selection
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = 
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.contractId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.contractor && project.contractor.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = 
        selectedStatus === 'All' || 
        project.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, selectedStatus]);

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
    <div className="space-y-12 py-4 theme-transition">
      {/* Header Section */}
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-app-primary theme-transition block">
          DPWH Transparency Data
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-app-text theme-transition">
          Infrastructure Projects
        </h1>
        <p className="text-sm sm:text-base text-app-text-muted leading-relaxed max-w-2xl mx-auto theme-transition">
          Real-time monitoring of national infrastructure developments in San Pascual, Masbate. Data directly sourced from the DPWH Transparency Portal.
        </p>
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-app-card/65 p-6 border-b-2 border-app-primary shadow-xs theme-transition relative overflow-hidden">
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
            <div className="p-3 bg-app-muted/50 text-app-primary">
              <Construction className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">Total Projects</p>
              <p className="text-2xl font-bold text-app-text">{loading ? '...' : projects.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-app-card/65 p-6 border-b-2 border-app-primary shadow-xs theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-app-muted/50 text-app-primary">
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
        <div className="bg-app-card/65 p-6 border-b-2 border-gold-500 shadow-xs theme-transition">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-app-muted/50 text-gold-600">
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

      {/* Control Panel (Search & Filter) - Added to match Transparency design */}
      <div className="bg-app-card/65 shadow-xs p-5 rounded-none space-y-4 theme-transition">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-app-text-muted theme-transition" />
            <input 
              type="text" 
              placeholder="Search by description, contract ID, or contractor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-none bg-app-muted/65 focus:bg-app-muted focus:outline-none focus:ring-2 focus:ring-app-primary/10 transition-all text-sm text-app-text placeholder-app-text-muted/60"
            />
          </div>

          {/* Status Dropdown */}
          <CustomSelect
            label="Filter Status:"
            options={statuses}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />

        </div>

        {/* Status Pills for wide screens */}
        <div className="hidden sm:flex flex-wrap gap-2 pt-2 theme-transition">
          {statuses.map((stat) => (
            <button
              key={stat}
              onClick={() => setSelectedStatus(stat)}
              className={`px-4.5 py-1.5 rounded-none text-xs font-bold transition-all cursor-pointer theme-transition ${
                selectedStatus === stat
                  ? 'bg-app-primary text-white shadow-xs font-semibold'
                  : 'bg-app-muted/50 text-app-text-muted hover:bg-app-muted/80'
              }`}
            >
              {stat === 'All' ? 'Show All Projects' : stat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap px-1">
          <h2 className="text-xl font-bold text-app-text">Project Registry</h2>
          <div className="flex items-center gap-2 text-[10px] text-app-text-muted italic uppercase tracking-wider">
            <Info className="h-3 w-3" />
            Source: DPWH Region V - Masbate 1st DEO
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-app-card/50 p-6 space-y-4 animate-pulse">
                <div className="h-4 bg-app-muted w-1/4"></div>
                <div className="h-8 bg-app-muted w-full"></div>
                <div className="h-4 bg-app-muted w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-accent-50 border border-accent-100 p-12 text-center rounded-none shadow-sm">
            <ShieldAlert className="h-10 w-10 text-app-primary mx-auto mb-4" />
            <p className="text-app-primary font-bold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.contractId} className="group bg-app-card shadow-xs hover:bg-app-card-hover transition-all duration-300 rounded-none flex flex-col">
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] font-bold text-app-text-dim bg-app-muted/50 px-2 py-0.5 tracking-wider">
                      {project.contractId}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 border border-current ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-app-text leading-snug group-hover:text-app-primary transition-colors">
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
                      <div className="h-1 bg-app-muted rounded-none overflow-hidden">
                        <div 
                          className="h-full bg-app-primary transition-all duration-500" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-app-border/40 space-y-3">
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
                
                <div className="bg-app-muted/20 px-6 py-3 border-t border-app-border/40 flex items-center justify-between">
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
        
        {/* Empty State for Search */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-16 px-6 space-y-4">
            <Search className="h-12 w-12 mx-auto text-app-text-muted theme-transition" />
            <div className="space-y-2">
              <h3 className="text-base font-bold text-app-text theme-transition">No projects found</h3>
              <p className="text-xs text-app-text-muted max-w-sm mx-auto leading-normal theme-transition">
                Your search keyword "{searchTerm}" did not yield any matching projects. Try clearing terms or checking spelling.
              </p>
            </div>
            <button
              onClick={() => { setSearchTerm(''); setSelectedStatus('All'); }}
              className="bg-app-primary hover:bg-app-primary-hover text-white text-xs font-semibold px-4 py-2 rounded-none shadow-sm transition-all cursor-pointer theme-transition"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>

      {/* Connection Notice - Moved below the Registry */}
      {!loading && isLive === false && !error && (
        <div className="bg-app-muted/50 p-6 rounded-none flex items-start gap-4 shadow-xs">
          <div className="p-2 bg-app-primary/10 text-app-primary">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-app-text flex items-center gap-2">
              Security Protocol Active
              <span className="px-1.5 py-0.5 bg-app-primary/10 text-app-primary text-[9px] uppercase tracking-widest">Cloudflare Managed</span>
            </p>
            <p className="text-xs text-app-text-muted leading-relaxed">
              The DPWH API has triggered a security challenge. We are serving data from our <strong>Community Mirror</strong> to maintain transparency.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => fetchProjects()}
                className="text-[10px] font-bold uppercase tracking-widest text-white bg-app-primary hover:bg-app-primary-hover px-4 py-2 transition-all shadow-sm"
              >
                Retry Live Fetch
              </button>
              <a 
                href="https://api.transparency.dpwh.gov.ph/projects?page=1&limit=50&search=San+Pascual%2C+Masbate&region=Region+V&province=MASBATE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-widest text-app-primary hover:text-app-primary-hover border border-app-primary/20 px-4 py-2 transition-all"
              >
                Open Live Portal
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <section className="bg-app-muted/65 p-6 sm:p-8 rounded-none flex flex-col sm:flex-row items-center gap-5 theme-transition">
        <Info className="h-8 w-8 text-app-primary shrink-0 theme-transition" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-app-text theme-transition">Data Integrity Note</h4>
          <p className="text-xs text-app-text-muted leading-relaxed theme-transition">
            Information fetched directly from the Department of Public Works and Highways (DPWH) Monitoring System. 
            This portal acts as a secondary transparency mirror for the citizens of San Pascual, Masbate.
          </p>
        </div>
      </section>
    </div>
  );
};
