import React from 'react';
import { 
  HeartIcon, 
  Code2Icon, 
  BrushIcon, 
  BriefcaseIcon,
  UsersIcon,
  LightbulbIcon,
  SparklesIcon
} from 'lucide-react';

export default function InterestsSkills({ formData, setFormData }) {
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const interestOptions = [
    { id: "Tech", icon: <Code2Icon className="w-5 h-5" />, color: "from-blue-500 to-cyan-500", description: "Programming, AI, Software Development" },
    { id: "Business", icon: <BriefcaseIcon className="w-5 h-5" />, color: "from-green-500 to-emerald-500", description: "Management, Marketing, Finance" },
    { id: "Design", icon: <BrushIcon className="w-5 h-5" />, color: "from-purple-500 to-pink-500", description: "UI/UX, Graphics, Creative Arts" },
    { id: "Science", icon: <LightbulbIcon className="w-5 h-5" />, color: "from-yellow-500 to-orange-500", description: "Research, Lab Work, Innovation" },
    { id: "Healthcare", icon: <HeartIcon className="w-5 h-5" />, color: "from-red-500 to-rose-500", description: "Medicine, Wellness, Care" },
    { id: "Education", icon: <UsersIcon className="w-5 h-5" />, color: "from-indigo-500 to-purple-500", description: "Teaching, Training, Mentoring" }
  ];

  const skillOptions = [
    { id: "Coding", icon: "💻", level: "Technical", color: "blue" },
    { id: "Communication", icon: "💬", level: "Soft Skill", color: "green" },
    { id: "Leadership", icon: "👑", level: "Management", color: "purple" },
    { id: "Problem Solving", icon: "🧩", level: "Analytical", color: "orange" },
    { id: "Creativity", icon: "🎨", level: "Innovation", color: "pink" },
    { id: "Data Analysis", icon: "📊", level: "Technical", color: "cyan" }
  ];

  const handleInterestToggle = (interestId) => {
    const current = formData.interests || [];
    const updated = current.includes(interestId)
      ? current.filter(i => i !== interestId)
      : [...current, interestId];
    setFormData(prev => ({ ...prev, interests: updated }));
  };

  const handleSkillToggle = (skillId) => {
    const current = formData.skills || [];
    const updated = current.includes(skillId)
      ? current.filter(s => s !== skillId)
      : [...current, skillId];
    setFormData(prev => ({ ...prev, skills: updated }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
          <SparklesIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Interests & Skills</h2>
        <p className="text-gray-500 mt-2">Select what excites you and what you're good at</p>
      </div>

      {/* Interests Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <HeartIcon className="w-5 h-5 text-red-500" />
          Your Interests
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {interestOptions.map(interest => (
            <label
              key={interest.id}
              className={`relative group cursor-pointer`}
              onMouseEnter={() => setHoveredItem(interest.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <input
                type="checkbox"
                checked={(formData.interests || []).includes(interest.id)}
                onChange={() => handleInterestToggle(interest.id)}
                className="hidden"
              />
              <div className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                (formData.interests || []).includes(interest.id)
                  ? `bg-gradient-to-r ${interest.color} border-transparent shadow-lg transform scale-105`
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    (formData.interests || []).includes(interest.id)
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100'
                  }`}>
                    {interest.icon}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${
                      (formData.interests || []).includes(interest.id) ? 'text-white' : 'text-gray-800'
                    }`}>
                      {interest.id}
                    </div>
                    {hoveredItem === interest.id && (
                      <div className="text-xs text-gray-500 mt-1 animate-fade-in">
                        {interest.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Code2Icon className="w-5 h-5 text-blue-500" />
          Your Skills
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skillOptions.map(skill => (
            <label
              key={skill.id}
              className="group cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.skills || []).includes(skill.id)}
                onChange={() => handleSkillToggle(skill.id)}
                className="hidden"
              />
              <div className={`flex items-center gap-3 p-3 border-2 rounded-xl transition-all duration-300 ${
                (formData.skills || []).includes(skill.id)
                  ? `border-${skill.color}-500 bg-${skill.color}-50 shadow-md`
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}>
                <span className="text-2xl">{skill.icon}</span>
                <div className="flex-1">
                  <div className={`font-medium ${
                    (formData.skills || []).includes(skill.id) ? `text-${skill.color}-700` : 'text-gray-800'
                  }`}>
                    {skill.id}
                  </div>
                  <div className="text-xs text-gray-500">{skill.level}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  (formData.skills || []).includes(skill.id)
                    ? `border-${skill.color}-500 bg-${skill.color}-500`
                    : 'border-gray-300'
                }`}>
                  {(formData.skills || []).includes(skill.id) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <p className="text-sm text-gray-600">
          📊 Selected: {(formData.interests || []).length} interests • {(formData.skills || []).length} skills
        </p>
        <p className="text-xs text-gray-500 mt-1">
          💡 Tip: Select at least 3 interests and 3 skills for better recommendations
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}