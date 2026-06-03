import React, { useState } from 'react';
import { Shield, Search, Users, Award, History, AlertCircle } from 'lucide-react';
import { MAYOR_HISTORY } from '../../data/mockData';

export const ExploreMayors: React.FC = () => {
  const [mayorSearch, setMayorSearch] = useState<string>('');

  const filteredMayors = MAYOR_HISTORY.filter(mayor => 
    mayor.name.toLowerCase().includes(mayorSearch.toLowerCase()) ||
    mayor.term.toLowerCase().includes(mayorSearch.toLowerCase()) ||
    mayor.biography.toLowerCase().includes(mayorSearch.toLowerCase()) ||
    mayor.accomplishments.some(acc => acc.toLowerCase().includes(mayorSearch.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-app-card/65 shadow-xs p-6 rounded-none theme-transition">
        <div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-app-text flex items-center gap-2 theme-transition">
            <Shield className="h-5.5 w-5.5 text-app-primary theme-transition" />
            History of Municipal Leadership
          </h2>
          <p className="text-xs text-app-text-muted mt-1 theme-transition">
            Chronological record of the chief executives who have guided San Pascual, Masbate, through various eras.
          </p>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-app-text-muted theme-transition" />
          <input
            type="text"
            placeholder="Search mayors, terms, achievements..."
            value={mayorSearch}
            onChange={(e) => setMayorSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-app-muted/65 focus:bg-app-muted text-xs rounded-none focus:outline-none text-app-text theme-transition"
          />
        </div>
      </div>

      {/* Mayors List */}
      {filteredMayors.length > 0 ? (
        <div className="space-y-8">
          {filteredMayors.map((mayor) => (
            <div 
              key={mayor.id}
              className={`bg-app-card shadow-xs p-6 sm:p-8 theme-transition flex flex-col md:flex-row gap-6 relative overflow-hidden ${
                mayor.status === 'Incumbent' 
                  ? 'ring-1 ring-app-primary/20 bg-gradient-to-r from-app-muted/40 to-transparent' 
                  : ''
              }`}
            >
              {/* Decorative badge overlay for Incumbent */}
              {mayor.status === 'Incumbent' && (
                <div className="absolute top-0 right-0 p-1.5 bg-app-primary text-white text-[9px] font-extrabold uppercase tracking-wider select-none transform rotate-45 translate-x-4 translate-y-2 theme-transition">
                  INCUMBENT
                </div>
              )}

              {/* Left Column: Avatar & Term info */}
              <div className="md:w-1/4 shrink-0 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                <div className="h-16 w-16 rounded-none flex items-center justify-center bg-app-muted theme-transition">
                  <Users className={`h-8 w-8 ${
                    mayor.status === 'Incumbent' ? 'text-app-primary' : 'text-app-text-muted'
                  }`} />
                </div>
                <div>
                  <span className="text-[9px] font-extrabold tracking-widest text-app-primary uppercase block theme-transition">
                    Term of Office
                  </span>
                  <h4 className="text-xs font-bold text-app-text tracking-wide mt-0.5 theme-transition">
                    {mayor.term}
                  </h4>
                  <span className="inline-block text-[9px] font-bold px-2.5 py-0.5 mt-2 bg-app-muted/80 text-app-text-muted rounded-none border border-transparent">
                    {mayor.status} Mayor
                  </span>
                </div>
              </div>

              {/* Right Column: Narrative Biography & Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-app-text theme-transition">
                    {mayor.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-app-text-muted font-light leading-relaxed mt-2 theme-transition">
                    {mayor.biography}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 mt-2 theme-transition">
                  {/* Accomplishments */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-app-primary tracking-wider flex items-center gap-1.5 theme-transition">
                      <Award className="h-3.5 w-3.5 shrink-0" />
                      Key Accomplishments
                    </span>
                    <ul className="space-y-2">
                      {mayor.accomplishments.map((acc, i) => (
                        <li key={i} className="text-xs text-app-text-muted font-light leading-relaxed flex items-start gap-2 theme-transition">
                          <span className="h-1.5 w-1.5 bg-app-primary mt-1.5 shrink-0 theme-transition"></span>
                          <span>{acc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-app-primary tracking-wider flex items-center gap-1.5 theme-transition">
                      <History className="h-3.5 w-3.5 shrink-0" />
                      Historical Milestones
                    </span>
                    <ul className="space-y-2">
                      {mayor.milestones.map((ms, i) => (
                        <li key={i} className="text-xs text-app-text-muted font-light leading-relaxed flex items-start gap-2 theme-transition">
                          <span className="h-1.5 w-1.5 bg-app-primary mt-1.5 shrink-0 theme-transition"></span>
                          <span>{ms}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-app-card p-12 text-center rounded-none theme-transition">
          <AlertCircle className="h-10 w-10 text-app-text-muted mx-auto mb-3 theme-transition" />
          <h4 className="text-sm font-bold text-app-text theme-transition">No mayoral records match your search.</h4>
          <p className="text-xs text-app-text-muted mt-1 theme-transition">Try adjusting your query or typing the name of a specific mayor (e.g. "Lazaro" or "Arguelles").</p>
        </div>
      )}
    </div>
  );
};
