import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = "Carregando..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-bold text-white animate-pulse">{message}</p>
        <p className="text-gray-500 text-sm mt-2">Isso pode levar alguns segundos.</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
