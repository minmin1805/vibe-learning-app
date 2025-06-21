import React from "react";
import LearningObjective from "./SharedComponents/LearningObjective";
import KnowledgeCheck from "./SharedComponents/KnowledgeCheck";
import MatchingExercise from "./SharedComponents/MatchingExercise";

function RememberLevel({ title, content }) {

  if (!content) {
    return <div>Loading content...</div>;
  }

  const {
    learningObjectives,
    openingQuestion,
    shortAnswer,
    keyDefinition,
    coreComponents,
    knowledgeCheck,
    dragAndDrop,
    deepDive,
  } = content || {};


  return (
    <div className="flex flex-col gap-2 mt-8 m-1">
      {/* Title */}
      <h1 className="text-[35px] font-bold">{title}</h1>

      {/* Learning Objectives */}
      <LearningObjective objectives={learningObjectives} />

      {/* Opening Question */}
      <div className="flex flex-col gap-2 mt-5">
        <p className="text-[25px] font-bold">{openingQuestion}</p>
        <p className="">{shortAnswer}</p>
      </div>

      {/* Key Definition */}
      <div className="flex flex-col gap-2 mt-5 bg-yellow-100 p-2 rounded-md border-x-3 border-yellow-400">
        <h2 className="text-lg font-bold text-yellow-700">
          Key Definition: {keyDefinition?.title}
        </h2>
        <p>{keyDefinition?.definition}</p>
      </div>

      {/* Core Components */}
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-lg font-bold">Core Components:</h2>
        <ul>
          {coreComponents?.map((eachCore, index) => (
            <li key={index} className="list-disc list-inside font-bold">
              {eachCore.term}:{" "}
              <span className="font-normal">{eachCore.definition}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Knowledge Check */}
      <KnowledgeCheck data={knowledgeCheck} />


      {/* Drag and Drop */}
      <MatchingExercise data={dragAndDrop} />


      {/* Deep Dive */}
      <div className="flex flex-col gap-2 mt-5 bg-red-100 p-2 rounded-md border-x-3 border-red-400">
        <h2 className="text-lg font-bold">Deep Dive: {deepDive?.title}</h2>
        {deepDive?.map((eachDive, index) => (
          <div key={index}>
            <h3 className="text-lg font-bold">{eachDive.title}</h3>
            <p>{eachDive.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RememberLevel;
