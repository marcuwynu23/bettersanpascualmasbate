import React from 'react';

interface EnvironmentBannerProps {
  envMode: string;
  showEnvBanner: boolean;
}

export const EnvironmentBanner: React.FC<EnvironmentBannerProps> = ({ envMode, showEnvBanner }) => {
  if (!showEnvBanner) return null;

  return (
    <div className="bg-app-primary/10 border-b border-app-border text-app-text-dim text-xs px-4 py-1.5 flex items-center justify-center gap-2 font-medium theme-transition">
      <span className="inline-flex h-2 w-2 bg-app-primary animate-pulse theme-transition"></span>
      Environment: <span className="uppercase font-bold tracking-wider">{envMode} Mode</span>
    </div>
  );
};
