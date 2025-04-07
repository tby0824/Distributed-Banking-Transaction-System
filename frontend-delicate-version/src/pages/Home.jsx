import React from 'react';
import { Link } from 'react-router-dom';
import bankImage from '../assets/bank.jpg';
import secureImage from '../assets/secure.jpg';
import updatesImage from '../assets/updates.jpg';
import transfersImage from '../assets/transfers.jpg';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 transition-all duration-300 hover:text-blue-600">
            Distributed Banking System
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
              Welcome to Your Banking Hub
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto md:mx-0">
              Experience secure banking with real-time account management, instant transfers, 
              and personalized financial insights.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <Link
                to="/auth"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg 
                          transform transition-all duration-300 hover:scale-110 hover:bg-blue-700
                          hover:shadow-xl text-lg font-semibold"
              >
                Get Started
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6 max-w-md mx-auto md:mx-0">
              Sign up today and unlock a world of seamless banking features tailored just for you.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src={bankImage} 
              alt="Banking" 
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl 
                        transform transition-all duration-500 hover:scale-105"
            />
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Why Choose Our Banking System?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src={secureImage} 
                alt="Secure Banking" 
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Secure Banking</h4>
              <p className="text-gray-600">
                Industry-leading encryption keeps your financial data safe and secure.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src={updatesImage} 
                alt="Real-Time Updates" 
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Real-Time Updates</h4>
              <p className="text-gray-600">
                Get instant notifications about your account activities and transactions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <img 
                src={transfersImage} 
                alt="Smart Transfers" 
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Smart Transfers</h4>
              <p className="text-gray-600">
                Move money between accounts instantly with our intelligent system.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg p-8">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800">24/7 Access</h4>
                <p className="text-gray-600">
                  Manage your finances anytime, anywhere with our mobile-friendly platform.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Zero Fees</h4>
                <p className="text-gray-600">
                  Enjoy banking without hidden charges or maintenance fees.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Personalized Insights</h4>
                <p className="text-gray-600">
                  Receive tailored financial advice based on your spending patterns.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                4
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Multi-Device Sync</h4>
                <p className="text-gray-600">
                  Seamlessly switch between devices with real-time synchronization.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 text-center mb-16">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Meet Our Team</h3>
          <p className="text-gray-600 mb-8">
            Our system was created by a talented team from the University of Toronto's ECE Department.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800">Boyuan Tan</h4>
              <p className="text-gray-600">boyuan.tan@mail.utoronto.ca</p>
            </div>
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800">Minghao Ma</h4>
              <p className="text-gray-600">minghao.ma@mail.utoronto.ca</p>
            </div>
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800">Yiming Li</h4>
              <p className="text-gray-600">yimingjo.li@mail.utoronto.ca</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 Distributed Banking System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;