import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const TransparencySkeleton: React.FC = () => {
  return (
    <div className="space-y-12 py-4">
      <section className="space-y-4 max-w-3xl mx-auto text-center">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-full mx-auto" />
      </section>

      <div className="bg-app-card/65 p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-48" />
        </div>
      </div>

      <div className="bg-app-card space-y-px">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    </div>
  );
};
