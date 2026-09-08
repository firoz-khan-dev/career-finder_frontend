import React from 'react';
import { 
  UserIcon, 
  CalendarIcon, 
  GraduationCapIcon,
  CheckCircleIcon
} from 'lucide-react';

export default function BasicInfo({ formData, setFormData }) {
  const [touched, setTouched] = React.useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field) => {
    if (!touched[field]) return '';
    if (field === 'name' && !formData.basicInfo.name) return 'Name is required';
    if (field === 'age') {
      const age = formData.basicInfo.age;
      if (!age) return 'Age is required';
      if (age < 16) return 'Age must be at least 16';
      if (age > 100) return 'Invalid age';
    }
    if (field === 'education' && !formData.basicInfo.education) return 'Please select education level';
    return '';
  };

  const educationOptions = [
    { value: 'high_school', label: '🎓 High School', description: 'Grades 9-12' },
    { value: 'bachelors', label: '📚 Bachelor\'s Degree', description: 'Undergraduate Program' },
    { value: 'masters', label: '🎯 Master\'s Degree', description: 'Postgraduate Program' },
    { value: 'phd', label: '🔬 PhD / Doctorate', description: 'Research Program' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-4 shadow-lg">
          <UserIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
        <p className="text-gray-500 mt-2">Tell us about yourself to get personalized recommendations</p>
      </div>

      {/* Name Input */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name *
        </label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            placeholder="Raj Yadav"
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
              getFieldError('name') 
                ? 'border-red-500 focus:ring-red-300' 
                : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
            }`}
            value={formData.basicInfo.name || ''}
            onChange={e => handleChange('name', e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
          />
        </div>
        {getFieldError('name') && (
          <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
            <span className="text-xs">⚠️</span> {getFieldError('name')}
          </p>
        )}
      </div>

      {/* Age Input */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Age *
        </label>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="number"
            placeholder="25"
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
              getFieldError('age') 
                ? 'border-red-500 focus:ring-red-300' 
                : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
            }`}
            value={formData.basicInfo.age || ''}
            onChange={e => handleChange('age', e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, age: true }))}
            min="16"
            max="100"
          />
        </div>
        {getFieldError('age') && (
          <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
            <span className="text-xs">⚠️</span> {getFieldError('age')}
          </p>
        )}
      </div>

      {/* Education Select */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Education Level *
        </label>
        <div className="relative">
          <GraduationCapIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
          <select
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 appearance-none bg-white ${
              getFieldError('education') 
                ? 'border-red-500 focus:ring-red-300' 
                : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
            }`}
            value={formData.basicInfo.education || ''}
            onChange={e => handleChange('education', e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, education: true }))}
          >
            <option value="">Select your education level</option>
            {educationOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {getFieldError('education') && (
          <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
            <span className="text-xs">⚠️</span> {getFieldError('education')}
          </p>
        )}
        
        {/* Education description */}
        {formData.basicInfo.education && (
          <div className="mt-2 p-3 bg-blue-50 rounded-lg animate-fade-in">
            <p className="text-sm text-blue-700">
              {educationOptions.find(opt => opt.value === formData.basicInfo.education)?.description}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}