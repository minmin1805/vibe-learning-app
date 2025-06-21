import React from 'react'
import LearningObjective from './SharedComponents/LearningObjective'
import KnowledgeCheck from './SharedComponents/KnowledgeCheck'
import MatchingExercise from './SharedComponents/MatchingExercise'
import InteractiveComparison from './SharedComponents/InteractiveComparison'

function UnderstandLevel({ title, content }) {

  console.log(content);

  const {learningObjectives, conceptExplanation, examples, interactiveComparison, understandingCheck} = content


  if (!content) {
    return <div>Loading content...</div>;
  }


  return (
    <div className="flex flex-col gap-2 mt-8 m-1">
      <h1 className='text-[35px] font-bold'>{title}</h1>

      {/* Learning Objectives */}
      <LearningObjective objectives={learningObjectives} />

      {/* Concept Explanation */}
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-lg font-bold">{conceptExplanation?.title}</h2>
        <p>{conceptExplanation?.explanation}</p>
      </div>

      {/* Matching Exercise */}
      <MatchingExercise data={[]} />

      {/* Understanding Check */}
      <KnowledgeCheck data={understandingCheck} />

      {/* Interactive Comparison */}
      <InteractiveComparison data={interactiveComparison} />

      {/* Examples */}
      <div className="flex flex-col gap-2 mt-5 bg-red-100 p-2 rounded-md border-x-3 border-red-400">
        <h2 className="text-lg font-bold">Examples</h2>
        {examples?.map((eachExample, index) => (
          <div key={index}>
            <h3 className="text-lg font-bold">{eachExample.scenario}</h3>
            <p>{eachExample.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UnderstandLevel
