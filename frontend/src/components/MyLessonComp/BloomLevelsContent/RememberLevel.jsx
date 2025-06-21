import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

// Draggable Term Component
const DraggableTerm = ({ term }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: term,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 mb-3 bg-white rounded-md shadow-md text-center font-semibold cursor-grab"
    >
      {term}
    </div>
  );
};

// Droppable Definition Component
const DroppableDefinition = ({ definition, matchedTerm, feedback }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: definition.id,
  });

  const getBorderColor = () => {
    if (isOver) return "border-blue-500 bg-blue-100";
    if (feedback === "correct") return "border-green-500";
    if (feedback === "incorrect") return "border-red-500";
    return "border-gray-300";
  };

  return (
    <div
      ref={setNodeRef}
      className={`p-4 border-2 border-dashed rounded-lg flex items-center justify-between transition-colors ${getBorderColor()}`}
    >
      <p className="text-gray-800 flex-1">{definition.text}</p>
      <div className="w-48 h-12 ml-4 flex items-center justify-center rounded-md bg-gray-200">
        {matchedTerm ? (
          <div
            className={`p-2 w-full text-center rounded-md shadow-sm font-semibold ${
              feedback === "correct"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {matchedTerm}
          </div>
        ) : (
          <span className="text-gray-400">Drop here</span>
        )}
      </div>
    </div>
  );
};

function RememberLevel({ title, content }) {
  const [selectedKnowledgeCheckIndex, setSelectedKnowledgeCheckIndex] =
    useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // State for the Drag and Drop activity
  const [terms, setTerms] = useState(content?.dragAndDrop?.terms || []);
  const [definitions, setDefinitions] = useState(
    content?.dragAndDrop?.definitions.map((def) => ({
      id: def, // Use definition text as a unique ID
      text: def,
      matchedTerm: null,
    })) || []
  );
  const [feedback, setFeedback] = useState({});

  const knowledgeCheckCorrectIndex =
    content?.knowledgeCheck?.correctAnswerIndex || 0;

  console.log(content);

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

  const handleKnowledgeCheck = (index) => {
    if (isCorrect) return;

    setSelectedKnowledgeCheckIndex(index);

    if (index === knowledgeCheckCorrectIndex) {
      setIsCorrect(true);
    }
  };

  const getButtonClass = (index) => {
    if (isCorrect) {
      return index === knowledgeCheckCorrectIndex
        ? "bg-green-500 text-white"
        : "bg-white opacity-50 cursor-not-allowed";
    }

    if (index === selectedKnowledgeCheckIndex) {
      return "bg-red-500 text-white";
    }

    return "bg-white hover:bg-gray-100";
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over) {
      const definitionId = over.id;
      const termId = active.id;

      const targetDef = definitions.find((d) => d.id === definitionId);
      if (targetDef.matchedTerm) return; // Slot is already filled

      // Update state
      setTerms((prev) => prev.filter((term) => term !== termId));
      setDefinitions((prev) =>
        prev.map((def) =>
          def.id === definitionId ? { ...def, matchedTerm: termId } : def
        )
      );

      // Provide feedback
      if (dragAndDrop?.correctMatches[termId] === definitionId) {
        setFeedback((prev) => ({ ...prev, [definitionId]: "correct" }));
      } else {
        setFeedback((prev) => ({ ...prev, [definitionId]: "incorrect" }));
      }
    }
  };

  if (!content) {
    return <div>Loading content...</div>;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-2 mt-8 m-1">
        {/* Title */}
        <h1 className="text-[35px] font-bold">{title}</h1>

        {/* Learning Objectives */}
        <div className="flex flex-col gap-2 bg-blue-100 p-2 rounded-md">
          <h2 className="text-lg font-bold">Learning Objectives</h2>
          <ul className="list-disc list-inside">
            {learningObjectives?.map((eachObjective, index) => (
              <li key={index}>{eachObjective}</li>
            ))}
          </ul>
        </div>

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
        <div className="flex flex-col gap-2 mt-5 bg-green-100 p-2 rounded-md border-x-3 border-green-400">
          <h2 className="text-lg font-bold">
            Knowledge Check: {knowledgeCheck?.title}
          </h2>
          <p>{knowledgeCheck?.question}</p>
          {knowledgeCheck?.options.map((eachOption, index) => (
            <button
              onClick={() => handleKnowledgeCheck(index)}
              key={index}
              className={`px-4 py-2 rounded-md text-left text-black cursor-pointer transition-colors duration-300 ${getButtonClass(
                index
              )}`}
              disabled={isCorrect}
            >
              {eachOption}
            </button>
          ))}
        </div>

        {/* Drag and Drop */}
        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-2xl font-bold">Match the Terms</h2>
          <p className="text-gray-600">
            Drag each term from the bank on the right and drop it onto its
            correct definition.
          </p>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Definitions Column (Droppable Areas) */}
            <div className="flex flex-col gap-3">
              {definitions.map((def) => (
                <DroppableDefinition
                  key={def.id}
                  definition={def}
                  matchedTerm={def.matchedTerm}
                  feedback={feedback[def.id]}
                />
              ))}
            </div>

            {/* Terms Bank (Draggable Items) */}
            <div className="w-full lg:w-64 bg-gray-50 p-4 rounded-lg shadow-inner">
              <h3 className="font-bold text-lg mb-4 text-center text-gray-700">
                Terms Bank
              </h3>
              {terms.map((term) => (
                <DraggableTerm key={term} term={term} />
              ))}
            </div>
          </div>
        </div>


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
    </DndContext>
  );
}

export default RememberLevel;
