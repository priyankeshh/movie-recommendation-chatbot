import React from 'react';

const LoadingDots: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-3">
      <div className="text-sm font-handwritten text-cozy-coffee mb-2 animate-gentle-pulse">Getting cozy suggestions...</div>
      <div className="flex items-center justify-center">
        <div className="relative w-16 h-16">
          {/* Popcorn kernels popping animation */}
          <div className="absolute w-3 h-3 bg-cozy-cream rounded-full animate-soft-bounce"
               style={{ left: '30%', top: '20%', animationDelay: '0ms', animationDuration: '1.2s' }}></div>
          <div className="absolute w-3 h-3 bg-cozy-cream rounded-full animate-soft-bounce"
               style={{ left: '60%', top: '30%', animationDelay: '300ms', animationDuration: '1.5s' }}></div>
          <div className="absolute w-3 h-3 bg-cozy-cream rounded-full animate-soft-bounce"
               style={{ left: '45%', top: '10%', animationDelay: '600ms', animationDuration: '1.3s' }}></div>

          {/* Popcorn bucket */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-cozy-red rounded-b-lg overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-2 bg-cozy-cream flex">
              <div className="flex-1 border-r border-cozy-red/20"></div>
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDots;
