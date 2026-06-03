import {
    AlertCircle,
    Anchor,
    ArrowRight,
    Award,
    Building,
    ChevronDown,
    ChevronUp,
    Compass,
    History,
    MapPin,
    Search,
    Shield,
    Sunset,
    User,
    Users
} from 'lucide-react';
import React, { useState } from 'react';
import { OptimizedImage } from '../components/common/OptimizedImage';
import { BARANGAY_HISTORY, LANDMARKS, MAYOR_HISTORY, TIMELINE_EVENTS } from '../data/mockData';

export const Explore: React.FC = () => {
  const [subTab, setSubTab] = useState<'landmarks' | 'mayors' | 'barangays'>('landmarks');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [mayorSearch, setMayorSearch] = useState<string>('');
  const [barangaySearch, setBarangaySearch] = useState<string>('');
  const [barangayType, setBarangayType] = useState<'all' | 'coastal' | 'inland'>('all');
  const [expandedBarangayId, setExpandedBarangayId] = useState<string | null>(null);
  
  const categories = ['All', 'Nature', 'Historical', 'Adventure'];

  const filteredLandmarks = activeCategory === 'All'
    ? LANDMARKS
    : LANDMARKS.filter(landmark => landmark.category === activeCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Nature': return 'text-primary-400 dark:text-primary-300 font-bold';
      case 'Historical': return 'text-gold-400 dark:text-gold-300 font-bold';
      case 'Adventure': return 'text-accent-400 dark:text-accent-300 font-bold';
      case 'Cultural': return 'text-gold-500 dark:text-gold-450 font-bold';
      default: return 'text-app-text-dim';
    }
  };

  // Filter Mayors
  const filteredMayors = MAYOR_HISTORY.filter(mayor => 
    mayor.name.toLowerCase().includes(mayorSearch.toLowerCase()) ||
    mayor.term.toLowerCase().includes(mayorSearch.toLowerCase()) ||
    mayor.biography.toLowerCase().includes(mayorSearch.toLowerCase()) ||
    mayor.accomplishments.some(acc => acc.toLowerCase().includes(mayorSearch.toLowerCase()))
  );

  // Filter Barangays
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
    <div className="space-y-12 py-4 theme-transition">
      
      {/* 1. Page Header */}
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-app-primary theme-transition block">
          Explore & History
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-app-text theme-transition">
          Discover Burias Island, Masbate
        </h1>
        <p className="text-sm sm:text-base text-app-text-muted leading-relaxed max-w-2xl mx-auto theme-transition">
          Explore natural landmarks, map out historical timelines, track past municipal mayors, and browse local barangay histories.
        </p>
      </section>

      {/* 2. Sub-tab Navigation */}
      <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-2 pb-2 theme-transition">
        <button
          onClick={() => setSubTab('landmarks')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap theme-transition flex items-center gap-2 rounded-none ${
            subTab === 'landmarks'
              ? 'bg-app-primary text-white shadow-sm'
              : 'text-app-text-muted hover:text-app-text hover:bg-app-muted/65'
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>Islands & Chronology</span>
        </button>
        <button
          onClick={() => setSubTab('mayors')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap theme-transition flex items-center gap-2 rounded-none ${
            subTab === 'mayors'
              ? 'bg-app-primary text-white shadow-sm'
              : 'text-app-text-muted hover:text-app-text hover:bg-app-muted/65'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Municipal Mayors History</span>
        </button>
        <button
          onClick={() => setSubTab('barangays')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap theme-transition flex items-center gap-2 rounded-none ${
            subTab === 'barangays'
              ? 'bg-app-primary text-white shadow-sm'
              : 'text-app-text-muted hover:text-app-text hover:bg-app-muted/65'
          }`}
        >
          <Building className="h-4 w-4" />
          <span>Barangay Captains & History</span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      
      {/* TAB: LANDMARKS */}
      {subTab === 'landmarks' && (
        <div className="space-y-16 animate-fade-in">
          {/* Landmarks Section */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold font-display tracking-tight text-app-text flex items-center gap-2 theme-transition">
                  <Compass className="h-5.5 w-5.5 text-app-primary theme-transition" />
                  Islands & Scenic Landmark Guide
                </h2>
                <p className="text-xs text-app-text-muted mt-1 theme-transition">
                  Select classification tabs to discover natural rock formations, historical structures, and local sanctuaries.
                </p>
              </div>

              {/* Filters */}
              <div className="flex gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 text-xs font-bold transition-all cursor-pointer theme-transition ${
                      activeCategory === cat
                        ? 'bg-app-primary/10 text-app-primary'
                        : 'bg-app-muted/50 text-app-text-muted hover:bg-app-muted/85'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Landmarks Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLandmarks.map((landmark) => (
                <div 
                  key={landmark.id}
                  className="group bg-app-card hover:bg-app-card-hover shadow-xs hover:shadow-sm overflow-hidden flex flex-col justify-between theme-transition"
                >
                  <div>
                    {/* Landmark Photo */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-app-muted theme-transition">
                      <OptimizedImage 
                        src={landmark.imageUrl} 
                        alt={landmark.name} 
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500 brightness-[0.9] dark:brightness-[0.8]"
                      />
                      <div className="absolute top-4 left-4 bg-slate-950/80 px-2 py-0.5 border border-white/10 z-10">
                        <span className={`text-[9px] font-extrabold uppercase tracking-widest ${getCategoryColor(landmark.category)}`}>
                          {landmark.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-app-primary font-semibold theme-transition">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{landmark.location}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-app-text font-display theme-transition">
                        {landmark.name}
                      </h3>
                      
                      <p className="text-xs text-app-text-muted leading-relaxed font-light theme-transition">
                        {landmark.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between text-[10px] font-bold text-app-text-muted theme-transition">
                    <span>VERIFIED COMMUNITY GUIDE</span>
                    <span className="text-app-primary hover:underline flex items-center gap-1 cursor-pointer theme-transition">
                      View Map
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Historical Timeline Section */}
          <section className="space-y-12 bg-app-card/65 shadow-xs p-8 sm:p-12 rounded-none theme-transition">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold font-display tracking-tight text-app-text flex items-center gap-2 theme-transition">
                <History className="h-5.5 w-5.5 text-app-primary theme-transition" />
                The Chronicles of San Pascual
              </h2>
              <p className="text-xs text-app-text-muted mt-1 leading-relaxed theme-transition">
                Trace the evolutionary milestones of northern Burias Island, starting from its critical strategic maritime harbor during the Spanish colonial galleon era up to today's growing agricultural and ecotourism sectors.
              </p>
            </div>

            {/* Vertical Timeline */}
            <div className="relative border-l-2 border-app-border/30 ml-4 sm:ml-6 space-y-12 theme-transition">
              {TIMELINE_EVENTS.map((event) => (
                <div key={event.id} className="relative pl-8 sm:pl-10 group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-1.5 bg-app-card border-2 border-app-primary h-4.5 w-4.5 flex items-center justify-center group-hover:scale-110 transition-transform theme-transition">
                    <span className="h-1.5 w-1.5 bg-app-primary theme-transition"></span>
                  </div>

                  {/* Event Card */}
                  <div className="space-y-2 max-w-3xl">
                    <span className="text-[10px] font-extrabold uppercase text-app-primary tracking-wider font-mono theme-transition">
                      {event.year}
                    </span>

                    <h3 className="text-base font-bold text-app-text font-display theme-transition">
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-app-text-muted leading-relaxed font-light theme-transition">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB: MAYORS */}
      {subTab === 'mayors' && (
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
      )}

      {/* TAB: BARANGAYS */}
      {subTab === 'barangays' && (
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
                            ? 'bg-primary-50 dark:bg-primary-950 text-app-primary' 
                            : 'bg-gold-50 dark:bg-gold-950 text-gold-600 dark:text-gold-450'
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
                          <span>HIDE HISTORY & LEADERS</span>
                          <ChevronUp className="h-3.5 w-3.5 text-app-primary" />
                        </>
                      ) : (
                        <>
                          <span>SHOW HISTORY & PAST LEADERS</span>
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
              The barangay captain registry and demographic details displayed above have been updated to match verified records from the <strong>2023 Philippine Barangay and Sangguniang Kabataan Elections (BSKE)</strong>. You can verify and cross-reference this list through the following official channels:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <div className="bg-app-muted/30 p-4 border border-app-border/20 theme-transition space-y-1">
                <span className="block text-[9px] font-extrabold uppercase text-app-primary tracking-widest">
                  DILG Masbate Office
                </span>
                <span className="block text-[11px] font-bold text-app-text">
                  DILG Masbate Provincial Directory
                </span>
                <p className="text-[10px] text-app-text-muted leading-normal font-light">
                  The Department of the Interior and Local Government (DILG) Masbate maintains the master list of all current barangay officials. Access official rosters and reports directly on the <a href="https://region5.dilg.gov.ph" target="_blank" rel="noopener noreferrer" className="text-app-primary hover:underline font-semibold">DILG Region V Portal</a>.
                </p>
              </div>

              <div className="bg-app-muted/30 p-4 border border-app-border/20 theme-transition space-y-1">
                <span className="block text-[9px] font-extrabold uppercase text-app-primary tracking-widest">
                  Election Verification
                </span>
                <span className="block text-[11px] font-bold text-app-text">
                  COMELEC certified candidate filings
                </span>
                <p className="text-[10px] text-app-text-muted leading-normal font-light">
                  Election records and certified list of candidates for the 2023 BSKE are accessible through the local Commission on Elections (COMELEC) Masbate Office and the <a href="https://comelec.gov.ph" target="_blank" rel="noopener noreferrer" className="text-app-primary hover:underline font-semibold">COMELEC Portal</a>.
                </p>
              </div>

              <div className="bg-app-muted/30 p-4 border border-app-border/20 theme-transition space-y-1">
                <span className="block text-[9px] font-extrabold uppercase text-app-primary tracking-widest">
                  Demographic Census
                </span>
                <span className="block text-[11px] font-bold text-app-text">
                  PSA 2020/2024 Population Statistics
                </span>
                <p className="text-[10px] text-app-text-muted leading-normal font-light">
                  Official population counts for all 22 barangays are sourced from the Philippine Statistics Authority (PSA) census databases. Verify population figures on <a href="https://openstat.psa.gov.ph" target="_blank" rel="noopener noreferrer" className="text-app-primary hover:underline font-semibold">PSA OpenSTAT</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tourism and Island Ecology Note */}
      <section className="bg-app-muted/65 p-6 sm:p-8 rounded-none flex flex-col sm:flex-row items-center gap-6 theme-transition">
        <Sunset className="h-8 w-8 text-app-primary shrink-0 animate-pulse theme-transition" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-app-text theme-transition">Preserving Burias Island Eco-systems</h4>
          <p className="text-xs text-app-text-muted leading-relaxed theme-transition">
            Help preserve Burias Island. Follow local regulations: leave no trash, protect swiftlet nesting sites, and hire local guides.
          </p>
        </div>
      </section>

    </div>
  );
};


