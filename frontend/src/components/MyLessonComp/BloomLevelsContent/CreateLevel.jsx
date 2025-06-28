import React from "react";
import LearningObjective from "./SharedComponents/LearningObjective";
import ImplementationRoadmap from "./SharedComponents/ImplementationRoadmap.jsx";
import KnowledgeCheck from "./SharedComponents/KnowledgeCheck.jsx";

function CreateLevel({ title, content }) {
  console.log(content);

  const {
    creativeChallenge,
    implementationRoadmap,
    learningObjectives,
    sectionContent,
    solutionBlueprint,
    solutionPresentation,
    synthesisChallenge,
  } = content;

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

      {/* Creative Challenge */}
      <div className="flex flex-col gap-2 mt-5 bg-gray-100 p-4 rounded-md pb-8">
        <h2 className="text-2xl font-bold text-blue-600">
          AI-Generated Creative Challenge
        </h2>
        <p>{creativeChallenge?.title}</p>

        <p className="text-[#2D2F4A] text-xl font-bold mt-5">
          Select Problem Domain:
        </p>
        <select className="w-[400px] p-2 rounded-md bg-white ">
          <option value="" disabled>
            Select a problem domain
          </option>
          {creativeChallenge?.problemDomains?.map((eachProblem, index) => (
            <option key={index} value={eachProblem}>
              {eachProblem}
            </option>
          ))}
        </select>
      </div>

      {/* Solution Blueprint */}
      <div className="flex flex-col gap-2 mt-5 bg-gray-100 p-4 rounded-md pb-8">
        <h2 className="text-2xl font-bold text-blue-600">
          Interactive Solution Blueprint
        </h2>
        <p className="text-[#2D2F4A]">Use this template to structure your solution:</p>

        <div className="flex flex-col gap-2 mt-2 p-5">
          {solutionBlueprint?.sections.map((eachSolution, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold ">{eachSolution?.title}</h3>
              <p className="text-[#2D2F4A]">{eachSolution?.prompt}</p>
              <textarea
                placeholder="Enter your response here..."
                className="w-full p-2 rounded-md bg-white mt-3"
              />
            </div>
          ))}
          <button className="w-[100px] p-2 rounded-md bg-blue-500 text-white mt-3 self-end">
            Submit
          </button>
        </div>
      </div>

      {/* Implementation Roadmap */}
      <ImplementationRoadmap data={implementationRoadmap} />

      {/* Synthesis Challenge */}
      <KnowledgeCheck data={synthesisChallenge} />

      {/* Solution Presentation */}
      <div className="flex flex-col gap-2 mt-5 bg-gray-100 p-4 rounded-md pb-8 mb-10">
        <h2 className="text-2xl font-bold text-blue-600">
          Final Solution Presentation
        </h2>
        <p className="text-[#2D2F4A]">Prepare your solution for presentation:</p>

        <div className="flex flex-col gap-2 mt-2 p-5">
          {solutionPresentation?.sections.map((eachSection, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold text-[#2D2F4A]">
                {eachSection?.title} {eachSection?.timeLimit}
              </h2>
              <p className="text-[#2D2F4A]">{eachSection?.prompt}</p>
              <textarea
                placeholder="Enter your response here..."
                className="w-full p-2 rounded-md bg-white mt-3"
              />
            </div>
          ))}
          <button className="w-[100px] p-2 rounded-md bg-blue-500 text-white mt-3 self-end">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateLevel;
