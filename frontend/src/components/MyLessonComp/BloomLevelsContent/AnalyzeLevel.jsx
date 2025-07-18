import React from 'react'
import LearningObjective from './SharedComponents/LearningObjective';
import InteractiveAlgorithmAnalysis from './SharedComponents/InteractiveAlgorithmAnalysis';
import AnalyzeExercise from './SharedComponents/AnalyzeExercise.jsx';
import KnowledgeCheck from './SharedComponents/KnowledgeCheck.jsx';

function AnalyzeLevel({ title, content }) {

  console.log(content);

  const {algorithmAnalysis, analysisExercise, criticalAnalysis, learningObjectives, sectionContent} = content

  return (
    <div className="flex flex-col gap-2 mt-8 m-1">
      <h1 className="text-[35px] font-bold">{title}</h1>
      <LearningObjective objectives={learningObjectives} />

      {/* Section Content */}
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-2xl font-bold">{sectionContent?.title}</h2>
        <p className="text-[#2D2F4A]">{sectionContent?.content}</p>
        
      </div>

      {/* algorithm analysis */}
      {algorithmAnalysis && <InteractiveAlgorithmAnalysis analysisData={algorithmAnalysis} />}

      {/* Analysis exercise */}
      {analysisExercise?.map((eachExercise, index) => (
      <AnalyzeExercise exercise={eachExercise} key={index} index={index + 1} />

      ))}

      {/* Critical Analysis */}
      <div className='mb-10'>
      <KnowledgeCheck data={criticalAnalysis} />

      </div>

      
      </div>
  )
}

export default AnalyzeLevel
