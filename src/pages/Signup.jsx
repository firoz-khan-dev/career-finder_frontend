import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    setErrorMsg('');

    // 🔥 Basic validation
    if (!form.name || !form.email || !form.password) {
      setErrorMsg('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // 🔥 Optional: auto login (better UX)
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('role', data.user.role);

        // 🔥 Role-based redirect
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else if (data.user.role === 'employer') {
          navigate('/employer');
        } else {
          navigate('/dashboard');
        }

      } else {
        setErrorMsg(data.message || 'Signup failed');
      }

    } catch (err) {
      setErrorMsg('Server error. Please try again later.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-green-700 text-center mb-4">
          Create an Account
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Start your journey with Career Compass 🚀
        </p>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
        </div>

        {/* 🔥 Role Selection */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Select Role</label>
          <select
            name="role"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          >
            <option value="user">User (Job Seeker)</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}