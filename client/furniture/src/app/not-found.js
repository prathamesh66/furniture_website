"use client";

import Link from "next/link";
import "./globals.css";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 break-words">
          Sorry, the page you are looking for does not exist, has been moved, or
          the URL is incorrect.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
          <Link
            href="/"
            className="w-full sm:w-auto text-center rounded-lg bg-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-medium hover:bg-blue-700 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto rounded-lg border border-gray-300 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
