import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Menu, 
  X, 
  Phone, 
  Moon, 
  Sun, 
  Compass, 
  FileText, 
  Grid, 
  Home as HomeIcon,
  AlertTriangle,
  Info
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/mockData';

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
  const envMode = import.meta.env.MODE || 'development';
  const showEnvBanner = envMode === 'development' || envMode === 'staging';

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'services', label: 'Services', icon: Grid },
    { id: 'transparency', label: 'Transparency', icon: FileText },
    { id: 'explore', label: 'Explore & History', icon: Compass },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Environment Banner */}
      {showEnvBanner && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs px-4 py-1.5 flex items-center justify-center gap-2 font-medium">
          <span className="inline-flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
          Environment: <span className="uppercase font-bold tracking-wider">{envMode} Mode</span> — Client-side mock data only.
        </div>
      )}

      {/* 2. Top Sticky Header */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Branding */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentTab('home')}
          >
            <img src="/logo.png" alt="BetterSanPascual Logo" className="h-9 w-auto object-contain group-hover:scale-102 transition-transform" />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 leading-none">
                BetterSanPascual
              </span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-widest uppercase mt-0.5">
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-sky-600 text-white' 
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
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
              className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all duration-200 group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Emergency Hotlines</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/40 dark:border-slate-800/50"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/40 dark:border-slate-800/50 md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* 3. Global Top Non-Official Disclaimer */}
      <div className="bg-sky-600 text-white text-center py-2 px-4 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <Info className="h-3.5 w-3.5 shrink-0" />
        <span>BetterSanPascual.org is a volunteer-built, non-official transparency portal. It is not affiliated with or operated by the LGU.</span>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden sticky top-16 z-30 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2 animate-fade-in shadow-md">
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
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive 
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/10' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="h-5 w-5" />
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
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsEmergencyPanelOpen(false)}
            />
            
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md animate-slide-in">
                <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
                  
                  {/* Header */}
                  <div className="bg-red-600 px-6 py-6 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-6 w-6 animate-pulse" />
                      <div>
                        <h2 className="text-lg font-bold font-display" id="slide-over-title">Emergency Responder Hotlines</h2>
                        <p className="text-xs text-red-100 mt-0.5">Municipal Disaster Coordination, San Pascual, Masbate</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsEmergencyPanelOpen(false)}
                      className="rounded-lg p-1.5 hover:bg-red-700 transition-colors"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>

                  {/* Hotline list */}
                  <div className="relative flex-1 py-6 px-6 space-y-6">
                    
                    <div className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-sm text-red-800 dark:text-red-300">
                      <p className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        Crucial Information
                      </p>
                      <p className="mt-1 text-xs leading-relaxed">
                        These contacts are specifically for San Pascual municipality located on <strong>Burias Island, Masbate</strong>. Due to limited telecom signals on the island, calling mobile numbers directly is highly recommended.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {EMERGENCY_CONTACTS.map((contact) => (
                        <div 
                          key={contact.id} 
                          className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 p-4 rounded-2xl transition-all duration-200 flex items-start justify-between gap-4 group"
                        >
                          <div className="space-y-1">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              contact.type === 'National' 
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800' 
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                            }`}>
                              {contact.type} Responder
                            </span>
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-1">{contact.agency}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{contact.description}</p>
                          </div>
                          
                          <div className="flex flex-col items-end shrink-0">
                            <a 
                              href={`tel:${contact.number}`}
                              className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
                            >
                              <Phone className="h-4 w-4" />
                            </a>
                            <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 mt-2 block">
                              {contact.number}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900/50">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center leading-normal">
                      Disclaimer: Contact numbers are sourced from local community guides. If any number is outdated, please contact volunteers to request an update.
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
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* 5. Footer and Global Non-Official Disclaimer */}
      <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <img src="/logo.png" alt="BetterSanPascual Logo" className="h-8 w-auto object-contain brightness-0 invert" />
                <span className="font-sans font-bold text-lg text-white">BetterSanPascual</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
                A volunteer-driven, non-official community directory and transparency registry dedicated to making public information accessible and exploring the beauty of San Pascual, Burias Island, Masbate.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Transparency & Ethics</h4>
              <p className="text-xs leading-relaxed text-slate-400">
                Our database uses publicly available government directories, municipal resolutions, and verified tourist registers. All content is localized to help island residents and visitors navigate services easily.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">About the Island</h4>
              <p className="text-xs leading-relaxed text-slate-400">
                San Pascual is a coastal paradise situated at the northern end of Burias Island, Masbate. It is famous for cattle ranching, copra production, and pristine islands like Sombrero and Tinalisayan.
              </p>
            </div>

          </div>

          {/* Global Footer Disclaimer Banner */}
          <div className="mt-8 pt-8 border-t border-slate-800">
            <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="bg-sky-500/10 p-3 rounded-full text-sky-400 shrink-0">
                <Info className="h-6 w-6" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Strict Transparency Disclaimer</h5>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  <strong>BetterSanPascual.org</strong> is a volunteer-built, non-official transparency portal. It is not affiliated with, operated by, or endorsed by the local government unit (LGU) of San Pascual or the provincial government of Masbate. All LGU transactions must be processed through official LGU offices.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
              <p>© {new Date().getFullYear()} BetterSanPascual.org. Built with ♥ by local volunteers.</p>
              <div className="flex gap-4">
                <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Notes</a>
                <a href="#terms" className="hover:text-slate-400 transition-colors">Usage Guidelines</a>
              </div>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
};
