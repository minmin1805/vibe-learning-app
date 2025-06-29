import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

function DraggableExample({ id, children, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, isDragging: dragging } = useDraggable({ id });
  const style = {
    opacity: dragging ? 0.5 : 1,
    cursor: 'grab',
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: dragging ? 100 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-[#5B4FFF] text-white font-semibold rounded-lg px-5 py-3 mb-2 text-center min-w-[220px] shadow-md select-none"
    >
      {children}
    </div>
  );
}

function DroppableOption({ id, label, description, children, isOver, isCorrect, isIncorrect }) {
  const { setNodeRef, isOver: over } = useDroppable({ id });
  let borderColor = 'border-gray-300';
  if (isCorrect) borderColor = 'border-green-500';
  else if (isIncorrect) borderColor = 'border-red-500';
  else if (over) borderColor = 'border-blue-500';

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[260px] border-2 border-dashed rounded-lg p-4 m-2 transition-colors ${borderColor}`}
      style={{ minHeight: 90 }}
    >
      <div className="font-bold text-lg text-[#23243A] mb-1">{label}</div>
      <div className="text-gray-600 mb-2">{description}</div>
      {children}
    </div>
  );
}

function MatchingExercise({ data }) {
  if (!data || !data.items || !data.options) return null;

  // Map of option => dropped example index (or null)
  const [matches, setMatches] = useState({});
  // List of example indices that are still in the bank
  const [bank, setBank] = useState(data.items.map((_, idx) => idx));
  const [activeId, setActiveId] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({});

  // Optionally, you can provide descriptions for each option
  // For demo, use hardcoded descriptions for ML example
  const optionDescriptions = {
    'Supervised Learning': 'Uses labeled examples to learn',
    'Unsupervised Learning': 'Finds patterns without labels',
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveId(null);
    if (over && over.id.startsWith('option-')) {
      const optionIdx = parseInt(over.id.replace('option-', ''));
      const exampleIdx = parseInt(active.id.replace('example-', ''));
      // Remove from bank
      setBank((prev) => prev.filter((idx) => idx !== exampleIdx));
      // Remove any previous match for this option
      setMatches((prev) => {
        // Remove this example from any other option
        const newMatches = { ...prev };
        Object.keys(newMatches).forEach((key) => {
          if (newMatches[key] === exampleIdx) newMatches[key] = null;
        });
        newMatches[optionIdx] = exampleIdx;
        return newMatches;
      });
    }
  };

  const handleReset = () => {
    setMatches({});
    setBank(data.items.map((_, idx) => idx));
    setShowResult(false);
    setResult({});
  };

  const checkAnswers = () => {
    // For each option, check if the dropped example matches the correct type
    const res = {};
    data.options.forEach((option, optionIdx) => {
      const exampleIdx = matches[optionIdx];
      if (exampleIdx == null) {
        res[optionIdx] = null;
      } else {
        const correct = data.items[exampleIdx].type === option;
        res[optionIdx] = correct ? 'correct' : 'incorrect';
      }
    });
    setResult(res);
    setShowResult(true);
  };

  // Calculate score
  const total = data.options.length;
  const correctCount = Object.values(result).filter((v) => v === 'correct').length;

  return (
    <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 mt-7">
      <h2 className="text-2xl font-bold text-blue-800 mb-1">{data.title || 'AI-Generated Matching Exercise'}</h2>
      <p className="mb-4 text-[#2D2F4A]">{data.instructions || 'Match each example to the correct type:'}</p>
      {/* Example bank */}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6 flex flex-wrap gap-4 min-h-[120px]">
          {bank.length === 0 && <span className="text-gray-400">All examples matched!</span>}
          {bank.map((idx) => (
            <DraggableExample key={idx} id={`example-${idx}`}>{data.items[idx].example}</DraggableExample>
          ))}
        </div>
        {/* Drop zones */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {data.options.map((option, optionIdx) => {
            const exampleIdx = matches[optionIdx];
            const isCorrect = showResult && result[optionIdx] === 'correct';
            const isIncorrect = showResult && result[optionIdx] === 'incorrect';
            return (
              <DroppableOption
                key={optionIdx}
                id={`option-${optionIdx}`}
                label={option}
                description={optionDescriptions[option] || ''}
                isCorrect={isCorrect}
                isIncorrect={isIncorrect}
              >
                {exampleIdx != null && (
                  <div
                    className={`mt-2 px-4 py-2 rounded font-semibold text-center text-white ${isCorrect ? 'bg-green-500' : isIncorrect ? 'bg-red-500' : 'bg-[#5B4FFF]'}`}
                  >
                    {data.items[exampleIdx].example}
                  </div>
                )}
              </DroppableOption>
            );
          })}
        </div>
      </DndContext>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-[#5B4FFF] text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={checkAnswers}
          disabled={Object.values(matches).filter((v) => v != null).length !== data.options.length}
        >
          Check Understanding
        </button>
        <button
          className="bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      {showResult && (
        <div className={`mt-4 p-3 rounded-lg font-semibold ${correctCount === total ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {correctCount === total
            ? `Excellent! You got ${correctCount}/${total} correct (100%). Great understanding of the concepts!`
            : `You got ${correctCount}/${total} correct. Review the incorrect matches and try again!`}
        </div>
      )}
    </div>
  );
}

export default MatchingExercise;
