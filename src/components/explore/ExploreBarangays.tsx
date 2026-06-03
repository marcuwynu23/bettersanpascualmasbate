import React, { useState } from 'react';
import { Building, Search, Anchor, MapPin, User, ChevronUp, ChevronDown, AlertCircle } from 'lucide-react';
import { BARANGAY_HISTORY } from '../../data/mockData';

export const ExploreBarangays: React.FC = () => {
  const [barangaySearch, setBarangaySearch] = useState<string>('');
  const [barangayType, setBarangayType] = useState<'all' | 'coastal' | 'inland'>('all');
  const [expandedBarangayId, setExpandedBarangayId] = useState<string | null>(null);

  const filteredBarangays = BARANGAY_HISTORY.filter(brgy => {
    const matchesSearch = brgy.name.toLowerCase().includes(barangaySearch.toLowerCase()) ||
      brgy.captain.toLowerCase().includes(barangaySearch.toLowerCase()) ||
      brgy.history.toLowerCase().includes(barangaySearch.toLowerCase()) ||
      brgy.livelihood.some(liv => liv.toLowerCase().includes(barangaySearch.toLowerCase()));
      
    const matchesType = barangayType === 'all' || 
      (barangayType === 'coastal' && brgy.coastal) ||
      (barangayType === 'inland' && !brgy.coastal);
      
    return matchesSearch && matchesType;
  });

  const toggleBarangayExpand = (id: string) => {
    if (expandedBarangayId === id) {
      setExpandedBarangayId(null);
    } else {
      setExpandedBarangayId(id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-app-card/65 shadow-xs p-6 rounded-none theme-transition">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-app-text flex items-center gap-2 theme-transition">
            <Building className="h-5.5 w-5.5 text-app-primary theme-transition" />
            Directory of the 22 Barangays
          </h2>
          <p className="text-xs text-app-text-muted mt-1 theme-transition">
            A localized registry detailing current captains, community history, demographics, and local economies.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
          {/* Type Filters */}
          <div className="flex gap-2">
            {(['all', 'coastal', 'inland'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setBarangayType(type)}
                className={`px-4 py-1.5 text-xs font-bold transition-all cursor-pointer theme-transition uppercase tracking-wider ${
                  barangayType === type
                    ? 'bg-app-primary text-white shadow-xs'
                    : 'bg-app-muted/50 text-app-text-muted hover:bg-app-muted/80'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-app-text-muted theme-transition" />
            <input
              type="text"
              placeholder="Search barangays, captains, history..."
              value={barangaySearch}
              onChange={(e) => setBarangaySearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-app-muted/65 focus:bg-app-muted text-xs rounded-none focus:outline-none text-app-text theme-transition"
            />
          </div>
        </div>
      </div>

      {/* Barangay Grid */}
      {filteredBarangays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBarangays.map((brgy) => {
            const isExpanded = expandedBarangayId === brgy.id;
            return (
              <div 
                key={brgy.id} 
                className="bg-app-card hover:bg-app-card-hover shadow-xs hover:shadow-sm overflow-hidden flex flex-col justify-between theme-transition"
              >
                <div className="p-6 space-y-4">
                  {/* Name & Badge */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold font-display text-app-text theme-transition">
                      {brgy.name}
                    </h3>
                    <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-none ${
                      brgy.coastal 
                        ? 'bg-primary-50 text-app-primary' 
                        : 'bg-gold-50 text-gold-600'
                    }`}>
                      {brgy.coastal ? <Anchor className="h-2.5 w-2.5" /> : <MapPin className="h-2.5 w-2.5" />}
                      {brgy.coastal ? 'Coastal' : 'Inland'}
                    </span>
                  </div>

                  {/* Current Captain */}
                  <div className="bg-app-muted/50 p-3 rounded-none flex items-center gap-3 theme-transition">
                    <div className="h-8 w-8 bg-app-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-4.5 w-4.5 text-app-primary" />
                    </div>
                    <div>
                      <span className="block text-[8px] font-extrabold uppercase text-app-primary tracking-widest">
                        Barangay Captain
                      </span>
                      <span className="block text-xs font-bold text-app-text mt-0.5 theme-transition">
                        {brgy.captain}
                      </span>
                      <span className="block text-[9px] text-app-text-muted mt-0.5 theme-transition">
                        Since Term {brgy.termStart}
                      </span>
                    </div>
                  </div>

                  {/* Livelihoods */}
                  <div className="space-y-1.5">
                    <span className="block text-[8px] font-extrabold uppercase text-app-text-muted tracking-widest">
                      Local Economy
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {brgy.livelihood.map((liv, idx) => (
                        <span 
                          key={idx} 
                          className="text-[9px] font-semibold bg-app-muted/60 px-2 py-1 text-app-text theme-transition"
                        >
                          {liv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Population */}
                  <div className="flex items-center gap-1.5 text-xs text-app-text-muted pt-1 theme-transition">
                    <span className="font-bold">Population:</span>
                    <span>{brgy.population} residents</span>
                  </div>

                  {/* Expandable Section */}
                  {isExpanded && (
                    <div className="pt-4 mt-2 space-y-4 animate-fade-in">
                      {/* Origin/History */}
                      <div className="space-y-1">
                        <span className="block text-[8px] font-extrabold uppercase text-app-primary tracking-widest">
                          Historical Origin
                        </span>
                        <p className="text-xs text-app-text-muted font-light leading-relaxed theme-transition">
                          {brgy.history}
                        </p>
                      </div>

                      {/* Past Captains */}
                      {brgy.pastCaptains.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="block text-[8px] font-extrabold uppercase text-app-primary tracking-widest">
                            Notable Past Leaders
                          </span>
                          <div className="grid grid-cols-1 gap-1 pl-1">
                            {brgy.pastCaptains.map((past, pIdx) => (
                              <div key={pIdx} className="text-xs text-app-text-muted font-light flex items-center gap-1.5 theme-transition">
                                <span className="h-1 w-1 bg-app-primary rounded-full theme-transition"></span>
                                <span>{past}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Expand Trigger Button */}
                <button
                  onClick={() => toggleBarangayExpand(brgy.id)}
                  className="w-full py-2.5 text-[9px] font-bold text-app-primary hover:bg-app-primary/5 flex items-center justify-center gap-1 select-none cursor-pointer theme-transition"
                >
                  {isExpanded ? (
                    <>
                      <span>HIDE HISTORY</span>
                      <ChevronUp className="h-3.5 w-3.5 text-app-primary" />
                    </>
                  ) : (
                    <>
                      <span>SHOW HISTORY</span>
                      <ChevronDown className="h-3.5 w-3.5 text-app-primary" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-app-card p-12 text-center rounded-none theme-transition">
          <AlertCircle className="h-10 w-10 text-app-text-muted mx-auto mb-3 theme-transition" />
          <h4 className="text-sm font-bold text-app-text theme-transition">No barangays match your search criteria.</h4>
          <p className="text-xs text-app-text-muted mt-1 theme-transition">Try adjusting the filter or search term (e.g. searching "Fishing" or specific names like "Santa Cruz").</p>
        </div>
      )}

      {/* Data Sources and References */}
      <div className="bg-app-card border border-app-border/40 p-6 sm:p-8 rounded-none theme-transition space-y-4">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-app-primary" />
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-app-text">
            Data Sources & Reference Verification
          </h4>
        </div>
        <p className="text-xs text-app-text-muted leading-relaxed font-light">
          The barangay captain registry and demographic details displayed above have been updated to match verified records from the 2023 Philippine Barangay and Sangguniang Kabataan Elections (BSKE). You can verify and cross-reference this list through official channels.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="bg-app-muted/30 p-4 border border-app-border/20 theme-transition space-y-1">
            <span className="block text-[9px] font-extrabold uppercase text-app-primary tracking-widest">
              DILG Masbate Office
            </span>
            <span className="block text-[11px] font-bold text-app-text">
              DILG Masbate Provincial Directory
            </span>
          </div>
          <div className="bg-app-muted/30 p-4 border border-app-border/20 theme-transition space-y-1">
            <span className="block text-[9px] font-extrabold uppercase text-app-primary tracking-widest">
              Election Verification
            </span>
            <span className="block text-[11px] font-bold text-app-text">
              COMELEC certified candidate filings
            </span>
          </div>
          <div className="bg-app-muted/30 p-4 border border-app-border/20 theme-transition space-y-1">
            <span className="block text-[9px] font-extrabold uppercase text-app-primary tracking-widest">
              Demographic Census
            </span>
            <span className="block text-[11px] font-bold text-app-text">
              PSA 2020/2024 Population Statistics
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
