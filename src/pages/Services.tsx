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
      case 'Heart': return <Heart className="h-7 w-7" />;
      case 'BookOpen': return <BookOpen className="h-7 w-7" />;
      case 'Briefcase': return <Briefcase className="h-7 w-7" />;
      case 'Users': return <Users className="h-7 w-7" />;
      case 'Compass': return <Compass className="h-7 w-7" />;
      default: return <Info className="h-7 w-7" />;
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
    <div className="space-y-12 py-4 theme-transition">
      
      {/* Page Header */}
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-app-primary theme-transition block">
          Services Directory
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-app-text theme-transition">
          Municipal Services Handbook
        </h1>
        <p className="text-sm sm:text-base text-app-text-muted leading-relaxed max-w-2xl mx-auto theme-transition">
          Volunteer directory of public services and contact details for residents of Burias Island.
        </p>
      </section>

      {/* Sector Filter Buttons */}
      <div className="flex flex-wrap gap-2 pb-2">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            className={`px-4 py-2 rounded-none text-xs font-bold transition-all duration-200 cursor-pointer theme-transition ${
              selectedSector === sector
                ? 'bg-app-primary text-white shadow-xs font-semibold'
                : 'bg-app-muted/50 text-app-text-muted hover:bg-app-muted/85'
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
            className="bg-app-card shadow-xs p-6 sm:p-8 rounded-none flex flex-col justify-between theme-transition hover:shadow-sm"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="text-app-primary shrink-0 theme-transition">
                  {getIcon(card.icon)}
                </span>
                <div>
                  <span className="text-[10px] font-bold text-app-text-muted uppercase tracking-widest block theme-transition">
                    {card.sector} Sector
                  </span>
                  <h3 className="text-lg font-bold text-app-text font-display mt-0.5 theme-transition">
                    {card.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-app-text-muted mt-4 leading-relaxed theme-transition">
                {card.description}
              </p>

              <div className="mt-6 pt-4 space-y-3 theme-transition">
                <h4 className="text-[10px] font-bold text-app-text-muted uppercase tracking-wider theme-transition">
                  Available Program Services:
                </h4>
                <ul className="space-y-2">
                  {card.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-app-text-muted theme-transition">
                      <ChevronRight className="h-3.5 w-3.5 text-app-primary shrink-0 mt-0.5 theme-transition" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-2 flex items-center justify-between text-xs font-semibold text-app-text-muted theme-transition">
              <span>San Pascual Municipal Office</span>
              <span className="text-app-primary flex items-center gap-1 theme-transition">
                <ShieldCheck className="h-3.5 w-3.5" />
                Active Guide
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Official Portals Gateway Component */}
      <section className="bg-app-muted/65 shadow-xs rounded-none p-6 sm:p-10 space-y-8 theme-transition">
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-app-text flex items-center gap-2 theme-transition">
              <ExternalLink className="h-5 w-5 text-app-primary theme-transition" />
              Official Portals Gateway
            </h2>
            <p className="text-xs text-app-text-muted mt-1 leading-relaxed theme-transition">
              Links to official government portals. Verify URLs before conducting transactions.
            </p>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-app-text-dim shrink-0 theme-transition">
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
              className="group bg-app-card shadow-xs p-5 rounded-none transition-all duration-300 hover:bg-app-card-hover block theme-transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold uppercase text-app-text-dim tracking-wider block theme-transition">
                    {gate.badge}
                  </span>
                  <h3 className="font-bold text-app-text text-sm mt-1.5 group-hover:text-app-primary transition-colors theme-transition">
                    {gate.title}
                  </h3>
                  <p className="text-[11px] text-app-text-muted leading-relaxed mt-1 theme-transition">
                    {gate.description}
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-app-text-dim group-hover:text-app-primary transition-all shrink-0 theme-transition" />
              </div>
            </a>
          ))}
        </div>

        <div className="bg-app-card shadow-xs p-4 rounded-none text-center text-xs text-app-text-muted leading-normal max-w-3xl mx-auto theme-transition">
          <strong>Important:</strong> Ensure URLs have valid SSL certificates (lock icon) when submitting information.
        </div>

      </section>

    </div>
  );
};
