// components/CheckboxGroup.jsx
import React from 'react';

export default function CheckboxGroup({ title, options, data, setData }) {
  const handleToggle = (option) => {
    const updated = data.includes(option)
      ? data.filter(item => item !== option)
      : [...data, option];
    setData(updated);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.includes(opt)}
              onChange={() => handleToggle(opt)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-gray-600">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}