import React, { useState } from 'react'

function RememberLevel({ title, content }) {

  const [selectedKnowledgeCheckIndex, setSelectedKnowledgeCheckIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  

  const knowledgeCheckCorrectIndex = content.knowledgeCheck.correctAnswerIndex;
  console.log(knowledgeCheckCorrectIndex);

  const {
    learningObjectives,
    openingQuestion,
    shortAnswer,
    keyDefinition,
    coreComponents,
    knowledgeCheck,
    dragAndDrop,
    deepDive
  } = content;

  console.log(content);

  const handleKnowledgeCheck = (index) => {
    if (isCorrect) return;

    setSelectedKnowledgeCheckIndex(index);

    if (index === knowledgeCheckCorrectIndex) {
      setIsCorrect(true);
    }
  }

  const getButtonClass = (index) => {
    if (isCorrect) {
      return index === knowledgeCheckCorrectIndex 
        ? 'bg-green-500 text-white'
        : 'bg-white opacity-50 cursor-not-allowed';
    }

    if (index === selectedKnowledgeCheckIndex) {
      return 'bg-red-500 text-white'; 
    }

    return 'bg-white hover:bg-gray-100';
  };

  return (
    <div className='flex flex-col gap-2 mt-8 m-1'>

      {/* Title */}
      <h1 className='text-[35px] font-bold'>{title}</h1>

      {/* Learning Objectives */}
      <div className='flex flex-col gap-2 bg-blue-100 p-2 rounded-md'>
        <h2 className='text-lg font-bold'>Learning Objectives</h2>
        <ul className='list-disc list-inside'>
          {learningObjectives.map((eachObjective, index) => (
            <li key={index}>{eachObjective}</li>
          ))}
        </ul>
      </div>

      {/* Opening Question */}
      <div className='flex flex-col gap-2 mt-5'>
        <p className='text-[25px] font-bold'>{openingQuestion}</p>
        <p className=''>{shortAnswer}</p>
      </div>

      {/* Key Definition */}
      <div className='flex flex-col gap-2 mt-5 bg-yellow-100 p-2 rounded-md border-x-3 border-yellow-400'>
        <h2 className='text-lg font-bold text-yellow-700'>Key Definition: {keyDefinition.title}</h2>
        <p>{keyDefinition.definition}</p>
      </div>

      {/* Core Components */}
      <div className='flex flex-col gap-2 mt-5'>
        <h2 className='text-lg font-bold'>Core Components: {coreComponents.title}</h2>
        <ul>
          {coreComponents.map((eachCore, index) => (
            <li key={index} className='list-disc list-inside font-bold'>{eachCore.term}: <span className='font-normal'>{eachCore.definition}</span></li>
          ))}
        </ul>
      </div>

      {/* Knowledge Check */}
      <div className='flex flex-col gap-2 mt-5 bg-green-100 p-2 rounded-md border-x-3 border-green-400'>
        <h2 className='text-lg font-bold'>Knowledge Check: {knowledgeCheck.title}</h2>
        <p>{knowledgeCheck.question}</p>
        {knowledgeCheck.options.map((eachOption, index) => (
          <button 
            onClick={() => handleKnowledgeCheck(index)} 
            key={index} 
            className={`px-4 py-2 rounded-md text-left text-black cursor-pointer transition-colors duration-300 ${getButtonClass(index)}`}
            disabled={isCorrect} 
          >
            {eachOption}
          </button>
        ))}
      </div>
        


    </div>
  )
}

export default RememberLevel
