import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      const coursesRef = collection(db, 'courses');
      const q = query(coursesRef, limit(6));
      const querySnapshot = await getDocs(q);
      
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push({ id: doc.id, ...doc.data() });
      });
      
      setFeaturedCourses(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to EduTech Platform
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Learn technical and non-technical courses from expert teachers. 
              Join thousands of students advancing their skills every day.
            </p>
            <Link
              to="/courses"
              className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition"
            >
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Courses</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          ) : featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="bg-gradient-to-r from-primary to-secondary h-48 flex items-center justify-center">
                    <span className="text-white text-6xl">📚</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                    <Link
                      to={`/course/${course.id}`}
                      className="inline-block bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No courses available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of learners and teachers today
          </p>
          <Link
            to="/auth"
            className="inline-block bg-secondary hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
