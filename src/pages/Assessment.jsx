import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BasicInfo from './sections/BasicInfo';
import InterestsSkills from './sections/InterestsSkills';
import PersonalityValues from './sections/PersonalityValues';
import Goals from './sections/Goals';

import ProgressBar from '../components/ProgressBar';
import { validateSection } from '../utils/validate';

export default function Assessment() {
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: { name: '', age: '', education: '' },
    interests: [],
    skills: [],
    personality: { traits: [], workEnvironment: '' },
    values: [],

    experience: { years: 0, fields: [] },   // ✅ ADD

    goals: {
      shortTerm: '',
      longTerm: '',
      salaryExpectation: '',   // ✅ ADD
      workLifeBalance: ''      // ✅ ADD
    }
  });

  const sections = [
    <BasicInfo formData={formData} setFormData={setFormData} />,
    <InterestsSkills formData={formData} setFormData={setFormData} />,
    <PersonalityValues formData={formData} setFormData={setFormData} />,
    <Goals formData={formData} setFormData={setFormData} />
  ];

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/assessment/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user._id,
          assessmentData: formData
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('careerRecommendations', JSON.stringify(data.recommendations));
        navigate('/recommendations');
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert("Error submitting");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-xl">

        <ProgressBar step={currentSection} />

        {sections[currentSection]}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentSection(prev => prev - 1)}
            disabled={currentSection === 0}
          >
            Back
          </button>

          {currentSection < 3 ? (
            <button
              onClick={() => {
                if (!validateSection(currentSection, formData)) {
                  alert("Fill required fields");
                  return;
                }
                setCurrentSection(prev => prev + 1);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>

      </div>
    </div>
  );
}