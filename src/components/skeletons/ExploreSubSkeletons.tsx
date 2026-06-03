import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const LandmarksSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Skeleton key={i} className="h-96 w-full" />
        ))}
      </div>
    </div>
  );
};

export const MayorsSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <Skeleton className="h-24 w-full" />
      <div className="space-y-8">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    </div>
  );
};

export const BarangaysSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <Skeleton className="h-24 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    </div>
  );
};
