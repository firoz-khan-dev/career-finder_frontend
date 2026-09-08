import React from 'react';
import { 
  BrainIcon, 
  BuildingIcon, 
  TargetIcon, 
  TrendingUpIcon,
  ShieldIcon,
  HeartIcon,
  ZapIcon,
  HomeIcon,
  BriefcaseIcon,
  SparklesIcon
} from 'lucide-react';

export default function PersonalityValues({ formData, setFormData }) {
  const personalityTraits = [
    { id: "Creative", icon: "🎨", color: "purple", description: "Think outside the box, generate new ideas" },
    { id: "Analytical", icon: "📊", color: "blue", description: "Logical thinking, data-driven decisions" },
    { id: "Introvert", icon: "🌙", color: "indigo", description: "Prefer quiet, independent work" },
    { id: "Extrovert", icon: "☀️", color: "orange", description: "Enjoy social interaction, teamwork" },
    { id: "Organized", icon: "📋", color: "green", description: "Structured, detail-oriented approach" },
    { id: "Flexible", icon: "🌀", color: "cyan", description: "Adaptable, open to change" }
  ];

  const workEnvironmentOptions = [
    { value: "Office", icon: <BuildingIcon className="w-5 h-5" />, description: "Traditional workplace, team collaboration" },
    { value: "Remote", icon: <HomeIcon className="w-5 h-5" />, description: "Work from anywhere, flexible schedule" },
    { value: "Hybrid", icon: <BriefcaseIcon className="w-5 h-5" />, description: "Mix of office and remote work" }
  ];

  const valueOptions = [
    { id: "Growth", icon: <TrendingUpIcon className="w-5 h-5" />, color: "from-green-500 to-emerald-500", description: "Continuous learning and advancement" },
    { id: "Money", icon: "💰", color: "from-yellow-500 to-amber-500", description: "Financial rewards and stability" },
    { id: "Impact", icon: <TargetIcon className="w-5 h-5" />, color: "from-blue-500 to-indigo-500", description: "Making a difference in the world" },
    { id: "Stability", icon: <ShieldIcon className="w-5 h-5" />, color: "from-gray-500 to-slate-500", description: "Job security and work-life balance" },
    { id: "Innovation", icon: <ZapIcon className="w-5 h-5" />, color: "from-purple-500 to-pink-500", description: "Cutting-edge work and creativity" },
    { id: "Collaboration", icon: <HeartIcon className="w-5 h-5" />, color: "from-red-500 to-rose-500", description: "Teamwork and community" }
  ];

  const handleTraitToggle = (traitId) => {
    const current = formData.personality?.traits || [];
    const updated = current.includes(traitId)
      ? current.filter(t => t !== traitId)
      : [...current, traitId];
    setFormData(prev => ({
      ...prev,
      personality: { ...prev.personality, traits: updated }
    }));
  };

  const handleValueToggle = (valueId) => {
    const current = formData.values || [];
    const updated = current.includes(valueId)
      ? current.filter(v => v !== valueId)
      : [...current, valueId];
    setFormData(prev => ({ ...prev, values: updated }));
  };

  const handleWorkEnvironment = (value) => {
    setFormData(prev => ({
      ...prev,
      personality: { ...prev.personality, workEnvironment: value }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg">
          <BrainIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Personality & Values</h2>
        <p className="text-gray-500 mt-2">Help us understand your work style and what matters to you</p>
      </div>

      {/* Personality Traits */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BrainIcon className="w-5 h-5 text-purple-500" />
          Personality Traits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {personalityTraits.map(trait => (
            <label
              key={trait.id}
              className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                (formData.personality?.traits || []).includes(trait.id)
                  ? `border-${trait.color}-500 bg-${trait.color}-50 shadow-md`
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <input
                type="checkbox"
                checked={(formData.personality?.traits || []).includes(trait.id)}
                onChange={() => handleTraitToggle(trait.id)}
                className="hidden"
              />
              <span className="text-2xl">{trait.icon}</span>
              <div className="flex-1">
                <div className={`font-medium ${
                  (formData.personality?.traits || []).includes(trait.id) ? `text-${trait.color}-700` : 'text-gray-800'
                }`}>
                  {trait.id}
                </div>
                <div className="text-xs text-gray-500">{trait.description}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                (formData.personality?.traits || []).includes(trait.id)
                  ? `border-${trait.color}-500 bg-${trait.color}-500`
                  : 'border-gray-300'
              }`}>
                {(formData.personality?.traits || []).includes(trait.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Work Environment */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BuildingIcon className="w-5 h-5 text-blue-500" />
          Work Environment
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {workEnvironmentOptions.map(option => (
            <label
              key={option.value}
              className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 text-center ${
                formData.personality?.workEnvironment === option.value
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <input
                type="radio"
                name="workEnvironment"
                value={option.value}
                checked={formData.personality?.workEnvironment === option.value}
                onChange={() => handleWorkEnvironment(option.value)}
                className="hidden"
              />
              <div className={`p-3 rounded-full mb-3 transition-all duration-300 ${
                formData.personality?.workEnvironment === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {option.icon}
              </div>
              <div className="font-semibold text-gray-800">{option.value}</div>
              <div className="text-xs text-gray-500 mt-1">{option.description}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Values */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TargetIcon className="w-5 h-5 text-green-500" />
          Core Values
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {valueOptions.map(value => (
            <label
              key={value.id}
              className={`group cursor-pointer`}
            >
              <input
                type="checkbox"
                checked={(formData.values || []).includes(value.id)}
                onChange={() => handleValueToggle(value.id)}
                className="hidden"
              />
              <div className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                (formData.values || []).includes(value.id)
                  ? `bg-gradient-to-r ${value.color} border-transparent shadow-lg transform scale-105`
                  : 'border-gray-200 hover:shadow-md'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    (formData.values || []).includes(value.id)
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {typeof value.icon === 'string' ? (
                      <span className="text-xl">{value.icon}</span>
                    ) : (
                      value.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${
                      (formData.values || []).includes(value.id) ? 'text-white' : 'text-gray-800'
                    }`}>
                      {value.id}
                    </div>
                    <div className={`text-xs ${
                      (formData.values || []).includes(value.id) ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {value.description}
                    </div>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-purple-500" />
            Your Profile
          </span>
          <span className="font-semibold text-purple-600">
            {(formData.personality?.traits || []).length} traits • {(formData.values || []).length} values
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${((formData.personality?.traits || []).length + (formData.values || []).length) / 12 * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Your answers help us understand your ideal work culture
        </p>
      </div>
    </div>
  );
}