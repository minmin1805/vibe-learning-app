import React, { useState, useEffect } from 'react';

const KnowledgeCheck = ({ data }) => {
  const [selectedKnowledgeCheckIndex, setSelectedKnowledgeCheckIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const { title, question, options, correctAnswerIndex } = data || {};

  useEffect(() => {
    setSelectedKnowledgeCheckIndex(null);
    setIsCorrect(false);
  }, [data]);

  const handleKnowledgeCheck = (index) => {
    if (isCorrect) return;
    setSelectedKnowledgeCheckIndex(index);
    if (index === correctAnswerIndex) {
      setIsCorrect(true);
    }
  };

  const getButtonClass = (index) => {
    if (isCorrect) {
      return index === correctAnswerIndex
        ? 'bg-green-500 text-white'
        : 'bg-white opacity-50 cursor-not-allowed';
    }
    if (index === selectedKnowledgeCheckIndex) {
      return 'bg-red-500 text-white';
    }
    return 'bg-white hover:bg-gray-100';
  };

  if (!data) {
    return null;
  }

  return (
    <div className='flex flex-col gap-3 mt-6 bg-green-100 p-4 rounded-lg shadow-sm'>
      <h2 className='text-xl font-bold text-green-800'>Knowledge Check: {title}</h2>
      <p className="text-gray-700">{question}</p>
      <div className="flex flex-col gap-2">
        {options?.map((option, index) => (
          <button
            onClick={() => handleKnowledgeCheck(index)}
            key={index}
            className={`px-4 py-3 rounded-md text-left text-black cursor-pointer transition-colors duration-300 shadow-sm ${getButtonClass(index)}`}
            disabled={isCorrect}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeCheck;
