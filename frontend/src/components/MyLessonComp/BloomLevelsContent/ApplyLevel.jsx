import React from "react";
import LearningObjective from "./SharedComponents/LearningObjective";
import ProblemSolvingChallenge from "./SharedComponents/ProblemSolvingChallenge.jsx";
import KnowledgeCheck from "./SharedComponents/KnowledgeCheck.jsx";
import WorkflowImplementation from "./SharedComponents/WorkflowImplementation.jsx";

function ApplyLevel({ title, content }) {
  console.log(content);

  const {
    applicationChallenge,
    learningObjectives,
    problemSolvingChallenge,
    sectionContent,
    workflowImplementation,
  } = content;

  return (
    <div className="flex flex-col gap-2 mt-8 m-1">
      <h1 className="text-[35px] font-bold">{title}</h1>
      <LearningObjective objectives={learningObjectives} />

      {/* Section Content */}
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-2xl font-bold">{sectionContent?.title}</h2>
        <p className="text-[#2D2F4A]">{sectionContent?.content}</p>
      </div>

      {/* Problem Solving Challenge */}
      <div className="flex flex-col gap-2 mt-5 bg-gray-100 p-2 rounded-md">
        <h2 className="text-2xl font-bold text-blue-700">
          AI-Generated Problem Solving Challenges
        </h2>
        <p className="text-[#2D2F4A]">
          For each scenario, select the most appropriat approach and justify
          your choice:
        </p>
        {problemSolvingChallenge.map((eachScenario, index) => (
          <ProblemSolvingChallenge
            key={index}
            scenario={eachScenario}
            index={index + 1}
          />
        ))}
      </div>

      {/* Workflow Implementation */}
      <WorkflowImplementation workflowImplementation={workflowImplementation} />


      {/*Application Challenge*/}
      <div className='mb-10'>
      <KnowledgeCheck data={applicationChallenge} />

      </div>
    </div>
  );
}

export default ApplyLevel;
