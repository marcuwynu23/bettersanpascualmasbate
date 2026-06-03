import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="bg-app-card/65 shadow-xs p-6 sm:p-10 rounded-none theme-transition animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-[350px] w-full" />
    </div>
  );
};
