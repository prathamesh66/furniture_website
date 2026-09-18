import React from 'react'
import { Link } from 'react-router';

const Breadcrumb = ({ pageTitle, path, link, path2 }) => {
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <nav
          className="flex  bg-neutral-secondary-medium border-t border-b border-[#ccc] p-4  rounded-base items-center"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to={"/dashboard"}
                className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand hover:text-blue-600"
              >
                <svg
                  className="w-4 h-4 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                  />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center space-x-1.5">
                <svg
                  className="w-3.5 h-3.5 rtl:rotate-180 text-body"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m9 5 7 7-7 7"
                  />
                </svg>
                <span className="text-sm font-medium text-body">
                  <Link
                    to={link}
                    className="flex items-center gap-2 text-sm font-medium text-body "
                  >
                    <span className="hover:text-blue-600">{path}</span>

                    <svg
                      className="w-3.5 h-3.5  text-body"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m9 5 7 7-7 7"
                      />
                    </svg>
                    <span className='text-[#7e7b7b]'>{path2}</span>
                  </Link>
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </>
    </div>
  );
};

export default Breadcrumb
