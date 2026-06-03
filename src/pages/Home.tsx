import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Users, 
  Compass, 
  Calendar, 
  ShieldAlert, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { CITY_STATS } from '../data/mockData';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab }) => {
  return (
    <div className="space-y-16 py-4 theme-transition">
      
      {/* 1. Clean Editorial Hero Section */}
      <section className="relative overflow-hidden rounded-none bg-app-muted/60 shadow-xs p-6 sm:p-10 md:p-14 theme-transition">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column (Typographic Content) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-app-text-dim theme-transition">
              Independent Community Portal
            </span>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-app-text font-sans theme-transition">
              The independent directory and transparency portal for <span className="text-app-text border-b-2 border-app-primary font-bold theme-transition">San Pascual, Masbate</span>
            </h1>
            
            <p className="text-sm sm:text-base text-app-text-muted leading-relaxed font-light theme-transition">
              Directories, municipal ordinances, budgets, and eco-tourism guides for Burias Island. Open public data for everyone.
            </p>
 
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setCurrentTab('transparency')}
                className="bg-app-primary text-white hover:bg-app-primary-hover font-semibold px-5 py-3 rounded-none flex items-center gap-2 shadow-sm transition-all text-xs sm:text-sm theme-transition cursor-pointer"
              >
                <FileText className="h-4.5 w-4.5 shrink-0" />
                Explore Public Records
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
              <button
                onClick={() => setCurrentTab('explore')}
                className="bg-app-card hover:bg-app-muted/70 text-app-text font-semibold px-5 py-3 rounded-none flex items-center gap-2 transition-all text-xs sm:text-sm theme-transition cursor-pointer"
              >
                <Compass className="h-4.5 w-4.5 shrink-0 text-app-primary theme-transition" />
                Landmarks Directory
              </button>
            </div>
 
          </div>
 
          {/* Right Column (Editorial Photo Postcard Card) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-app-card shadow-xs p-3.5 rounded-none rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm mx-auto theme-transition">
              <div className="h-64 rounded-none overflow-hidden bg-app-muted/80 theme-transition">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d1/At_Sombrero_Island%2C_San_Pascual_Burias_Islands_Masbate_Philippines.jpg" 
                  alt="Sombrero Island Beach" 
                  className="w-full h-full object-cover filter brightness-[0.95]"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-app-text theme-transition">Sombrero Island Beach</h3>
                  <p className="text-[10px] text-app-text-muted font-medium theme-transition">San Pascual, Burias Island, Masbate</p>
                </div>
                <span className="text-[10px] font-extrabold text-app-primary uppercase tracking-widest theme-transition">
                  MASBATE
                </span>
              </div>
            </div>
          </div>
 
        </div>
        
      </section>

      {/* 2. San Pascual at a Glance (Stats Section) */}
      <section className="space-y-6">
        <div className="text-center md:text-left max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-app-text theme-transition">
            San Pascual at a Glance
          </h2>
          <p className="text-sm text-app-text-muted mt-2 theme-transition">
            Key geographical, demographic, and cultural indicators for the northern gateway of Burias Island, Masbate.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat 1 */}
          <div className="bg-app-card shadow-xs border-t-2 border-t-app-primary p-6 rounded-none flex flex-col justify-between group theme-transition">
            <Users className="h-10 w-10 text-app-primary group-hover:scale-110 transition-transform theme-transition" />
            <div className="mt-6">
              <span className="block text-3xl font-extrabold font-display tracking-tight text-app-text theme-transition">
                {CITY_STATS.population}
              </span>
              <span className="text-xs font-semibold text-app-text-muted uppercase tracking-wider block mt-1 theme-transition">
                Estimated Population ({CITY_STATS.populationYear})
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-app-card shadow-xs border-t-2 border-t-app-primary p-6 rounded-none flex flex-col justify-between group theme-transition">
            <MapPin className="h-10 w-10 text-app-primary group-hover:scale-110 transition-transform theme-transition" />
            <div className="mt-6">
              <span className="block text-3xl font-extrabold font-display tracking-tight text-app-text theme-transition">
                {CITY_STATS.barangays}
              </span>
              <span className="text-xs font-semibold text-app-text-muted uppercase tracking-wider block mt-1 theme-transition">
                Total Barangays
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-app-card shadow-xs border-t-2 border-t-app-primary p-6 rounded-none flex flex-col justify-between group theme-transition">
            <Compass className="h-10 w-10 text-app-primary group-hover:scale-110 transition-transform theme-transition" />
            <div className="mt-6">
              <span className="block text-3xl font-extrabold font-display tracking-tight text-app-text theme-transition">
                {CITY_STATS.islandsCount}
              </span>
              <span className="text-xs font-semibold text-app-text-muted uppercase tracking-wider block mt-1 theme-transition">
                Ecotourism Jewels
              </span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-app-card shadow-xs border-t-2 border-t-app-primary p-6 rounded-none flex flex-col justify-between group theme-transition">
            <Calendar className="h-10 w-10 text-app-primary group-hover:scale-110 transition-transform theme-transition" />
            <div className="mt-6">
              <span className="block text-3xl font-extrabold font-display tracking-tight text-app-text theme-transition">
                {CITY_STATS.foundedYear}
              </span>
              <span className="text-xs font-semibold text-app-text-muted uppercase tracking-wider block mt-1 theme-transition">
                Parish Founding Year
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Quick Access Grid */}
      <section className="space-y-6">
        <div className="text-center md:text-left max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-app-text theme-transition">
            Core Portal Modules
          </h2>
          <p className="text-sm text-app-text-muted mt-2 theme-transition">
            Direct navigation channels to access mock registries, local assistance cards, and cultural history maps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div 
            onClick={() => setCurrentTab('services')}
            className="group relative overflow-hidden bg-app-card shadow-xs p-8 rounded-none cursor-pointer hover:bg-app-card-hover transition-all duration-300 flex flex-col justify-between theme-transition"
          >
            <div>
              <Users className="h-10 w-10 text-app-primary group-hover:scale-105 transition-transform theme-transition" />
              <h3 className="text-lg font-bold text-app-text font-display mt-6 group-hover:text-app-primary transition-colors theme-transition">
                Municipal Services Guide
              </h3>
              <p className="text-xs text-app-text-muted mt-2 leading-relaxed theme-transition">
                Categorized handbook detailing local health clinics, MSWD programs, scholarship applications, and coconut agricultural assistance packages.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-bold text-app-primary group-hover:underline group-hover:translate-x-1.5 transition-all theme-transition">
              Learn More
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => setCurrentTab('transparency')}
            className="group relative overflow-hidden bg-app-card shadow-xs p-8 rounded-none cursor-pointer hover:bg-app-card-hover transition-all duration-300 flex flex-col justify-between theme-transition"
          >
            <div>
              <FileText className="h-10 w-10 text-app-primary group-hover:scale-105 transition-transform theme-transition" />
              <h3 className="text-lg font-bold text-app-text font-display mt-6 group-hover:text-app-primary transition-colors theme-transition">
                Transparency Registry
              </h3>
              <p className="text-xs text-app-text-muted mt-2 leading-relaxed theme-transition">
                Filter and search through local municipal public records including active island regulations, municipal budgets, and barangay ecological mandates.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-bold text-app-primary group-hover:underline group-hover:translate-x-1.5 transition-all theme-transition">
              Access Database
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => setCurrentTab('explore')}
            className="group relative overflow-hidden bg-app-card shadow-xs p-8 rounded-none cursor-pointer hover:bg-app-card-hover transition-all duration-300 flex flex-col justify-between theme-transition"
          >
            <div>
              <Compass className="h-10 w-10 text-app-primary group-hover:scale-105 transition-transform theme-transition" />
              <h3 className="text-lg font-bold text-app-text font-display mt-6 group-hover:text-app-primary transition-colors theme-transition">
                Explore San Pascual
              </h3>
              <p className="text-xs text-app-text-muted mt-2 leading-relaxed theme-transition">
                Take an island-hopping virtual tour. Read historical journals detailing Spanish galleon harbor settlements and the cattle-ranching Isla Rancho Festival.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-bold text-app-primary group-hover:underline group-hover:translate-x-1.5 transition-all theme-transition">
              Explore Guide
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. Transparency Highlight / Mission Statement */}
      <section className="bg-app-muted/65 shadow-xs p-8 sm:p-12 rounded-none flex flex-col lg:flex-row items-center gap-8 theme-transition">
        <div className="space-y-4 lg:w-2/3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-app-text-dim theme-transition">
            Volunteer Code of Conduct
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-app-text theme-transition">
            Why we created BetterSanPascualMasbate
          </h3>
          <p className="text-sm text-app-text-muted leading-relaxed theme-transition">
            Providing Burias Island citizens with simple, responsive access to public records, directories, and maps.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-app-text-muted pt-2 theme-transition">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-app-primary shrink-0 theme-transition" />
              100% Free & Open-source
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-app-primary shrink-0 theme-transition" />
              Zero commercial advertising
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-app-primary shrink-0 theme-transition" />
              Verified local mock data directories
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-app-primary shrink-0 theme-transition" />
              Focus on offline resiliency
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 bg-app-card shadow-xs p-6 rounded-none flex flex-col items-center text-center relative overflow-hidden shrink-0 theme-transition">
          <div className="absolute top-0 right-0 p-1.5 bg-app-primary text-white text-[9px] font-extrabold uppercase tracking-wider select-none transform rotate-45 translate-x-4 translate-y-2 theme-transition">
            ALERT
          </div>
          <ShieldAlert className="h-10 w-10 text-app-primary theme-transition" />
          <h4 className="font-bold text-app-text mt-4 text-sm theme-transition">Official LGU Services</h4>
          <p className="text-[11px] text-app-text-muted mt-2 leading-relaxed theme-transition">
            For business permits, land registries, or official records, please use our Services directory to connect with official portals.
          </p>
        </div>
      </section>

    </div>
  );
};
