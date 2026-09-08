import React from 'react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-lg text-gray-700 font-medium">Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-14 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-2">Welcome, {user.name} 👋</h2>
          <p className="text-gray-500 text-md">Here’s your personal profile overview</p>
        </div>

        <div className="text-left space-y-4 mt-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold text-gray-800">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400">More profile features coming soon 🚀</p>
        </div>
      </div>
    </div>
  );
}
