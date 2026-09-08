// utils/validate.js

export const validateSection = (step, data) => {
  if (step === 0) {
    return data.basicInfo.name && data.basicInfo.age && data.basicInfo.education;
  }

  if (step === 1) {
    return data.interests.length >= 2 && data.skills.length >= 2;
  }

  if (step === 2) {
    return (
      data.personality.traits.length >= 1 &&
      data.values.length >= 1 &&
      data.personality.workEnvironment
    );
  }

  if (step === 3) {
    return data.goals.shortTerm && data.goals.longTerm;
  }

  return true;
};