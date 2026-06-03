import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const InfrastructureSkeleton: React.FC = () => {
  return (
    <div className="space-y-12 py-4">
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-full mx-auto" />
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
