import React from 'react'
import LearningObjective from './SharedComponents/LearningObjective.jsx';
import KnowledgeCheck from './SharedComponents/KnowledgeCheck.jsx';
import EvaluationFramework from './SharedComponents/EvaluationFramework.jsx';
import CriticalEvaluation from './SharedComponents/CriticalEvaluation.jsx';

function EvaluateLevel({ title, content }) {

  console.log(content);

  const {learningObjectives, criticalEvaluation, evaluationChallenge, evaluationFramework, sectionContent} = content;

  

  return (
    <div className="flex flex-col gap-2 mt-8 m-1">
      <h1 className="text-[35px] font-bold">{title}</h1>
      {/* Learning Objectives */}
      <LearningObjective objectives={learningObjectives} />

      {/* Section Content */}
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-2xl font-bold">{sectionContent?.title}</h2>
        <p className="text-[#2D2F4A]">{sectionContent?.content}</p>
      </div>

      {/* Evaluation Framework */}
      <EvaluationFramework data={evaluationFramework} />

      {/* Evaluation Challenge */}
      <KnowledgeCheck data={evaluationChallenge} />

      {/* Critical Evaluation */}
      <CriticalEvaluation data={criticalEvaluation} />
    </div>
  )
}

export default EvaluateLevel
