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
    <div className="space-y-16 py-4">
      
      {/* 1. Clean Editorial Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-10 md:p-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column (Typographic Content) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-200/60 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/40">
              Independent Community Portal
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-950 dark:text-white font-sans">
              The independent directory and transparency portal for <span className="text-sky-600 dark:text-sky-400">San Pascual</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              BetterSanPascual.org compiles local public directories, active municipal ordinances, regional fiscal budgets, and island hopping eco-tourism guides. We make open-source public data accessible to everyone on Burias Island.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setCurrentTab('transparency')}
                className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-semibold px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-all text-xs sm:text-sm"
              >
                <FileText className="h-4.5 w-4.5 shrink-0" />
                Explore Public Records
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
              <button
                onClick={() => setCurrentTab('explore')}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-250 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-200 font-semibold px-5 py-3 rounded-xl flex items-center gap-2 transition-all text-xs sm:text-sm"
              >
                <Compass className="h-4.5 w-4.5 shrink-0 text-slate-400" />
                Landmarks Directory
              </button>
            </div>

          </div>

          {/* Right Column (Editorial Photo Postcard Card) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm mx-auto">
              <div className="h-64 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-150 dark:border-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" 
                  alt="Burias Island Beach" 
                  className="w-full h-full object-cover filter brightness-[0.95]"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">Sombrero Island Beach</h3>
                  <p className="text-[10px] text-slate-400 font-medium">San Pascual, Burias Island, Masbate</p>
                </div>
                <div className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  MASBATE
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </section>

      {/* 2. San Pascual at a Glance (Stats Section) */}
      <section className="space-y-6">
        <div className="text-center md:text-left max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
            San Pascual at a Glance
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Key geographical, demographic, and cultural indicators for the northern gateway of Burias Island, Masbate.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat 1 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between group">
            <div className="p-3 bg-sky-500/10 rounded-xl text-sky-600 dark:text-sky-400 w-fit group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5" />
            </div>
            <div className="mt-6">
              <span className="block text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                {CITY_STATS.population}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mt-1">
                Estimated Population ({CITY_STATS.populationYear})
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between group">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 w-fit group-hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="mt-6">
              <span className="block text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                {CITY_STATS.barangays}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mt-1">
                Total Barangays
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between group">
            <div className="p-3 bg-teal-500/10 rounded-xl text-teal-600 dark:text-teal-400 w-fit group-hover:scale-110 transition-transform">
              <Compass className="h-5 w-5" />
            </div>
            <div className="mt-6">
              <span className="block text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                {CITY_STATS.islandsCount}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mt-1">
                Ecotourism Jewels
              </span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between group">
            <div className="p-3 bg-rose-500/10 rounded-xl text-rose-600 dark:text-rose-400 w-fit group-hover:scale-110 transition-transform">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="mt-6">
              <span className="block text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                {CITY_STATS.foundedYear}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mt-1">
                Parish Founding Year
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Quick Access Grid */}
      <section className="space-y-6">
        <div className="text-center md:text-left max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
            Core Portal Modules
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Direct navigation channels to access mock registries, local assistance cards, and cultural history maps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div 
            onClick={() => setCurrentTab('services')}
            className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 rounded-2xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="p-3 bg-sky-600 rounded-xl text-white w-fit group-hover:scale-105 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-display mt-6 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                Municipal Services Guide
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Categorized handbook detailing local health clinics, MSWD programs, scholarship applications, and coconut agricultural assistance packages.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-bold text-sky-500 dark:text-sky-400 group-hover:translate-x-1.5 transition-transform">
              Learn More
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => setCurrentTab('transparency')}
            className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 rounded-2xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="p-3 bg-sky-600 rounded-xl text-white w-fit group-hover:scale-105 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-display mt-6 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                Transparency Registry
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Filter and search through local municipal public records including active island regulations, municipal budgets, and barangay ecological mandates.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-bold text-sky-500 dark:text-sky-400 group-hover:translate-x-1.5 transition-transform">
              Access Database
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => setCurrentTab('explore')}
            className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 rounded-2xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="p-3 bg-sky-600 rounded-xl text-white w-fit group-hover:scale-105 transition-transform">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-display mt-6 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                Explore San Pascual
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Take an island-hopping virtual tour. Read historical journals detailing Spanish galleon harbor settlements and the cattle-ranching Isla Rancho Festival.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-bold text-sky-500 dark:text-sky-400 group-hover:translate-x-1.5 transition-transform">
              Virtual Map
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. Transparency Highlight / Mission Statement */}
      <section className="bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-center gap-8">
        <div className="space-y-4 lg:w-2/3">
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Volunteer Code of Conduct
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
            Why we created BetterSanPascual
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Citizens on remote islands like Burias deserve simple, responsive access to critical data. This community portal compiles dispersed government telephone lists, public registries, and maps into a clean, searchable index.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-700 dark:text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              100% Free & Open-source
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              Zero commercial advertising
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              Verified local mock data directories
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              Focus on offline resiliency
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 p-1.5 bg-red-500 text-white text-[9px] font-extrabold uppercase tracking-wider select-none transform rotate-45 translate-x-4 translate-y-2">
            ALERT
          </div>
          <ShieldAlert className="h-10 w-10 text-red-500" />
          <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-4 text-sm">Need official LGU service?</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            This is an independent non-governmental transparency directory. For official transactions like business registrations, land permits, or civil records, please navigate directly to our <strong>Services</strong> page to access LGU portals.
          </p>
        </div>
      </section>

    </div>
  );
};
