import React from 'react';
import { ShieldAlert, X, AlertTriangle, Phone } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../../data/mockData';

interface EmergencyPanelProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const EmergencyPanel: React.FC<EmergencyPanelProps> = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />

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
                  onClick={() => setIsOpen(false)}
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
  );
};
