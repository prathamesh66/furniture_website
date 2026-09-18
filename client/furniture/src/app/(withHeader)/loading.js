import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="mt-4 text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  );
};

export default Loading;
