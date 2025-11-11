import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-center">About EduTech Platform</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-primary">Our Mission</h2>
              <p className="leading-relaxed">
                EduTech Platform is dedicated to making quality education accessible to everyone. 
                We connect passionate teachers with eager students, creating a vibrant learning 
                community where knowledge flows freely and skills are developed continuously.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-primary">What We Offer</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Wide range of technical and non-technical courses</li>
                <li>Expert teachers from diverse backgrounds</li>
                <li>Easy-to-use platform for both students and teachers</li>
                <li>Downloadable course materials (PDFs, PPTs, and more)</li>
                <li>Flexible learning at your own pace</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-primary">For Students</h2>
              <p className="leading-relaxed">
                Browse our extensive course catalog, enroll in courses that interest you, 
                and access high-quality learning materials. Track your progress through 
                your personalized dashboard and achieve your educational goals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-primary">For Teachers</h2>
              <p className="leading-relaxed">
                Share your expertise with students worldwide. Create courses, upload materials, 
                and help shape the next generation of learners. Our platform makes it easy 
                to manage your courses and reach students who are eager to learn from you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-primary">Contact Us</h2>
              <p className="leading-relaxed">
                Have questions or feedback? We'd love to hear from you!<br />
                Email: support@edutech-platform.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
