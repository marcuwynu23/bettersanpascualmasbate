import { Info } from "lucide-react";
import React, { useState } from "react";
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

  // Environment Check
  const envMode = import.meta.env.MODE || "development";
  const showEnvBanner = envMode === "development" || envMode === "staging";

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
      <EnvironmentBanner envMode={envMode} showEnvBanner={showEnvBanner} />

      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsEmergencyPanelOpen={setIsEmergencyPanelOpen}
      />

      {/* Global Top Non-Official Disclaimer */}
      <div className="bg-app-primary text-white text-center py-2 px-4 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-inner theme-transition">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <span>Non-official transparency portal. Not affiliated with the LGU.</span>
      </div>

      <EmergencyPanel isOpen={isEmergencyPanelOpen} setIsOpen={setIsEmergencyPanelOpen} />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">{children}</div>
      </main>

      <Footer />
    </div>
  );
};
