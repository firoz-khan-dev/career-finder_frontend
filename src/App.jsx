// File: App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

// User
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Recommendations from './pages/Recommendations';
import SavedCareers from './pages/SavedCareers';
import Profile from './pages/Profile';
import UploadResume from './pages/UploadResume';

// Jobs
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';

// Employer
import EmployerDashboard from './pages/EmployerDashboard';
import PostJob from './pages/PostJob';
import Applications from './pages/Applications';

// Admin
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* User */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/assessment' element={<Assessment />} />
        <Route path='/recommendations' element={<Recommendations />} />
        <Route path='/saved-careers' element={<SavedCareers />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/upload-resume' element={<UploadResume />} />

        {/* Jobs */}
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/job/:id' element={<JobDetails />} />

        {/* Employer */}
        <Route path='/employer' element={<EmployerDashboard />} />
        <Route path='/post-job' element={<PostJob />} />
        <Route path='/applications/:jobId' element={<Applications />} />

        {/* Admin */}
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}