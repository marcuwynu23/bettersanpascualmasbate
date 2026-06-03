import {
    Calendar,
    Download,
    FileText,
    Filter,
    Info,
    RefreshCw,
    Search
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { PUBLIC_RECORDS } from '../data/mockData';
import type { PublicRecord } from '../types';

export const Transparency: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);
  const [isDownloadingId, setIsDownloadingId] = useState<string | null>(null);

  const categories = ['All', 'Ordinance', 'Resolution', 'Executive Order', 'Annual Budget'];

  // Filter records based on search and category selection
  const filteredRecords = useMemo(() => {
    return PUBLIC_RECORDS.filter((record) => {
      const matchesSearch = 
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        record.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleExpandRecord = (id: string) => {
    setExpandedRecordId(expandedRecordId === id ? null : id);
  };

  const handleMockDownload = (record: PublicRecord) => {
    setIsDownloadingId(record.id);
    setTimeout(() => {
      setIsDownloadingId(null);
      alert(`[DEMO ONLY] downloading official PDF copy for: ${record.number}\nSize: ${record.fileSize || 'N/A'}\n\nSince BetterSanPascual is a community directory, this link redirects to local government servers in a production environment.`);
    }, 1000);
  };

  const getCategoryBadgeClass = (category: string) => {
    // Under yellow monochromatic theme, categorize by varying shades of gold
    switch (category) {
      case 'Ordinance':
        return 'text-gold-700 font-bold';
      case 'Resolution':
        return 'text-gold-600 font-semibold';
      case 'Executive Order':
        return 'text-gold-800 font-bold';
      case 'Annual Budget':
        return 'text-gold-900 font-extrabold';
      default:
        return 'text-app-text-dim';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Enacted':
      case 'Approved':
      case 'Active':
        return 'text-gold-700 font-bold';
      case 'Under Review':
        return 'text-gold-500/80 font-semibold';
      default:
        return 'text-app-text-muted';
    }
  };

  return (
    <div className="space-y-12 py-4 theme-transition">
      
      {/* Header Section */}
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-app-primary theme-transition block">
          Transparency registry
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-app-text theme-transition">
          Interactive Public Records Registry
        </h1>
        <p className="text-sm sm:text-base text-app-text-muted leading-relaxed max-w-2xl mx-auto theme-transition">
          Search local resolutions, ordinances, and budgets. Click any record to view details.
        </p>
      </section>

      {/* Control Panel (Search & Filter) */}
      <div className="bg-app-card/65 shadow-xs p-5 rounded-none space-y-4 theme-transition">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-app-text-muted theme-transition" />
            <input 
              type="text" 
              placeholder="Search by keywords, ordinance numbers, or categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-none bg-app-muted/65 focus:bg-app-muted focus:outline-none focus:ring-2 focus:ring-app-primary/10 transition-all text-sm text-app-text placeholder-app-text-muted/60"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-app-text-muted uppercase tracking-wider hidden sm:inline theme-transition">
              Filter Category:
            </span>
            <div className="relative w-full sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-app-muted/65 rounded-none px-4 py-3 text-sm font-semibold text-app-text focus:outline-none focus:ring-2 focus:ring-app-primary/10 cursor-pointer appearance-none theme-transition"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-3.5 h-4 w-4 text-app-text-muted pointer-events-none theme-transition" />
            </div>
          </div>

        </div>

        {/* Categories Pills for wide screens */}
        <div className="hidden sm:flex flex-wrap gap-2 pt-2 theme-transition">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-1.5 rounded-none text-xs font-bold transition-all cursor-pointer theme-transition ${
                selectedCategory === cat
                  ? 'bg-app-primary text-white shadow-xs font-semibold'
                  : 'bg-app-muted/50 text-app-text-muted hover:bg-app-muted/80'
              }`}
            >
              {cat === 'All' ? 'Show All Records' : `${cat}s`}
            </button>
          ))}
        </div>

      </div>

      {/* Registry Table / Mobile Cards */}
      <div className="bg-app-card shadow-xs rounded-none overflow-hidden theme-transition">
        
        {filteredRecords.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse text-left">
                {/* ... existing table head and body ... */}
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-app-border/40">
              {filteredRecords.map((record) => {
                const isExpanded = expandedRecordId === record.id;
                return (
                  <div 
                    key={record.id} 
                    className={`p-5 space-y-4 cursor-pointer theme-transition ${isExpanded ? 'bg-app-muted/30' : 'hover:bg-app-card-hover'}`}
                    onClick={() => toggleExpandRecord(record.id)}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] font-bold text-app-text-dim block">{record.number}</span>
                        <h3 className="font-bold text-sm text-app-text leading-snug">{record.title}</h3>
                      </div>
                      <span className={`shrink-0 text-[8px] font-extrabold uppercase px-2 py-0.5 border border-current ${getCategoryBadgeClass(record.category)}`}>
                        {record.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-app-text-muted">
                          <Calendar className="h-3 w-3" />
                          {record.date}
                        </div>
                        <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase ${getStatusBadgeClass(record.status)}`}>
                          <span className="h-1 w-1 bg-current rounded-full"></span>
                          {record.status}
                        </span>
                      </div>
                      
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMockDownload(record); }}
                        disabled={isDownloadingId === record.id}
                        className="bg-app-muted p-2 rounded-none text-app-text-muted disabled:opacity-50"
                      >
                        {isDownloadingId === record.id ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-4 border-t border-app-border/40 space-y-3 animate-fade-in">
                        <p className="text-xs text-app-text-muted leading-relaxed italic">"{record.summary}"</p>
                        <div className="text-[8px] font-bold text-app-text-dim flex flex-wrap gap-x-4 gap-y-1 uppercase">
                          <span>Code: {record.id}</span>
                          <span>Verified: Public Domain</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-6 space-y-4">
            <FileText className="h-12 w-12 mx-auto text-app-text-muted theme-transition" />
            <div className="space-y-2">
              <h3 className="text-base font-bold text-app-text theme-transition">No records found</h3>
              <p className="text-xs text-app-text-muted max-w-sm mx-auto leading-normal theme-transition">
                Your filter keyword "{searchTerm}" did not yield any matching ordinances or budgets. Try clearing terms or checking spelling.
              </p>
            </div>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="bg-app-primary hover:bg-app-primary-hover text-white text-xs font-semibold px-4 py-2 rounded-none shadow-sm transition-all cursor-pointer theme-transition"
            >
              Reset Search Filter
            </button>
          </div>
        )}

      </div>

      {/* Transparency Note */}
      <section className="bg-app-muted/65 p-6 sm:p-8 rounded-none flex flex-col sm:flex-row items-center gap-5 theme-transition">
        <Info className="h-8 w-8 text-app-primary shrink-0 theme-transition" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-app-text theme-transition">About Local Transparency Registries</h4>
          <p className="text-xs text-app-text-muted leading-relaxed theme-transition">
            Mock data registry compiled to demonstrate open public database systems for Burias Island.
          </p>
        </div>
      </section>

    </div>
  );
};
