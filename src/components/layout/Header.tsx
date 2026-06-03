import { Eye, Menu, Phone, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { NavItem } from '../../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsEmergencyPanelOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setIsEmergencyPanelOpen,
  navItems,
}) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Using CountAPI for persistent, external visitor tracking
    // Configuration read from environment variables
    const NAMESPACE = import.meta.env.VITE_COUNTAPI_NAMESPACE || 'bettersanpascualmasbate.com';
    const KEY = import.meta.env.VITE_COUNTAPI_KEY || 'visits';
    const PRODUCTION_DOMAIN = import.meta.env.VITE_PRODUCTION_DOMAIN || 'bettersanpascualmasbate.marcuwynu.space';

    const fetchVisitorCount = async () => {
      const isProduction = window.location.hostname === PRODUCTION_DOMAIN;

      try {
        if (isProduction) {
          // Increment and get the new count only in production using CounterAPI.dev
          const response = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`);
          const data = await response.json();
          if (data && typeof data.count === 'number') {
            setVisitorCount(data.count);
          }
        } else {
          // In development/localhost, just get the count without incrementing
          const response = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`);
          const data = await response.json();
          if (data && typeof data.count === 'number') {
            setVisitorCount(data.count);
          }
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setVisitorCount(12458); // Fallback to realistic base count
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <header className="sticky top-0 z-100 w-full bg-app-primary border-b border-white/10 backdrop-blur-md theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Branding */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group" 
          onClick={() => {
            setCurrentTab("home");
            setIsMobileMenuOpen(false);
          }}
        >
          <img
            src="/logo.svg"
            alt="BetterSanPascualMasbate Logo"
            className="h-9 w-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-none text-xs font-semibold theme-transition ${
                  isActive ? "bg-white text-app-primary shadow-sm" : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {React.createElement(Icon, { 
                  className: `h-3.5 w-3.5 theme-transition ${isActive ? "text-app-primary" : "text-white"}` 
                })}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons (Right) */}
        <div className="flex items-center gap-2">
          {/* Visitor Count */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/70">
            <Eye className="h-3 w-3" />
            <div className="flex flex-col leading-none">
              <span className="text-[8px] font-extrabold uppercase tracking-tighter opacity-60">Portal Visitors</span>
              <span className="text-[11px] font-mono font-bold text-white">
                {visitorCount !== null ? visitorCount.toLocaleString() : '---'}
              </span>
            </div>
          </div>

          {/* Hotlines Trigger */}
          <button
            onClick={() => setIsEmergencyPanelOpen(true)}
            className="relative hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-none text-[10px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 theme-transition group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-white"></span>
            </span>
            <Phone className="h-3.5 w-3.5 text-white/80 group-hover:rotate-12 transition-transform theme-transition" />
            <span>Emergency</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-none text-white hover:bg-white/10 transition-colors border border-white/10 md:hidden z-110"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
