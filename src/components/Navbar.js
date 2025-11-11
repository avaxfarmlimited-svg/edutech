import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">EduTech</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/courses" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                Courses
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                {userRole === 'student' && (
                  <Link
                    to="/student/dashboard"
                    className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                  >
                    My Dashboard
                  </Link>
                )}
                {userRole === 'teacher' && (
                  <Link
                    to="/teacher/dashboard"
                    className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                  >
                    Teacher Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
