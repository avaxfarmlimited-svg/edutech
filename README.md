# EduTech Platform - Full-Stack Educational Technology Application

A modern, full-stack educational technology platform built with React and Firebase. This platform enables teachers to create courses and upload materials, while students can browse courses, enroll, and access learning materials.

## 🎯 Features

### Three User Roles:
- **Public Visitors**: Browse courses, view home and about pages
- **Students**: Enroll in courses, access and download course materials
- **Teachers**: Create courses, upload files (PDF/PPT), manage their courses

### Key Functionality:
- ✅ User authentication (Email/Password)
- ✅ Role-based access control
- ✅ Course creation and management
- ✅ File upload to Firebase Storage
- ✅ Responsive design with Tailwind CSS
- ✅ Protected routes based on user roles

## 🛠️ Technology Stack

- **Frontend**: React 18+ (Functional Components & Hooks)
- **Styling**: Tailwind CSS
- **Backend**: Firebase v9+
  - Authentication (Email/Password)
  - Firestore Database
  - Cloud Storage
- **Routing**: React Router DOM v6

## 📂 Project Structure

```
edutech-platform/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Navbar.js
│   │   └── ProtectedRoute.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Courses.js
│   │   ├── Auth.js
│   │   ├── StudentDashboard.js
│   │   ├── TeacherDashboard.js
│   │   ├── CourseView.js
│   │   └── CreateCourse.js
│   ├── App.js
│   ├── firebase.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Google Firebase account

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd edutech-platform
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the setup wizard
3. Once created, click on the web icon (</>) to add a web app
4. Register your app with a nickname (e.g., "EduTech Platform")
5. Copy the Firebase configuration object

### Step 4: Configure Firebase in Your App

1. Open `src/firebase.js`
2. Replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 5: Enable Firebase Services

#### Enable Authentication:
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Click **Save**

#### Set Up Firestore Database:
1. Go to **Firestore Database** → **Create database**
2. Choose **Start in test mode** (for development)
3. Select a location and click **Enable**
4. The following collections will be created automatically by the app:
   - `users` - Stores user profiles with roles
   - `courses` - Stores course information

#### Configure Firestore Rules (Important for Production):
Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Courses collection
    match /courses/{courseId} {
      allow read: if true;
      allow create: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
      allow update, delete: if request.auth != null && 
                               resource.data.teacherId == request.auth.uid;
    }
  }
}
```

#### Enable Cloud Storage:
1. Go to **Storage** → **Get started**
2. Choose **Start in test mode** (for development)
3. Click **Done**

#### Configure Storage Rules (Important for Production):
Replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /courses/{teacherId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                     request.auth.uid == teacherId;
    }
  }
}
```

### Step 6: Run the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## 👥 User Guide

### For Students:

1. **Register**: Click "Login / Register" → Register tab
   - Enter email, school name, and password
   - Select "Student" as role
   - Click Register

2. **Browse Courses**: Navigate to the Courses page to see all available courses

3. **View Course Materials**: Click on any course to view details and download materials (PDF/PPT files)

4. **Dashboard**: Access your student dashboard to see enrolled courses

### For Teachers:

1. **Register**: Click "Login / Register" → Register tab
   - Enter email, school name, and password
   - Select "Teacher" as role
   - Click Register

2. **Create Course**:
   - Go to Teacher Dashboard
   - Click "Create New Course"
   - Fill in course title and description
   - Upload course materials (PDF, PPT files)
   - Click "Create Course"

3. **Manage Courses**: View all your created courses from the Teacher Dashboard

## 🗄️ Database Structure

### Users Collection (`users`)
```javascript
{
  uid: string,
  email: string,
  role: 'student' | 'teacher',
  schoolName: string,
  createdAt: string (ISO timestamp)
}
```

### Courses Collection (`courses`)
```javascript
{
  title: string,
  description: string,
  teacherId: string (uid of teacher),
  fileUrls: string[] (array of Firebase Storage URLs),
  createdAt: string (ISO timestamp)
}
```

## 🔒 Security Features

- **Authentication Required**: Users must be logged in to access dashboards and course materials
- **Role-Based Access Control**: 
  - Students can only access student routes
  - Teachers can only access teacher routes
  - Automatic redirection if wrong role attempts to access restricted routes
- **Protected Routes**: All sensitive routes are wrapped with authentication guards

## 🎨 Customization

### Changing Colors:
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',    // Blue
      secondary: '#8b5cf6',  // Purple
    }
  },
}
```

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktops

## 🐛 Troubleshooting

### Issue: "Firebase not configured"
**Solution**: Make sure you've replaced the placeholder values in `src/firebase.js` with your actual Firebase configuration.

### Issue: "Permission denied" errors
**Solution**: Check your Firestore and Storage rules in the Firebase Console. For development, you can use test mode rules.

### Issue: "Failed to upload file"
**Solution**: Ensure Cloud Storage is enabled in your Firebase project and the storage rules allow authenticated users to upload.

### Issue: Dependencies not installing
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again.

## 🚀 Deployment

### Deploy to Firebase Hosting:

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```
- Select "Hosting"
- Choose your Firebase project
- Set build directory to `build`
- Configure as single-page app: Yes
- Don't overwrite index.html

4. Build your app:
```bash
npm run build
```

5. Deploy:
```bash
firebase deploy
```

## 📝 Future Enhancements

- Enrollment system for students
- Course ratings and reviews
- Student progress tracking
- Video content support
- Live chat between teachers and students
- Certificate generation
- Payment integration for paid courses

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Support

For support, email support@edutech-platform.com or open an issue in the repository.

---

**Built with ❤️ using React and Firebase**
