import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Item = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white p-3 rounded-md shadow-sm cursor-grab active:cursor-grabbing">
      {content}
    </div>
  );
};

const Container = ({ id, title, items, stepMap }) => {
  const { setNodeRef } = useSortable({ id });
  const containerStyle = id === 'pool' 
    ? "bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300 mb-8"
    : "bg-blue-50 p-4 rounded-lg shadow-md";

  return (
    <SortableContext id={id} items={items}>
      <div ref={setNodeRef} className={containerStyle}>
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <div className="space-y-3 min-h-[60px]">
          {items.map(itemId => <Item key={itemId} id={itemId} content={stepMap.get(itemId)?.content} />)}
        </div>
      </div>
    </SortableContext>
  );
};

function ImplementationRoadmap({ data }) {
  if (!data || !data.phases) return null;

  const { phases } = data;

  const stepMap = useMemo(() => {
    const allSteps = phases.flatMap(phase =>
      phase.steps.map((step, index) => ({
        id: `${phase.title}-${index}`,
        content: step,
        phaseTitle: phase.title,
      }))
    );
    return new Map(allSteps.map(step => [step.id, step]));
  }, [phases]);

  const [items, setItems] = useState(() => {
    const initialItems = { pool: Array.from(stepMap.keys()).sort(() => Math.random() - 0.5) };
    phases.forEach(phase => {
      initialItems[phase.title] = [];
    });
    return initialItems;
  });

  const [activeId, setActiveId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const findContainer = id => {
    if (id in items) return id;
    return Object.keys(items).find(key => items[key].includes(id));
  };

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragOver = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (activeContainer !== overContainer) {
      setItems(prev => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];
        const activeIndex = activeItems.indexOf(active.id);
        const overIndex = overItems.indexOf(over.id);

        let newIndex;
        if (over.id in prev) {
          newIndex = overItems.length + 1;
        } else {
          const isBelow = over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
          const modifier = isBelow ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        return {
          ...prev,
          [activeContainer]: activeItems.filter(id => id !== active.id),
          [overContainer]: [
            ...overItems.slice(0, newIndex),
            active.id,
            ...overItems.slice(newIndex, overItems.length),
          ],
        };
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findContainer(active.id);
    if (!over) {
      setActiveId(null);
      return;
    };
    const overContainer = findContainer(over.id);

    if (activeContainer === overContainer) {
      setItems(prev => {
        const activeIndex = prev[activeContainer].indexOf(active.id);
        const overIndex = prev[overContainer].indexOf(over.id);
        return {
          ...prev,
          [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
        };
      });
    }
    setActiveId(null);
  };

  const validateRoadmap = () => {
    let correctCount = 0;
    phases.forEach(phase => {
      const userStepsInPhase = items[phase.title] || [];
      userStepsInPhase.forEach(stepId => {
        if (stepMap.get(stepId)?.phaseTitle === phase.title) {
          correctCount++;
        }
      });
    });
    setScore({ correct: correctCount, total: stepMap.size });
    setSubmitted(true);
  };
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md my-6">
      <h2 className="text-2xl font-bold mb-2">Implementation Roadmap Creator</h2>
      <p className="mb-6 text-gray-600">Create a practical plan by dragging the steps into the correct phase.</p>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className='md:col-span-2'>
                <Container id="pool" title="Unassigned Steps" items={items.pool} stepMap={stepMap} />
            </div>
            {phases.map(phase => (
                <Container key={phase.title} id={phase.title} title={phase.title} items={items[phase.title]} stepMap={stepMap} />
            ))}
        </div>

        <DragOverlay>
          {activeId ? <Item id={activeId} content={stepMap.get(activeId)?.content} /> : null}
        </DragOverlay>
      </DndContext>

      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={validateRoadmap}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Validate Roadmap
        </button>

        {submitted && (
          <div className={`mt-4 text-lg font-semibold ${score.correct === score.total ? 'text-green-600' : 'text-red-600'}`}>
            You scored {score.correct} out of {score.total}.
            {score.correct === score.total && " Excellent work!"}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImplementationRoadmap; 