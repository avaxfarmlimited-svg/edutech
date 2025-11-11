import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default function Auth() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration/Marketing */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold mb-4">Welcome to EduTech</h2>
              <p className="text-xl text-blue-100">
                Join thousands of learners transforming their careers with expert-led courses
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Expert Instructors</h3>
                  <p className="text-blue-100">Learn from industry professionals</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Learn at Your Pace</h3>
                  <p className="text-blue-100">Flexible schedule that fits your life</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Get Certified</h3>
                  <p className="text-blue-100">Earn certificates to boost your resume</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <svg className="w-full h-auto opacity-20" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="250" cy="150" r="120" stroke="white" strokeWidth="2" />
                <circle cx="250" cy="150" r="80" stroke="white" strokeWidth="2" />
                <circle cx="250" cy="150" r="40" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Get Started</h2>
            <p className="text-gray-600 mt-2">Start your learning journey today</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-center font-medium transition rounded-lg ${
                activeTab === 'login'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 text-center font-medium transition rounded-lg ${
                activeTab === 'register'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
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
    </div>
  );
}
