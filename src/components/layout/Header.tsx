import { Compass, FileText, Grid, Home as HomeIcon, Menu, Moon, Phone, Sun, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full bg-app-bg/95 border-b border-app-border backdrop-blur-md theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Branding */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setCurrentTab("home")}>
          <img
            src="/logo.png"
            alt="BetterSanPascualMasbate Logo"
            className="h-9 w-auto object-contain group-hover:scale-102 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-app-text leading-none theme-transition">
              BetterSanPascualMasbate
            </span>
            <span className="text-[9px] font-semibold text-app-text-dim/80 tracking-widest uppercase mt-0.5 theme-transition">
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
                  isActive ? "bg-app-primary text-white shadow-sm font-semibold" : "text-app-text-muted hover:text-app-text hover:bg-app-card-hover"
                }`}
              >
                <Icon className={`h-4 w-4 theme-transition ${isActive ? "text-white" : "text-app-primary"}`} />
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
            className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-none text-sm font-semibold text-app-text bg-transparent hover:bg-app-card-hover border border-app-primary theme-transition group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-app-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-app-primary"></span>
            </span>
            <Phone className="h-4 w-4 text-app-text-muted group-hover:rotate-12 transition-transform theme-transition" />
            <span className="hidden sm:inline">Emergency Hotlines</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-none text-app-text-muted hover:bg-app-card-hover transition-colors border border-app-border theme-transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-app-text-dim" /> : <Moon className="h-4 w-4 text-app-text-muted" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-none text-app-text-muted hover:bg-app-card-hover transition-colors border border-app-border md:hidden theme-transition"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 z-30 w-full bg-app-card border-b border-app-border px-4 py-4 space-y-2 animate-fade-in shadow-md theme-transition">
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
                  isActive ? "bg-app-primary text-white shadow-md font-semibold" : "text-app-text-muted hover:text-app-text hover:bg-app-card-hover"
                }`}
              >
                <Icon className={`h-5 w-5 theme-transition ${isActive ? "text-white" : "text-app-primary"}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
