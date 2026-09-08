import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { 
  FileTextIcon, 
  UploadIcon, 
  Trash2Icon, 
  RefreshCwIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ExternalLinkIcon,
  Loader2Icon,
  FileIcon
} from 'lucide-react';

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/auth/profile/${userId}`);
      setResume(res.data.resume);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const upload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      await API.post(`/job/upload-resume/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('Resume uploaded successfully!');
      setFile(null);
      fetchProfile();
      
      // Clear file input
      const fileInput = document.getElementById('resume-input');
      if (fileInput) fileInput.value = '';

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeResume = async () => {
    if (!window.confirm('Are you sure you want to remove your resume?')) return;
    
    try {
      await API.delete(`/job/delete-resume/${userId}`);
      setResume(null);
      setSuccess('Resume removed successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Error removing resume');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-6">
      <div className="max-w-lg mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <FileTextIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Resume Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Upload and manage your resume</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Current Resume Section */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FileIcon className="w-4 h-4 text-gray-500" />
              Current Resume
            </h2>
            
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : resume ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-lg p-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-700 font-medium text-sm">Resume Uploaded</p>
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}${resume.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 text-sm hover:underline flex items-center gap-1 mt-1"
                      >
                        View Resume
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  
                  <button
                    onClick={removeResume}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <Trash2Icon className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <AlertCircleIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No resume uploaded</p>
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <UploadIcon className="w-4 h-4 text-gray-500" />
              Upload New Resume
            </h2>

            {/* File Input */}
            <div className="mb-4">
              <label className="block w-full">
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <input
                    id="resume-input"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setError('');
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    {file ? file.name : 'Click or drag to upload PDF'}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Max 5MB, PDF only</p>
                </div>
              </label>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                <AlertCircleIcon className="w-4 h-4" />
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
                <CheckCircleIcon className="w-4 h-4" />
                {success}
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={upload}
              disabled={!file || uploading}
              className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                !file || uploading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md'
              }`}
            >
              {uploading ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="w-4 h-4" />
                  Upload Resume
                </>
              )}
            </button>

            {/* Info Note */}
            <p className="text-xs text-gray-400 text-center mt-4">
              Uploading a new resume will replace your existing one
            </p>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Resume Tips</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Keep your resume to 1-2 pages</li>
            <li>• Highlight relevant skills and experience</li>
            <li>• Use a clean, professional format</li>
            <li>• Save as PDF before uploading</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}