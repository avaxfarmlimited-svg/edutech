import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function CourseView() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser, userRole } = useAuth();

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const courseDoc = await getDoc(doc(db, 'courses', id));
      if (courseDoc.exists()) {
        setCourse({ id: courseDoc.id, ...courseDoc.data() });
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileUrl, fileName) => {
    window.open(fileUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <Link to="/courses" className="text-primary hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary to-secondary h-64 flex items-center justify-center">
            <span className="text-white text-8xl">📚</span>
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-700 text-lg leading-relaxed">{course.description}</p>
          </div>
        </div>

        {/* Course Materials Section */}
        {currentUser && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Course Materials</h2>
            
            {course.fileUrls && course.fileUrls.length > 0 ? (
              <div className="space-y-3">
                {course.fileUrls.map((fileUrl, index) => {
                  // Extract filename from URL
                  const fileName = fileUrl.split('/').pop().split('?')[0].split('%2F').pop();
                  const decodedFileName = decodeURIComponent(fileName);
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">📄</span>
                        <div>
                          <p className="font-medium">{decodedFileName || `Material ${index + 1}`}</p>
                          <p className="text-sm text-gray-500">Click to download</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(fileUrl, decodedFileName)}
                        className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                      >
                        <span>⬇️</span>
                        Download
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📭</span>
                <p className="text-gray-600">No course materials uploaded yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Call to Action for Non-Logged In Users */}
        {!currentUser && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Access Course Materials?</h2>
            <p className="text-gray-600 mb-6">
              Please login or register to view and download course materials.
            </p>
            <Link
              to="/auth"
              className="inline-block bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
            >
              Login / Register
            </Link>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to={userRole === 'teacher' ? '/teacher/dashboard' : userRole === 'student' ? '/student/dashboard' : '/courses'}
            className="text-primary hover:underline"
          >
            ← Back to {userRole === 'teacher' ? 'Teacher Dashboard' : userRole === 'student' ? 'My Courses' : 'All Courses'}
          </Link>
        </div>
      </div>
    </div>
  );
}
