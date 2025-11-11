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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Teacher Dashboard</h1>
            <p className="text-gray-600">Manage your courses and create new ones.</p>
          </div>
          <Link
            to="/teacher/create"
            className="bg-secondary hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Create New Course
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading your courses...</p>
          </div>
        ) : myCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-primary to-secondary h-40 flex items-center justify-center">
                  <span className="text-white text-5xl">📚</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex gap-2">
                    <Link
                      to={`/course/${course.id}`}
                      className="flex-1 text-center bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      View
                    </Link>
                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition">
                      Edit
                    </button>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    📄 {course.fileUrls?.length || 0} files uploaded
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2">No Courses Created Yet</h3>
            <p className="text-gray-600 mb-6">
              Start sharing your knowledge by creating your first course.
            </p>
            <Link
              to="/teacher/create"
              className="inline-block bg-secondary hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition"
            >
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
