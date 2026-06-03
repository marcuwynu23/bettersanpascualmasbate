import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Calendar, 
  RefreshCw,
  Info
} from 'lucide-react';
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
        return 'text-gold-700 dark:text-gold-300 font-bold';
      case 'Resolution':
        return 'text-gold-600 dark:text-gold-400 font-semibold';
      case 'Executive Order':
        return 'text-gold-800 dark:text-gold-250 font-bold';
      case 'Annual Budget':
        return 'text-gold-900 dark:text-gold-200 font-extrabold';
      default:
        return 'text-app-text-dim';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Enacted':
      case 'Approved':
      case 'Active':
        return 'text-gold-700 dark:text-gold-300 font-bold';
      case 'Under Review':
        return 'text-gold-500/80 dark:text-gold-450/80 font-semibold';
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

      {/* Registry Table */}
      <div className="bg-app-card shadow-xs rounded-none overflow-hidden theme-transition">
        
        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              
              <thead>
                <tr className="bg-app-muted/65 text-[10px] font-extrabold uppercase tracking-wider text-app-text-muted theme-transition">
                  <th className="py-4 px-6">Record Code / Date</th>
                  <th className="py-4 px-6 w-1/2">Title</th>
                  <th className="py-4 px-6">Classification</th>
                  <th className="py-4 px-6">Enactment Status</th>
                  <th className="py-4 px-6 text-center">Documentation</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-app-border/40">
                {filteredRecords.map((record) => {
                  const isExpanded = expandedRecordId === record.id;
                  return (
                    <React.Fragment key={record.id}>
                      
                      {/* Standard Row */}
                      <tr 
                        className={`transition-colors cursor-pointer theme-transition ${
                          isExpanded ? 'bg-app-muted/50' : 'hover:bg-app-card-hover'
                        }`}
                        onClick={() => toggleExpandRecord(record.id)}
                      >
                        {/* Number & Date */}
                        <td className="py-5 px-6 shrink-0">
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-bold text-app-text theme-transition">
                              {record.number}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-app-text-muted theme-transition">
                              <Calendar className="h-3 w-3" />
                              <span>{record.date}</span>
                            </div>
                          </div>
                        </td>

                        {/* Title */}
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-app-primary shrink-0 hidden sm:inline theme-transition" />
                            <span className="font-semibold text-xs sm:text-sm text-app-text leading-snug hover:text-app-primary hover:underline transition-colors block theme-transition">
                              {record.title}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-5 px-6">
                          <span className={`text-[10px] font-bold uppercase theme-transition ${getCategoryBadgeClass(record.category)}`}>
                            {record.category}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-5 px-6">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase theme-transition ${getStatusBadgeClass(record.status)}`}>
                            <span className="h-1.5 w-1.5 bg-current"></span>
                            {record.status}
                          </span>
                        </td>

                        {/* Download Trigger */}
                        <td className="py-5 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleMockDownload(record)}
                            disabled={isDownloadingId === record.id}
                            className="bg-app-muted/50 hover:bg-app-primary hover:text-white p-2.5 rounded-none transition-all duration-200 inline-flex items-center justify-center gap-1.5 text-xs text-app-text-muted disabled:opacity-50 theme-transition cursor-pointer"
                            title="Download document"
                          >
                            {isDownloadingId === record.id ? (
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <>
                                <Download className="h-3.5 w-3.5" />
                                <span className="hidden lg:inline text-[10px] font-bold">
                                  {record.fileSize || 'PDF'}
                                </span>
                              </>
                            )}
                          </button>
                        </td>

                      </tr>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <tr className="bg-app-muted/30 theme-transition">
                          <td colSpan={5} className="py-6 px-8 bg-app-muted/35">
                            <div className="space-y-4 max-w-4xl">
                              
                              <div className="flex items-start gap-3">
                                <Info className="h-6 w-6 text-app-primary shrink-0 mt-0.5 theme-transition" />
                                <div className="space-y-1">
                                  <h4 className="text-[10px] font-bold text-app-text-muted uppercase tracking-widest theme-transition">
                                    Administrative Summary & Objective
                                  </h4>
                                  <p className="text-xs sm:text-sm text-app-text leading-relaxed font-normal theme-transition">
                                    {record.summary}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-4 pt-2 text-[10px] font-bold text-app-text-muted mt-2 theme-transition">
                                <div>
                                  MUNICIPAL ARCHIVE CODE: <span className="font-mono text-app-text">{record.id.toUpperCase()}</span>
                                </div>
                                <div>
                                  CLASSIFICATION: <span className="text-app-text">{record.category.toUpperCase()}</span>
                                </div>
                                <div>
                                  VERIFIED: <span className="text-app-primary">PUBLIC DOMAIN</span>
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}

                    </React.Fragment>
                  );
                })}
              </tbody>

            </table>
          </div>
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
