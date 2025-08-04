import React from 'react';

interface AnniversaryInputProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  rows?: number; // For textarea
  multiline?: boolean;
}

export const AnniversaryInput: React.FC<AnniversaryInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  error,
  className = '',
  rows = 3,
  multiline = false,
}) => {
  const baseClasses = "w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border bg-black/50 text-[#FFD700] placeholder-[#FFD700]/30 focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300 text-base sm:text-lg";
  
  const borderClasses = error 
    ? "border-red-500 focus:border-red-500" 
    : "border-[#FFD700]/20 focus:border-[#FFD700]";
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "";

  const inputClasses = `${baseClasses} ${borderClasses} ${disabledClasses} ${className}`;
  const labelClasses = "block text-[#FFD700] font-medium mb-2 sm:mb-3 text-sm sm:text-base";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      {multiline ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClasses}
        />
      )}
      
      {error && (
        <p className="mt-2 text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default AnniversaryInput;