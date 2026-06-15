import { Info } from 'lucide-react';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#212529] text-white/70 border-t border-white/10 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.svg" 
                alt="BetterSanPascualMasbate Logo" 
                className="h-8 w-auto object-contain" 
                loading="lazy"
              />
             
            </div>
            <p className="text-xs leading-relaxed text-white/60 theme-transition max-w-sm">
              A volunteer-driven, non-official community directory and transparency registry dedicated to making public information accessible and
              exploring the beauty of San Pascual, Burias Island, Masbate.
            </p>
            <div className="mt-4">
              <a 
                href="https://bettergov.ph/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block hover:opacity-100 transition-opacity"
              >
                <img 
                  src="/bettergov-logo.svg" 
                  alt="BetterGov Logo" 
                  className="h-12 w-auto object-contain opacity-70 hover:opacity-100" 
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display theme-transition">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors theme-transition">Home</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors theme-transition">Infrastructure</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors theme-transition">Services</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors theme-transition">Transparency</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors theme-transition">Statistics</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors theme-transition">Explore & History</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display theme-transition">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://data.gov.ph/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors theme-transition">Open Data Philippines</a></li>
              <li><a href="https://www.foi.gov.ph/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors theme-transition">Freedom of Information</a></li>
              <li><a href="https://data.bettergov.ph/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors theme-transition">Open Data Portal</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61586941997162" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors theme-transition">San Pascual Municipal Public Information Office</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display theme-transition">About the Island</h4>
            <p className="text-xs leading-relaxed text-white/60 theme-transition">
              San Pascual is a coastal paradise situated at the northern end of Burias Island, Masbate. It is famous for cattle ranching, copra
              production, and pristine islands like Sombrero and Tinalisayan.
            </p>
          </div>
        </div>

        {/* Global Footer Disclaimer Banner */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="bg-white/5 border border-white/10 p-5 rounded-none flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left theme-transition">
            <Info className="h-8 w-8 text-white/40 shrink-0 theme-transition" />
            <div>
              <h5 className="text-sm font-bold text-white theme-transition">Non-Official Portal</h5>
              <p className="text-xs text-white/50 mt-1 leading-relaxed theme-transition">
                Volunteer directory. Not affiliated with the LGU. Process official transactions directly with official government offices.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40">
            <p>© {new Date().getFullYear()} BetterSanPascualMasbate.org. Built with ♥ by local volunteers.</p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-white transition-colors theme-transition">
                Privacy Notes
              </a>
              <a href="#terms" className="hover:text-white transition-colors theme-transition">
                Usage Guidelines
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
