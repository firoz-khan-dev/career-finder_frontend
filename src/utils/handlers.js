// utils/handlers.js

export const toggleArrayItem = (array, value) => {
  if (array.includes(value)) {
    return array.filter(item => item !== value);
  } else {
    return [...array, value];
  }
};