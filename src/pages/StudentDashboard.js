import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchEnrolledCourses();
  }, [currentUser]);

  const fetchEnrolledCourses = async () => {
    try {
      // In a real app, you'd have an 'enrollments' collection
      // For now, we'll show all courses as a placeholder
      const coursesRef = collection(db, 'courses');
      const querySnapshot = await getDocs(coursesRef);
      
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push({ id: doc.id, ...doc.data() });
      });
      
      setEnrolledCourses(courses);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: 'Courses Enrolled', 
      value: enrolledCourses.length, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'blue'
    },
    { 
      label: 'Hours Learned', 
      value: '24', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'purple'
    },
    { 
      label: 'Completed', 
      value: '3', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: 'green'
    },
    { 
      label: 'Certificates', 
      value: '2', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      color: 'pink'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Dashboard
          </h1>
          <p className="text-xl text-gray-600">Welcome back! Continue your learning journey.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1`}>
              <div className={`inline-flex p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 mb-4`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold mb-1 text-${stat.color}-600`}>{stat.value}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Link
              to="/courses"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              Browse More
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading your courses...</p>
            </div>
          ) : enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group transform hover:-translate-y-2 duration-300">
                  <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 h-48 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <svg className="w-24 h-24 text-white opacity-80 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {/* Progress Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                      45% Complete
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{course.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                    
                    <Link
                      to={`/course/${course.id}`}
                      className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-md"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Start Your Learning Journey</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  You haven't enrolled in any courses yet. Browse our catalog and find the perfect course for you!
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl"
                >
                  Browse Courses
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
