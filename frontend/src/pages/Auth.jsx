import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import Requirements from '../components/Requirements';

function Auth() {
  const [hasAccount, setHasAccount] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [registerData, setRegisterData] = useState({ email: '', password: '', termsAccepted: false });

  const handleChoice = (choice) => {
    if (hasAccount === choice) return;
    setIsFlipping(true);
    setTimeout(() => {
      setHasAccount(choice);
      setIsFlipping(false);
    }, 500);
  };

  const handleInputChange = (newData) => {
    setRegisterData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative p-8">
          {/* Initial View */}
          {hasAccount === null && (
            <div
              className={`text-center space-y-6 transition-all duration-500 ease-in-out ${
                isFlipping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <h1 className="text-4xl font-extrabold text-gray-900 animate-fade-in-down">
                Welcome
              </h1>
              <p className="text-gray-600 text-lg animate-fade-in-up">
                Do you have an account?
              </p>
              <div className="flex justify-center space-x-6">
                <button
                  onClick={() => handleChoice(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Yes, Login
                </button>
                <button
                  onClick={() => handleChoice(false)}
                  className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  No, Register
                </button>
              </div>
            </div>
          )}

          {/* Auth Views */}
          {hasAccount !== null && (
            <div
              className={`flex flex-col md:flex-row gap-8 transition-all duration-500 ease-in-out ${
                isFlipping
                  ? 'opacity-0 transform rotateY-90'
                  : 'opacity-100 transform rotateY-0'
              }`}
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
              {/* Left Section */}
              <div className="flex-1 flex flex-col justify-center space-y-6 animate-slide-in-left">
                <h1 className="text-4xl font-extrabold text-gray-900">
                  {hasAccount ? 'Welcome Back' : 'Join Us'}
                </h1>
                <p className="text-gray-600 text-lg">
                  {hasAccount
                    ? 'Enter your credentials to continue'
                    : 'Create your account in seconds'}
                </p>
                <button
                  onClick={() => handleChoice(!hasAccount)}
                  className="text-blue-600 hover:text-blue-800 transform hover:translate-x-1 transition-all duration-300 text-base font-medium w-fit"
                >
                  {hasAccount ? 'Need to register?' : 'Already have an account?'}
                </button>
              </div>

              {/* Right Section */}
              <div className="flex-1 flex items-center justify-center animate-slide-in-right">
                {hasAccount ? (
                  <div className="w-full max-w-sm">
                    <Login />
                  </div>
                ) : (
                  <div className="w-full flex flex-col md:flex-row gap-6 items-center justify-center">
                    <div className="flex-1 max-w-sm">
                      <Register onInputChange={handleInputChange} registerData={registerData} />
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <Requirements registerData={registerData} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;