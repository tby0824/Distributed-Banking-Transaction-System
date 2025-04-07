import React from 'react';

function Requirements({ registerData }) {
  const { email = '', password = '', termsAccepted = false } = registerData;

  const isEmailValid = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const isPasswordValid = password.length >= 6;

  return (
    <div className="bg-indigo-50 p-4 rounded-xl w-52 shadow-sm transform transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
      <ul className="text-sm text-gray-600 space-y-3">
        <li className="flex items-center">
          <span className="w-5 h-5 mr-2 flex-shrink-0">
            {isEmailValid ? (
              <svg
                className="w-5 h-5 text-green-500 animate-check-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-500 animate-cross-shake"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </span>
          Valid email
        </li>
        <li className="flex items-center">
          <span className="w-5 h-5 mr-2 flex-shrink-0">
            {isPasswordValid ? (
              <svg
                className="w-5 h-5 text-green-500 animate-check-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-500 animate-cross-shake"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </span>
          6+ char password
        </li>
        <li className="flex items-center">
          <span className="w-5 h-5 mr-2 flex-shrink-0">
            {termsAccepted ? (
              <svg
                className="w-5 h-5 text-green-500 animate-check-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-500 animate-cross-shake"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </span>
          Accept terms
        </li>
      </ul>
    </div>
  );
}

export default Requirements;