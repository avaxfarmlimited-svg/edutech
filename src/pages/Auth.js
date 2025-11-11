import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default function Auth() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Tab Navigation */}
        <div className="flex mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-center font-medium transition ${
              activeTab === 'login'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 text-center font-medium transition ${
              activeTab === 'register'
                ? 'text-secondary border-b-2 border-secondary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Register
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}
