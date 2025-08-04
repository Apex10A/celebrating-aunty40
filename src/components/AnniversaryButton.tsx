import React from 'react';

interface AnniversaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const AnniversaryButton: React.FC<AnniversaryButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon,
  iconPosition = 'left',
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20";

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-black hover:opacity-90 hover:scale-105',
    secondary: 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 hover:bg-[#FFD700]/30 hover:scale-105',
    outline: 'border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black hover:scale-105',
    ghost: 'text-[#FFD700] hover:bg-[#FFD700]/10 hover:scale-105',
  };

  const disabledClasses = disabled || loading
    ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100'
    : '';

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  const renderIcon = () => {
    if (loading) {
      return (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      );
    }
    return icon;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
    >
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default AnniversaryButton;