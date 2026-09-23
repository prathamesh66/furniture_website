import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-4">
      {/* Spinner */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="mt-3 sm:mt-4 text-gray-600 text-base sm:text-lg font-medium">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
