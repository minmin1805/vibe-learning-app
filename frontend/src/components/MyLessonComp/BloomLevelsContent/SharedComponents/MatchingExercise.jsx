import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

// Internal components for Draggable and Droppable items
const DraggableTerm = ({ term }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: term });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="p-3 mb-3 bg-white rounded-md shadow-md text-center font-semibold cursor-grab">
      {term}
    </div>
  );
};

const DroppableDefinition = ({ definition, matchedTerm, feedback }) => {
  const { isOver, setNodeRef } = useDroppable({ id: definition.id });
  const getBorderColor = () => {
    if (isOver) return 'border-blue-500 bg-blue-100';
    if (feedback === 'correct') return 'border-green-500';
    if (feedback === 'incorrect') return 'border-red-500';
    return 'border-gray-300';
  };
  return (
    <div ref={setNodeRef} className={`p-4 border-2 border-dashed rounded-lg flex items-center justify-between transition-colors ${getBorderColor()}`}>
      <p className="text-gray-800 flex-1">{definition.text}</p>
      <div className="w-48 h-12 ml-4 flex items-center justify-center rounded-md bg-gray-200">
        {matchedTerm ? (
          <div className={`p-2 w-full text-center rounded-md shadow-sm font-semibold ${feedback === 'correct' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {matchedTerm}
          </div>
        ) : (
          <span className="text-gray-400">Drop here</span>
        )}
      </div>
    </div>
  );
};

const MatchingExercise = ({ data }) => {
  const { terms: initialTerms, definitions: initialDefinitions, correctMatches } = data || {};

  const [terms, setTerms] = useState(initialTerms || []);
  const [definitions, setDefinitions] = useState(
    initialDefinitions?.map(def => ({
      id: def,
      text: def,
      matchedTerm: null,
    })) || []
  );
  const [feedback, setFeedback] = useState({});

  // Reset state when data changes
  useEffect(() => {
    setTerms(initialTerms || []);
    setDefinitions(initialDefinitions?.map(def => ({ id: def, text: def, matchedTerm: null })) || []);
    setFeedback({});
  }, [initialTerms, initialDefinitions]);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      const definitionId = over.id;
      const termId = active.id;

      const targetDef = definitions.find(d => d.id === definitionId);
      if (targetDef.matchedTerm) return;

      setTerms(prev => prev.filter(term => term !== termId));
      setDefinitions(prev => prev.map(def =>
        def.id === definitionId ? { ...def, matchedTerm: termId } : def
      ));

      if (correctMatches[termId] === definitionId) {
        setFeedback(prev => ({ ...prev, [definitionId]: 'correct' }));
      } else {
        setFeedback(prev => ({ ...prev, [definitionId]: 'incorrect' }));
      }
    }
  };

  if (!data) {
    return null;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex flex-col gap-4 mt-8'>
        <h2 className='text-2xl font-bold'>Match the Terms</h2>
        <p className="text-[#2D2F4A]">Drag each term from the bank on the right and drop it onto its correct definition.</p>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-3">
            {definitions.map((def) => (
              <DroppableDefinition key={def.id} definition={def} matchedTerm={def.matchedTerm} feedback={feedback[def.id]} />
            ))}
          </div>
          <div className="w-full lg:w-64 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="font-bold text-lg mb-4 text-center text-[#2D2F4A]">Terms Bank</h3>
            {terms.map((term) => (
              <DraggableTerm key={term} term={term} />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default MatchingExercise;
