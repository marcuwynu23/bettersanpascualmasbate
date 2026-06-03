import {
    Building,
    Compass,
    Sunset,
    Users
} from 'lucide-react';
import React, { lazy, Suspense, useState } from 'react';
import {
    BarangaysSkeleton,
    LandmarksSkeleton,
    MayorsSkeleton
} from '../components/skeletons/ExploreSubSkeletons';

// Lazy load sub-components
const ExploreLandmarks = lazy(() => import('../components/explore/ExploreLandmarks').then(m => ({ default: m.ExploreLandmarks })));
const ExploreMayors = lazy(() => import('../components/explore/ExploreMayors').then(m => ({ default: m.ExploreMayors })));
const ExploreBarangays = lazy(() => import('../components/explore/ExploreBarangays').then(m => ({ default: m.ExploreBarangays })));

export const Explore: React.FC = () => {
  const [subTab, setSubTab] = useState<'landmarks' | 'mayors' | 'barangays'>('landmarks');
  
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
      <Suspense fallback={
        subTab === 'landmarks' ? <LandmarksSkeleton /> :
        subTab === 'mayors' ? <MayorsSkeleton /> :
        <BarangaysSkeleton />
      }>
        {subTab === 'landmarks' && <ExploreLandmarks />}
        {subTab === 'mayors' && <ExploreMayors />}
        {subTab === 'barangays' && <ExploreBarangays />}
      </Suspense>

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


