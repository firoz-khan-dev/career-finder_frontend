import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, 
  BookmarkIcon, 
  TrendingUpIcon,
  ClockIcon,
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  XIcon,
  SparklesIcon,
  AlertCircleIcon,
  DollarSignIcon,
  UsersIcon,
  GraduationCapIcon
} from 'lucide-react';

export default function Recommendations() {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [showFilters, setShowFilters] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('loggedInUser');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    loadRecommendations();
    if (user?._id) fetchSavedCareers();
  }, [user]);

  const loadRecommendations = async () => {
    setLoading(true);
    const storedData = localStorage.getItem('careerRecommendations');
    
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        const recommendations = Array.isArray(parsed) ? parsed : parsed.recommendations || [];
        
        const enriched = recommendations.map((career, idx) => ({
          ...career,
          id: idx,
          matchPercentage: career.matchPercentage || Math.floor(Math.random() * 30) + 65,
          salary: getSalaryForCareer(career.career),
          growthRate: getGrowthRateForCareer(career.career),
          jobCount: Math.floor(Math.random() * 3000) + 1000
        }));
        
        setCareers(enriched);
        setFilteredCareers(enriched);
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
  };

  const fetchSavedCareers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/saved-careers/${user._id}`);
      const data = await res.json();
      if (res.ok && data.savedCareers) {
        setSaved(data.savedCareers.map(c => c.title));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getSalaryForCareer = (career) => {
    const salaries = {
      'Software Engineer': '₹80k - ₹120k',
      'Data Scientist': '₹90k - ₹140k',
      'Product Manager': '₹100k - ₹150k',
      'UX Designer': '₹70k - ₹110k',
      'Marketing Manager': '₹60k - ₹100k'
    };
    return salaries[career] || '50k - ₹80k';
  };

  const getGrowthRateForCareer = (career) => {
    const growth = {
      'Software Engineer': '+22%',
      'Data Scientist': '+35%',
      'Product Manager': '+18%',
      'UX Designer': '+20%'
    };
    return growth[career] || '+15%';
  };

  const handleSave = async (career) => {
    if (!user) {
      showNotification('Please login to save careers', 'error');
      return;
    }
    if (saved.includes(career.career)) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/save-career/${user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: career.career,
          description: career.description,
          skills: career.requiredSkills,
          field: career.relatedFields?.[0] || "",
          salary: career.salary,
          matchPercentage: career.matchPercentage
        }),
      });

      if (res.ok) {
        setSaved(prev => [...prev, career.career]);
        showNotification('Career saved!', 'success');
      } else {
        showNotification('Error saving career', 'error');
      }
    } catch (err) {
      showNotification('Server error', 'error');
    }
  };

  const showNotification = (message, type) => {
    const el = document.createElement('div');
    el.className = `fixed top-20 right-4 z-50 px-5 py-3 rounded-lg shadow-lg animate-slide-in text-sm font-medium ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => {
      el.classList.add('animate-slide-out');
      setTimeout(() => el.remove(), 300);
    }, 2500);
  };

  const applyFilters = () => {
    let filtered = [...careers];
    
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.career?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedFilter === 'highMatch') {
      filtered = filtered.filter(c => c.matchPercentage >= 80);
    } else if (selectedFilter === 'saved') {
      filtered = filtered.filter(c => saved.includes(c.career));
    }
    
    if (sortBy === 'match') {
      filtered.sort((a, b) => b.matchPercentage - a.matchPercentage);
    } else if (sortBy === 'salary') {
      filtered.sort((a, b) => {
        const aVal = parseInt(a.salary?.split(' - ')[0]?.replace('$', '') || 0);
        const bVal = parseInt(b.salary?.split(' - ')[0]?.replace('$', '') || 0);
        return bVal - aVal;
      });
    }
    
    setFilteredCareers(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, sortBy, selectedFilter, careers, saved]);

  const getMatchColor = (p) => {
    if (p >= 80) return 'bg-green-100 text-green-700';
    if (p >= 60) return 'bg-blue-100 text-blue-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Career Recommendations</h1>
              <p className="text-blue-100">Personalized matches based on your assessment</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-full px-5 py-2">
              <span className="font-semibold">{careers.length} Matches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="sticky top-16 z-20 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search careers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FilterIcon className="w-4 h-4" />
                Filter
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="match">Sort by Match</option>
                <option value="salary">Sort by Salary</option>
              </select>
            </div>
          </div>
          
          {showFilters && (
            <div className="flex flex-wrap gap-2 mt-3 pt-2 animate-fade-in">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('highMatch')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedFilter === 'highMatch' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔥 High Match (80%+)
              </button>
              <button
                onClick={() => setSelectedFilter('saved')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedFilter === 'saved' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⭐ Saved
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCareers.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700">No careers found</h3>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            {/* Result count */}
            <div className="mb-5 text-sm text-gray-500">
              Showing {filteredCareers.length} of {careers.length} careers
            </div>
            
            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 gap-5">
              {filteredCareers.map((career) => (
                <div
                  key={career.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-5 pb-3 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {career.career}
                        </h3>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getMatchColor(career.matchPercentage)}`}>
                        {career.matchPercentage}% Match
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-5 pt-3">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {career.description}
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        {career.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUpIcon className="w-3 h-3 text-blue-600" />
                        {career.growthRate}
                      </span>
                    </div>
                    
                    {/* Skills Preview */}
                    {career.requiredSkills && career.requiredSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {career.requiredSkills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                        {career.requiredSkills.length > 3 && (
                          <span className="text-xs text-gray-400">+{career.requiredSkills.length - 3}</span>
                        )}
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <button
                        onClick={() => {
                          setSelectedCareer(career);
                          setShowModal(true);
                          document.body.style.overflow = 'hidden';
                        }}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        View Details →
                      </button>
                      
                      <button
                        onClick={() => handleSave(career)}
                        disabled={saved.includes(career.career)}
                        className={`text-sm flex items-center gap-1 ${
                          saved.includes(career.career) 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-500 hover:text-green-600'
                        }`}
                      >
                        <BookmarkIcon className={`w-4 h-4 ${saved.includes(career.career) ? 'fill-green-500 text-green-500' : ''}`} />
                        {saved.includes(career.career) ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedCareer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => {
              setShowModal(false);
              document.body.style.overflow = 'auto';
            }}></div>
            
            <div className="relative bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl animate-fade-in">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">{selectedCareer.career}</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    document.body.style.overflow = 'auto';
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5 space-y-4">
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(selectedCareer.matchPercentage)}`}>
                  {selectedCareer.matchPercentage}% Match Score
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Description</h3>
                  <p className="text-gray-600 text-sm">{selectedCareer.description}</p>
                </div>
                
                {selectedCareer.requiredSkills && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCareer.requiredSkills.map((skill, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <div>
                    <p className="text-xs text-gray-500">Salary Range</p>
                    <p className="font-semibold text-green-600 text-sm">{selectedCareer.salary}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Growth Rate</p>
                    <p className="font-semibold text-blue-600 text-sm">{selectedCareer.growthRate}</p>
                  </div>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-gray-50 p-4 border-t flex gap-3">
                <button
                  onClick={() => {
                    handleSave(selectedCareer);
                    setShowModal(false);
                    document.body.style.overflow = 'auto';
                  }}
                  disabled={saved.includes(selectedCareer.career)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    saved.includes(selectedCareer.career)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {saved.includes(selectedCareer.career) ? 'Saved' : 'Save Career'}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    document.body.style.overflow = 'auto';
                  }}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(20px); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.15s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.25s ease-out;
        }
        
        .animate-slide-out {
          animation: slideOut 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}