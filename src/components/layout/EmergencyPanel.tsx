import { AlertTriangle, Info, Phone, ShieldAlert, X } from 'lucide-react';
import React from 'react';
import { EMERGENCY_CONTACTS } from '../../data/mockData';

interface EmergencyPanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const EmergencyPanel: React.FC<EmergencyPanelProps> = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity theme-transition" onClick={() => setIsOpen(false)} />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md animate-slide-in">
            <div className="flex h-full flex-col overflow-y-scroll bg-app-card border-l border-app-border theme-transition shadow-2xl">
              
              {/* Header */}
              <div className="bg-app-card px-6 py-8 border-b border-app-border flex items-center justify-between theme-transition sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-app-primary/10 text-app-primary theme-transition">
                    <ShieldAlert className="h-6 w-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-app-primary theme-transition block">
                      Emergency Support
                    </span>
                    <h2 className="text-xl font-bold font-display text-app-text tracking-tight mt-0.5 theme-transition" id="slide-over-title">
                      Responder Hotlines
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-none p-2 text-app-text-muted hover:text-app-text hover:bg-app-muted transition-all cursor-pointer theme-transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Hotline list */}
              <div className="relative flex-1 py-8 px-6 space-y-8">
                
                {/* Advisory Note */}
                <div className="bg-app-muted/65 border-l-2 border-app-primary p-5 rounded-none theme-transition">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-4.5 w-4.5 text-app-primary shrink-0 mt-0.5 theme-transition" />
                    <div>
                      <p className="text-xs font-bold text-app-text uppercase tracking-wider theme-transition">
                        Crucial Communication Note
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-app-text-muted theme-transition font-light">
                        Direct cellular calls are highly recommended. Network connectivity on Burias Island may fluctuate; repeated attempts may be necessary during peak weather events.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-app-text-dim theme-transition">
                      Primary Responders
                    </h3>
                    <div className="h-px flex-1 bg-app-border/40 ml-4 theme-transition" />
                  </div>

                  {EMERGENCY_CONTACTS.map((contact) => (
                    <div
                      key={contact.id}
                      className="group bg-app-card hover:bg-app-card-hover border border-app-border p-5 rounded-none flex items-start justify-between gap-5 transition-all duration-300 shadow-xs hover:shadow-sm theme-transition"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-app-primary bg-app-primary/5 px-2 py-0.5 theme-transition">
                            {contact.type}
                          </span>
                        </div>
                        <h3 className="font-bold text-app-text text-base tracking-tight theme-transition">{contact.agency}</h3>
                        <p className="text-xs text-app-text-muted leading-relaxed font-light theme-transition">{contact.description}</p>
                      </div>

                      <div className="flex flex-col items-end shrink-0 gap-3">
                        <a
                          href={`tel:${contact.number}`}
                          className="bg-app-primary hover:bg-app-primary-hover text-white p-3 rounded-none flex items-center justify-center transition-all group-hover:scale-105 shadow-xs theme-transition"
                          title={`Call ${contact.agency}`}
                        >
                          <Phone className="h-4.5 w-4.5 text-white" />
                        </a>
                        <span className="font-mono text-xs font-extrabold text-app-text tracking-tighter theme-transition">{contact.number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-app-border p-8 bg-app-muted/40 theme-transition mt-auto">
                <div className="flex items-start gap-3">
                  <Info className="h-4 w-4 text-app-text-dim shrink-0 mt-0.5 theme-transition" />
                  <p className="text-[10px] text-app-text-muted leading-relaxed theme-transition font-light">
                    <strong>Information Integrity Disclaimer:</strong> Contact details are compiled from verified community directories. If you identify an outdated number, please report it to municipal volunteers to ensure public safety.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
