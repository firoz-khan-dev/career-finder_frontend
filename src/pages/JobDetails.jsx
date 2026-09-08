import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  BuildingIcon, 
  ClockIcon,
  DollarSignIcon,
  UsersIcon,
  FileTextIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ArrowLeftIcon,
  ExternalLinkIcon
} from 'lucide-react';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await fetchJob();
      await fetchApplications();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchJob = async () => {
    try {
      const res = await API.get('/job/all-jobs');
      const found = res.data.find(j => j._id === id);
      setJob(found);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await API.get(`/application/job/${id}`);
      setApplications(res.data);
      const applied = res.data.some(app => app.userId?._id === userId);
      setAlreadyApplied(applied);
    } catch (err) {
      console.error(err);
    }
  };

  const apply = async () => {
    if (alreadyApplied) return;
    setApplying(true);
    try {
      await API.post('/application/apply', { userId, jobId: id });
      showNotification('Applied Successfully! 🚀', 'success');
      setAlreadyApplied(true);
      await fetchApplications();
    } catch (err) {
      console.error(err);
      showNotification('Error applying for job', 'error');
    } finally {
      setApplying(false);
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-5 py-3 rounded-lg shadow-lg animate-slide-in ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white text-sm font-medium`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-500">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">Job not found</h3>
          <Link to="/jobs" className="text-blue-600 mt-2 inline-block">← Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Job Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex flex-wrap gap-4 text-blue-100 text-sm">
                  {job.company && (
                    <span className="flex items-center gap-1">
                      <BuildingIcon className="w-4 h-4" />
                      {job.company}
                    </span>
                  )}
                  {job.location && (
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {job.location}
                    </span>
                  )}
                  {job.type && (
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {job.type}
                    </span>
                  )}
                </div>
              </div>
              {role === 'user' && (
                <button
                  onClick={apply}
                  disabled={alreadyApplied || applying}
                  className={`px-5 py-2 rounded-lg font-medium transition-all ${
                    alreadyApplied
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-white text-blue-600 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {applying ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      Applying...
                    </span>
                  ) : alreadyApplied ? (
                    <span className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      Applied
                    </span>
                  ) : (
                    'Apply Now'
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Skills */}
            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              {job.salary && (
                <div className="flex items-center gap-3 text-gray-600">
                  <DollarSignIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-400">Salary Range</p>
                    <p className="font-medium">{job.salary}</p>
                  </div>
                </div>
              )}
              {job.experience && (
                <div className="flex items-center gap-3 text-gray-600">
                  <BriefcaseIcon className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-400">Experience</p>
                    <p className="font-medium">{job.experience}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Applicants Section (Employer/Admin only) */}
        {(role === 'employer' || role === 'admin') && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Applicants ({applications.length})
                </h2>
              </div>
            </div>

            <div className="p-6">
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No applications yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app, idx) => (
                    <div
                      key={app._id}
                      className="flex flex-wrap items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                          {app.userId?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{app.userId?.name}</p>
                          <p className="text-sm text-gray-500">{app.userId?.email}</p>
                        </div>
                      </div>

                      {app.userId?.resume?.url ? (
                        <a
                          href={`${import.meta.env.VITE_API_BASE_URL}${app.userId.resume.url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <FileTextIcon className="w-4 h-4" />
                          Resume
                          <ExternalLinkIcon className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <FileTextIcon className="w-4 h-4" />
                          No Resume
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(20px);
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-slide-out {
          animation: slideOut 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}