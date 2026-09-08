import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import {
  BriefcaseIcon,
  PlusCircleIcon,
  UsersIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrendingUpIcon,
  FileTextIcon,
  ChevronRightIcon,
  BuildingIcon
} from 'lucide-react';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingReviews: 0
  });

  const employerId = localStorage.getItem('userId');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);

    try {
      // ✅ get all jobs
      const jobsRes = await API.get('/job/all-jobs');

      // ✅ filter only employer jobs
      const myJobs = jobsRes.data.filter(
        job => job.postedBy?._id === employerId
      );

      // ✅ get applications
      const appRes = await API.get('/application/all');

      const applications = appRes.data || [];

      // ✅ attach applications to jobs
      const jobsWithApps = myJobs.map(job => {
        const jobApps = applications.filter(
          app => app.jobId === job._id || app.jobId?._id === job._id
        );

        return {
          ...job,
          applications: jobApps
        };
      });

      setJobs(jobsWithApps);

      // ✅ stats
      const active = jobsWithApps.length;

      const totalApps = jobsWithApps.reduce(
        (sum, j) => sum + j.applications.length,
        0
      );

      const pending = jobsWithApps.reduce(
        (sum, j) =>
          sum +
          j.applications.filter(a => a.status === 'pending').length,
        0
      );

      setStats({
        totalJobs: jobsWithApps.length,
        activeJobs: active,
        totalApplications: totalApps,
        pendingReviews: pending
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'active') return 'bg-green-100 text-green-700';
    if (status === 'closed') return 'bg-gray-100 text-gray-600';
    return 'bg-yellow-100 text-yellow-700';
  };

  const statCards = [
    {
      title: 'Total Jobs',
      value: stats.totalJobs,
      icon: <BriefcaseIcon className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      icon: <CheckCircleIcon className="w-5 h-5" />,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Applications',
      value: stats.totalApplications,
      icon: <UsersIcon className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Pending Review',
      value: stats.pendingReviews,
      icon: <ClockIcon className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Employer Dashboard</h1>
              <p className="text-blue-100">Manage your jobs and track applications</p>
            </div>
            <Link
              to="/post-job"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              <PlusCircleIcon className="w-4 h-4" />
              Post New Job
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`bg-gradient-to-r ${card.color} rounded-lg p-2 text-white`}>
                  {card.icon}
                </div>
                <span className="text-2xl font-bold text-gray-800">{card.value}</span>
              </div>
              <p className="text-gray-500 text-sm">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Jobs Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Your Job Posts</h2>
            </div>
            <span className="text-sm text-gray-500">{jobs.length} total</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <BriefcaseIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-gray-600 font-medium">No jobs posted yet</h3>
              <p className="text-gray-400 text-sm mt-1">Click "Post New Job" to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {jobs.map((job) => (
                <div key={job._id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-gray-800">{job.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(job.status)}`}>
                          {job.status || 'active'}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <BuildingIcon className="w-3 h-3" />
                            {job.location}
                          </span>
                        )}
                        {job.type && (
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {job.type}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <UsersIcon className="w-3 h-3" />
                          {job.applications?.length || 0} applicants
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-1">{job.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/job/${job._id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <EyeIcon className="w-4 h-4" />
                        View
                      </Link>
                      <Link
                        to={`/edit-job/${job._id}`}
                        className="text-gray-600 hover:text-gray-700 text-sm flex items-center gap-1"
                      >
                        <FileTextIcon className="w-4 h-4" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <Link
            to="/post-job"
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-lg p-2">
                <PlusCircleIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Post New Job</p>
                <p className="text-xs text-gray-500">Create a new job listing</p>
              </div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/jobs"
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-lg p-2">
                <TrendingUpIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Browse All Jobs</p>
                <p className="text-xs text-gray-500">View all available positions</p>
              </div>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}