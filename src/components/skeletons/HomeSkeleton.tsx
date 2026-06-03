import React from 'react';
import { Skeleton, SkeletonText } from '../common/Skeleton';

export const HomeSkeleton: React.FC = () => {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section Skeleton */}
      <section className="bg-app-muted/30 p-8 sm:p-16 md:p-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <Skeleton className="h-4 w-32" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-3/4" />
            </div>
            <SkeletonText className="h-6 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </section>
    </div>
  );
};
