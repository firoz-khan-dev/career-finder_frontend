import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { 
  BriefcaseIcon, 
  PlusIcon, 
  XIcon, 
  AlertCircleIcon,
  CheckCircleIcon,
  Loader2Icon,
  FileTextIcon,
  TagIcon
} from 'lucide-react';

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    type: 'full-time',
    skillInput: '',
    requiredSkills: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addSkill = () => {
    if (!form.skillInput.trim()) return;
    if (!form.requiredSkills.includes(form.skillInput.trim())) {
      setForm({
        ...form,
        requiredSkills: [...form.requiredSkills, form.skillInput.trim()],
        skillInput: ''
      });
    }
  };

  const removeSkill = (skill) => {
    setForm({
      ...form,
      requiredSkills: form.requiredSkills.filter(s => s !== skill)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const submit = async () => {
    setError('');
    
    if (!form.title.trim()) {
      setError('Please enter a job title');
      return;
    }
    if (!form.description.trim()) {
      setError('Please enter a job description');
      return;
    }
    if (form.requiredSkills.length === 0) {
      setError('Please add at least one required skill');
      return;
    }

    setLoading(true);

    try {
      const employerId = localStorage.getItem('userId');
      if (!employerId) {
        setError('User not found. Please login again.');
        return;
      }

      await API.post(`/job/post-job/${employerId}`, {
        title: form.title.trim(),
        description: form.description.trim(),
        requiredSkills: form.requiredSkills,
        location: form.location || undefined,
        type: form.type
      });

      setSuccess('Job posted successfully! 🎉');
      
      setTimeout(() => {
        setForm({
          title: '',
          description: '',
          location: '',
          type: 'full-time',
          skillInput: '',
          requiredSkills: []
        });
        setSuccess('');
        navigate('/employer');
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error posting job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <BriefcaseIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Post a Job</h1>
          <p className="text-gray-500 text-sm mt-1">Create a new job listing to find the right candidate</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-6">
            
            {/* Job Title */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            {/* Job Type & Location Row */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {jobTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (Optional)
                </label>
                <input
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., New York or Remote"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                rows="5"
                placeholder="Describe the role, responsibilities, requirements, and benefits..."
              />
            </div>

            {/* Skills Input */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills *
              </label>
              
              <div className="flex gap-2">
                <input
                  value={form.skillInput}
                  onChange={e => setForm({ ...form, skillInput: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React, Node.js, Python..."
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add
                </button>
              </div>

              {/* Skills Chips */}
              {form.requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.requiredSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm"
                    >
                      <TagIcon className="w-3 h-3" />
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
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

            {/* Submit Button */}
            <button
              onClick={submit}
              disabled={loading}
              className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-md'
              }`}
            >
              {loading ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                  Posting Job...
                </>
              ) : (
                <>
                  <BriefcaseIcon className="w-4 h-4" />
                  Post Job
                </>
              )}
            </button>

            {/* Cancel Link */}
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/employer')}
                className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
              >
                Cancel and go back
              </button>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Tips for posting a great job</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Use a clear, specific job title</li>
            <li>• List key responsibilities and requirements</li>
            <li>• Add 3-7 relevant required skills</li>
            <li>• Mention benefits and growth opportunities</li>
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