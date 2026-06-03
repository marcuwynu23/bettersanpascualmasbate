import { Menu, Phone, X } from 'lucide-react';
import React from 'react';
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
  return (
    <header className="sticky top-0 z-[100] w-full bg-app-primary border-b border-white/10 backdrop-blur-md theme-transition">
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
            className="h-9 w-auto object-contain brightness-0 invert"
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
                <Icon className={`h-3.5 w-3.5 theme-transition ${isActive ? "text-app-primary" : "text-white"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons (Right) */}
        <div className="flex items-center gap-2">
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
            className="p-2 rounded-none text-white hover:bg-white/10 transition-colors border border-white/10 md:hidden z-[110]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
