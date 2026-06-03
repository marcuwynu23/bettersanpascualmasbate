import type { LucideIcon } from 'lucide-react';
import { Compass, FileText, Grid, Home as HomeIcon, Menu, Moon, Phone, Sun, X } from 'lucide-react';
import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsEmergencyPanelOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  isDarkMode,
  setIsDarkMode,
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
            src="/logo.png"
            alt="BetterSanPascualMasbate Logo"
            className="h-9 w-auto object-contain group-hover:scale-102 transition-transform brightness-0 invert"
            loading="eager"
          />
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-white leading-none theme-transition">
              BetterSanPascualMasbate
            </span>
            <span className="text-[9px] font-semibold text-white/70 tracking-widest uppercase mt-0.5 theme-transition">
              Transparency Portal
            </span>
          </div>
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

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-none text-white/80 hover:bg-white/10 transition-colors border border-white/10 theme-transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-white" /> : <Moon className="h-4 w-4 text-white" />}
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
        <div className="md:hidden absolute top-16 z-30 w-full bg-[#003882] border-b border-white/10 px-4 py-4 space-y-2 animate-fade-in shadow-md theme-transition">
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
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-none text-base font-semibold theme-transition ${
                  isActive ? "bg-white text-[#0045a0] shadow-md font-semibold" : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`h-5 w-5 theme-transition ${isActive ? "text-[#0045a0]" : "text-white"}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
