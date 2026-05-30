import React, { useState } from 'react';
import { 
  MapPin, 
  Compass, 
  History, 
  ArrowRight,
  Sunset
} from 'lucide-react';
import { LANDMARKS, TIMELINE_EVENTS } from '../data/mockData';

export const Explore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Nature', 'Historical', 'Adventure'];

  const filteredLandmarks = activeCategory === 'All'
    ? LANDMARKS
    : LANDMARKS.filter(landmark => landmark.category === activeCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Nature': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Historical': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Adventure': return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
      case 'Cultural': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-600';
    }
  };

  return (
    <div className="space-y-20 py-4">
      
      {/* 1. Page Header */}
      <section className="space-y-4 max-w-3xl">
        <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400">
          Explore & History
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
          Discover Burias Island, Masbate
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Embark on an ecological and historical journey. San Pascual is home to spectacular limestone rock islands, rolling hills, swiftlet sanctuaries, and a deep-rooted cultural heritage dating back to 1586.
        </p>
      </section>

      {/* 2. Landmarks Section */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="h-5.5 w-5.5 text-sky-500" />
              Islands & Scenic Landmark Guide
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select classification tabs to discover natural rock formations, historical structures, and local sanctuaries.
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeCategory === cat
                    ? 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400 border-sky-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
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
              className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                
                {/* Landmark Photo */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img 
                    src={landmark.imageUrl} 
                    alt={landmark.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.9] dark:brightness-[0.8]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${getCategoryColor(landmark.category)}`}>
                      {landmark.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 font-semibold">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{landmark.location}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {landmark.name}
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                    {landmark.description}
                  </p>
                </div>

              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-50 dark:border-slate-800/50 mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>VERIFIED COMMUNITY GUIDE</span>
                <span className="text-slate-500 dark:text-slate-400 hover:text-sky-500 flex items-center gap-1 cursor-pointer">
                  View Map
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 3. Historical Timeline Section */}
      <section className="space-y-12 bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 p-8 sm:p-12 rounded-3xl">
        
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <History className="h-5.5 w-5.5 text-indigo-500" />
            The Chronicles of San Pascual
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Trace the evolutionary milestones of northern Burias Island, starting from its critical strategic maritime harbor during the Spanish colonial galleon era up to today's growing agricultural and ecotourism sectors.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-6 space-y-12">
          {TIMELINE_EVENTS.map((event) => (
            <div key={event.id} className="relative pl-8 sm:pl-10 group">
              
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1.5 bg-white dark:bg-slate-950 border-2 border-indigo-500 rounded-full h-4.5 w-4.5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              </div>

              {/* Event Card */}
              <div className="space-y-2 max-w-3xl">
                
                <span className="inline-block text-[10px] font-extrabold uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full border border-indigo-500/20 shadow-sm tracking-wider font-mono">
                  {event.year}
                </span>

                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-display">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {event.description}
                </p>

              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Tourism and Island Ecology Note */}
      <section className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
        <div className="bg-amber-500/10 p-3.5 rounded-2xl text-amber-500 shrink-0">
          <Sunset className="h-6 w-6 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Preserving Burias Island Eco-systems</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Burias Island remains one of the Philippines' most beautiful and untouched frontiers. When visiting landmarks like Sombrero Island or the sandbars, please abide strictly by the <strong>Marine Tourism Regulation (Ordinance No. 2024-18)</strong>: leave no trash behind, do not disturb the nesting swiftlets, and purchase services from authorized local tour guides to support the local economy.
          </p>
        </div>
      </section>

    </div>
  );
};
