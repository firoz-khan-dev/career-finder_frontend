import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  BuildingIcon, 
  ClockIcon,
  SparklesIcon,
  ChevronRightIcon,
  SearchIcon,
  FilterIcon
} from 'lucide-react';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, selectedFilter, jobs]);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('userId');

      const jobsRes = await API.get('/job/all-jobs');
      const savedRes = await API.get(`/auth/saved-careers/${userId}`);

      const savedCareers = savedRes.data.savedCareers || [];
      const userSkills = savedCareers.flatMap(c => c.skills || []);

      const scoredJobs = jobsRes.data.map(job => {
        let score = 0;
        job.requiredSkills?.forEach(skill => {
          userSkills.forEach(us => {
            if (
              us.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(us.toLowerCase())
            ) {
              score++;
            }
          });
        });

        const matchPercentage = job.requiredSkills?.length > 0
          ? Math.min(Math.round((score / job.requiredSkills.length) * 100), 100)
          : 0;

        return { ...job, score, matchPercentage };
      });

      const sortedJobs = scoredJobs.sort((a, b) => b.score - a.score);
      const finalJobs = sortedJobs.some(j => j.score > 0) ? sortedJobs : jobsRes.data;

      setJobs(finalJobs);
      setFilteredJobs(finalJobs);

    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filterJobs = () => {
    let filtered = [...jobs];
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requiredSkills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedFilter === 'highMatch') {
      filtered = filtered.filter(job => job.matchPercentage >= 70);
    } else if (selectedFilter === 'mediumMatch') {
      filtered = filtered.filter(job => job.matchPercentage >= 40 && job.matchPercentage < 70);
    }
    
    setFilteredJobs(filtered);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 70) return 'bg-green-100 text-green-700';
    if (percentage >= 40) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-3">
            <BriefcaseIcon className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Recommended Jobs</h1>
          </div>
          <p className="text-blue-100">
            Personalized job matches based on your skills and saved careers
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, skills, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Jobs</option>
              <option value="highMatch">High Match (70%+)</option>
              <option value="mediumMatch">Medium Match (40-69%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Stats */}
        {!loading && filteredJobs.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Found <span className="font-semibold text-blue-600">{filteredJobs.length}</span> jobs
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <SparklesIcon className="w-4 h-4 text-yellow-500" />
              <span>Sorted by best match</span>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <BriefcaseIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700">No jobs found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  {job.matchPercentage !== undefined && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getMatchColor(job.matchPercentage)}`}>
                      {job.matchPercentage}% Match
                    </span>
                  )}
                </div>

                {/* Company & Location */}
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                  {job.company && (
                    <span className="flex items-center gap-1">
                      <BuildingIcon className="w-3 h-3" />
                      {job.company}
                    </span>
                  )}
                  {job.location && (
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      {job.location}
                    </span>
                  )}
                  {job.type && (
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      {job.type}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {job.description?.slice(0, 120)}...
                </p>

                {/* Skills */}
                {job.requiredSkills && job.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.requiredSkills.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-600 px-2 py-0.5 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.requiredSkills.length > 4 && (
                      <span className="text-xs text-gray-400">+{job.requiredSkills.length - 4}</span>
                    )}
                  </div>
                )}

                {/* Link */}
                <Link
                  to={`/job/${job._id}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium group"
                >
                  View Details
                  <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}