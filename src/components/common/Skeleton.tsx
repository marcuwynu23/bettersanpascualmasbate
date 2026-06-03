import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-app-muted rounded-none ${className}`} />
  );
};

export const SkeletonText: React.FC<SkeletonProps> = ({ className = '' }) => {
  return <Skeleton className={`h-4 w-full ${className}`} />;
};

export const SkeletonCircle: React.FC<SkeletonProps> = ({ className = '' }) => {
  return <Skeleton className={`rounded-full ${className}`} />;
};
