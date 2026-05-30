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
    switch (category) {
      case 'Ordinance':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900';
      case 'Resolution':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-900';
      case 'Executive Order':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-900';
      case 'Annual Budget':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-900';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-300 border-slate-200 dark:border-slate-800';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Enacted':
      case 'Approved':
      case 'Active':
        return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20';
      case 'Under Review':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-12 py-4">
      
      {/* Header Section */}
      <section className="space-y-4 max-w-3xl">
        <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400">
          Transparency registry
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
          Interactive Public Records Registry
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Search and examine administrative resolutions, regional ordinances, executive mandates, and annual fiscal budgets compiled for public transparency. Click a record to read the expanded summary.
        </p>
      </section>

      {/* Control Panel (Search & Filter) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by keywords, ordinance numbers, or categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider hidden sm:inline">
              Filter Category:
            </span>
            <div className="relative w-full sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Categories Pills for wide screens */}
        <div className="hidden sm:flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400 border-sky-500/30'
                  : 'bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {cat === 'All' ? 'Show All Records' : `${cat}s`}
            </button>
          ))}
        </div>

      </div>

      {/* Registry Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl overflow-hidden">
        
        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <th className="py-4 px-6">Record Code / Date</th>
                  <th className="py-4 px-6 w-1/2">Title</th>
                  <th className="py-4 px-6">Classification</th>
                  <th className="py-4 px-6">Enactment Status</th>
                  <th className="py-4 px-6 text-center">Documentation</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-150 dark:divide-slate-850">
                {filteredRecords.map((record) => {
                  const isExpanded = expandedRecordId === record.id;
                  return (
                    <React.Fragment key={record.id}>
                      
                      {/* Standard Row */}
                      <tr 
                        className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors cursor-pointer ${
                          isExpanded ? 'bg-slate-50/40 dark:bg-slate-800/10' : ''
                        }`}
                        onClick={() => toggleExpandRecord(record.id)}
                      >
                        {/* Number & Date */}
                        <td className="py-5 px-6 shrink-0">
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                              {record.number}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                              <Calendar className="h-3 w-3" />
                              <span>{record.date}</span>
                            </div>
                          </div>
                        </td>

                        {/* Title */}
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-slate-400 shrink-0 hidden sm:inline" />
                            <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-snug hover:text-sky-500 transition-colors block">
                              {record.title}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-5 px-6">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getCategoryBadgeClass(record.category)}`}>
                            {record.category}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-5 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(record.status)}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                            {record.status}
                          </span>
                        </td>

                        {/* Download Trigger */}
                        <td className="py-5 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleMockDownload(record)}
                            disabled={isDownloadingId === record.id}
                            className="bg-slate-50 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-600 border border-slate-200 dark:border-slate-700/60 p-2.5 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 disabled:opacity-50"
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
                        <tr className="bg-slate-50/70 dark:bg-slate-850/30">
                          <td colSpan={5} className="py-6 px-8 border-t border-b border-slate-100 dark:border-slate-800/80">
                            <div className="space-y-4 max-w-4xl">
                              
                              <div className="flex items-start gap-3">
                                <div className="bg-sky-500/10 p-2 rounded-lg text-sky-500 shrink-0 mt-0.5">
                                  <Info className="h-4 w-4" />
                                </div>
                                <div className="space-y-1">
                                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    Administrative Summary & Objective
                                  </h4>
                                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                                    {record.summary}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-4 pt-2 text-[10px] font-bold text-slate-400 border-t border-slate-200/50 dark:border-slate-800/40 mt-4">
                                <div>
                                  MUNICIPAL ARCHIVE CODE: <span className="font-mono text-slate-600 dark:text-slate-200">{record.id.toUpperCase()}</span>
                                </div>
                                <div>
                                  CLASSIFICATION: <span className="text-slate-600 dark:text-slate-200">{record.category.toUpperCase()}</span>
                                </div>
                                <div>
                                  VERIFIED: <span className="text-emerald-500 dark:text-emerald-400">PUBLIC DOMAIN</span>
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
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-full w-fit mx-auto text-slate-400">
              <FileText className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No records found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-normal">
                Your filter keyword "{searchTerm}" did not yield any matching ordinances or budgets. Try clearing terms or checking spelling.
              </p>
            </div>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              Reset Search Filter
            </button>
          </div>
        )}

      </div>

      {/* Transparency Note */}
      <section className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/25 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-5">
        <div className="bg-indigo-500/10 p-3.5 rounded-2xl text-indigo-500 shrink-0">
          <Info className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">About Local Transparency Registries</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            By compiling localized ordinances and budget files, we hope to demonstrate the utility of open government data repositories on Burias Island. The records represented here reflect mock representations modeled on real-world municipal circulars issued by provincial departments.
          </p>
        </div>
      </section>

    </div>
  );
};
