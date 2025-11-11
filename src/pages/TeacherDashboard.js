import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function TeacherDashboard() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchMyCourses();
    }
  }, [currentUser]);

  const fetchMyCourses = async () => {
    try {
      // Fetch courses created by this teacher
      const coursesRef = collection(db, 'courses');
      const q = query(coursesRef, where('teacherId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push({ id: doc.id, ...doc.data() });
      });
      
      setMyCourses(courses);
    } catch (error) {
      console.error('Error fetching teacher courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: 'Total Courses', 
      value: myCourses.length, 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'blue'
    },
    { 
      label: 'Total Students', 
      value: '342', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'purple'
    },
    { 
      label: 'Avg Rating', 
      value: '4.8', 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: 'yellow'
    },
    { 
      label: 'Revenue', 
      value: '$2.4k', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Teacher Dashboard
            </h1>
            <p className="text-xl text-gray-600">Manage your courses and track your impact.</p>
          </div>
          <Link
            to="/teacher/create"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Course
          </Link>
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
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading your courses...</p>
            </div>
          ) : myCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group transform hover:-translate-y-2 duration-300">
                  <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 h-48 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <svg className="w-24 h-24 text-white opacity-80 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{course.description}</p>
                    
                    {/* Course Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        24 students
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {course.fileUrls?.length || 0} files
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        to={`/course/${course.id}`}
                        className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition"
                      >
                        View
                      </Link>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Create Your First Course</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Start sharing your knowledge with students around the world. It's easy to get started!
                </p>
                <Link
                  to="/teacher/create"
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Course
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
