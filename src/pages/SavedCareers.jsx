import React, { useEffect, useState } from 'react';
import {
  BookmarkIcon,
  Trash2Icon,
  BriefcaseIcon,
  TrendingUpIcon,
  ClockIcon,
  MapPinIcon,
  DollarSignIcon,
  AlertTriangleIcon,
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  XIcon,
  EyeIcon,
  Share2Icon,
  HeartIcon,
  SparklesIcon,
  ArchiveIcon,
  RefreshCwIcon,
  CheckCircleIcon
} from 'lucide-react';

export default function SavedCareers() {
  const [savedCareers, setSavedCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    fields: {},
    topSkills: []
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('loggedInUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    fetchSavedCareers();
  }, [user?._id]);

  const fetchSavedCareers = async () => {
    if (!user) {
      // setLoading(false);
      return;
    }

    // setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/saved-careers/${user._id}`);
      const data = await res.json();
      if (res.ok) {
        const careers = data.savedCareers || [];
        setSavedCareers(careers);
        setFilteredCareers(careers);

        // Calculate statistics
        const fields = {};
        const allSkills = [];
        careers.forEach(career => {
          if (career.field) {
            fields[career.field] = (fields[career.field] || 0) + 1;
          }
          if (career.skills) {
            allSkills.push(...career.skills);
          }
        });

        const skillCount = {};
        allSkills.forEach(skill => {
          skillCount[skill] = (skillCount[skill] || 0) + 1;
        });

        const topSkills = Object.entries(skillCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([skill]) => skill);

        setStats({
          total: careers.length,
          fields,
          topSkills
        });
      } else {
        showNotification(data.message || 'Failed to load saved careers', 'error');
      }
    } catch (err) {
      showNotification('Server error while fetching careers', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (title) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/delete-career/${user._id}/${encodeURIComponent(title)}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        showNotification('Career removed successfully!', 'success');
        setSavedCareers(prev => prev.filter(c => c.title !== title));
        setFilteredCareers(prev => prev.filter(c => c.title !== title));
        setShowDeleteConfirm(null);
      } else {
        showNotification(data.message || 'Failed to remove career', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Server error while removing career', 'error');
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg animate-slide-in ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const handleFilter = () => {
    let filtered = [...savedCareers];

    if (searchTerm) {
      filtered = filtered.filter(career =>
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.field?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(career => career.field === selectedFilter);
    }

    setFilteredCareers(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedFilter, savedCareers]);

  const openModal = (career) => {
    setSelectedCareer(career);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const uniqueFields = [...new Set(savedCareers.map(c => c.field).filter(Boolean))];

  const getFieldColor = (field) => {
    const colors = {
      'Technology': 'from-blue-500 to-cyan-500',
      'Business': 'from-green-500 to-emerald-500',
      'Design': 'from-purple-500 to-pink-500',
      'Marketing': 'from-orange-500 to-red-500',
      'Finance': 'from-yellow-500 to-amber-500'
    };
    return colors[field] || 'from-gray-500 to-slate-500';
  };

  const getFieldIcon = (field) => {
    const icons = {
      'Technology': '💻',
      'Business': '📊',
      'Design': '🎨',
      'Marketing': '📢',
      'Finance': '💰'
    };
    return icons[field] || '📁';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <HeartIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Saved Careers</h2>
          <p className="text-gray-600 mb-6">Please login to view your saved careers</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=1600&h=400&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookmarkIcon className="w-8 h-8 text-yellow-400" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Saved Careers
                </h1>
              </div>
              <p className="text-gray-200 text-lg">
                Your curated list of promising career opportunities
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">{savedCareers.length} Careers Saved</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Statistics Cards */}
      {savedCareers.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 -mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <BriefcaseIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                  <p className="text-sm text-gray-500">Total Careers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-lg p-2">
                  <TrendingUpIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{Object.keys(stats.fields).length}</p>
                  <p className="text-sm text-gray-500">Career Fields</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-lg p-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stats.topSkills.length}</p>
                  <p className="text-sm text-gray-500">Top Skills Identified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search saved careers by title, field, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FilterIcon className="w-4 h-4" />
                Filters
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={fetchSavedCareers}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RefreshCwIcon className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          {showFilters && uniqueFields.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 animate-slide-down">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${selectedFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All Fields
              </button>
              {uniqueFields.map(field => (
                <button
                  key={field}
                  onClick={() => setSelectedFilter(field)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${selectedFilter === field ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {getFieldIcon(field)} {field}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-500">Loading your saved careers...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCareers.length === 0 && savedCareers.length > 0 && (
          <div className="text-center py-20">
            <SearchIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No matching careers found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && savedCareers.length === 0 && (
          <div className="text-center py-20">
            <ArchiveIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No saved careers yet</h3>
            <p className="text-gray-500 mb-6">Start exploring and save careers that interest you!</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300">
              Explore Recommendations
            </button>
          </div>
        )}

        {/* Career Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCareers.map((career, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Header with Gradient */}
              <div className={`bg-gradient-to-r ${getFieldColor(career.field)} p-4 relative`}>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-xl p-2">
                    <span className="text-2xl">{getFieldIcon(career.field)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{career.title}</h3>
                    <p className="text-white/80 text-sm">{career.field || 'General'}</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(career.title)}
                    className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Trash2Icon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {career.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {career.description}
                  </p>
                )}

                {/* Skills Section */}
                {career.skills && career.skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs">
                          {skill}
                        </span>
                      ))}
                      {career.skills.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                          +{career.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Match Score if available */}
                {career.matchPercentage && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Match Score</span>
                      <span className="font-semibold text-green-600">{career.matchPercentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${career.matchPercentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Salary Info */}
                {career.salary && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <DollarSignIcon className="w-4 h-4 text-green-600" />
                    <span>{career.salary}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => openModal(career)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(career.title)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Trash2Icon className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Details Modal */}
      {showModal && selectedCareer && (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>

            <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
              <div className={`bg-gradient-to-r ${getFieldColor(selectedCareer.field)} p-6 text-white`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{getFieldIcon(selectedCareer.field)}</span>
                      <h2 className="text-2xl font-bold">{selectedCareer.title}</h2>
                    </div>
                    <p className="text-white/80">{selectedCareer.field || 'General'}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {selectedCareer.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedCareer.description}</p>
                  </div>
                )}

                {selectedCareer.skills && selectedCareer.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedCareer.salary && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Salary Range</h3>
                    <p className="text-green-600 font-semibold">{selectedCareer.salary}</p>
                  </div>
                )}

                {selectedCareer.matchPercentage && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Match Score</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          style={{ width: `${selectedCareer.matchPercentage}%` }}
                        />
                      </div>
                      <span className="font-semibold text-green-600">{selectedCareer.matchPercentage}%</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-gray-50 p-4 border-t border-gray-100 flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(selectedCareer.title);
                    closeModal();
                  }}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2Icon className="w-4 h-4" />
                  Remove from Saved
                </button>
                <button className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                  <Share2Icon className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)}></div>

          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 animate-slide-up">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangleIcon className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Remove Saved Career</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to remove "{showDeleteConfirm}" from your saved careers? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2Icon className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-slide-down {
          animation: slideDown 0.2s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-slide-out {
          animation: slideOut 0.3s ease-out;
        }
        
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