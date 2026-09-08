import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-2xl font-bold text-blue-700">
          Welcome, {user.name} 👋
        </h2>
        <p className="text-gray-600 mt-1">
          Your career journey starts here 🚀
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Assessment */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">🧠 Take Assessment</h3>
          <p className="text-gray-600 text-sm mb-4">
            Discover your best career path based on your personality & skills.
          </p>
          <button
            onClick={() => navigate('/assessment')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start
          </button>
        </div>

        {/* Recommendations */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">🎯 Recommendations</h3>
          <p className="text-gray-600 text-sm mb-4">
            View AI-based career suggestions tailored for you.
          </p>
          <button
            onClick={() => navigate('/recommendations')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            View
          </button>
        </div>

        {/* Saved Careers */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">❤️ Saved Careers</h3>
          <p className="text-gray-600 text-sm mb-4">
            Manage careers you saved earlier.
          </p>
          <button
            onClick={() => navigate('/saved-careers')}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Open
          </button>
        </div>

        {/* Resume */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">📄 Resume</h3>
          <p className="text-gray-600 text-sm mb-4">
            Upload or update your resume.
          </p>
          <button
            onClick={() => navigate('/upload-resume')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Upload
          </button>
        </div>

        {/* Jobs */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">💼 Jobs</h3>
          <p className="text-gray-600 text-sm mb-4">
            Explore jobs matching your skills.
          </p>
          <button
            onClick={() => navigate('/jobs')}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Explore
          </button>
        </div>

        {/* Profile */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-2">👤 Profile</h3>
          <p className="text-gray-600 text-sm mb-4">
            View and update your profile.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Open
          </button>
        </div>

      </div>
    </div>
  );
}