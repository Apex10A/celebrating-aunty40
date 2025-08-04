import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface AnniversarySelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const AnniversarySelect: React.FC<AnniversarySelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  error,
  className = '',
}) => {
  const baseClasses = "w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border bg-black/50 text-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300 text-base sm:text-lg appearance-none cursor-pointer";
  
  const borderClasses = error 
    ? "border-red-500 focus:border-red-500" 
    : "border-[#FFD700]/20 focus:border-[#FFD700]";
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "";

  const selectClasses = `${baseClasses} ${borderClasses} ${disabledClasses} ${className}`;
  const labelClasses = "block text-[#FFD700] font-medium mb-2 sm:mb-3 text-sm sm:text-base";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // Try to convert to number if it's a valid number
    const numericValue = Number(selectedValue);
    onChange(isNaN(numericValue) ? selectedValue : numericValue);
  };

  return (
    <div className="w-full">
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className={selectClasses}
        >
          {placeholder && (
            <option value="" disabled className="text-[#FFD700]/30">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-black text-[#FFD700]"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-[#FFD700]/70" />
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default AnniversarySelect;