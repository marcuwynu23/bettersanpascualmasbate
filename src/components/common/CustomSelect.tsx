import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  className = '',
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center gap-2 shrink-0 ${className}`} ref={containerRef}>
      {label && (
        <span className="text-xs font-semibold text-app-text-muted uppercase tracking-wider hidden sm:inline theme-transition">
          {label}
        </span>
      )}
      <div className="relative w-full sm:w-48">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-app-muted/65 rounded-none px-4 py-3 text-sm font-semibold text-app-text flex items-center justify-between hover:bg-app-muted transition-all focus:outline-none focus:ring-2 focus:ring-app-primary/10 theme-transition"
        >
          <span className="truncate">{value}</span>
          {icon ? (
            <span className="text-app-text-muted ml-2">{icon}</span>
          ) : (
            <ChevronDown className={`h-4 w-4 text-app-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 z-[120] bg-app-card border border-app-border shadow-lg rounded-none py-1 animate-fade-in theme-transition overflow-hidden">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  value === option
                    ? 'bg-app-primary text-white font-bold'
                    : 'text-app-text hover:bg-app-muted'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
