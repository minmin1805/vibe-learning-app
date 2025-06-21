import React from 'react';

const LearningObjective = ({ objectives }) => {
  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col gap-2 bg-blue-100 p-4 rounded-lg shadow-sm'>
      <h2 className='text-xl font-bold text-blue-800'>Learning Objectives</h2>
      <ul className='list-disc list-inside text-gray-700'>
        {objectives.map((objective, index) => (
          <li key={index} className="mb-1">{objective}</li>
        ))}
      </ul>
    </div>
  );
};

export default LearningObjective;
