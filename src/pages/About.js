import React from 'react';

export default function About() {
  const values = [
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Innovation",
      description: "Pioneering new ways to make learning accessible and engaging"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Global Reach",
      description: "Connecting learners and educators across continents"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Excellence",
      description: "Committed to delivering the highest quality education"
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Community",
      description: "Building a supportive network of passionate learners"
    }
  ];

  const features = [
    {
      icon: "🎓",
      title: "For Students",
      description: "Access thousands of courses, learn at your own pace, and earn certifications that matter",
      items: ["Interactive Learning", "Progress Tracking", "Certification Programs", "24/7 Access"]
    },
    {
      icon: "👨‍🏫",
      title: "For Teachers",
      description: "Share your expertise, build your brand, and earn income teaching what you love",
      items: ["Easy Course Creation", "Student Analytics", "Flexible Pricing", "Marketing Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6">
            About <span className="text-yellow-300">EduTech</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation of learners through innovative, accessible, 
            and high-quality online education
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                EduTech Platform is dedicated to democratizing education and making quality learning 
                accessible to everyone, everywhere. We believe that education is the key to unlocking 
                human potential and creating a better future.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through cutting-edge technology and a passionate community of educators, we're breaking 
                down barriers to education and creating opportunities for millions of learners worldwide 
                to achieve their goals and transform their lives.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">10M+</div>
                  <div className="text-sm text-gray-600">Students Worldwide</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-1">50K+</div>
                  <div className="text-sm text-gray-600">Courses Available</div>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600 mb-1">100K+</div>
                  <div className="text-sm text-gray-600">Expert Instructors</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">195</div>
                  <div className="text-sm text-gray-600">Countries Reached</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <svg className="w-full h-auto" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="250" cy="250" r="200" fill="url(#grad2)" opacity="0.2"/>
                <circle cx="250" cy="250" r="150" fill="url(#grad3)" opacity="0.3"/>
                <circle cx="250" cy="250" r="100" fill="url(#grad4)" opacity="0.4"/>
                <path d="M250 150 L350 250 L250 350 L150 250 Z" fill="#3B82F6" opacity="0.6"/>
                <circle cx="250" cy="250" r="40" fill="#8B5CF6"/>
                <defs>
                  <linearGradient id="grad2" x1="0" y1="0" x2="500" y2="500">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#8B5CF6"/>
                  </linearGradient>
                  <linearGradient id="grad3" x1="0" y1="0" x2="500" y2="500">
                    <stop offset="0%" stopColor="#8B5CF6"/>
                    <stop offset="100%" stopColor="#EC4899"/>
                  </linearGradient>
                  <linearGradient id="grad4" x1="0" y1="0" x2="500" y2="500">
                    <stop offset="0%" stopColor="#EC4899"/>
                    <stop offset="100%" stopColor="#F59E0B"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group hover:-translate-y-2 duration-300 text-center">
                <div className="text-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Everyone</h2>
            <p className="text-xl text-gray-600">Whether you're learning or teaching, we've got you covered</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-10 rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-700 mb-6 text-lg">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-3 gap-4">
                  {['React', 'Node.js', 'Firebase', 'Tailwind', 'AWS', 'Docker'].map((tech, i) => (
                    <div key={i} className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-lg text-center font-bold shadow-lg transform hover:scale-105 transition">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6">Built with Modern Technology</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Our platform leverages the latest technologies to provide a seamless, 
                fast, and secure learning experience. From responsive design to real-time 
                updates, we use cutting-edge tools to ensure the best possible experience.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Built on React, powered by Firebase, and styled with Tailwind CSS, 
                EduTech represents the future of online education platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl mb-8 text-blue-100">
              Have questions or want to learn more? We'd love to hear from you!
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center mb-2">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">Email</span>
                </div>
                <p className="text-blue-100">support@edutech-platform.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center mb-2">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold">Phone</span>
                </div>
                <p className="text-blue-100">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
