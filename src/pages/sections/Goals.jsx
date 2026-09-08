import React from 'react';
import { 
  TargetIcon, 
  RocketIcon, 
  DollarSignIcon, 
  HeartIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  IndianRupee
} from 'lucide-react';

export default function Goals({ formData, setFormData }) {
  const [touched, setTouched] = React.useState({});

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const salaryOptions = [
    { value: "Under ₹50,000", icon: "💰", range: "Entry Level" },
    { value: "₹50,000 - ₹80,000", icon: "💼", range: "Mid Level" },
    { value: "₹80,000 - ₹120,000", icon: "⭐", range: "Senior Level" },
    { value: "₹120,000+", icon: "🏆", range: "Executive Level" }
  ];

  const workLifeOptions = [
    { value: "Balanced", icon: "⚖️", description: "Equal focus on work and personal life" },
    { value: "Flexible", icon: "🕒", description: "Flexible hours and remote options" },
    { value: "Work-Focused", icon: "🚀", description: "Career growth prioritized" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
          <TargetIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Career Goals</h2>
        <p className="text-gray-500 mt-2">Define your aspirations and preferences</p>
      </div>

      {/* Short Term Goal */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <span className="flex items-center gap-2">
            <TrendingUpIcon className="w-4 h-4 text-purple-500" />
            Short Term Goal (1-2 years)
          </span>
        </label>
        <textarea
          placeholder="e.g., Get promoted to senior developer, Complete certification, Learn new technology..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 resize-none"
          rows="3"
          value={formData.goals?.shortTerm || ''}
          onChange={e => handleChange('goals', 'shortTerm', e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, shortTerm: true }))}
        />
        {touched.shortTerm && !formData.goals?.shortTerm && (
          <p className="mt-1 text-amber-500 text-sm">This will help us find relevant career paths</p>
        )}
      </div>

      {/* Long Term Goal */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <span className="flex items-center gap-2">
            <RocketIcon className="w-4 h-4 text-purple-500" />
            Long Term Goal (5-10 years)
          </span>
        </label>
        <textarea
          placeholder="e.g., Become CTO, Start own company, Lead major projects..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 resize-none"
          rows="3"
          value={formData.goals?.longTerm || ''}
          onChange={e => handleChange('goals', 'longTerm', e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, longTerm: true }))}
        />
      </div>

      {/* Salary Expectation */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-green-500" />
            Expected Salary Range
          </span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {salaryOptions.map(option => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-300 ${
                formData.goals?.salaryExpectation === option.value
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-300 hover:border-green-300 hover:bg-green-50/50'
              }`}
            >
              <input
                type="radio"
                name="salary"
                value={option.value}
                checked={formData.goals?.salaryExpectation === option.value}
                onChange={e => handleChange('goals', 'salaryExpectation', e.target.value)}
                className="w-4 h-4 text-green-600"
              />
              <div>
                <div className="font-semibold text-gray-800">
                  {option.icon} {option.value}
                </div>
                <div className="text-xs text-gray-500">{option.range}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Work-Life Balance */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="flex items-center gap-2">
            <HeartIcon className="w-4 h-4 text-red-500" />
            Work-Life Balance Preference
          </span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {workLifeOptions.map(option => (
            <label
              key={option.value}
              className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 text-center ${
                formData.goals?.workLifeBalance === option.value
                  ? 'border-red-500 bg-red-50 shadow-md'
                  : 'border-gray-300 hover:border-red-300 hover:bg-red-50/50'
              }`}
            >
              <input
                type="radio"
                name="workLife"
                value={option.value}
                checked={formData.goals?.workLifeBalance === option.value}
                onChange={e => handleChange('goals', 'workLifeBalance', e.target.value)}
                className="hidden"
              />
              <span className="text-2xl mb-2">{option.icon}</span>
              <div className="font-semibold text-gray-800">{option.value}</div>
              <div className="text-xs text-gray-500 mt-1">{option.description}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Years of Experience */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <span className="flex items-center gap-2">
            <BriefcaseIcon className="w-4 h-4 text-blue-500" />
            Years of Experience
          </span>
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={formData.experience?.years || 0}
            onChange={e => handleChange('experience', 'years', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>0 years</span>
            <span className="font-semibold text-blue-600">{formData.experience?.years || 0} years</span>
            <span>30+ years</span>
          </div>
        </div>
      </div>
    </div>
  );
}