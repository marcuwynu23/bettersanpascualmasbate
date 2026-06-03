import React, { useState } from 'react';
import { Compass, MapPin, ArrowRight } from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';
import { LANDMARKS, TIMELINE_EVENTS } from '../../data/mockData';
import { History } from 'lucide-react';

export const ExploreLandmarks: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Nature', 'Historical', 'Adventure'];

  const filteredLandmarks = activeCategory === 'All'
    ? LANDMARKS
    : LANDMARKS.filter(landmark => landmark.category === activeCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Nature': return 'text-primary-400 font-bold';
      case 'Historical': return 'text-gold-400 font-bold';
      case 'Adventure': return 'text-accent-400 font-bold';
      case 'Cultural': return 'text-gold-500 font-bold';
      default: return 'text-app-text-dim';
    }
  };

  return (
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
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500 brightness-[0.9]"
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
  );
};
