import type { LucideIcon } from 'lucide-react';
import { Compass, FileText, Grid, Home as HomeIcon, Menu, Phone, X } from 'lucide-react';
import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsEmergencyPanelOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setIsEmergencyPanelOpen,
}) => {
  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "services", label: "Services", icon: Grid },
    { id: "transparency", label: "Transparency", icon: FileText },
    { id: "explore", label: "Explore & History", icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0045a0] border-b border-white/10 backdrop-blur-md theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Branding */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setCurrentTab("home")}>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-none text-sm font-semibold theme-transition ${
                  isActive ? "bg-white text-[#0045a0] shadow-sm font-semibold" : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`h-4 w-4 theme-transition ${isActive ? "text-[#0045a0]" : "text-white"}`} />
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
            className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-none text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 theme-transition group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-white"></span>
            </span>
            <Phone className="h-4 w-4 text-white/80 group-hover:rotate-12 transition-transform theme-transition" />
            <span className="hidden sm:inline">Emergency Hotlines</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-none text-white/80 hover:bg-white/10 transition-colors border border-white/10 md:hidden theme-transition"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 w-full bg-white animate-fade-in shadow-xl theme-transition overflow-y-auto">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full px-6 py-5 rounded-none text-lg font-bold transition-all ${
                    isActive ? "bg-[#0045a0] text-white shadow-md" : "text-[#0045a0] hover:bg-blue-50"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? "text-white" : "text-[#0045a0]"}`} />
                  {item.label}
                </button>
              );
            })}
            
            <div className="pt-8 px-4">
              <button
                onClick={() => {
                  setIsEmergencyPanelOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-none text-base font-bold bg-red-600 text-white shadow-lg animate-pulse"
              >
                <Phone className="h-5 w-5" />
                Emergency Hotlines
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
