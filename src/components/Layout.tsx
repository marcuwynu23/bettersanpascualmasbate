import { AlertTriangle, Compass, FileText, Grid, Home as HomeIcon, Info, Menu, Moon, Phone, ShieldAlert, Sun, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { EMERGENCY_CONTACTS } from "../data/mockData";

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTab, setCurrentTab }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyPanelOpen, setIsEmergencyPanelOpen] = useState(false);

  // Environment Check
  const envMode = import.meta.env.MODE || "development";
  const showEnvBanner = envMode === "development" || envMode === "staging";

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const navItems = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "services", label: "Services", icon: Grid },
    { id: "transparency", label: "Transparency", icon: FileText },
    { id: "explore", label: "Explore & History", icon: Compass },
  ];

  // Map tabs dynamically to our PH Flag monochromatic classes
  const getThemeClass = () => {
    switch (currentTab) {
      case "home":
        return "theme-blue";
      case "services":
        return "theme-red";
      case "transparency":
        return "theme-yellow";
      case "explore":
        return "theme-blue";
      default:
        return "theme-blue";
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans bg-app-bg text-app-text transition-colors duration-500 theme-transition ${getThemeClass()}`}
    >
      {/* 1. Environment Banner */}
      {showEnvBanner && (
        <div className="bg-app-primary/10 border-b border-app-border text-app-text-dim text-xs px-4 py-1.5 flex items-center justify-center gap-2 font-medium theme-transition">
          <span className="inline-flex h-2 w-2 bg-app-primary animate-pulse theme-transition"></span>
          Environment: <span className="uppercase font-bold tracking-wider">{envMode} Mode</span>
        </div>
      )}

      {/* 2. Top Sticky Header */}
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
      </header>

      {/* 3. Global Top Non-Official Disclaimer */}
      <div className="bg-app-primary text-white text-center py-2 px-4 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-inner theme-transition">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <span>Non-official transparency portal. Not affiliated with the LGU.</span>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden sticky top-16 z-30 w-full bg-app-card border-b border-app-border px-4 py-4 space-y-2 animate-fade-in shadow-md theme-transition">
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

      {/* 4. Global Emergency Hotlines Panel (Drawer) */}
      {isEmergencyPanelOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Backdrop overlay */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsEmergencyPanelOpen(false)} />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md animate-slide-in">
                <div className="flex h-full flex-col overflow-y-scroll bg-app-card border-l border-app-border theme-transition">
                  {/* Header */}
                  <div className="bg-app-primary px-6 py-6 text-white border-b border-app-border flex items-center justify-between theme-transition">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-6 w-6 text-white animate-pulse" />
                      <div>
                        <h2 className="text-lg font-bold font-display text-white" id="slide-over-title">
                          Emergency Responder Hotlines
                        </h2>
                        <p className="text-xs text-white/80 mt-0.5">Municipal Disaster Coordination, San Pascual, Masbate</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEmergencyPanelOpen(false)}
                      className="rounded-none p-1.5 hover:bg-app-primary-hover transition-colors"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>

                  {/* Hotline list */}
                  <div className="relative flex-1 py-6 px-6 space-y-6">
                    <div className="bg-app-muted border border-app-border p-4 rounded-none text-sm text-app-text theme-transition">
                      <p className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-app-primary shrink-0 theme-transition" />
                        Crucial Information
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-app-text-muted theme-transition">
                        Direct mobile calls are recommended due to signal limits on Burias Island.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {EMERGENCY_CONTACTS.map((contact) => (
                        <div
                          key={contact.id}
                          className="bg-app-muted hover:bg-app-card-hover border border-app-border p-4 rounded-none flex items-start justify-between gap-4 group theme-transition"
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider block text-app-primary theme-transition">
                              {contact.type} Responder
                            </span>
                            <h3 className="font-bold text-app-text text-sm mt-1 theme-transition">{contact.agency}</h3>
                            <p className="text-xs text-app-text-muted leading-relaxed theme-transition">{contact.description}</p>
                          </div>

                          <div className="flex flex-col items-end shrink-0">
                            <a
                              href={`tel:${contact.number}`}
                              className="bg-app-primary hover:bg-app-primary-hover text-white p-2.5 rounded-none flex items-center justify-center transition-all group-hover:scale-105 theme-transition"
                            >
                              <Phone className="h-4 w-4 text-white" />
                            </a>
                            <span className="font-mono text-xs font-bold text-app-text mt-2 block theme-transition">{contact.number}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-app-border p-6 bg-app-muted theme-transition">
                    <p className="text-[10px] text-app-text-muted text-center leading-normal theme-transition">
                      Disclaimer: Contact numbers are sourced from local community guides. If any number is outdated, please contact volunteers to
                      request an update.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">{children}</div>
      </main>

      {/* 5. Footer and Global Non-Official Disclaimer */}
      <footer className="bg-app-card text-app-text-muted border-t border-app-border theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <img src="/logo.png" alt="BetterSanPascualMasbate Logo" className="h-8 w-auto object-contain brightness-0 invert" />
                <span className="font-sans font-bold text-lg text-app-text theme-transition">BetterSanPascualMasbate</span>
              </div>
              <p className="text-xs leading-relaxed text-app-text-muted theme-transition max-w-sm">
                A volunteer-driven, non-official community directory and transparency registry dedicated to making public information accessible and
                exploring the beauty of San Pascual, Burias Island, Masbate.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-app-text uppercase tracking-wider font-display theme-transition">Transparency & Ethics</h4>
              <p className="text-xs leading-relaxed text-app-text-muted theme-transition">
                Our database uses publicly available government directories, municipal resolutions, and verified tourist registers. All content is
                localized to help island residents and visitors navigate services easily.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-app-text uppercase tracking-wider font-display theme-transition">About the Island</h4>
              <p className="text-xs leading-relaxed text-app-text-muted theme-transition">
                San Pascual is a coastal paradise situated at the northern end of Burias Island, Masbate. It is famous for cattle ranching, copra
                production, and pristine islands like Sombrero and Tinalisayan.
              </p>
            </div>
          </div>

          {/* Global Footer Disclaimer Banner */}
          <div className="mt-8 pt-8 border-t border-app-border">
            <div className="bg-app-muted border border-app-border p-5 rounded-none flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left theme-transition">
              <Info className="h-8 w-8 text-app-primary shrink-0 theme-transition" />
              <div>
                <h5 className="text-sm font-bold text-app-text theme-transition">Non-Official Portal</h5>
                <p className="text-xs text-app-text-muted mt-1 leading-relaxed theme-transition">
                  Volunteer directory. Not affiliated with the LGU. Process official transactions directly with official government offices.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-app-text-dim">
              <p>© {new Date().getFullYear()} BetterSanPascualMasbate.org. Built with ♥ by local volunteers.</p>
              <div className="flex gap-4">
                <a href="#privacy" className="hover:text-app-primary transition-colors theme-transition">
                  Privacy Notes
                </a>
                <a href="#terms" className="hover:text-app-primary transition-colors theme-transition">
                  Usage Guidelines
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
