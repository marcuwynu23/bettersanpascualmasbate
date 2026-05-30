import React, { useState } from 'react';
import { 
  Heart, 
  BookOpen, 
  Briefcase, 
  Users, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Info,
  ShieldCheck
} from 'lucide-react';
import { SERVICE_CARDS } from '../data/mockData';

export const Services: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  
  const sectors = ['All', 'Health', 'Education', 'Business', 'Social Welfare', 'Agriculture & Tourism'];

  const filteredCards = selectedSector === 'All' 
    ? SERVICE_CARDS 
    : SERVICE_CARDS.filter(card => card.sector === selectedSector);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart className="h-5 w-5" />;
      case 'BookOpen': return <BookOpen className="h-5 w-5" />;
      case 'Briefcase': return <Briefcase className="h-5 w-5" />;
      case 'Users': return <Users className="h-5 w-5" />;
      case 'Compass': return <Compass className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const lguGateways = [
    {
      title: 'DILG eLGU Portal - San Pascual',
      description: 'National portal designed for local business permits, residence certificate applications, and general clearances.',
      url: 'https://www.gov.ph',
      badge: 'National Gateway'
    },
    {
      title: 'Masbate Provincial Government Official Website',
      description: 'Access province-wide circulars, agricultural reports, disaster guidelines, and community directories.',
      url: 'https://masbate.gov.ph',
      badge: 'Provincial Gateway'
    },
    {
      title: 'BFP Online Fire Safety Permit System',
      description: 'Apply for fire clearance certificates, register commercial structures, and download safety check lists.',
      url: 'https://bfp.gov.ph',
      badge: 'Safety Clearance'
    },
    {
      title: 'PhilHealth Member Online Services',
      description: 'Verify health coverage status, register dependents, and track medical claim updates for island residents.',
      url: 'https://www.philhealth.gov.ph',
      badge: 'Universal Healthcare'
    }
  ];

  return (
    <div className="space-y-12 py-4">
      
      {/* Page Header */}
      <section className="space-y-4 max-w-3xl">
        <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400">
          Services Directory
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
          Municipal Services Handbook
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Below is a volunteer-curated catalog outlining essential municipal services, resources, and contact instructions for residents of Burias Island, Masbate.
        </p>
      </section>

      {/* Sector Filter Buttons */}
      <div className="flex flex-wrap gap-2 pb-2">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              selectedSector === sector
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/10'
                : 'bg-white hover:bg-slate-100 text-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-400'
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCards.map((card) => (
          <div 
            key={card.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-600 dark:text-sky-400">
                  {getIcon(card.icon)}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                    {card.sector} Sector
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mt-0.5">
                    {card.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
                {card.description}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Available Program Services:
                </h4>
                <ul className="space-y-2">
                  {card.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <ChevronRight className="h-3.5 w-3.5 text-sky-500 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>San Pascual Municipal Office</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Active Guide
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Official Portals Gateway Component */}
      <section className="bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-indigo-500" />
              Official Portals Gateway
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              These external anchor tags redirect users directly to actual government (LGU/National) transaction portals. Do not conduct financial transactions on independent volunteer sites.
            </p>
          </div>
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800 shrink-0 w-fit">
            EXTERNAL CHANNELS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lguGateways.map((gate, index) => (
            <a 
              key={index}
              href={gate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl transition-all duration-200 hover:border-indigo-500 block"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-block text-[9px] font-extrabold uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                    {gate.badge}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mt-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {gate.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                    {gate.description}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all shrink-0">
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl text-center text-xs text-indigo-800 dark:text-indigo-300 leading-normal max-w-3xl mx-auto">
          <strong>Important Notification:</strong> When using government sites, make sure the URL contains a valid SSL certificate (look for the lock icon in the browser address bar) to ensure your transactions and details are safe.
        </div>

      </section>

    </div>
  );
};
