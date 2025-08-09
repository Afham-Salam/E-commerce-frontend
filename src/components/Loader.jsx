import React from 'react';

const Loader = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false,
  overlay = false 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const LoaderContent = () => (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated Spinner */}
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="relative w-full h-full">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-[#FFF3E3] rounded-full"></div>
          {/* Spinning arc */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[#B88E2F] rounded-full animate-spin"></div>
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#B88E2F] rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      {text && (
        <p className={`${textSizeClasses[size]} text-[#B88E2F] font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
        <LoaderContent />
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
        <LoaderContent />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <LoaderContent />
    </div>
  );
};

export default Loader; 