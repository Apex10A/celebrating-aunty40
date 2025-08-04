import React from 'react';

interface AnniversaryLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showText?: boolean;
  className?: string;
  fullScreen?: boolean;
  variant?: 'dots' | 'spinner' | 'pulse' | 'bars';
}

export const AnniversaryLoading: React.FC<AnniversaryLoadingProps> = ({
  size = 'md',
  text = 'Loading...',
  showText = true,
  className = '',
  fullScreen = false,
  variant = 'dots',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center';

  const renderLoadingVariant = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            <div className={`${sizeClasses[size]} bg-[#FFD700] rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`${sizeClasses[size]} bg-[#FFD700] rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`${sizeClasses[size]} bg-[#FFD700] rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        );

      case 'spinner':
        return (
          <div className={`${sizeClasses[size]} border-2 border-[#FFD700]/20 border-t-[#FFD700] rounded-full animate-spin`}></div>
        );

      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} bg-[#FFD700] rounded-full animate-pulse`}></div>
        );

      case 'bars':
        return (
          <div className="flex space-x-1">
            <div className={`w-1 ${size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : 'h-8'} bg-[#FFD700] animate-pulse`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-1 ${size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : 'h-8'} bg-[#FFD700] animate-pulse`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-1 ${size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : 'h-8'} bg-[#FFD700] animate-pulse`} style={{ animationDelay: '300ms' }}></div>
            <div className={`w-1 ${size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : 'h-8'} bg-[#FFD700] animate-pulse`} style={{ animationDelay: '450ms' }}></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center space-y-4">
        {renderLoadingVariant()}
        {showText && (
          <p className={`text-[#FFD700] ${textSizeClasses[size]} font-light`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default AnniversaryLoading;