import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Filter for PDF and PPT files
    const validFiles = selectedFiles.filter(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      return ['pdf', 'ppt', 'pptx'].includes(ext);
    });
    
    if (validFiles.length !== selectedFiles.length) {
      setError('Only PDF and PPT files are allowed');
    } else {
      setError('');
    }
    
    setFiles(validFiles);
  };

  const uploadFiles = async () => {
    const fileUrls = [];
    
    for (const file of files) {
      try {
        // Create a reference to the file in Firebase Storage
        const fileRef = ref(storage, `courses/${currentUser.uid}/${Date.now()}_${file.name}`);
        
        // Upload the file
        await uploadBytes(fileRef, file);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(fileRef);
        fileUrls.push(downloadURL);
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }
    
    return fileUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      setError('');
      setUploading(true);

      // Upload files to Firebase Storage
      let fileUrls = [];
      if (files.length > 0) {
        fileUrls = await uploadFiles();
      }

      // Create course document in Firestore
      const courseData = {
        title: title.trim(),
        description: description.trim(),
        teacherId: currentUser.uid,
        fileUrls: fileUrls,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'courses'), courseData);

      // Redirect to teacher dashboard
      navigate('/teacher/dashboard');
    } catch (error) {
      setError('Failed to create course: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Introduction to Web Development"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe what students will learn in this course..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Course Materials (PDF, PPT)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                accept=".pdf,.ppt,.pptx"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {files.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Selected files:</p>
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                        <span>📄</span>
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 bg-secondary hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-50"
              >
                {uploading ? 'Creating Course...' : 'Create Course'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/teacher/dashboard')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
