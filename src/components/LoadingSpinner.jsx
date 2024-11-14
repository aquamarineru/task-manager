import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="w-8 h-8 border-4 border-t-transparent border-greenTeal rounded-full animate-spin"></div>
      <span className="ml-3 text-gray">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
