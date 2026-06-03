import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const ExploreSkeleton: React.FC = () => {
  return (
    <div className="space-y-16 py-4">
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-full mx-auto" />
      </section>

      <div className="space-y-12">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
