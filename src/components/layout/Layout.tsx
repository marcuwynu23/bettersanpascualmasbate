import { Compass, FileText, Grid, HardHat, Home as HomeIcon, Info, Phone, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { NavItem } from "../../types";
import { EmergencyPanel } from "./EmergencyPanel";
import { EnvironmentBanner } from "./EnvironmentBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTab, setCurrentTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyPanelOpen, setIsEmergencyPanelOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "infrastructure", label: "Infrastructure", icon: HardHat },
    { id: "services", label: "Services", icon: Grid },
    { id: "transparency", label: "Transparency", icon: FileText },
    { id: "explore", label: "Explore & History", icon: Compass },
  ];

  // Environment Check
  const envMode = import.meta.env.MODE || "development";
  const showEnvBanner = envMode === "development" || envMode === "staging";

  // Prevent scroll when mobile menu or emergency panel is open
  useEffect(() => {
    if (isMobileMenuOpen || isEmergencyPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isEmergencyPanelOpen]);

  const handleSetTab = (tab: string) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
  };

  // Map tabs dynamically to our PH Flag monochromatic classes
  const getThemeClass = () => {
    switch (currentTab) {
      case "home":
        return "theme-blue";
      case "infrastructure":
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
      <EnvironmentBanner envMode={envMode} showEnvBanner={showEnvBanner} />

      <Header
        currentTab={currentTab}
        setCurrentTab={handleSetTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsEmergencyPanelOpen={setIsEmergencyPanelOpen}
        navItems={navItems}
      />

      {/* Mobile Navigation Drawer - Moved outside Header for better stacking context */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[150] w-full bg-app-bg animate-fade-in theme-transition overflow-y-auto">
          {/* Mobile Header (Duplicate of top bar for consistency when drawer is open) */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-app-border bg-app-primary text-white">
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto brightness-0 invert" />
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 border border-white/10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSetTab(item.id)}
                  className={`flex items-center gap-4 w-full px-6 py-5 rounded-none text-lg font-bold transition-all ${
                    isActive ? "bg-app-primary text-white shadow-md" : "text-app-text hover:bg-app-muted-hover"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? "text-white" : "text-app-primary"}`} />
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

      {/* Global Top Non-Official Disclaimer */}
      <div className="bg-app-primary text-white text-center py-2 px-4 text-[10px] sm:text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-inner theme-transition">
        <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
        <span className="leading-tight">Non-official transparency portal. Not affiliated with the LGU.</span>
      </div>

      <EmergencyPanel isOpen={isEmergencyPanelOpen} setIsOpen={setIsEmergencyPanelOpen} />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="animate-fade-in">{children}</div>
      </main>

      <Footer />
    </div>
  );
};
