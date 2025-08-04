import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownOption {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

interface AnniversaryDropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  searchable?: boolean;
}

export const AnniversaryDropdown: React.FC<AnniversaryDropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  error,
  className = '',
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);
  
  const filteredOptions = searchable
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const baseClasses = "w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border bg-black/50 text-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300 text-base sm:text-lg cursor-pointer";
  
  const borderClasses = error 
    ? "border-red-500 focus:border-red-500" 
    : "border-[#FFD700]/20 focus:border-[#FFD700]";
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "";

  const triggerClasses = `${baseClasses} ${borderClasses} ${disabledClasses} ${className}`;
  const labelClasses = "block text-[#FFD700] font-medium mb-2 sm:mb-3 text-sm sm:text-base";

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div
          className={triggerClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedOption?.icon}
              <span className={selectedOption ? 'text-[#FFD700]' : 'text-[#FFD700]/30'}>
                {selectedOption?.label || placeholder}
              </span>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-[#FFD700]/70 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-black/90 backdrop-blur-lg border border-[#FFD700]/20 rounded-xl shadow-2xl max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-3 border-b border-[#FFD700]/10">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-[#FFD700] placeholder-[#FFD700]/30 focus:border-[#FFD700] focus:outline-none text-sm"
                />
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-[#FFD700]/50 text-sm">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[#FFD700]/10 cursor-pointer transition-colors duration-200"
                    onClick={() => handleSelect(option)}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span className="text-[#FFD700]">{option.label}</span>
                    </div>
                    {option.value === value && (
                      <Check className="w-4 h-4 text-[#FFD700]" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default AnniversaryDropdown;