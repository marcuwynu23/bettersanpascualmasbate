import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const ServicesSkeleton: React.FC = () => {
  return (
    <div className="space-y-12 py-4">
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-full mx-auto" />
      </section>

      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} className="h-10 w-24" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    </div>
  );
};
