import { Anchor, Info, Landmark, MapPin, Users, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { BARANGAY_HISTORY } from '../../data/mockData';

interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: never;
  };
  properties: {
    adm4_en: string;
    [key: string]: never;
  };
}

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

export const SanPascualMap: React.FC = () => {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [hoveredBrgy, setHoveredBrgy] = useState<string | null>(null);
  const [selectedBrgy, setSelectedBrgy] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/sanpascual.json')
      .then(res => res.json())
      .then(data => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading map data:', err);
        setLoading(false);
      });
  }, []);

  const selectedBrgyData = useMemo(() => {
    if (!selectedBrgy) return null;
    return BARANGAY_HISTORY.find(b => b.name.includes(selectedBrgy) || selectedBrgy.includes(b.name));
  }, [selectedBrgy]);

  // Projection logic: convert lat/long to SVG coordinates
  const mapContent = useMemo(() => {
    if (!geoData) return null;

    // 1. Find bounding box
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    geoData.features.forEach(feature => {
      if (!feature.geometry || !feature.geometry.coordinates) return;

      const coords = feature.geometry.type === 'MultiPolygon' 
        ? feature.geometry.coordinates.flat(2) 
        : feature.geometry.coordinates.flat(1);
      
      coords.forEach((coord: any) => {
        if (Array.isArray(coord) && coord.length >= 2) {
          const x = coord[0];
          const y = coord[1];
          if (typeof x === 'number' && typeof y === 'number' && !isNaN(x) && !isNaN(y)) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      });
    });

    // Fallback if no valid coordinates found
    if (minX === Infinity || minY === Infinity) {
      return (
        <div className="flex items-center justify-center h-64 text-app-text-dim text-xs">
          No valid map coordinates found.
        </div>
      );
    }

    const width = 800;
    const height = 600;
    const padding = 40;

    const dx = maxX - minX;
    const dy = maxY - minY;

    // Avoid division by zero
    const scaleX = dx === 0 ? 1 : (width - padding * 2) / dx;
    const scaleY = dy === 0 ? 1 : (height - padding * 2) / dy;
    const scale = Math.min(scaleX, scaleY);

    const project = (coord: [number, number]) => {
      if (!coord || typeof coord[0] !== 'number' || typeof coord[1] !== 'number') return "0,0";
      const x = padding + (coord[0] - minX) * scale;
      const y = height - (padding + (coord[1] - minY) * scale);
      return `${x},${y}`;
    };

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-2xl max-h-[70vh]">
        {/* Water Background */}
        <rect width={width} height={height} className="fill-blue-500/10" />
        
        {/* Subtle Water Texture/Gradients could go here */}
        <defs>
          <radialGradient id="waterGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.05)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.15)" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#waterGradient)" />

        {geoData.features.map((feature, idx) => {
          const name = feature.properties.adm4_en;
          const isHovered = hoveredBrgy === name;
          const isSelected = selectedBrgy === name;

          if (!feature.geometry || !feature.geometry.coordinates) return null;

          const paths = feature.geometry.type === 'MultiPolygon'
            ? feature.geometry.coordinates
                .map((poly: any) => 
                  Array.isArray(poly) && Array.isArray(poly[0]) 
                    ? poly[0].map((coord: [number, number]) => project(coord)).join(' ') 
                    : null
                )
                .filter((p: any): p is string => !!p)
            : (Array.isArray(feature.geometry.coordinates) && Array.isArray(feature.geometry.coordinates[0])
                ? [feature.geometry.coordinates[0].map((coord: [number, number]) => project(coord)).join(' ')]
                : []);

          return paths.map((points: string, pIdx: number) => (
            <polygon
              key={`${name}-${idx}-${pIdx}`}
              points={points}
              className={`theme-transition transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'fill-app-primary stroke-white stroke-2 z-20 scale-[1.01]' 
                  : isHovered 
                    ? 'fill-[#005cc7] stroke-blue-200 stroke-1 z-10' 
                    : 'fill-[#0045a0] stroke-blue-900/20 hover:fill-[#005cc7]'
              }`}
              onMouseEnter={() => setHoveredBrgy(name)}
              onMouseLeave={() => setHoveredBrgy(null)}
              onClick={() => setSelectedBrgy(name)}
              style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
            >
              <title>{name}</title>
            </polygon>
          ));
        })}
      </svg>
    );
  }, [geoData, hoveredBrgy, selectedBrgy]);

  if (loading) {
    return (
      <div className="w-full aspect-[4/3] bg-app-muted animate-pulse flex items-center justify-center rounded-none border border-app-border">
        <span className="text-xs font-bold text-app-text-dim uppercase tracking-widest">Loading Map Data...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Map Container */}
      <div className="lg:col-span-8 relative bg-app-card border border-app-border p-0 rounded-none shadow-sm overflow-hidden theme-transition group h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <h4 className="text-[10px] font-extrabold text-app-primary uppercase tracking-widest bg-app-card/80 backdrop-blur-sm px-2 py-1 border border-app-border theme-transition">
            Interactive Registry Map
          </h4>
          <div className="mt-2 h-6">
            {hoveredBrgy && !selectedBrgy && (
              <span className="text-sm font-bold text-[#0045a0] bg-app-card/80 backdrop-blur-sm px-2 py-1 border border-app-border animate-fade-in theme-transition">
                Barangay {hoveredBrgy}
              </span>
            )}
          </div>
        </div>
        
        <div className="w-full h-full flex items-center justify-center bg-blue-50/30">
          {mapContent}
        </div>

        {/* Legend Overlay - Hidden on small mobile, shown on larger screens */}
        <div className="hidden sm:flex absolute bottom-4 left-4 flex-wrap gap-4 bg-app-card/80 backdrop-blur-sm p-3 border border-app-border theme-transition">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#0045a0] border border-blue-900/20"></div>
            <span className="text-[9px] font-bold text-app-text-muted uppercase">Land / Islands</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-blue-500/20 border border-blue-400/30"></div>
            <span className="text-[9px] font-bold text-app-text-muted uppercase">Sibuyan Sea / Bay</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-app-primary border-2 border-white"></div>
            <span className="text-[9px] font-bold text-app-text-muted uppercase">Selected Barangay</span>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="lg:col-span-4 space-y-4">
        {/* Mobile Legend - shown only on small mobile */}
        <div className="flex sm:hidden flex-wrap gap-3 bg-app-card p-4 border border-app-border theme-transition">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#0045a0] border border-blue-900/20"></div>
            <span className="text-[8px] font-bold text-app-text-muted uppercase">Land</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-blue-500/20 border border-blue-400/30"></div>
            <span className="text-[8px] font-bold text-app-text-muted uppercase">Sea</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-app-primary border-2 border-white"></div>
            <span className="text-[8px] font-bold text-app-text-muted uppercase">Selected</span>
          </div>
        </div>
        
        {selectedBrgyData ? (
          <div className="bg-app-card border-l-4 border-l-app-primary border border-app-border shadow-md p-6 animate-slide-in theme-transition">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-app-primary uppercase tracking-widest">
                  {selectedBrgyData.coastal ? 'Coastal' : 'Upland'} Barangay
                </span>
                <h3 className="text-2xl font-bold text-app-text font-display theme-transition">
                  {selectedBrgyData.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedBrgy(null)}
                className="p-1 hover:bg-app-muted text-app-text-dim transition-colors theme-transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* History Snippet */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-app-text font-bold text-xs uppercase tracking-wider">
                  <Info className="h-3.5 w-3.5 text-app-primary" />
                  Historical Brief
                </div>
                <p className="text-sm text-app-text-muted leading-relaxed font-light theme-transition italic">
                  "{selectedBrgyData.history}"
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-app-border theme-transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-app-text-dim uppercase tracking-wider">
                    <Users className="h-3 w-3" />
                    Population
                  </div>
                  <span className="text-sm font-bold text-app-text theme-transition">{selectedBrgyData.population}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-app-text-dim uppercase tracking-wider">
                    <MapPin className="h-3 w-3" />
                    Punong Brgy
                  </div>
                  <span className="text-sm font-bold text-app-text theme-transition">{selectedBrgyData.captain}</span>
                </div>
              </div>

              {/* Livelihoods */}
              <div className="space-y-3 pt-4 border-t border-app-border theme-transition">
                <div className="flex items-center gap-2 text-[10px] font-bold text-app-text-dim uppercase tracking-wider">
                  <Anchor className="h-3 w-3 text-app-primary" />
                  Primary Livelihoods
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedBrgyData.livelihood.map((item, i) => (
                    <span 
                      key={i}
                      className="text-[10px] font-bold px-2 py-1 bg-primary-50 text-app-primary border border-primary-100 theme-transition"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-app-muted/50 border border-dashed border-app-border p-10 rounded-none flex flex-col items-center justify-center text-center space-y-4 theme-transition">
            <div className="p-4 bg-app-card border border-app-border rounded-none shadow-sm theme-transition">
              <Landmark className="h-8 w-8 text-app-text-dim opacity-40" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-app-text theme-transition">Select a Barangay</h4>
              <p className="text-xs text-app-text-dim leading-relaxed max-w-[200px] theme-transition">
                Click on any island or mainland territory to view local history, population, and leadership details.
              </p>
            </div>
          </div>
        )}

        {/* Tip Card */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-none theme-transition">
          <p className="text-[10px] text-blue-700 leading-relaxed italic">
            <strong>Did you know?</strong> San Pascual is the northernmost municipality of Burias Island, acting as a gateway between the Bicol mainland and the Visayan islands.
          </p>
        </div>
      </div>
    </div>
  );
};
