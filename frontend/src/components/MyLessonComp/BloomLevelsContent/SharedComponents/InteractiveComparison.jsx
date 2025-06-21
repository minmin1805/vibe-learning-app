import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

// Simple shuffle function to randomize the characteristics bank
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Draggable item for each characteristic
const DraggableCharacteristic = ({ id, text }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="p-3 mb-2 bg-white rounded-md shadow text-center font-semibold cursor-grab active:cursor-grabbing">
      {text}
    </div>
  );
};

// Droppable area for each concept
const DroppableConcept = ({ id, concept, characteristics, feedback }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`flex-1 p-4 rounded-lg shadow-inner transition-colors ${isOver ? 'bg-blue-100' : 'bg-gray-100'}`}>
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">{concept.concept}</h3>
      <div className="min-h-[200px] space-y-2">
        {characteristics.map(char => {
            const isCorrect = feedback[char.id] === 'correct';
            const feedbackClass = isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
            return (
                <div key={char.id} className={`p-2 rounded-md font-medium text-sm ${feedbackClass}`}>
                    {char.text}
                </div>
            );
        })}
      </div>
    </div>
  );
};

const InteractiveComparison = ({ data }) => {
  const { title, items } = data || {};

  const [characteristicsBank, setCharacteristicsBank] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    if (items) {
      // Create a flat list of all characteristics, each with a unique ID and a pointer to its correct concept
      const allCharacteristics = items.flatMap(item =>
        item.characteristics.map(charText => ({
          id: charText, // Assume characteristic text is unique for ID purposes
          text: charText,
          correctConcept: item.concept,
        }))
      );
      setCharacteristicsBank(shuffleArray(allCharacteristics));

      // Initialize the concept columns, ready to receive dropped items
      setConcepts(
        items.map(item => ({
          ...item,
          droppedCharacteristics: [],
        }))
      );
      setFeedback({});
    }
  }, [data]);

  const handleDragEnd = ({ active, over }) => {
    if (over?.id) {
      const characteristicId = active.id;
      const conceptId = over.id;

      // Find the characteristic that was dragged
      const characteristic = characteristicsBank.find(c => c.id === characteristicId);
      
      // Proceed only if the characteristic is still in the bank (not already dropped)
      if (!characteristic) return;

      // Check if the drop was correct and store feedback
      const isCorrect = characteristic.correctConcept === conceptId;
      setFeedback(prev => ({ ...prev, [characteristicId]: isCorrect ? 'correct' : 'incorrect' }));

      // Move the characteristic from the bank to the target concept's column
      setCharacteristicsBank(prev => prev.filter(c => c.id !== characteristicId));
      setConcepts(prev =>
        prev.map(concept => {
          if (concept.concept === conceptId) {
            return {
              ...concept,
              droppedCharacteristics: [...concept.droppedCharacteristics, characteristic],
            };
          }
          return concept;
        })
      );
    }
  };

  if (!data) return null;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-gray-600 mb-4">Drag each characteristic to the correct concept box.</p>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Characteristics Bank (Draggable Items) */}
          <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg shadow-inner">
             <h3 className="font-bold text-lg mb-4 text-center text-gray-700">Characteristics</h3>
             <div className="space-y-2">
                {characteristicsBank.map(char => (
                    <DraggableCharacteristic key={char.id} id={char.id} text={char.text} />
                ))}
             </div>
          </div>

          {/* Concept Columns (Droppable Areas) */}
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            {concepts.map(concept => (
              <DroppableConcept
                key={concept.concept}
                id={concept.concept}
                concept={concept}
                characteristics={concept.droppedCharacteristics}
                feedback={feedback}
              />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default InteractiveComparison; 